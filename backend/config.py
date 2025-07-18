from dotenv import load_dotenv
import os

load_dotenv()  # loads variables from .env into environment

GENIUS_API_KEY = os.getenv("GENIUS_API_KEY")
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")