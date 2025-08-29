# Conversational AI - Healthcare Voice Assistant

This document explains the core components of our Healthcare Voice Assistant application, focusing on the main server implementation and the frontend test interface.

## Demo
[Demo 1 - Application Walkthrough](https://www.loom.com/share/d4d8c8505d3842ce9edc381823738dc2?sid=41e76442-e359-4516-8dbf-e1d6dda01cba)

## Backend Implementation (main.py)

The `main.py` file implements a FastAPI server that provides three main endpoints for the voice assistant:

### 1. Transcription Endpoint (`/api/transcribe`)
```python
@api_router.post("/transcribe")
def transcribe(file: Annotated[bytes, File()])-> dict:
```
- Receives audio data as a file upload
- Saves the audio temporarily as "temp_audio.wav"
- Uses the Speech-to-Text (STT) module to transcribe the audio
- Returns the transcribed text

### 2. Chat Endpoint (`/api/chat`)
```python
@api_router.post("/chat")
def chat(request: ChatRequest):
```
- Accepts a text prompt from the user
- Processes the prompt using the LLM (Language Learning Model) module
- Returns the AI's response

### 3. Speech Synthesis Endpoint (`/api/synthesize`)
```python
@api_router.post("/synthesize")
def synthesize(request: SynthesizeRequest):
```
- Takes text input
- Converts it to speech using the Text-to-Speech (TTS) module
- Returns an audio file containing the synthesized speech

### Server Configuration
- Uses CORS middleware to allow cross-origin requests from the frontend
- Serves static files from the client directory
- Implements a modular structure with separate routes under the `/api` prefix

## Frontend Implementation (Test.tsx)

The `Test.tsx` file implements a React component that provides a voice-based chat interface. Here's a detailed breakdown of its functionality:

### State Management
```typescript
const [isRecording, setIsRecording] = useState(false);
const [status, setStatus] = useState('');
const [messages, setMessages] = useState<ChatMessage[]>([]);
```
- Tracks recording state
- Manages status messages
- Stores chat history

### Audio Recording
```typescript
const handleRecord = async () => {
```
- Uses the MediaRecorder API to capture audio from the user's microphone
- Manages the recording state and audio chunks
- Provides visual feedback during recording

### Communication Flow
1. **Audio Recording**
   - Captures audio using the device's microphone
   - Accumulates audio data in chunks
   - Creates a WAV file when recording stops

2. **Server Communication**
   ```typescript
   const sendAudioToServer = async (blob: Blob) => {
   ```
   - Sends audio to the transcription endpoint
   - Sends transcribed text to the chat endpoint
   - Receives and plays synthesized speech response

3. **User Interface Updates**
   - Shows recording status
   - Displays messages in a chat-like interface
   - Provides visual feedback for system state

### UI Components
- Recording button with microphone/stop icons
- Chat message display area
- Status messages
- Healthcare disclaimer

### Error Handling
- Manages microphone access errors
- Handles network communication errors
- Provides user feedback for all error states

## Key Features
1. Real-time audio recording
2. Speech-to-text transcription
3. AI-powered conversation
4. Text-to-speech response


## Implementation Details
- Uses React with TypeScript
- Implements responsive design using Tailwind CSS
- Uses custom UI components for consistency
- Manages asynchronous operations with proper error handling
- Provides clear visual feedback for all user actions

## Dependencies
- React and React Icons for UI
- MediaRecorder API for audio capture
- Web Audio API for audio playback
- FastAPI for backend services
- Custom UI components from the project's component library

## Notes
- Audio is processed in WAV format
- The interface is designed for healthcare-related conversations
- Includes appropriate medical disclaimers
- Implements proper cleanup of audio resources

