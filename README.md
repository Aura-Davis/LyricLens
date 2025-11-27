# LyricLens

AI-powered lyric emotion analysis + song metadata lookup

LyricLens is a full-stack web application that analyzes the emotional tone of song lyrics using lightweight NLP.
Users can search for a song, fetch its lyrics, view emotional breakdowns as a chart, and see album metadata from Spotify.

This project demonstrates strong skills in React, Flask, API integration, NLP, and full-stack system design.
It is built to be employer-friendly: clean, modular, well-structured, and stable.

Features
Song Search

Search for a song by title + artist.

Retrieves a link to the song’s Genius page.

Retrieves album art, Spotify URL, and metadata.

Lyric Emotion Analysis

Backend runs lightweight NLP (text2emotion) to determine:

Dominant emotion

Emotion breakdown (chart visualization)

Beautiful Recharts Pie Visualization

Custom-styled emotion chart

Labels rendered dynamically

Album art displayed alongside chart

Spotify Integration

Uses Spotify API to fetch:

Album image

Track preview URL

Spotify song link

Tech Stack
Frontend

React (Vite)

Axios

Recharts

CSS

Backend

Python (Flask)

text2emotion (NLP)

Spotify API

Genius API

Getting Started Locally
Backend
cd backend
pip install -r requirements.txt
python app.py

Frontend
cd frontend
npm install
npm run dev

Environment Variables

Create a .env file in /backend:

GENIUS_API_KEY=your_key
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret

What This Project Demonstrates

Full-stack capability

REST API design

Secure key management

Modular backend architecture

Frontend engineering

React UI components

Dynamic state flow

Data visualization

API integration

Spotify authentication

External data processing

Error-tolerant fetching

NLP application

Preprocessing pipelines
