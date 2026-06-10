'use client';

import React, { useState } from 'react';

type Category = 'Growth' | 'Vaccination' | 'Development' | 'Nutrition' | 'Illness';

interface QuestionTemplate {
  question: string;
  answer: string;
}

interface CategoryData {
  icon: React.ReactNode;
  color: string;
  questions: QuestionTemplate[];
}

const categoryConfig: Record<Category, CategoryData> = {
  Growth: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    color: 'sage',
    questions: [
      {
        question: 'What is the normal growth rate for my child?',
        answer: 'Children typically grow about 2.5 inches (6 cm) per year between ages 1 and 3. Growth rate slows to about 2 inches (5 cm) per year until puberty. Weight gain is also steady, with children typically gaining about 4-5 pounds (2 kg) per year during this period.',
      },
      {
        question: 'How do I know if my child is growing properly?',
        answer: 'Regular growth chart tracking is the best way to monitor growth. Your pediatrician will plot your child\'s height and weight on growth charts that account for age and gender. As long as your child follows their growth curve consistently, they are likely growing properly.',
      },
      {
        question: 'When should I be concerned about my child\'s growth?',
        answer: 'Consult your pediatrician if: your child suddenly stops growing for several months, growth rate drops significantly below the curve, weight gain is much faster than height gain, or your child is much smaller than peers of the same age.',
      },
      {
        question: 'What affects a child\'s growth?',
        answer: 'Growth is influenced by genetics, nutrition, sleep quality, physical activity, overall health, and hormonal factors. Ensuring adequate protein, vitamins, and minerals in the diet supports healthy growth.',
      },
    ],
  },
  Vaccination: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    color: 'forest',
    questions: [
      {
        question: 'What vaccines does my child need and when?',
        answer: 'The recommended schedule includes: Hepatitis B (birth), DTaP (2, 4, 6 months), Hib (2, 4, 6, 12-15 months), IPV (2, 4, 6-18 months), PCV13 (2, 4, 6, 12-15 months), Rotavirus (2, 4, 6 months), MMR (12-15 months), Varicella (12-15 months), and others. Your pediatrician will provide the full schedule.',
      },
      {
        question: 'Are vaccines safe for children?',
        answer: 'Yes, vaccines are extensively tested for safety and effectiveness before approval. The benefits far outweigh the risks. Mild side effects like soreness or low fever are common and temporary. Serious adverse reactions are extremely rare.',
      },
      {
        question: 'What should I do if my child misses a vaccine?',
        answer: 'If your child misses a vaccine, contact your pediatrician to schedule a catch-up vaccination. The immunization schedule is flexible, and vaccines can be given at later ages with good protection. Don\'t restart the series.',
      },
      {
        question: 'Can vaccines cause autism?',
        answer: 'No scientific evidence links vaccines to autism. Multiple large studies have thoroughly examined this claim and found no connection. The original study that suggested a link was thoroughly discredited and retracted.',
      },
    ],
  },
  Development: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    color: 'coral',
    questions: [
      {
        question: 'What are typical developmental milestones?',
        answer: 'Key milestones include: 2 months (smiles, lifts head), 4 months (rolls over, babbles), 6 months (sits with support, recognizes faces), 9 months (crawls, says "mama/dada"), 12 months (walks, uses simple words), 18 months (runs, points to objects), and 2 years (two-word phrases, climbs stairs).',
      },
      {
        question: 'My child isn\'t meeting milestones. What should I do?',
        answer: 'Every child develops at their own pace. If you have concerns, discuss them with your pediatrician. Early intervention is helpful if there are delays. Your pediatrician can assess whether your child needs additional support or evaluation.',
      },
      {
        question: 'How can I support my child\'s development?',
        answer: 'Support development through: interactive play, reading together, encouraging exploration, limiting screen time, ensuring adequate sleep, providing nutritious meals, and responding warmly to your child\'s attempts at communication.',
      },
      {
        question: 'Is my child\'s speech development on track?',
        answer: 'Speech development varies, but general guidelines: 2-3 months (cooing), 6 months (babbling), 12 months (first words), 18 months (10-25 words), 2 years (50+ words, 2-word phrases). By age 3, most children can be understood about 75% of the time.',
      },
    ],
  },
  Nutrition: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10 44 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M1117v.01" />
        <path d="M7 14v.01" />
      </svg>
    ),
    color: 'amber',
    questions: [
      {
        question: 'What should my child eat for a balanced diet?',
        answer: 'A balanced diet includes: fruits and vegetables (5 servings/day), whole grains, protein (meat, fish, eggs, beans), dairy (milk, cheese, yogurt), and healthy fats. Limit added sugars, salt, and processed foods.',
      },
      {
        question: 'How much should my child eat?',
        answer: 'Portion sizes vary by age and activity level. General guidelines: 1-3 years need about 1,000-1,400 calories/day, 4-8 years need about 1,200-2,000 calories/day. Let your child\'s appetite guide you and avoid forcing food.',
      },
      {
        question: 'My child is a picky eater. What can I do?',
        answer: 'Picky eating is normal. Try: offering new foods alongside favorites, making food visually appealing, involving your child in meal prep, not forcing eating, offering foods multiple times (it can take 10+ exposures), and staying calm about food refusals.',
      },
      {
        question: 'Are supplements necessary for children?',
        answer: 'Most children with a varied diet don\'t need supplements. Vitamin D is often recommended, especially in areas with limited sunlight. Iron may be needed for some infants. Consult your pediatrician before starting any supplements.',
      },
    ],
  },
  Illness: {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: 'red',
    questions: [
      {
        question: 'When should I take my child to the doctor for a fever?',
        answer: 'Seek medical attention for: fever over 104°F (40°C), fever lasting more than 3 days, infant under 3 months with fever over 100.4°F (38°C), difficulty breathing, severe headache, stiff neck, rash, or if your child appears very ill.',
      },
      {
        question: 'How can I treat my child\'s fever at home?',
        answer: 'For fever under 104°F: ensure adequate hydration, dress in light clothing, keep the room comfortable, and consider age-appropriate acetaminophen or ibuprofen. Never give aspirin to children. Rest and comfort are important.',
      },
      {
        question: 'What are signs of dehydration in children?',
        answer: 'Signs include: dry mouth and lips, decreased urination (fewer wet diapers), no tears when crying, sunken eyes, lethargy, and dark urine. Severe dehydration requires immediate medical attention.',
      },
      {
        question: 'How do I know if my child has a cold or something more serious?',
        answer: 'Colds typically include runny nose, mild cough, sneezing, and low fever. Seek care for: high fever (104°F+), difficulty breathing, persistent vomiting, severe headache, stiff neck, rash, or symptoms lasting more than 10 days.',
      },
    ],
  },
};

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  sage: { bg: 'bg-sage/10', text: 'text-sage', border: 'border-sage/20', hover: 'hover:bg-sage/15' },
  forest: { bg: 'bg-forest/10', text: 'text-forest', border: 'border-forest/20', hover: 'hover:bg-forest/15' },
  coral: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/20', hover: 'hover:bg-coral/15' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hover: 'hover:bg-amber-100' },
  red: { bg: 'bg-danger-bg', text: 'text-danger', border: 'border-danger/30', hover: 'hover:bg-danger-bg/70' },
};

