import React from 'react';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isBot?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  timestamp, 
  isBot = false 
}) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${isBot ? 
            'bg-white text-[var(--text)]' : 
            'bg-[var(--primary)] text-white'
          }
        `}
      >
        <p className="whitespace-pre-wrap">{message}</p>
        <p 
          className={`
            mt-1 text-xs 
            ${isBot ? 'text-gray-500' : 'text-white/70'}
          `}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
};
