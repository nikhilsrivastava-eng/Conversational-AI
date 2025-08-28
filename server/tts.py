from TTS.api import TTS
import torch

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Init TTS
tts = TTS("tts_models/en/ljspeech/tacotron2-DDC").to(device)

def text_to_speech(text: str, file_path: str):
    """
    Converts text to speech and saves it to a file.
    """
    tts.tts_to_file(text=text, file_path=file_path)
