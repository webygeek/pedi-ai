'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send,
  Mic,
  X,
  Trash2,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Phone,
  ExternalLink,
  Bot,
  Clock,
  MessageCircle,
  History,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react'

// Types
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: string[]
  isEmergency?: boolean
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// Suggested topics for quick start
const suggestedTopics = [
  { id: 'sleep', label: 'Sleep regression tips', icon: '🌙' },
  { id: 'eating', label: 'Picky eating solutions', icon: '🥦' },
  { id: 'tantrum', label: 'Tantrum management', icon: '😤' },
  { id: 'potty', label: 'Potty training help', icon: '🚽' },
  { id: 'screen', label: 'Screen time guidelines', icon: '📱' },
  { id: 'development', label: 'Developmental concerns', icon: '🧠' },
]

// AI response templates
const aiResponses: Record<string, { response: string; sources: string[] }> = {
  sleep: {
    response: `## Sleep Regression Tips

Sleep regressions are common and usually temporary. Here's what typically works:

**For babies 4-12 months:**
- **Consistent bedtime routine** — Same time, same steps every night (bath, book, feed, bed)
- **White noise machine** — Creates a sleep-friendly environment
- **Put them down drowsy but awake** — Helps them learn to self-soothe

**For toddlers 1-3 years:**
- **Reassurance is key** — "You had a great sleep, you can do it again!"
- **Check for triggers** — Growth spurts, developmental leaps, or schedule changes
- **Avoid creating new sleep associations** — Don't introduce new habits you can't maintain

**When to be concerned:**
- If sleep issues persist beyond 2-3 weeks
- If your child shows signs of serious tiredness during the day
- Any breathing difficulties during sleep

Remember: This too shall pass! Sleep regressions typically resolve within 1-2 weeks with consistency.`,
    sources: ['American Academy of Pediatrics (AAP)', 'HealthyChildren.org'],
  },
  eating: {
    response: `## Picky Eating Solutions

Picky eating peaks between ages 2-4. Here's a compassionate approach:

**What works:**
- **Offer a "safe food"** alongside new foods — reduces anxiety
- **Involve them in preparation** — even toddlers can wash veggies
- **Make food visually appealing** — cut into fun shapes, use colorful plates
- **Offer, don't force** — "You don't have to eat it, but it's here if you want"

**Nutrition basics to focus on:**
- Protein: Eggs, beans, yogurt
- Healthy fats: Avocado, nut butters (if no allergies)
- Iron: Fortified cereals, lean meats

**Avoid these traps:**
- Never use dessert as a reward for eating vegetables
- Don't let them graze all day — hunger helps at mealtimes
- Avoid pressure — it backfires and makes picky eating worse

**When to seek help:**
- Poor weight gain or growth
- Extreme food refusal lasting months
- Signs of nutritional deficiency
`,
    sources: ['AAP Nutrition Guidelines', "Children's Hospital of Philadelphia"],
  },
  tantrum: {
    response: `## Tantrum Management

Tantrums are normal from ages 1-4. They're not "bad behavior" — they're overwhelmed emotions.

**During the tantrum:**
- **Stay calm** — Your calm is their anchor
- **Ensure safety** — Move them away from hazards quietly
- **Validate feelings** — "You're really frustrated. I get it."
- **Don't try to reason** — The thinking brain is offline

**After the tantrum:**
- **Reconnect first** — Hugs before lessons
- **Name the feeling** — "You were so mad you couldn't have ice cream first"
- **Problem solve together** — "Next time, what could we try?"

**Prevention strategies:**
- **Predictable routines** reduce anxiety
- **Offer choices** to give autonomy ("Apples or bananas?")
- **Warn before transitions** — "5 more minutes, then bath time"
- **Meet basic needs** — Hungry, tired kids tantrum more

**Red flags — call your pediatrician:**
- Head banging, self-injury
- Tantrums lasting >30 minutes
- Frequent daily tantrums affecting family life`,
    sources: ['Zero to Three', 'AAP HealthyChildren'],
  },
  potty: {
    response: `## Potty Training Help

Most children are ready between 18 months and 3 years. Here's a practical approach:

**Signs of readiness:**
- Stays dry for 1-2 hours
- Shows awareness of bodily functions
- Can follow simple instructions
- Shows interest in the potty
- Pulls pants up/down with help

**The 3-day method:**
1. **Commit fully** — No diapers, stay home for 3 days
2. **Watch closely** — Look for cues (squatting, going still)
3. **Celebrate every success** — "You went pee in the potty!"
4. **No punishment for accidents** — Just clean up calmly

**Common challenges:**
- **Accidents**: Normal for 3-6 months after starting
- **Regression**: Often triggered by change (new sibling, moving)
- **Refuses poop**: Very common. Try a footstool for better position

**Nighttime training:**
- Usually happens 6-12 months after daytime success
- Wait until they wake dry most mornings
- Limit fluids before bed

**If struggling past age 4**, discuss with your pediatrician.`,
    sources: ['AAP Toilet Training Guidelines', 'Mayo Clinic'],
  },
  screen: {
    response: `## Screen Time Guidelines

**AAP Recommendations by Age:**

| Age | Recommendation |
|-----|----------------|
| Under 18 months | Avoid screen time (except video calls) |
| 18-24 months | If introducing, choose high-quality programming |
| 2-5 years | Limit to 1 hour per day of quality content |
| 6+ years | Consistent limits on time and types of media |

**Quality over quantity:**
- **Co-view when possible** — Discuss what they're watching
- **Choose interactive** over passive content
- **Avoid fast-paced cartoons** — Young brains can't process them well
- **No screens during meals** or in the hour before bed

**Healthy screen habits:**
- Keep devices out of bedrooms
- Model good screen habits yourself
- Prioritize physical activity and sleep

**Digital media and learning:**
- Not all screen time is equal
- Educational apps can support learning when interactive
- Passive watching isn't learning

**Watch for warning signs:**
- Irritability when devices are taken away
- Declining school performance
- Social withdrawal`,
    sources: ['American Academy of Pediatrics', 'Common Sense Media'],
  },
  development: {
    response: `## Developmental Concerns

Every child develops at their own pace, but here are general milestones to track:

**By 12 months:**
- Pulls to stand, may take first steps
- Says 1-3 words, waves bye-bye
- Points to objects, explores with fingers

**By 24 months:**
- Runs, kicks a ball
- 2-word phrases, uses "me" and "mine"
- Parallel play with other children

**By 36 months:**
- Climbs well, pedals tricycle
- Speaks in sentences, understood by strangers
- Plays cooperatively with other children

**Red flags to discuss with your pediatrician:**
- No words by 15 months
- No two-word phrases by 24 months
- Loss of previously learned skills
- Asymmetry in movement
- Lack of eye contact

**What you can do:**
- **Read together daily** — Language development boost
- **Play on the floor** — Motor skill building
- **Talk constantly** — Narrate your day
- **Trust your instincts** — If something feels off, ask!

Early intervention makes a significant difference when needed.`,
    sources: ['CDC Developmental Milestones', 'AAP Developmental Guidelines'],
  },
}

