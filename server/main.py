from fastapi import FastAPI, UploadFile, File, APIRouter
from typing import Annotated
import shutil
from . import stt
from . import llm
from . import tts
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
class ChatRequest(BaseModel):
    prompt: str

class SynthesizeRequest(BaseModel):
    text: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins; replace with specific origins for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

api_router = APIRouter(prefix="/api")

@api_router.post("/transcribe")
def transcribe(file: Annotated[bytes, File()])-> dict:
    # Save the uploaded file to a temporary location
    with open("temp_audio.wav", "wb") as buffer:
        buffer.write(file)

    # Transcribe the audio file
    text = stt.transcribe_audio("temp_audio.wav")

    print(f"Transcription: {text}")

    return {"transcription": text}

@api_router.post("/chat")
def chat(request: ChatRequest):
    response = llm.get_llm_response(request.prompt)
    return {"response": response}

@api_router.post("/synthesize")
def synthesize(request: SynthesizeRequest):
    tts.text_to_speech(request.text, "temp_audio_out.wav")
    return FileResponse("temp_audio_out.wav")

app.include_router(api_router)

app.mount("/", StaticFiles(directory="./client", html=True), name="client")