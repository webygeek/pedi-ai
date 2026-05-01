'use client'

import React, { useState, useMemo } from 'react'

// ============================================================================
// TYPES
// ============================================================================

type MilestoneStatus = 'achieved' | 'in_progress' | 'not_yet'

interface Milestone {
  id: string
  name: string
  description: string
  domain: 'gross_motor' | 'fine_motor' | 'language' | 'social'
  ageGroup: string
  whatItMeans: string
  whyItMatters: string
  activitiesToEncourage: string[]
  warningSigns: string[]
  resources: { title: string; url: string }[]
  status: MilestoneStatus
  dateAchieved?: string
}

interface DomainStats {
  name: string
  icon: string
  color: string
  bgColor: string
  achieved: number
  total: number
  status: 'on_track' | 'monitor'
}

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  Check: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Circle: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  HalfCircle: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2 A10 10 0 0 1 12 22" fill="currentColor" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronUp: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  AlertTriangle: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Calendar: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Star: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Play: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  ),
  Heart: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Baby: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  Brain: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Hand: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  MessageCircle: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Activity: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L9.27 9.27 3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  TrendingUp: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
}

// ============================================================================
// DEMO DATA - CDC Developmental Milestones (Child: Arjun, 14 months)
// ============================================================================

const ageGroups = [
  '0-3 months',
  '3-6 months',
  '6-9 months',
  '9-12 months',
  '12-18 months',
  '18-24 months',
  '24-36 months',
]

