'use client';

import React, { useState, useEffect } from 'react';
import { ChatSession, searchSessions, deleteSession as deleteSessionFromStore } from '../lib/chat-store';

interface SessionListProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
  onSessionsChange: () => void;
}

export default function SessionList({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onSessionsChange,
}: SessionListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSessions, setFilteredSessions] = useState<ChatSession[]>(sessions);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredSessions(searchSessions(searchQuery));
    } else {
      setFilteredSessions(sessions);
    }
  }, [searchQuery, sessions]);

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSessionFromStore(sessionId);
      onSessionsChange();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getModeIcon = (mode: 'chat' | 'qa') => {
    if (mode === 'qa') {
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M95H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect width="6" height="4" x="9" y="3" rx="1" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      );
    }
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-1.227l-3.356 1.346a1 1 0 01-1.414-1.414l1.346-3.356A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-mist/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-mist/50 bg-cream/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-forest">Sessions</h3>
          <button
            onClick={onNewChat}
            className="p-1.5 bg-sage/10 text-sage rounded-lg hover:bg-sage/20 transition-colors"
            title="New chat"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions..."
            className="w-full pl-9 pr-3 py-2 bg-cream/50 border border-mist/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage text-sm text-forest placeholder:text-forest/40"
          />
        </div>
      </div>

      {/* Sessions List */}
<div className="flex-1 overflow-y-auto">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-forest/50">
            <svg className="w-12 h-12 mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
           <p className="text-sm">
              {searchQuery ? 'No sessions found' : 'No sessions yet'}
            </p>
            <p className="text-xs text-forest/40 mt-1">
              {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session)}
                className={`w-full text-left p-3 rounded-xl transition-all group ${
                  currentSessionId === session.id
                    ? 'bg-sage/10 border border-sage/30'
                    : 'hover:bg-cream/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${
                        currentSessionId === session.id ? 'text-sage' : 'text-forest/40'
                      }`}>
                        {getModeIcon(session.mode)}
                      </span>
                      <p className="font-medium text-forest truncate text-sm">{session.title}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-forest/50">
                      <span>{formatDate(session.updatedAt)}</span>
                      <span>·</span>
                      <span>{session.messages.length} messages</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteSession(e, session.id)}
                    className="p-1.5 text-forest/30 hover:text-coral hover:bg-coral/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete session"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-mist/50 bg-cream/30">
        <p className="text-xs text-forest/40 text-center">
          {sessions.length} session{sessions.length !== 1 ? 's' : ''} saved
        </p>
      </div>
    </div>
  );
}