// Emergency keywords that trigger alerts
const emergencyKeywords = [
  "emergency", "can't breathe", "not breathing", "choking", "unconscious",
  "seizure", "convulsion", "bleeding heavily", "severe allergic",
  "anaphylaxis", "poison", "overdose", "suicide", "kill myself",
]

export default function ConsultantPage() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'new',
      title: 'New Conversation',
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: `Welcome! I'm your 24/7 AI Parenting Consultant. I'm here to help with questions about your child's health, development, and daily care.

I can help with:
- Sleep, feeding, and nutrition
- Behavioral concerns
- Developmental milestones
- Common childhood illnesses
- Safety and prevention

Remember: I'm not a substitute for medical advice. For emergencies, please call 911 immediately.

How can I help you today?`,
          timestamp: new Date(),
          sources: ['Pedi·Ai Guidelines'],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  const [activeConversationId, setActiveConversationId] = useState('new')
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)
  const [emergencyKeyword, setEmergencyKeyword] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Get active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0]
  const messages = activeConversation?.messages || []

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Check for emergency keywords
  const checkForEmergency = useCallback((text: string): string | null => {
    const lowerText = text.toLowerCase()
    for (const keyword of emergencyKeywords) {
      if (lowerText.includes(keyword)) {
        return keyword
      }
    }
    return null
  }, [])

  // Get AI response
  const getAIResponse = useCallback((userMessage: string): { response: string; sources: string[]; isEmergency?: boolean } => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for topic matches
    for (const topic of suggestedTopics) {
      if (lowerMessage.includes(topic.id) || lowerMessage.includes(topic.label.toLowerCase())) {
        return {
          response: aiResponses[topic.id].response,
          sources: aiResponses[topic.id].sources,
        }
      }
    }

    // Sleep related
    if (lowerMessage.includes('sleep') || lowerMessage.includes('night') || lowerMessage.includes('bedtime')) {
      return {
        response: aiResponses.sleep.response,
        sources: aiResponses.sleep.sources,
      }
    }

    // Eating related
    if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('feed')) {
      return {
        response: aiResponses.eating.response,
        sources: aiResponses.eating.sources,
      }
    }

    // Tantrum related
    if (lowerMessage.includes('tantrum') || lowerMessage.includes('meltdown') || lowerMessage.includes('outburst')) {
      return {
        response: aiResponses.tantrum.response,
        sources: aiResponses.tantrum.sources,
      }
    }

    // Potty related
    if (lowerMessage.includes('potty') || lowerMessage.includes('toilet') || lowerMessage.includes('bathroom')) {
      return {
        response: aiResponses.potty.response,
        sources: aiResponses.potty.sources,
      }
    }

    // Screen time related
    if (lowerMessage.includes('screen') || lowerMessage.includes('tablet') || lowerMessage.includes('tv')) {
      return {
        response: aiResponses.screen.response,
        sources: aiResponses.screen.sources,
      }
    }

    // Development related
    if (lowerMessage.includes('development') || lowerMessage.includes('milestone') || lowerMessage.includes('growth')) {
      return {
        response: aiResponses.development.response,
        sources: aiResponses.development.sources,
      }
    }

    // Default helpful response
    return {
      response: `Thank you for your question! I want to make sure I give you the best information.

Based on your question, here are some general tips:

**What you can do right now:**
1. **Observe** — Note any symptoms, behavior patterns, or triggers
2. **Document** — Write down when it happens, how long, what helps
3. **Trust your instincts** — You know your child best

**For personalized medical advice:**
- Contact your pediatrician
- Use the in-app symptom checker
- Schedule a telehealth visit if needed

Is there a specific topic you'd like to explore? I can help with:
- Sleep issues
- Feeding and nutrition
- Behavior and discipline
- Developmental milestones
- Common illnesses
- Safety and prevention`,
      sources: ['Pedi·Ai General Guidelines'],
    }
  }, [])

  // Handle sending message
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isTyping) return

    // Check for emergency
    const emergency = checkForEmergency(trimmedInput)
    if (emergency) {
      setShowEmergencyAlert(true)
      setEmergencyKeyword(emergency)
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    }

    // Update conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
          : conv
      )
    )

    setInputValue('')
    setIsTyping(true)

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponseData = getAIResponse(trimmedInput)

      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponseData.response,
        timestamp: new Date(),
        sources: aiResponseData.sources,
        isEmergency: !!emergency,
      }

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage], updatedAt: new Date() }
            : conv
        )
      )

      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }, [inputValue, isTyping, activeConversationId, checkForEmergency, getAIResponse])

  // Handle quick topic selection
  const handleTopicSelect = useCallback((topic: typeof suggestedTopics[0]) => {
    setInputValue(topic.label)
    inputRef.current?.focus()
  }, [])

  // Clear conversation
  const handleClearConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: `Welcome back! I'm your 24/7 AI Parenting Consultant.

How can I help you today? You can ask me about:
- Sleep, feeding, and nutrition
- Behavioral concerns
- Developmental milestones
- Common childhood illnesses

*For emergencies, please call 911 immediately.*`,
          timestamp: new Date(),
          sources: ['Pedi·Ai Guidelines'],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setConversations((prev) => [newConversation, ...prev.filter((c) => c.id !== activeConversationId)])
    setActiveConversationId(newConversation.id)
    setShowHistory(false)
  }, [activeConversationId])

  // Start new conversation
  const handleNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I'm your 24/7 AI Parenting Consultant.

