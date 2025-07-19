import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import config

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=config.SPOTIFY_CLIENT_ID,
    client_secret=config.SPOTIFY_CLIENT_SECRET
))

def search_track(title, artist):
    query = f"track:{title} artist:{artist}"
    #print("Spotify search query:", query)
    results = sp.search(q=query, type="track", limit=1, market="US")
    #print("Spotify search result:", results)

    if results["tracks"]["items"]:
        track = results["tracks"]["items"][0]
        return {
            "preview_url": track["preview_url"],
            "spotify_url": track["external_urls"]["spotify"],
            "album_art": track["album"]["images"][0]["url"] if track["album"]["images"] else None
        }
    else:
        print("No track found.")
        return None