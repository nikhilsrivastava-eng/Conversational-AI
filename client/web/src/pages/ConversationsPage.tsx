import React, { useState } from 'react';
import { 
  Container, 
  ChatBubble, 
  Input, 
  Button, 
  Icon 
} from '../ui/components';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';

// Dummy conversation data
const initialConversation = [
  {
    id: 1,
    message: "Hello! How can I assist you with your health concerns today?",
    timestamp: "10:00 AM",
    isBot: true
  },
  {
    id: 2,
    message: "I've been having frequent headaches lately.",
    timestamp: "10:01 AM",
    isBot: false
  },
  {
    id: 3,
    message: "I understand you're experiencing frequent headaches. Let me help you better understand this. How long have you been experiencing these headaches, and can you describe the pain (e.g., throbbing, sharp, dull)?",
    timestamp: "10:01 AM",
    isBot: true
  },
  {
    id: 4,
    message: "It's been about 2 weeks. The pain is usually throbbing and concentrated on one side of my head.",
    timestamp: "10:02 AM",
    isBot: false
  },
  {
    id: 5,
    message: "Based on your description, this could be consistent with migraine headaches. Some common triggers include:\n\n• Stress\n• Lack of sleep\n• Certain foods\n• Dehydration\n\nI recommend:\n1. Keeping a headache diary to track triggers\n2. Ensuring regular sleep schedule\n3. Staying hydrated\n\nHowever, since these headaches are recent and persistent, you should consult a healthcare provider for a proper evaluation. Would you like me to provide more information about migraines or help you find a nearby healthcare provider?",
    timestamp: "10:02 AM",
    isBot: true
  }
];

const ConversationsPage: React.FC = () => {
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: conversation.length + 1,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false
    };

    setConversation(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: conversation.length + 2,
        message: "I understand your concern. Can you provide more details about your symptoms? This will help me give you better guidance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true
      };
      setConversation(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mt-4 rounded-lg bg-white shadow-lg">
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4">
              <h1 className="text-xl font-semibold text-[var(--text)]">
                Health Consultation
              </h1>
              <p className="text-sm text-gray-500">
                Chat with your AI Health Assistant
              </p>
            </div>

            {/* Chat Messages */}
            <div className="h-[60vh] overflow-y-auto p-4">
              {conversation.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isBot={msg.isBot}
                />
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                />
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "primary" : "outline"}
                  className="!rounded-full !p-3"
                >
                  <Icon icon={FaMicrophone} size={20} />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="!rounded-full !p-3"
                >
                  <Icon icon={FaPaperPlane} size={20} />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500">
                This AI Health Assistant provides general information and support. 
                Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ConversationsPage;
