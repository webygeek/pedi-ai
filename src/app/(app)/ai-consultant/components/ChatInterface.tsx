'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../lib/chat-store';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
  isTyping?: boolean;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  onClearChat,
  isTyping = false
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
 inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mock AI responses for now
  const getMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return "For fevers in children, it's important to monitor the temperature regularly. A fever below 101°F (38.3°C) is usually not concerning in otherwise healthy children. Keep your child hydrated and comfortable. If the fever exceeds 104°F (40°C) or lasts more than 3 days, please consult your pediatrician.";
    }

    if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination') || lowerMessage.includes('shot')) {
      return "Vaccinations are crucial for protecting your child from serious diseases. The recommended immunization schedule begins at birth and continues through adolescence. Would you like me to provide information about specific vaccines or the recommended vaccination timeline?";
    }

    if (lowerMessage.includes('sleep')) {
      return "Sleep requirements vary by age. Newborns need 14-17 hours, infants 12-15 hours, toddlers 11-14 hours, and preschoolers10-13 hours. Consistent bedtime routines help establish healthy sleep patterns. Is your child having trouble with sleep?";
    }

    if (lowerMessage.includes('nutrition') || lowerMessage.includes('food') || lowerMessage.includes('eating')) {
      return "A balanced diet is essential for your child's growth and development. Include a variety of fruits, vegetables, whole grains, and protein sources. For specific age-appropriate nutrition guidelines, let me know your child's age.";
    }

    if (lowerMessage.includes('growth') || lowerMessage.includes('height') || lowerMessage.includes('weight')) {
      return "Growth monitoring is important to ensure your child is developing normally. Use our growth charts to track weight, height, and head circumference over time. Regular check-ups with your pediatrician help identify any growth concerns early.";
    }

    if (lowerMessage.includes('development') || lowerMessage.includes('milestone')) {
      return "Child development follows general patterns, but every child is unique. Common milestones include crawling (6-10 months), walking (9-15 months), and first words (10-14 months). If you have concerns about your child's development, discuss them with your pediatrician.";
    }

    // Default response
    return "Thank you for your question. For pediatric health concerns, I recommend consulting with your healthcare provider for personalized advice. In the meantime, you can use our symptom checker or browse our FAQ section for general guidance. Is there a specific aspect of pediatric health you'd like to know more about?";
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-mist/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-mist/50 bg-cream/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-forest">AI Consultant</h3>
            <p className="text-xs text-forest/60">Powered by Pedi·Ai</p>
          </div>
        </div>
        <button
          onClick={onClearChat}
          className="p-2 text-forest/50 hover:text-coral hover:bg-coral/5 rounded-lg transition-colors"
          title="Clear chat"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-forest/50">
            <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-1.227l-3.356 1.346a1 1 0 01-1.414-1.414l1.346-3.356A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-forest mb-2">Start a conversation</h3>
            <p className="text-sm max-w-xs">
              Ask me about your child's health, development, nutrition, or any pediatric concerns.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-xs text-forest/40 uppercase tracking-wide">Try asking about</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Fever management', 'Vaccination schedule', 'Sleep guidelines', 'Growth milestones'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onSendMessage(suggestion)}
                    className="px-3 py-1.5 bg-cream hover:bg-mist/50 rounded-full text-sm text-forest/70 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-forest text-white rounded-br-md'
                  : 'bg-cream text-forest rounded-bl-md'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-white/60' : 'text-forest/40'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-cream rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-mist/50 bg-cream/30">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 bg-white border border-mist/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage text-forest placeholder:text-forest/40 text-sm"
              style={{ maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`p-3 rounded-xl transition-all ${
              inputValue.trim()
                ? 'bg-forest text-white hover:bg-forest/90 shadow-md'
                : 'bg-mist/30 text-forest/30 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-forest/40 mt-2 text-center">
          AI responses are for informational purposes only. Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
}
