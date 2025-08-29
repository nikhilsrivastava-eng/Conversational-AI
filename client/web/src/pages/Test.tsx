import React, { useState, useRef } from 'react';
import { Container, Button, ChatBubble, Icon } from '../ui/components';
import { FaMicrophone, FaStop } from 'react-icons/fa';

interface ChatMessage {
  message: string;
  timestamp: string;
  isBot: boolean;
}

const BASE_URL = import.meta.env.VITE_BASE_URL 

const Test = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setStatus('Recording stopped.');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          chunksRef.current = [];
          sendAudioToServer(blob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setStatus('Recording...');
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setStatus('Error accessing microphone.');
      }
    }
  };

  const sendAudioToServer = async (blob: Blob) => {
    try {
      // Create FormData and append the audio blob
      const formData = new FormData();
      formData.append('file', blob);

      // Step 1: Send audio for transcription
      const transcribeResponse = await fetch(`${BASE_URL}/api/transcribe`, {
        method: 'POST',
        body: formData
      });
      const transcriptionData = await transcribeResponse.json();
      
      // Add user's transcribed message to chat
      const userMessage = {
        message: transcriptionData.transcription,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: false
      };
      setMessages(prev => [...prev, userMessage]);

      // Step 2: Send transcription to chat API
      const chatResponse = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: transcriptionData.transcription })
      });
      const chatData = await chatResponse.json();

      // Add bot's response to chat
      const botMessage = {
        message: chatData.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);

      // Step 3: Synthesize speech from response
      const synthesizeResponse = await fetch(`${BASE_URL}/api/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: chatData.response })
      });
      const audioBlob = await synthesizeResponse.blob();
      
      // Play the synthesized speech
      const audio = new Audio(URL.createObjectURL(audioBlob));
      await audio.play();

      setStatus('Completed successfully.');
    } catch (error) {
      console.error('Error in processing:', error);
      setStatus('Error occurred during processing.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-bold text-[var(--text)]">
                Healthcare Voice Assistant
              </h1>
              <p className="text-sm text-gray-500">
                {status || 'Click the microphone button to start recording'}
              </p>
            </div>

            {/* Record Button */}
            <div className="mb-8 flex justify-center">
              <Button
                onClick={handleRecord}
                className={`!h-16 !w-16 !rounded-full !p-0 transition-all duration-200 ${
                  isRecording ? 'animate-pulse !bg-red-500' : ''
                }`}
              >
                <Icon 
                  icon={isRecording ? FaStop : FaMicrophone} 
                  size={24} 
                />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto rounded-lg bg-gray-50 p-4">
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isBot={msg.isBot}
                />
              ))}
              {messages.length === 0 && (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <p>Your conversation will appear here</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>This is an AI assistant. Always consult with healthcare professionals for medical advice.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Test;