const initialMilestones: Milestone[] = [
  // Gross Motor
  {
    id: 'gm-1',
    name: 'Lifts head',
    description: 'When placed on tummy, baby lifts head briefly',
    domain: 'gross_motor',
    ageGroup: '0-3 months',
    whatItMeans: 'Your baby is developing neck strength and control, which is foundational for all future movement.',
    whyItMatters: 'Head control is essential for sitting, crawling, and walking. It also allows baby to interact with the world.',
    activitiesToEncourage: ['Tummy time for short periods throughout the day', 'Talk to baby from different positions', 'Gentle head supports during cuddling'],
    warningSigns: ['No head lift by 3 months', 'Head always tilted to one side', 'Excessive stiffness or floppiness'],
    resources: [{ title: 'AAP Tummy Time Tips', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-02-15',
  },
  {
    id: 'gm-2',
    name: 'Rolls over',
    description: 'Rolls from tummy to back and back to tummy',
    domain: 'gross_motor',
    ageGroup: '3-6 months',
    whatItMeans: 'Baby is developing core strength and coordination between arms and legs.',
    whyItMatters: 'Rolling is a precursor to sitting and crawling. It shows your baby is learning body awareness.',
    activitiesToEncourage: ['Playtime on the floor with colorful toys', 'Gentle assisted rolling exercises', 'Celebrate each roll with enthusiasm'],
    warningSigns: ['No rolling by 6 months', 'Only rolls one direction', 'Loss of ability to roll'],
    resources: [{ title: 'CDC Motor Milestones', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-05-20',
  },
  {
    id: 'gm-3',
    name: 'Sits without support',
    description: 'Can sit independently without using hands for support',
    domain: 'gross_motor',
    ageGroup: '6-9 months',
    whatItMeans: 'Your baby has developed strong core muscles and balance.',
    whyItMatters: 'Independent sitting frees up hands for play and opens new social interaction possibilities.',
    activitiesToEncourage: ['Practice sitting with cushions for safety', 'Reach-and-grasp games while seated', 'Provide toys at different heights'],
    warningSigns: ['Cannot sit with support by 8 months', 'Falls over frequently when sitting', 'W坐着时头部持续晃动'],
    resources: [{ title: 'Zero to Three', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-08-10',
  },
  {
    id: 'gm-4',
    name: 'Crawls',
    description: 'Moves forward on hands and knees',
    domain: 'gross_motor',
    ageGroup: '6-9 months',
    whatItMeans: 'Your baby is developing coordination and building strength for walking.',
    whyItMatters: 'Crawling integrates left and right brain functions and builds overall body coordination.',
    activitiesToEncourage: ['Create a safe space for exploration', 'Place favorite toys just out of reach', 'Get down on the floor and crawl together'],
    warningSigns: ['No crawling attempt by 10 months', 'Only scoots or army crawls', 'Asymmetric movement patterns'],
    resources: [{ title: 'Why Crawling Matters', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-09-01',
  },
  {
    id: 'gm-5',
    name: 'Pulls to stand',
    description: 'Pulls up to standing using furniture or hands',
    domain: 'gross_motor',
    ageGroup: '9-12 months',
    whatItMeans: 'Your baby is developing leg strength and balance for walking.',
    whyItMatters: 'Pulling to stand is a major milestone that leads directly to independent walking.',
    activitiesToEncourage: ['Sturdy furniture at appropriate height', 'Cheer every attempt to stand', 'Stay nearby for safety'],
    warningSigns: ['No pulling to stand by 12 months', 'Cannot bear weight on legs', 'Extreme stiffness'],
    resources: [{ title: 'Supporting First Steps', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-10-15',
  },
  {
    id: 'gm-6',
    name: 'Walks independently',
    description: 'Takes several steps without holding on',
    domain: 'gross_motor',
    ageGroup: '12-18 months',
    whatItMeans: 'Your baby is mastering the most complex skill in early development - independent walking.',
    whyItMatters: 'Walking opens up a whole new world of exploration and independence.',
    activitiesToEncourage: ['Encourage walking between trusted adults', 'Push toys for balance', 'Celebrate every step'],
    warningSigns: ['Not walking at all by 15 months', 'Only walks on tiptoes', 'Falls repeatedly without attempting to catch self'],
    resources: [{ title: 'First Steps Guide', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-12-01',
  },
  {
    id: 'gm-7',
    name: 'Runs',
    description: 'Moves quickly with increasing coordination',
    domain: 'gross_motor',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler is developing advanced gross motor skills and confidence.',
    whyItMatters: 'Running indicates good balance, coordination, and leg strength development.',
    activitiesToEncourage: ['Safe open spaces for running', 'Chase games', 'Climbing playground equipment'],
    warningSigns: ['Cannot run by 2 years', 'Always falls while running', 'Drags one leg'],
    resources: [{ title: 'Toddler Motor Development', url: '#' }],
    status: 'in_progress',
  },
  {
    id: 'gm-8',
    name: 'Kicks a ball',
    description: 'Kicks a ball forward',
    domain: 'gross_motor',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler is developing ball skills and coordination.',
    whyItMatters: 'Ball skills show advanced motor planning and spatial awareness.',
    activitiesToEncourage: ['Start with large, soft balls', 'Demonstrate kicking', 'Cheer every attempt'],
    warningSigns: ['Cannot kick by 2 years', 'Avoids ball activities', 'Poor balance when attempting to kick'],
    resources: [{ title: 'Ball Play Activities', url: '#' }],
    status: 'not_yet',
  },
  // Fine Motor
  {
    id: 'fm-1',
    name: 'Grasps objects',
    description: 'Holds and shakes objects intentionally',
    domain: 'fine_motor',
    ageGroup: '0-3 months',
    whatItMeans: 'Your baby is developing hand-eye coordination.',
    whyItMatters: 'Grasping is the foundation for more complex fine motor skills.',
    activitiesToEncourage: ['Provide safe objects to hold', 'Hang colorful toys within reach', 'Let baby explore different textures'],
    warningSigns: ['Does not grasp objects by 4 months', 'No reaching toward objects', 'Fists always tightly closed'],
    resources: [{ title: 'Hand Development', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-01-20',
  },
  {
    id: 'fm-2',
    name: 'Transfers objects',
    description: 'Passes object from one hand to another',
    domain: 'fine_motor',
    ageGroup: '6-9 months',
    whatItMeans: 'Your baby is developing bilateral coordination.',
    whyItMatters: 'Hand-to-hand transfer shows advanced hand control and cognitive development.',
    activitiesToEncourage: ['Offer objects of appropriate size', 'Play passing games', 'Celebrate successful transfers'],
    warningSigns: ['No hand-to-hand transfer by 9 months', 'Uses only one hand', 'Difficulty opening fingers'],
    resources: [{ title: 'Fine Motor Activities', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-07-15',
  },
  {
    id: 'fm-3',
    name: 'Pincer grasp',
    description: 'Picks up small objects using thumb and forefinger',
    domain: 'fine_motor',
    ageGroup: '9-12 months',
    whatItMeans: 'Your baby has developed precise hand control.',
    whyItMatters: 'Pincer grasp is essential for self-feeding, drawing, and many daily activities.',
    activitiesToEncourage: ['Offer puffs, cheerios, or small toys', 'Let baby pick up crumbs during meals', 'Play with stacking cups'],
    warningSigns: ['No pincer grasp by 12 months', 'Uses whole hand for everything', 'Cannot release objects voluntarily'],
    resources: [{ title: 'Pincer Grasp Development', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-09-20',
  },
  {
    id: 'fm-4',
    name: 'Stacks blocks',
    description: 'Stacks 2-4 blocks on top of each other',
    domain: 'fine_motor',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing visual-motor integration.',
    whyItMatters: 'Block stacking requires coordination, patience, and problem-solving.',
    activitiesToEncourage: ['Provide large, lightweight blocks', 'Demonstrate stacking', 'Celebrate every successful stack'],
    warningSigns: ['Cannot stack any blocks by 18 months', 'Only knocks down stacks', 'Poor hand control'],
    resources: [{ title: 'Building Activities', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-12-10',
  },
  {
    id: 'fm-5',
    name: 'Scribbles with crayons',
    description: 'Makes marks on paper with crayons',
    domain: 'fine_motor',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing pre-writing skills.',
    whyItMatters: 'Early scribbling builds the foundation for drawing and writing.',
    activitiesToEncourage: ['Provide large crayons or markers', 'Hang big paper at child height', 'Name the colors they use'],
    warningSigns: ['No interest in drawing by 18 months', 'Cannot hold crayon', 'Only uses one hand'],
    resources: [{ title: 'Pre-Writing Skills', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-11-25',
  },
  {
    id: 'fm-6',
    name: 'Turns book pages',
    description: 'Turns pages in a board book one at a time',
    domain: 'fine_motor',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing book-handling skills.',
    whyItMatters: 'Book handling creates positive early literacy experiences.',
    activitiesToEncourage: ['Read together daily', 'Let baby turn pages', 'Celebrate page turns'],
    warningSigns: ['No page-turning by 18 months', 'Rips pages frequently', 'Cannot coordinate both hands'],
    resources: [{ title: 'Early Literacy', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-12-05',
  },
  {
    id: 'fm-7',
    name: 'Uses spoon',
    description: 'Uses a spoon to feed self with some spilling',
    domain: 'fine_motor',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler is developing self-feeding independence.',
    whyItMatters: 'Self-feeding builds confidence and fine motor skills.',
    activitiesToEncourage: ['Provide child-sized utensils', 'Allow mess and exploration', 'Model eating with utensils'],
    warningSigns: ['Cannot use spoon by 2 years', 'Extreme difficulty', 'Refuses all self-feeding attempts'],
    resources: [{ title: 'Self-Feeding Guide', url: '#' }],
    status: 'in_progress',
  },
  {
    id: 'fm-8',
    name: 'Draws circles',
    description: 'Makes circular marks when drawing',
    domain: 'fine_motor',
    ageGroup: '24-36 months',
    whatItMeans: 'Your toddler is developing controlled drawing movements.',
    whyItMatters: 'Circle drawing is a precursor to letter and number formation.',
    activitiesToEncourage: ['Model drawing circles', 'Provide large crayons', 'Practice in various mediums'],
    warningSigns: ['Cannot draw any shapes by 3 years', 'Very poor control', 'Avoids all drawing activities'],
    resources: [{ title: 'Drawing Development', url: '#' }],
    status: 'not_yet',
  },
  // Language
  {
    id: 'lang-1',
    name: 'Coos and gurgles',
    description: 'Makes vowel sounds like "oo" and "ah"',
    domain: 'language',
    ageGroup: '0-3 months',
    whatItMeans: 'Your baby is learning to control vocal cords.',
    whyItMatters: 'Early vocalizations are the foundation of speech.',
    activitiesToEncourage: ['Talk and sing to baby often', 'Respond to coos with excitement', 'Narrate daily activities'],
    warningSigns: ['No sounds by 4 months', 'No response to sounds', 'Very quiet baby'],
    resources: [{ title: 'Language Development', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-01-10',
  },
  {
    id: 'lang-2',
    name: 'Babbles',
    description: 'Makes consonant-vowel sounds like "ba-ba" and "da-da"',
    domain: 'language',
    ageGroup: '3-6 months',
    whatItMeans: 'Your baby is practicing speech sounds.',
    whyItMatters: 'Babbling is how babies learn to control speech muscles.',
    activitiesToEncourage: ['Repeat babbled sounds back', 'Read picture books', 'Sing nursery rhymes'],
    warningSigns: ['No babbling by 6 months', 'No varied sounds', 'Does not respond to name'],
    resources: [{ title: 'Babbling Stages', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-04-15',
  },
  {
    id: 'lang-3',
    name: 'Responds to name',
    description: 'Turns or looks when name is called',
    domain: 'language',
    ageGroup: '6-9 months',
    whatItMeans: 'Your baby understands that sounds have meaning.',
    whyItMatters: 'Name recognition shows social awareness and language comprehension.',
    activitiesToEncourage: ['Use baby name frequently', 'Play call-and-response games', 'Hide and call name'],
    warningSigns: ['Does not respond to name by 9 months', 'No reaction to sounds', 'Avoids eye contact'],
    resources: [{ title: 'Hearing and Response', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-07-01',
  },
  {
    id: 'lang-4',
    name: 'First words',
    description: 'Says 1-3 meaningful words like "mama" or "dada"',
    domain: 'language',
    ageGroup: '9-12 months',
    whatItMeans: 'Your baby is connecting sounds with meaning.',
    whyItMatters: 'First words are the beginning of true communication.',
    activitiesToEncourage: ['Name everything you see', 'Read board books daily', 'Celebrate every attempt'],
    warningSigns: ['No words by 15 months', 'Only babbles', 'Does not understand simple commands'],
    resources: [{ title: 'First Words Guide', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-10-20',
  },
  {
    id: 'lang-5',
    name: 'Uses 5-10 words',
    description: 'Regularly uses several different words',
    domain: 'language',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is rapidly expanding vocabulary.',
    whyItMatters: 'Vocabulary explosion typically happens around this age.',
    activitiesToEncourage: ['Name body parts', 'Describe actions', 'Expand on what baby says'],
    warningSigns: ['Fewer than 3 words by 15 months', 'No word combinations', 'Regression in words'],
    resources: [{ title: 'Vocabulary Building', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-12-15',
  },
  {
    id: 'lang-6',
    name: 'Follows simple commands',
    description: 'Understands and follows simple requests like "give me the ball"',
    domain: 'language',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is understanding language.',
    whyItMatters: 'Comprehension shows cognitive and language development.',
    activitiesToEncourage: ['Give simple, clear commands', 'Use gestures initially', 'Celebrate success'],
    warningSigns: ['Cannot follow any commands by 18 months', 'Does not respond to "no"', 'Regression in understanding'],
    resources: [{ title: 'Language Comprehension', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-12-20',
  },
  {
    id: 'lang-7',
    name: 'Two-word phrases',
    description: 'Combines two words like "more milk" or "daddy go"',
    domain: 'language',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler is developing sentence structure.',
    whyItMatters: 'Two-word combinations show emerging grammar skills.',
    activitiesToEncourage: ['Model two-word combinations', 'Expand on baby sentences', 'Read picture books together'],
    warningSigns: ['No two-word phrases by 24 months', 'Only single words', 'Regression in speech'],
    resources: [{ title: 'Language Explosion', url: '#' }],
    status: 'in_progress',
  },
  {
    id: 'lang-8',
    name: 'Points to body parts',
    description: 'Points to named body parts like eyes, nose, or mouth',
    domain: 'language',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler understands and responds to language.',
    whyItMatters: 'Body part identification shows language comprehension.',
    activitiesToEncourage: ['Play "where is" games', 'Use a mirror', 'Read body part books'],
    warningSigns: ['Cannot point to any body parts by 2 years', 'Does not understand questions', 'Poor eye contact'],
    resources: [{ title: 'Interactive Games', url: '#' }],
    status: 'achieved',
    dateAchieved: '2026-02-10',
  },
  // Social
  {
    id: 'soc-1',
    name: 'Social smile',
    description: 'Smiles in response to faces or voices',
    domain: 'social',
    ageGroup: '0-3 months',
    whatItMeans: 'Your baby is developing social awareness.',
    whyItMatters: 'Social smiling shows your baby is connecting with others.',
    activitiesToEncourage: ['Make eye contact and smile often', 'Talk in a warm, playful voice', 'Respond to smiles with smiles'],
    warningSigns: ['No social smile by 3 months', 'Avoids eye contact', 'Does not respond to people'],
    resources: [{ title: 'Social Development', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-02-01',
  },
  {
    id: 'soc-2',
    name: 'Laughs',
    description: 'Laughs aloud in response to play or interaction',
    domain: 'social',
    ageGroup: '3-6 months',
    whatItMeans: 'Your baby is experiencing joy and sharing it.',
    whyItMatters: 'Laughter shows emotional development and social connection.',
    activitiesToEncourage: ['Play peekaboo', 'Make silly sounds', 'Tickle gently'],
    warningSigns: ['No laughter by 6 months', 'No joy in interaction', 'Does not engage with people'],
    resources: [{ title: 'Emotional Development', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-05-01',
  },
  {
    id: 'soc-3',
    name: 'Stranger anxiety',
    description: 'Shows wariness around unfamiliar people',
    domain: 'social',
    ageGroup: '6-9 months',
    whatItMeans: 'Your baby has formed strong attachments and recognizes familiar people.',
    whyItMatters: 'Stranger anxiety shows healthy emotional bonding.',
    activitiesToEncourage: ['Respect baby\'s boundaries', 'Introduce new people slowly', 'Reassure baby of your presence'],
    warningSigns: ['No stranger anxiety ever develops', 'Constant fear of everyone', 'Does not differentiate familiar/unfamiliar'],
    resources: [{ title: 'Understanding Anxiety', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-07-20',
  },
  {
    id: 'soc-4',
    name: 'Waves bye-bye',
    description: 'Waves hand in response to "bye-bye"',
    domain: 'social',
    ageGroup: '9-12 months',
    whatItMeans: 'Your baby is learning social gestures.',
    whyItMatters: 'Waving shows social awareness and imitation skills.',
    activitiesToEncourage: ['Wave every time someone leaves', 'Celebrate each wave', 'Model waving often'],
    warningSigns: ['No waving by 12 months', 'Does not imitate gestures', 'Poor eye contact'],
    resources: [{ title: 'Social Gestures', url: '#' }],
    status: 'achieved',
    dateAchieved: '2025-09-25',
  },
  {
    id: 'soc-5',
    name: 'Plays alongside others',
    description: 'Plays near other children, watching and sometimes imitating',
    domain: 'social',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing social awareness.',
    whyItMatters: 'Parallel play is the first step toward cooperative play.',
    activitiesToEncourage: ['Arrange playdates', 'Provide similar toys', 'Model sharing behavior'],
    warningSigns: ['Extreme isolation by 18 months', 'No interest in other children', 'Does not engage in any play'],
    resources: [{ title: 'Toddler Social Play', url: '#' }],
    status: 'achieved',
    dateAchieved: '2026-01-10',
  },
  {
    id: 'soc-6',
    name: 'Shows empathy',
    description: 'Reacts when others are upset or hurt',
    domain: 'social',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing emotional intelligence.',
    whyItMatters: 'Empathy is the foundation of social-emotional development.',
    activitiesToEncourage: ['Talk about emotions', 'Model caring behavior', 'Read emotion books'],
    warningSigns: ['No emotional response to others by 18 months', 'Extreme aggression', 'Does not show any emotions'],
    resources: [{ title: 'Emotional Intelligence', url: '#' }],
    status: 'achieved',
    dateAchieved: '2026-01-15',
  },
  {
    id: 'soc-7',
    name: 'Feeds self',
    description: 'Uses fingers to feed self, may start using spoon',
    domain: 'social',
    ageGroup: '12-18 months',
    whatItMeans: 'Your toddler is developing independence.',
    whyItMatters: 'Self-feeding builds confidence and motor skills.',
    activitiesToEncourage: ['Allow messy meals', 'Provide finger foods', 'Celebrate self-feeding attempts'],
    warningSigns: ['Cannot feed self at all by 18 months', 'Extreme difficulty', 'Refuses all food'],
    resources: [{ title: 'Self-Feeding Guide', url: '#' }],
    status: 'achieved',
    dateAchieved: '2026-01-20',
  },
  {
    id: 'soc-8',
    name: 'Engages in pretend play',
    description: 'Pretends to do activities like drinking from cup or talking on phone',
    domain: 'social',
    ageGroup: '18-24 months',
    whatItMeans: 'Your toddler is developing imagination and symbolic thinking.',
    whyItMatters: 'Pretend play shows cognitive and social-emotional growth.',
    activitiesToEncourage: ['Provide play props', 'Join in pretend play', 'Read pretend play books'],
    warningSigns: ['No pretend play by 2 years', 'Does not imitate activities', 'Very limited play'],
    resources: [{ title: 'Imaginative Play', url: '#' }],
    status: 'in_progress',
  },
]

// ============================================================================
// COMPONENTS
// ============================================================================

// Progress Ring Component
function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  color = '#7bada6'
}: {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8efee"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl font-semibold text-forest">{progress}%</span>
      </div>
    </div>
  )
}

// Domain Card Component
function DomainCard({
  domain,
  achieved,
  total,
  status,
  onClick,
}: {
  domain: DomainStats
  achieved: number
  total: number
  status: 'on_track' | 'monitor'
  onClick: () => void
}) {
  const progress = Math.round((achieved / total) * 100)

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-mist/50 hover:shadow-lg hover:border-sage/30 transition-all duration-300 text-left w-full group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl ${domain.bgColor} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
          {domain.icon}
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'on_track'
            ? 'bg-sage/20 text-forest'
            : 'bg-amber-100 text-amber-800'
        }`}>
          {status === 'on_track' ? (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          ) : (
            <Icons.AlertTriangle className="w-3 h-3" />
          )}
          {status === 'on_track' ? 'On Track' : 'Monitor'}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-forest mb-1">{domain.name}</h3>
      <p className="text-sm text-forest/60 mb-3">{achieved} of {total} milestones</p>
      <div className="h-2 bg-mist rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            progress >= 75 ? 'bg-sage' : progress >= 50 ? 'bg-amber-400' : 'bg-coral'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  )
}

// Milestone Item Component
function MilestoneItem({
  milestone,
  onStatusChange,
  onDetailsClick,
}: {
  milestone: Milestone
  onStatusChange: (id: string, status: MilestoneStatus) => void
  onDetailsClick: (milestone: Milestone) => void
}) {
  const statusColors = {
    achieved: 'bg-sage text-white',
    in_progress: 'bg-amber-400 text-amber-900',
    not_yet: 'bg-mist text-forest/40',
  }

  const StatusIcon = milestone.status === 'achieved'
    ? Icons.Check
    : milestone.status === 'in_progress'
    ? Icons.HalfCircle
    : Icons.Circle

  return (
    <div className="bg-white rounded-xl p-4 border border-mist/50 hover:border-sage/30 transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Status indicator */}
        <button
          onClick={() => {
            const nextStatus = milestone.status === 'not_yet'
              ? 'in_progress'
              : milestone.status === 'in_progress'
              ? 'achieved'
              : 'not_yet'
            onStatusChange(milestone.id, nextStatus)
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${statusColors[milestone.status]} hover:scale-110`}
        >
          <StatusIcon className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-semibold ${milestone.status === 'achieved' ? 'text-forest' : 'text-forest/80'}`}>
              {milestone.name}
            </h4>
            {milestone.dateAchieved && (
              <span className="text-xs text-sage flex items-center gap-1 flex-shrink-0">
                <Icons.Calendar className="w-3 h-3" />
                {new Date(milestone.dateAchieved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <p className="text-sm text-forest/60 mb-3">{milestone.description}</p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStatusChange(milestone.id, milestone.status === 'achieved' ? 'not_yet' : 'achieved')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                milestone.status === 'achieved'
                  ? 'bg-sage/20 text-forest hover:bg-sage/30'
                  : 'bg-coral/10 text-coral hover:bg-coral/20'
              }`}
            >
              {milestone.status === 'achieved' ? 'Mark Not Yet' : 'Mark Achieved'}
            </button>
            <button
              onClick={() => onDetailsClick(milestone)}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-mist text-forest/70 hover:bg-mist/80 transition-all"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Milestone Detail Modal
function MilestoneDetailModal({
  milestone,
  onClose,
}: {
  milestone: Milestone
  onClose: () => void
}) {
  const domainColors: Record<string, { bg: string; text: string }> = {
    gross_motor: { bg: 'bg-coral/10', text: 'text-coral' },
    fine_motor: { bg: 'bg-sage/10', text: 'text-sage' },
    language: { bg: 'bg-amber-100', text: 'text-amber-700' },
    social: { bg: 'bg-purple-100', text: 'text-purple-700' },
  }

  const color = domainColors[milestone.domain]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-up">
        {/* Header */}
        <div className={`${color.bg} p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block ${color.text} text-sm font-medium mb-2`}>
                {milestone.domain.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} | {milestone.ageGroup}
              </span>
              <h2 className="font-display text-2xl font-semibold text-forest mb-2">{milestone.name}</h2>
              <p className="text-forest/70">{milestone.description}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-forest/60 hover:text-forest hover:bg-white transition-all"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* What it means */}
          <div>
            <h3 className="font-display text-lg font-semibold text-forest mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sage/20 flex items-center justify-center">
                <Icons.Info className="w-4 h-4 text-sage" />
              </span>
              What It Means
            </h3>
            <p className="text-forest/80 pl-10">{milestone.whatItMeans}</p>
          </div>

          {/* Why it matters */}
          <div>
            <h3 className="font-display text-lg font-semibold text-forest mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                <Icons.Heart className="w-4 h-4 text-coral" />
              </span>
              Why It Matters
            </h3>
            <p className="text-forest/80 pl-10">{milestone.whyItMatters}</p>
          </div>

          {/* Activities to encourage */}
          <div>
            <h3 className="font-display text-lg font-semibold text-forest mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Icons.Star className="w-4 h-4 text-amber-600" />
              </span>
              Activities to Encourage
            </h3>
            <ul className="pl-10 space-y-2">
              {milestone.activitiesToEncourage.map((activity, index) => (
                <li key={index} className="flex items-start gap-2 text-forest/80">
                  <svg className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {/* Warning signs */}
          <div>
            <h3 className="font-display text-lg font-semibold text-forest mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <Icons.AlertTriangle className="w-4 h-4 text-red-600" />
              </span>
              Warning Signs to Watch For
            </h3>
            <ul className="pl-10 space-y-2">
              {milestone.warningSigns.map((sign, index) => (
                <li key={index} className="flex items-start gap-2 text-forest/80">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-lg font-semibold text-forest mb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center">
                <Icons.Play className="w-4 h-4 text-forest" />
              </span>
              Videos & Resources
            </h3>
            <ul className="pl-10 space-y-2">
              {milestone.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="inline-flex items-center gap-2 text-sage hover:text-forest underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icons.Play className="w-4 h-4" />
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-mist bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 bg-forest text-white rounded-xl font-semibold hover:bg-forest-light transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Progress Timeline Component
function ProgressTimeline({
  milestones,
}: {
  milestones: Milestone[]
}) {
  const achievedMilestones = milestones
    .filter(m => m.status === 'achieved' && m.dateAchieved)
    .sort((a, b) => new Date(a.dateAchieved!).getTime() - new Date(b.dateAchieved!).getTime())

  return (
    <div className="bg-white rounded-2xl p-6 border border-mist/50">
      <h3 className="font-display text-xl font-semibold text-forest mb-6 flex items-center gap-3">
        <Icons.TrendingUp className="w-6 h-6 text-sage" />
        Progress Timeline
      </h3>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-mist" />

        {/* Timeline items */}
        <div className="space-y-4">
          {achievedMilestones.slice(-6).map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start gap-4 pl-10">
              {/* Dot */}
              <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-white ${
                milestone.domain === 'gross_motor' ? 'bg-coral' :
                milestone.domain === 'fine_motor' ? 'bg-sage' :
                milestone.domain === 'language' ? 'bg-amber-400' :
                'bg-purple-400'
              }`} />

              {/* Content */}
              <div className="flex-1 bg-mist/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-forest text-sm">{milestone.name}</h4>
                  <span className="text-xs text-forest/50">
                    {new Date(milestone.dateAchieved!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-forest/60">
                  {milestone.domain.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            </div>
          ))}
        </div>

        {achievedMilestones.length === 0 && (
          <div className="text-center py-8 text-forest/50">
            <Icons.Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No milestones achieved yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

// AI Insights Component
function AIInsights({ milestones }: { milestones: Milestone[] }) {
  const achieved = milestones.filter(m => m.status === 'achieved').length
  const inProgress = milestones.filter(m => m.status === 'in_progress').length
  const notYet = milestones.filter(m => m.status === 'not_yet').length
  const total = milestones.length
  const progressPercent = Math.round((achieved / total) * 100)

  // Count delayed milestones (not achieved by current age group)
  const delayedCount = milestones.filter(m => m.status === 'not_yet').length

  return (
    <div className="bg-gradient-to-br from-sage/20 to-sage/5 rounded-2xl p-6 border border-sage/20">
      <h3 className="font-display text-lg font-semibold text-forest mb-4 flex items-center gap-2">
        <Icons.Sparkles className="w-5 h-5 text-sage" />
        AI Development Insights
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
            <Icons.TrendingUp className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-sm font-medium text-forest">
              {progressPercent >= 70 ? 'Excellent progress!' : progressPercent >= 50 ? 'Good progress!' : 'Making steady progress'}
            </p>
            <p className="text-xs text-forest/60">
              {achieved} of {total} milestones achieved
            </p>
          </div>
        </div>

        {inProgress > 0 && (
          <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Icons.Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-forest">
                {inProgress} milestone{inProgress > 1 ? 's' : ''} in progress
              </p>
              <p className="text-xs text-forest/60">
                Keep encouraging these skills!
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Icons.Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-forest">
              Balanced development across domains
            </p>
            <p className="text-xs text-forest/60">
              Arjun is showing steady growth
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function MilestonesPage() {
  // State
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('12-18 months')
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [expandedDomains, setExpandedDomains] = useState<string[]>(['gross_motor', 'fine_motor', 'language', 'social'])

  // Derived data
  const domains: DomainStats[] = [
    { name: 'Gross Motor', icon: '🏃', color: 'coral', bgColor: 'bg-coral/10', achieved: 0, total: 0, status: 'on_track' },
    { name: 'Fine Motor', icon: '🤲', color: 'sage', bgColor: 'bg-sage/10', achieved: 0, total: 0, status: 'on_track' },
    { name: 'Language', icon: '💬', color: 'amber', bgColor: 'bg-amber-100', achieved: 0, total: 0, status: 'on_track' },
    { name: 'Social', icon: '👥', color: 'purple', bgColor: 'bg-purple-100', achieved: 0, total: 0, status: 'on_track' },
  ]

  const domainStats = useMemo(() => {
    const stats = domains.map(d => ({ ...d }))

    milestones.forEach(milestone => {
      const domainIndex = stats.findIndex(d => d.name.toLowerCase().replace(' ', '_').includes(milestone.domain) || d.name.toLowerCase().includes(milestone.domain.replace('_', ' ')))
      if (domainIndex !== -1) {
        stats[domainIndex].total++
        if (milestone.status === 'achieved') {
          stats[domainIndex].achieved++
        }
      }
    })

    // Calculate status based on progress
    stats.forEach(s => {
      const progress = s.total > 0 ? s.achieved / s.total : 0
      // Monitor if progress is below 50% for current age group
      s.status = progress >= 0.5 ? 'on_track' : 'monitor'
    })

    return stats
  }, [milestones])

  const filteredMilestones = useMemo(() => {
    let filtered = milestones

    // Filter by age group
    if (selectedAgeGroup) {
      filtered = filtered.filter(m => m.ageGroup === selectedAgeGroup)
    }

    // Filter by domain
    if (selectedDomain) {
      filtered = filtered.filter(m => m.domain === selectedDomain)
    }

    return filtered
  }, [milestones, selectedAgeGroup, selectedDomain])

  const overallProgress = useMemo(() => {
    const achieved = milestones.filter(m => m.status === 'achieved').length
    return Math.round((achieved / milestones.length) * 100)
  }, [milestones])

  // Count delayed milestones for alerts
  const delayedMilestones = milestones.filter(m =>
    m.status === 'not_yet' &&
    ['0-3 months', '3-6 months', '6-9 months', '9-12 months'].includes(m.ageGroup)
  )

  // Handle status change
  const handleStatusChange = (id: string, status: MilestoneStatus) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status,
          dateAchieved: status === 'achieved' ? new Date().toISOString().split('T')[0] : undefined
        }
      }
      return m
    }))
  }

  // Toggle domain expansion
  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    )
  }

  // Group milestones by domain
  const milestonesByDomain = useMemo(() => {
    const grouped: Record<string, Milestone[]> = {}
    filteredMilestones.forEach(m => {
      if (!grouped[m.domain]) {
        grouped[m.domain] = []
      }
      grouped[m.domain].push(m)
    })
    return grouped
  }, [filteredMilestones])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest">
              Developmental Milestones
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span className="font-medium text-forest text-sm">Arjun</span>
              </div>
              <span className="text-forest/40">|</span>
              <span className="text-forest/70 text-sm">14 months old</span>
            </div>
          </div>
        </div>

        {/* Age Group Filter */}
        <div className="flex flex-wrap gap-2">
          {ageGroups.map(age => (
            <button
              key={age}
              onClick={() => setSelectedAgeGroup(age)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedAgeGroup === age
                  ? 'bg-forest text-white shadow-lg'
                  : 'bg-white text-forest/70 hover:bg-mist border border-mist/50'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      {delayedMilestones.length > 2 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Icons.AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800 mb-1">
              Discuss with your pediatrician
            </h3>
            <p className="text-sm text-amber-700">
              {delayedMilestones.length} milestones from earlier age groups are not yet achieved.
              Consider discussing these with your pediatrician at your next visit.
            </p>
          </div>
          <button className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
            Schedule Visit
          </button>
        </div>
      )}

      {/* Early Intervention Alert (if needed) */}
      {delayedMilestones.length > 5 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <Icons.Activity className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">
              Early intervention referral suggested
            </h3>
            <p className="text-sm text-red-700">
              A significant number of milestones across multiple domains are delayed.
              Early intervention services can make a meaningful difference when started early.
            </p>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
            Learn More
          </button>
        </div>
      )}

      {/* Overview Dashboard */}
      <div className="bg-white rounded-3xl p-8 border border-mist/50">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Progress Ring */}
          <div className="flex flex-col items-center">
            <ProgressRing progress={overallProgress} size={160} strokeWidth={14} />
            <p className="mt-4 text-forest/70 text-center">
              Overall developmental<br />progress
            </p>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-mist/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-display font-semibold text-sage mb-1">
                {milestones.filter(m => m.status === 'achieved').length}
              </div>
              <p className="text-sm text-forest/60">Achieved</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-display font-semibold text-amber-500 mb-1">
                {milestones.filter(m => m.status === 'in_progress').length}
              </div>
              <p className="text-sm text-forest/60">In Progress</p>
            </div>
            <div className="bg-mist/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-display font-semibold text-forest/40 mb-1">
                {milestones.filter(m => m.status === 'not_yet').length}
              </div>
              <p className="text-sm text-forest/60">Not Yet</p>
            </div>
            <div className="bg-mist/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-display font-semibold text-forest mb-1">
                4
              </div>
              <p className="text-sm text-forest/60">Domains</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {domainStats.map((domain, index) => (
          <DomainCard
            key={index}
            domain={domain}
            achieved={domain.achieved}
            total={domain.total}
            status={domain.status}
            onClick={() => setSelectedDomain(selectedDomain === domain.name.toLowerCase().replace(' ', '_') ? null : domain.name.toLowerCase().replace(' ', '_'))}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Milestone Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-forest">
              Milestone Checklist
              {selectedAgeGroup && <span className="text-forest/50 font-normal ml-2">({selectedAgeGroup})</span>}
            </h2>
            {selectedDomain && (
              <button
                onClick={() => setSelectedDomain(null)}
                className="text-sm text-coral hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Milestones by Domain */}
          {Object.entries(milestonesByDomain).map(([domain, domainMilestones]) => (
            <div key={domain} className="space-y-3">
              {/* Domain Header */}
              <button
                onClick={() => toggleDomain(domain)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-mist/50 hover:border-sage/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {domain === 'gross_motor' ? '🏃' : domain === 'fine_motor' ? '🤲' : domain === 'language' ? '💬' : '👥'}
                  </span>
                  <span className="font-semibold text-forest capitalize">
                    {domain.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-forest/50">
                    ({domainMilestones.filter(m => m.status === 'achieved').length}/{domainMilestones.length})
                  </span>
                </div>
                {expandedDomains.includes(domain) ? (
                  <Icons.ChevronUp className="w-5 h-5 text-forest/40" />
                ) : (
                  <Icons.ChevronDown className="w-5 h-5 text-forest/40" />
                )}
              </button>

              {/* Domain Milestones */}
              {expandedDomains.includes(domain) && (
                <div className="space-y-2 pl-2">
                  {domainMilestones.map(milestone => (
                    <MilestoneItem
                      key={milestone.id}
                      milestone={milestone}
                      onStatusChange={handleStatusChange}
                      onDetailsClick={setSelectedMilestone}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {Object.keys(milestonesByDomain).length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-mist/50">
              <Icons.Activity className="w-12 h-12 mx-auto mb-3 text-forest/30" />
              <p className="text-forest/60">No milestones for this age group</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <AIInsights milestones={milestones} />

          {/* Progress Timeline */}
          <ProgressTimeline milestones={milestones} />

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-mist/50">
            <h3 className="font-display text-lg font-semibold text-forest mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-mist/50 hover:bg-mist transition-colors text-left">
                <Icons.Calendar className="w-5 h-5 text-sage" />
                <span className="text-sm font-medium text-forest">Schedule pediatrician visit</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-mist/50 hover:bg-mist transition-colors text-left">
                <Icons.Star className="w-5 h-5 text-sage" />
                <span className="text-sm font-medium text-forest">Download milestone report</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-mist/50 hover:bg-mist transition-colors text-left">
                <Icons.MessageCircle className="w-5 h-5 text-sage" />
                <span className="text-sm font-medium text-forest">Ask AI consultant</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <MilestoneDetailModal
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}

      {/* Celebratory Animation Overlay */}
      {milestones.filter(m => m.status === 'achieved').length > 0 && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-40">
          <div className="relative">
            {/* Celebration particles would go here in production */}
            <button className="w-14 h-14 rounded-full bg-sage text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center">
              <Icons.Sparkles className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
