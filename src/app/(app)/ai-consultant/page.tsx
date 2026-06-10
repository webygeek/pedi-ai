'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { ChatSession, ChatMessage, getSessions, getSession, saveSession, createSession, addMessageToSession, updateSessionTitle } from './lib/chat-store';
import ChatInterface from './components/ChatInterface';
import QAMode from './components/QAMode';
import SessionList from './components/SessionList';

type TabMode = 'chat' | 'qa';

export default function AIConsultantPage() {
  const { session, getActiveChild, getRoleDisplayName } = useAuth();
  const activeChild = getActiveChild();
  const roleDisplayName = getRoleDisplayName();

  const [activeTab, setActiveTab] = useState<TabMode>('chat');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load sessions on mount
  useEffect(() => {
    setMounted(true);
    loadSessions();
  }, []);

  const loadSessions = useCallback(() => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions);
  }, []);

  // Handle creating new session
  const handleNewChat = useCallback((mode: TabMode = 'chat', category?: string) => {
    const newSession = createSession(mode, category);
    saveSession(newSession);
    setCurrentSession(newSession);
    loadSessions();
    setActiveTab(mode);
  }, [loadSessions]);

  // Handle selecting a session
  const handleSelectSession = useCallback((session: ChatSession) => {
    setCurrentSession(session);
    setActiveTab(session.mode);
  }, []);

  // Handle sending a message
  const handleSendMessage = useCallback((content: string) => {
    if (!currentSession) {
      // Create a new session if none exists
      const newSession = createSession('chat');
      saveSession(newSession);
      setCurrentSession(newSession);
    }

    if (!currentSession) return;

    // Add user message
    const updatedSession = addMessageToSession(currentSession.id, {
      role: 'user',
      content,
    });

    if (updatedSession) {
      setCurrentSession(updatedSession);

      // Update title if it's the first message
      if (updatedSession.messages.length === 1) {
        updateSessionTitle(updatedSession.id, content);
      }

      // Show typing indicator
      setIsTyping(true);

      // Simulate AI response delay
      setTimeout(() => {
        setIsTyping(false);

        // Generate mock response
        const mockResponses: Record<string, string> = {
          fever: "For fevers in children, it's important to monitor the temperature regularly. A fever below 101°F (38.3°C) is usually not concerning in otherwise healthy children. Keep your child hydrated and comfortable. If the fever exceeds 104°F (40°C) or lasts more than 3 days, please consult your pediatrician.",
          vaccine: "Vaccinations are crucial for protecting your child from serious diseases. The recommended immunization schedule begins at birth and continues through adolescence. Would you like me to provide information about specific vaccines or the recommended vaccination timeline?",
          sleep: "Sleep requirements vary by age. Newborns need 14-17 hours, infants 12-15 hours, toddlers 11-14 hours, and preschoolers 10-13 hours. Consistent bedtime routines help establish healthy sleep patterns. Is your child having trouble with sleep?",
          nutrition: "A balanced diet is essential for your child's growth and development. Include a variety of fruits, vegetables, whole grains, and protein sources. For specific age-appropriate nutrition guidelines, let me know your child's age.",
          growth: "Growth monitoring is important to ensure your child is developing normally. Use our growth charts to track weight, height, and head circumference over time. Regular check-ups with your pediatrician help identify any growth concerns early.",
          development: "Child development follows general patterns, but every child is unique. Common milestones include crawling (6-10 months), walking (9-15 months), and first words (10-14 months). If you have concerns about your child's development, discuss them with your pediatrician.",
        };

        const lowerContent = content.toLowerCase();
        let response = "Thank you for your question. For pediatric health concerns, I recommend consulting with your healthcare provider for personalized advice. In the meantime, you can use our symptom checker or browse our FAQ section for general guidance. Is there a specific aspect of pediatric health you'd like to know more about?";

        for (const [key, value] of Object.entries(mockResponses)) {
          if (lowerContent.includes(key)) {
            response = value;
            break;
          }
        }

        // Add AI response
        const sessionWithAI = addMessageToSession(updatedSession.id, {
          role: 'assistant',
          content: response,
        });

        if (sessionWithAI) {
          setCurrentSession(sessionWithAI);
        }

        loadSessions();
      }, 1500);
    }
  }, [currentSession, loadSessions]);

  // Handle clearing chat
  const handleClearChat = useCallback(() => {
    if (!currentSession) return;

    if (confirm('Are you sure you want to clear this chat? This cannot be undone.')) {
      const clearedSession: ChatSession = {
        ...currentSession,
        messages: [],
        title: 'New Chat',
      };
      saveSession(clearedSession);
      setCurrentSession(clearedSession);
      loadSessions();
    }
  }, [currentSession, loadSessions]);

  // Handle Q&A custom question
  const handleQAQuestion = useCallback((question: string) => {
    handleSendMessage(question);
    setActiveTab('chat');
  }, [handleSendMessage]);

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-mist/50 rounded w-1/3"></div>
        <div className="h-96 bg-mist/50 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-forest">
            AI Consultant
          </h1>
          <p className="text-forest/60 mt-1">
            Get answers to your pediatric questions
</p>
        </div>

        {/* User Context */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-mist/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sm">
              {session?.user.avatar || session?.user.name.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-forest">{session?.user.name}</p>
              <p className="text-xs text-forest/50">{roleDisplayName}</p>
            </div>
          </div>
          {activeChild && (
            <>
              <div className="w-px h-8 bg-mist/50" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center text-sm">
                  {activeChild.avatar || '👶'}
                </div>
                <div>
                  <p className="text-sm font-medium text-forest">{activeChild.name}</p>
                  <p className="text-xs text-forest/50">
                    {Math.floor((new Date().getTime() - new Date(activeChild.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} months old
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-mist/50 w-fit">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'chat'
              ? 'bg-forest text-white shadow-md'
              : 'text-forest/60 hover:text-forest hover:bg-cream/50'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-1.227l-3.356 1.346a1 1 0 01-1.414-1.414l1.346-3.356A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium text-sm">Chat</span>
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'qa'
              ? 'bg-forest text-white shadow-md'
              : 'text-forest/60 hover:text-forest hover:bg-cream/50'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect width="6" height="4" x="9" y="3" rx="1" />
            <path d="M9 12h6" />
            <path d="M9 16h6" />
          </svg>
          <span className="font-medium text-sm">Q&A</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar - Sessions List */}
        <div className="h-[calc(100vh-280px)] min-h-[400px]">
          <SessionList
            sessions={sessions}
            currentSessionId={currentSession?.id || null}
            onSelectSession={handleSelectSession}
            onNewChat={() => handleNewChat(activeTab)}
            onSessionsChange={loadSessions}
          />
        </div>

        {/* Main Panel */}
        <div className="h-[calc(100vh-280px)] min-h-[400px]">
          {activeTab === 'chat' ? (
            <ChatInterface
              messages={currentSession?.messages || []}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              isTyping={isTyping}
            />
          ) : (
            <QAMode onAskQuestion={handleQAQuestion} />
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center py-4 border-t border-mist/50">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
          <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span className="text-sm text-amber-800">
            AI responses are for informational purposes only. Always consult a healthcare professional for medical advice.
          </span>
        </div>
      </div>
    </div>
  );
}
