import nltk
import text2emotion as te

# Ensure required NLTK data is present
required_resources = ['omw-1.4', 'wordnet', 'stopwords', 'punkt']
for resource in required_resources:
    try:
        path = f'tokenizers/{resource}' if resource == 'punkt' else f'corpora/{resource}'
        nltk.data.find(path)
    except LookupError:
        nltk.download(resource)

def analyze_lyrics(lyrics):
    print("Analyzing lyrics...")
    emotion_scores = te.get_emotion(lyrics)

    if not any(emotion_scores.values()):
        dominant_emotion = "Neutral"
    else:
        dominant_emotion = max(emotion_scores, key=emotion_scores.get)

    return {
        "emotion": dominant_emotion,
        "emotion_breakdown": {k: round(v, 3) for k, v in emotion_scores.items()}
    }
