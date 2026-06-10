// localStorage-based session storage for AI Consultant

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  mode: 'chat' | 'qa';
  category?: string;
}

const STORAGE_KEY = 'pedi_ai_chat_sessions';
const STORAGE_VERSION = '1.0';

interface StoredData {
  version: string;
  sessions: ChatSession[];
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all sessions from localStorage
 */
export function getSessions(): ChatSession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: StoredData = JSON.parse(stored);
    if (parsed.version !== STORAGE_VERSION) {
      // Clear old data if version mismatch
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    // Sort by updatedAt descending (most recent first)
    return parsed.sessions.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (err) {
    console.error('Failed to get sessions:', err);
    return [];
  }
}

/**
 * Get a single session by ID
 */
export function getSession(id: string): ChatSession | null {
  try {
    const sessions = getSessions();
    return sessions.find(s => s.id === id) || null;
  } catch (err) {
    console.error('Failed to get session:', err);
    return null;
  }
}

/**
 * Save a session to localStorage
 */
export function saveSession(session: ChatSession): void {
  try {
    const sessions = getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);

    const updatedSession: ChatSession = {
      ...session,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      sessions[existingIndex] = updatedSession;
    } else {
      sessions.unshift(updatedSession);
    }

    const data: StoredData = {
      version: STORAGE_VERSION,
      sessions,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save session:', err);
  }
}

/**
 * Create a new empty session
 */
export function createSession(mode: 'chat' | 'qa' = 'chat', category?: string): ChatSession {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: mode === 'chat' ? 'New Chat' : `Q&A - ${category || 'General'}`,
    messages: [],
    createdAt: now,
    updatedAt: now,
    mode,
    category,
  };
}

/**
 * Delete a session by ID
 */
export function deleteSession(id: string): void {
  try {
    const sessions = getSessions();
    const filtered = sessions.filter(s => s.id !== id);

    const data: StoredData = {
      version: STORAGE_VERSION,
      sessions: filtered,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to delete session:', err);
  }
}

/**
 * Search sessions by content
 */
export function searchSessions(query: string): ChatSession[] {
  if (!query.trim()) return getSessions();

  const sessions = getSessions();
  const lowerQuery = query.toLowerCase();

  return sessions.filter(session => {
    // Search in title
    if (session.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in messages
    return session.messages.some(msg =>
      msg.content.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Update session title based on first user message
 */
export function updateSessionTitle(sessionId: string, firstMessage: string): void {
  const session = getSession(sessionId);
  if (!session) return;

  // Create a title from the first message (truncated)
  const title = firstMessage.length > 40
    ? firstMessage.substring(0, 40) + '...'
    : firstMessage;

  saveSession({
    ...session,
    title,
  });
}

/**
 * Add a message to a session
 */
export function addMessageToSession(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatSession | null {
  const session = getSession(sessionId);
  if (!session) return null;

  const newMessage: ChatMessage = {
    ...message,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };

  const updatedSession: ChatSession = {
    ...session,
    messages: [...session.messages, newMessage],
    updatedAt: new Date().toISOString(),
  };

  saveSession(updatedSession);
  return updatedSession;
}

/**
 * Clear all sessions
 */
export function clearAllSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear sessions:', err);
  }
}
