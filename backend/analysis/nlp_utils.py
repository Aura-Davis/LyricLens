from textblob import TextBlob
from transformers import pipeline

# Load the classifier pipeline directly
emotion_classifier = pipeline(
    "text-classification", 
    model="j-hartmann/emotion-english-distilroberta-base", 
    top_k=3,
    truncation=True  # pipeline truncates input if too long
)

def analyze_lyrics(lyrics):
    print("Analyzing lyrics...")
    # The pipeline internally truncates inputs longer than model max length
    emotions = emotion_classifier(lyrics)

    # The returned structure: list of dicts (top_k=3)
    if emotions and isinstance(emotions[0], dict):
        # For top_k=3, emotions is list of dicts (e.g., [{'label':..., 'score':...},...])
        dominant_emotion = emotions[0]['label']
        emotion_breakdown = {item['label']: round(item['score'], 3) for item in emotions}
    else:
        dominant_emotion = "Neutral"
        emotion_breakdown = {}

    return {
        "emotion": dominant_emotion,
        "emotion_breakdown": emotion_breakdown
    }