I can help with questions about:
- Sleep, feeding, and nutrition
- Behavioral concerns
- Developmental milestones
- Common childhood illnesses
- Safety and prevention

*Not a substitute for medical advice. For emergencies, call 911.*

What would you like to know?`,
          timestamp: new Date(),
          sources: ['Pedi·Ai Guidelines'],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setConversations((prev) => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
    setShowHistory(false)
  }, [])

  // Share conversation
  const handleShareConversation = useCallback(() => {
    const messageText = messages
      .map((m) => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`)
      .join('\n\n')

    if (navigator.share) {
      navigator.share({
        title: 'Pedi·Ai Conversation',
        text: messageText,
      })
    } else {
      navigator.clipboard.writeText(messageText)
      alert('Conversation copied to clipboard!')
    }
  }, [messages])

  // Handle key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  // Format date for history
  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Parse markdown-like content
  const parseContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(Boolean)
        return `<div class="grid grid-cols-2 gap-2 my-2">${cells.map((cell, i) => `<div class="${i % 2 === 0 ? 'font-semibold' : ''}">${cell.trim()}</div>`).join('')}</div>`
      })
      .replace(/- \*\*(.*?)\*\*:/g, '<div class="mt-2"><span class="font-semibold text-sage">$1:</span>')
      .replace(/^- /gm, '<li class="ml-4">')
      .replace(/# (.+)/g, '<h3 class="font-display text-lg font-semibold text-forest mt-4 mb-2">$1</h3>')
      .replace(/\n\n/g, '</div><div class="mt-3">')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-mist sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sage to-sage/70 flex items-center justify-center shadow-lg shadow-sage/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-forest">AI Parenting Consultant</h1>
              <div className="flex items-center gap-1.5 text-xs text-sage">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>Online 24/7</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2.5 rounded-xl hover:bg-mist transition-colors"
              title="Conversation History"
            >
              <History className="w-5 h-5 text-forest" />
            </button>
            <button
              onClick={handleClearConversation}
              className="p-2.5 rounded-xl hover:bg-mist transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-5 h-5 text-forest" />
            </button>
            <button
              onClick={handleShareConversation}
              className="p-2.5 rounded-xl hover:bg-mist transition-colors"
              title="Share Conversation"
            >
              <Share2 className="w-5 h-5 text-forest" />
            </button>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      {showEmergencyAlert && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-800">Emergency detected</p>
                <p className="text-sm text-red-600">
                  If you believe this is an emergency, please call 911 immediately.
                </p>
              </div>
            </div>
            <a
              href="tel:911"
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors flex-shrink-0"
            >
              <Phone className="w-4 h-4" />
              Call 911
            </a>
            <button
              onClick={() => setShowEmergencyAlert(false)}
              className="p-1 rounded-full hover:bg-red-100 transition-colors"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex max-w-4xl mx-auto w-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
          >
            {/* Suggested Topics (only show if conversation is short) */}
            {messages.length <= 2 && (
              <div className="mb-8 animate-fade-up">
                <h2 className="font-display text-lg font-semibold text-forest mb-4 text-center">
                  Quick Topics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {suggestedTopics.map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic)}
                      className="p-4 bg-white rounded-2xl border border-mist/50 hover:border-sage/50 hover:shadow-lg transition-all duration-200 text-left group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{topic.icon}</span>
                        <span className="font-medium text-forest group-hover:text-sage transition-colors">
                          {topic.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.role === 'user' ? 'order-2' : 'order-1'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-5 py-4 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-coral to-coral/90 text-white'
                          : 'bg-white border border-mist/50 text-forest'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.content.split('\n').map((line, i) => {
                          // Bold text handling
                          const parts = line.split(/(\*\*[^*]+\*\*)/g)
                          return (
                            <div key={i}>
                              {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={j}>{part.slice(2, -2)}</strong>
                                }
                                // List items
                                if (part.startsWith('- ')) {
                                  return <div key={j} className="ml-2">• {part.slice(2)}</div>
                                }
                                if (part.trim().startsWith('• ')) {
                                  return <div key={j} className="ml-2">{part.trim()}</div>
                                }
                                return <span key={j}>{part}</span>
                              })}
                            </div>
                          )
                        })}
                      </div>

                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-mist">
                          <div className="flex items-center gap-2 text-xs text-forest/60">
                            <CheckCircle2 className="w-3 h-3 text-sage" />
                            <span>Sources: {message.sources.join(', ')}</span>
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div
                        className={`mt-2 text-xs ${
                          message.role === 'user' ? 'text-white/70' : 'text-forest/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-semibold text-coral">P</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-up">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-mist rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-800">
              <Info className="w-3 h-3 flex-shrink-0" />
              <span>
                This AI assistant provides general parenting information only. Always consult your pediatrician for medical advice.
              </span>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-mist px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything about parenting..."
                    className="w-full px-4 py-3 pr-20 bg-mist rounded-2xl resize-none text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-1 text-xs text-forest/40">
                    <span>{inputValue.length}/500</span>
                  </div>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center hover:bg-coral-light disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                >
                  {isTyping ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>

                <button
                  className="w-12 h-12 rounded-full bg-mist text-forest/60 flex items-center justify-center hover:bg-sage/20 transition-all flex-shrink-0"
                  title="Voice input (coming soon)"
                  disabled
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-forest/50">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI-powered responses
                </span>
                <span className="w-px h-3 bg-forest/20"></span>
                <a href="tel:911" className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium">
                  <Phone className="w-3 h-3" />
                  Emergency? Call 911
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <div className="w-72 bg-white border-l border-mist flex flex-col animate-slide-in-right">
            <div className="p-4 border-b border-mist">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-forest">History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded-full hover:bg-mist transition-colors"
                >
                  <X className="w-5 h-5 text-forest" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <button
                onClick={handleNewConversation}
                className="w-full p-3 bg-sage/10 hover:bg-sage/20 rounded-xl text-left mb-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-forest">New Conversation</span>
                </div>
              </button>

              <div className="space-y-1">
                {conversations
                  .filter((c) => c.id !== activeConversationId)
                  .map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setActiveConversationId(conv.id)
                        setShowHistory(false)
                      }}
                      className="w-full p-3 hover:bg-mist rounded-xl text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-forest" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-forest truncate">{conv.title}</p>
                          <p className="text-xs text-forest/50">{formatDate(conv.updatedAt)}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-forest/30" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

// Helper component for ChevronRight
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
