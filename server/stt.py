import whisper

model = whisper.load_model("base")

def transcribe_audio(file_path: str) -> str:
    """
    Transcribes an audio file to text using Whisper.
    """
    result = model.transcribe(file_path)
    return result["text"]
