import os
import re
import requests
from bs4 import BeautifulSoup

GENIUS_API_KEY = os.getenv("GENIUS_API_KEY")
GENIUS_BASE_URL = "https://api.genius.com"
GENIUS_HEADERS = {
    "Authorization": f"Bearer {GENIUS_API_KEY}"
}


def clean_lyrics(raw_lyrics):
    match = re.search(r'\[(Intro|Verse|Chorus|Bridge).*?\]', raw_lyrics)
    if match:
        return raw_lyrics[match.start():]
    else:
        return raw_lyrics.strip()


def scrape_lyrics_from_url(url):
    """Scrape lyrics directly from the Genius song page."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    lyrics_div = soup.find("div", class_="Lyrics__Root")
    if lyrics_div:
        return lyrics_div.get_text(separator="\n").strip()

    # Fallback for older Genius layout
    containers = soup.select("div.lyrics, div[class^='Lyrics__Container']")
    if containers:
        return "\n".join([c.get_text(separator="\n") for c in containers]).strip()

    return None


def fetch_lyrics(title, artist, retries=3):
    for attempt in range(retries):
        try:
            print(f'Searching for "{title}" by {artist}... Attempt {attempt + 1}')
            search_query = f"{title} {artist}"
            response = requests.get(
                f"{GENIUS_BASE_URL}/search",
                headers=GENIUS_HEADERS,
                params={"q": search_query},
                timeout=10
            )

            if response.status_code != 200:
                raise Exception(f"Genius API Error: {response.status_code}")

            hits = response.json().get("response", {}).get("hits", [])

            for hit in hits:
                result = hit["result"]
                if artist.lower() in result["primary_artist"]["name"].lower():
                    url = result["url"]
                    lyrics = scrape_lyrics_from_url(url)
                    if lyrics:
                        return {
                            "lyrics": clean_lyrics(lyrics),
                            "url": url
                        }

            # Fallback to top result if no artist match
            if hits:
                result = hits[0]["result"]
                url = result["url"]
                lyrics = scrape_lyrics_from_url(url)
                if lyrics:
                    return {
                        "lyrics": clean_lyrics(lyrics),
                        "url": url
                    }

            return None

        except Exception as e:
            print(f"Error fetching lyrics : {e}")
            if attempt < retries - 1:
                import time
                time.sleep(1)
            else:
                return None