interface QAModeProps {
  onAskQuestion?: (question: string) => void;
}

export default function QAMode({ onAskQuestion }: QAModeProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionTemplate | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  const handleQuestionSelect = (question: QuestionTemplate) => {
    setSelectedQuestion(question);
    setShowAnswer(true);
  };

  const handleCustomQuestionSubmit = () => {
    if (customQuestion.trim() && onAskQuestion) {
      onAskQuestion(customQuestion.trim());
      setCustomQuestion('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-mist/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-mist/50 bg-cream/50">
        <h3 className="font-semibold text-forest">Structured Q&A</h3>
        <p className="text-xs text-forest/60">Browse common pediatric topics</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!selectedCategory ? (
          /* Category Selection */
          <div className="space-y-4">
            <p className="text-sm text-forest/60 mb-4">Select a category to explore common questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(categoryConfig) as Category[]).map((category) => {
                const config = categoryConfig[category];
                const colors = colorClasses[config.color];
                return (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`flex flex-col items-center p-4 rounded-xl border ${colors.border} ${colors.bg} ${colors.hover} transition-all hover:shadow-md`}
                  >
                    <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} mb-3`}>
                      {config.icon}
                    </div>
                    <span className="font-medium text-forest">{category}</span>
                    <span className="text-xs text-forest/50 mt-1">{config.questions.length} questions</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : !showAnswer ? (
          /* Question Selection for Category */
          <div className="space-y-4">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedQuestion(null);
              }}
              className="flex items-center gap-2 text-sm text-sage hover:text-forest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back to categories
            </button>

            <h4 className="font-semibold text-forest text-lg">{selectedCategory}</h4>

            <div className="space-y-2">
              {categoryConfig[selectedCategory].questions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionSelect(q)}
                  className="w-full text-left p-4 rounded-xl border border-mist/50 bg-cream/30 hover:bg-cream hover:border-sage/30 transition-all"
                >
                  <p className="font-medium text-forest">{q.question}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Answer Display */
          <div className="space-y-4">
            <button
              onClick={() => setShowAnswer(false)}
              className="flex items-center gap-2 text-sm text-sage hover:text-forest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back to questions
            </button>

            <div className="bg-sage/5 rounded-xl p-4 border border-sage/20">
              <p className="font-medium text-forest mb-2">Q: {selectedQuestion?.question}</p>
              <div className="mt-4 pt-4 border-t border-sage/20">
                <p className="text-sm text-forest/80 leading-relaxed">{selectedQuestion?.answer}</p>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-xs text-forest/50 mb-3">Have a different question?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomQuestionSubmit()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2.5 bg-cream/50 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage text-sm text-forest placeholder:text-forest/40"
                />
                <button
                  onClick={handleCustomQuestionSubmit}
                  disabled={!customQuestion.trim()}
                  className={`px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    customQuestion.trim()
                      ? 'bg-forest text-white hover:bg-forest/90'
                      : 'bg-mist/30 text-forest/30 cursor-not-allowed'
                  }`}
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
