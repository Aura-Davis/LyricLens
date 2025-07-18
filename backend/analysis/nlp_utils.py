from textblob import TextBlob
from transformers import pipeline
from transformers import AutoTokenizer

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained("j-hartmann/emotion-english-distilroberta-base")
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=3)

def truncate_lyrics_to_token_limit(lyrics, max_tokens=512):
    tokens = tokenizer(lyrics, truncation=True, max_length=max_tokens, return_tensors="pt")
    # Decode tokens back into string
    truncated_lyrics = tokenizer.decode(tokens["input_ids"][0], skip_special_tokens=True)
    return truncated_lyrics

def analyze_lyrics(lyrics):
    print("Analyzing lyrics...")
    truncated_lyrics = truncate_lyrics_to_token_limit(lyrics)

    emotions = emotion_classifier(truncated_lyrics)
    # Handle top_k=3 result structure
    if emotions and isinstance(emotions[0], list) and emotions[0]:
        dominant_emotion = emotions[0][0]['label']
        emotion_breakdown = {item['label']: round(item['score'], 3) for item in emotions[0]}
    else:
        dominant_emotion = "Neutral"
        emotion_breakdown = {}
        
    return {
        "emotion": dominant_emotion,
        "emotion_breakdown": emotion_breakdown
    }