# Feature Details

Comprehensive documentation of all Pedi-Ai features with technical specifications, user flows, and requirements.

---

## 🔴 Tier 1: Safety & Emergency Features

These are survival-critical features that must work flawlessly.

---

### FR.1: Med-PaLM Triage Wizard

**Priority:** P0 (Critical)
**Target Users:** Parents/Caregivers
**Phase:** MVP (Phase 1)

#### Problem Solved
Parents struggle to determine symptom urgency, leading to 40-60% non-emergent ER visits while serious conditions may face delayed care.

#### Feature Description
Interactive AI-powered symptom checker that provides risk stratification and guidance using natural language processing.

#### Requirements

| Requirement | Description |
|-------------|-------------|
| Interactive symptom checker | Natural language input for describing symptoms |
| Risk stratification | Three levels: Home Care, Urgent Care, ER |
| AAP guidelines | Powered by American Academy of Pediatrics |
| Medical history integration | Considers past conditions and allergies |
| Age-specific factors | Tailors recommendations by age group |
| Intelligent follow-up | Asks relevant clarifying questions |
| Red flag identification | Detects emergency warning signs |

#### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 SYMPTOM TRIAGE FLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User taps "Check Symptoms"                                  │
│      │                                                      │
│      ▼                                                      │
│  AI: "What's happening with your child today?"              │
│      │                                                      │
│      ▼                                                      │
│  User: "My 3-year-old has a fever and is tugging..."       │
│      │                                                      │
│      ▼                                                      │
│  AI: "How long has the fever been present?"                │
│      │                                                      │
│      ▼                                                      │
│  User: "About 6 hours"                                      │
│      │                                                      │
│      ▼                                                      │
│  AI: "What's the temperature? Any other symptoms?"          │
│      │                                                      │
│      ▼                                                      │
│  [Additional follow-up questions based on response]          │
│      │                                                      │
│      ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           TRIAGE RESULT                              │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  🟡 HOME CARE                               │    │   │
│  │  │                                             │    │   │
│  │  │  Likely viral infection. Monitor at home.  │    │   │
│  │  │                                             │    │   │
│  │  │  Recommendations:                          │    │   │
│  │  │  • Keep hydrated                           │    │   │
│  │  │  • Monitor temperature                     │    │   │
│  │  │  • Watch for warning signs                │    │   │
│  │  │                                             │    │   │
│  │  │  Red flags to watch for:                  │    │   │
│  │  │  • Difficulty breathing                   │    │   │
│  │  │  • Rash that doesn't fade                 │    │   │
│  │  │  • Confusion or lethargy                  │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Option to save assessment to history]                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### AI Specifications

| Metric | Target |
|--------|--------|
| Triage Accuracy | 85-90% |
| ER Visit Reduction | 30-40% |
| Completion Time | < 60 seconds |
| Follow-up Questions | 3-5 on average |

#### Risk Levels

| Level | Color | Meaning | Action |
|-------|-------|---------|--------|
| **Home Care** | Green | Self-manageable | Monitor, treat at home |
| **Urgent Care** | Yellow | May need evaluation | Visit urgent care within 24h |
| **Emergency** | Red | Requires immediate care | Call 911 or go to ER |

#### Technical Implementation

```
Input: User text description of symptoms
   │
   ▼
Natural Language Processing
   │
   ├── Symptom extraction
   ├── Negation detection
   └── Context identification
   │
   ▼
Medical Knowledge Base (AAP Guidelines)
   │
   ├── Symptom-disease mapping
   ├── Age-specific considerations
   └── Red flag detection
   │
   ▼
LLM Processing (Med-PaLM fine-tuned)
   │
   ├── Generate follow-up questions
   ├── Assess urgency level
   └── Provide recommendations
   │
   ▼
Output: Structured triage result
```

---

### FR.2: Precision Dosage Calculator

**Priority:** P0 (Critical)
**Target Users:** Parents/Caregivers
**Phase:** MVP (Phase 1)

#### Problem Solved
Weight-based dosing errors are common, with acetaminophen/ibuprofen overdoses sending thousands of kids to ER annually.

#### Feature Description
Weight-synced medication dosage calculator with multiple safety validations.

#### Supported Medications

| Medication | Concentration Options | Age Range |
|------------|----------------------|-----------|
| Acetaminophen (Tylenol) | Liquid 160mg/5ml, 500mg tablets | All ages |
| Ibuprofen (Advil/Motrin) | Liquid 100mg/5ml, 200mg tablets | 6 months+ |
| Diphenhydramine (Benadryl) | Liquid 12.5mg/5ml | 2 years+ |
| Melatonin | 0.5mg, 1mg, 3mg, 5mg | Varies |
| Amoxicillin | 125mg/5ml, 200mg/5ml, 250mg/5ml | Per prescription |

#### Safety Features

| Feature | Description |
|---------|-------------|
| Weight validation | Verify weight is current and accurate |
| Overdose alerts | Warn if dose exceeds maximum |
| Interval checking | Ensure appropriate time between doses |
| Age verification | Flag age-inappropriate medications |
| Drug interactions | Check for known interactions |
| Duplicate therapy | Warn if multiple same-type medications |

#### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│               DOSAGE CALCULATION FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User selects medication                                     │
│      │  [Acetaminophen ▼]                                   │
│      ▼                                                      │
│  User enters weight (or uses saved profile)                   │
│      │  [18.5 lbs] or [8.4 kg]                             │
│      ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Dose Calculation                                   │   │
│  │                                                     │   │
│  │  Acetaminophen (Tylenol)                            │   │
│  │  Concentration: 160mg / 5ml                        │   │
│  │                                                     │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  YOUR CHILD'S DOSE:                           │ │   │
│  │  │                                               │ │   │
│  │  │       5.0 ml                                  │ │   │
│  │  │       (160 mg)                                │ │   │
│  │  │                                               │ │   │
│  │  │  Every 4-6 hours as needed                     │ │   │
│  │  │  Maximum: 5 doses per 24 hours                │ │   │
│  │  │                                               │ │   │
│  │  │  ⚠️ DO NOT exceed 3200mg in 24 hours         │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Set Reminder] [Log Dose] [Save to Favorites]              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Safety Validation Rules

```
1. Verify weight is entered in correct unit (kg/lbs)
2. Convert weight if needed (1 kg = 2.2 lbs)
3. Calculate dose based on medication:
   - Acetaminophen: 10-15 mg/kg per dose
   - Ibuprofen: 5-10 mg/kg per dose
4. Check against maximum daily dose
5. Verify age-appropriate
6. Check for drug interactions
7. Validate interval since last dose
8. Alert if any safety concern
```

#### Success Metrics

| Metric | Target |
|--------|--------|
| Medication errors | Zero |
| User confidence | 95%+ |
| Time to calculate | < 10 seconds |

---

### FR.4: Interactive Panic Mode

**Priority:** P0 (Critical)
**Target Users:** Parents/Caregivers
**Phase:** MVP (Phase 1)

#### Problem Solved
Parents panic during emergencies and forget CPR training or emergency protocols.

#### Feature Description
Voice-guided emergency protocols with step-by-step instructions and haptic timing.

#### Emergency Protocols

| Protocol | Age Groups | Content |
|----------|-----------|---------|
| CPR | Infant (0-12m), Child (1-8y), Adult | Compressions, rescue breathing, AED use |
| Choking | Infant, Child, Adult | Back blows, abdominal thrusts |
| Poisoning | All ages | Identification, dilution, when to call |
| Anaphylaxis | All ages | EpiPen administration, signs |
| Seizures | All ages | Safety, timing, when to call |
| Burns | All ages | Cooling, covering, when to seek care |
| Bleeding | All ages | Direct pressure, elevation, tourniquets |
| Head Injury | All ages | Warning signs, when to call |

#### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  PANIC MODE FLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User taps "Emergency Help" (prominent, always visible)      │
│      │                                                      │
│      ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🚨 WHAT'S THE EMERGENCY?                           │   │
│  │                                                       │   │
│  │  [CPR]  [Choking]  [Poisoning]  [Allergic]          │   │
│  │  [Seizure]  [Burn]  [Bleeding]  [Head Injury]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  User selects: CPR → Infant                                  │
│      │                                                      │
│      ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  👶 INFANT CPR (Under 1 year)                       │   │
│  │                                                       │   │
│  │  STEP 1 OF 6                                        │   │
│  │  ══════════════                                      │   │
│  │                                                       │   │
│  │  CHECK FOR RESPONSIVENESS                           │   │
│  │                                                       │   │
│  │  • Tap foot firmly                                  │   │
│  │  • Call name loudly                                 │   │
│  │  • Look for movement                                │   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  🔊 "Tap your baby's foot and call their     │   │   │
│  │  │  name loudly. Look to see if they move or    │   │   │
│  │  │  make any sound..."                          │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  │  [I need to call 911]  [Next Step]                 │   │
│  │                                                       │   │
│  │  ━━━━━━━━━━━━●━━━━━━━━━━━━━━                        │   │
│  │  [Haptic metronome: 100-120 BPM]                    │   │
│  │                                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Special Features

| Feature | Description |
|---------|-------------|
| Voice guidance | Audio instructions that play automatically |
| Haptic metronome | Vibration pattern for CPR compressions |
| One-touch 911 | Direct emergency call button |
| Poison control | Auto-dial Poison Control (1-800-222-1222) |
| Step timer | Counters for compressions and rescue breaths |
| Video guidance | Optional video for complex procedures |

---

## 🟢 Tier 2: Growth & Development Features

### FR.5: Growth Monitoring

**Priority:** P0 (Critical)
**Target Users:** Parents/Caregivers, Clinicians
**Phase:** MVP (Phase 1)

#### Problem Solved
Parents struggle to interpret growth charts and miss concerning trends.

#### Feature Description
WHO/CDC growth chart integration with intelligent trend analysis.

#### Chart Types

| Chart Type | Measurements | Percentile Range |
|------------|-------------|------------------|
| Weight-for-Age | Weight vs Age | 1st-99th |
| Length/Height-for-Age | Height vs Age | 1st-99th |
| Weight-for-Length | Weight vs Height | 1st-99th |
| BMI-for-Age | BMI vs Age | 1st-99th |
| Head Circumference | HC vs Age | 1st-99th |

#### Charts Available By Age

| Age Group | Charts Available |
|-----------|-----------------|
| 0-2 years | Weight-for-age, Length-for-age, Weight-for-length, Head circumference |
| 2-5 years | Weight-for-age, Height-for-age, BMI-for-age |
| 5-19 years | Weight-for-age, Height-for-age, BMI-for-age |

#### User Interface

```
┌─────────────────────────────────────────────────────────────┐
│                  GROWTH CHART                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Child Name ▼]    [Weight ▼]    [View: 2Y | 5Y | Full]    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │      Weight-for-Age: Boys 0-2 years                 │   │
│  │                                                      │   │
│  │  20 ───────────────────────────────────────────────  │   │
│  │      │                    ●─────●                    │   │
│  │  18 ─ │                   ╱                           │   │
│  │      │                  ╱  ● Your child              │   │
│  │  16 ─ │                 ╱                             │   │
│  │      │                ╱ ●                            │   │
│  │  14 ─ │               ╱                               │   │
│  │      │              ╱  - - - - - - - - - - - -      │   │
│  │  12 ─ │             ╱  - - - - - - - - - - - -       │   │
│  │      │            ●   - - - - - - - - - - - -        │   │
│  │  10 ─ │                                           -   │   │
│  │      │                                       -        │   │
│  │   8 ─│                                   -            │   │
│  │      │                               -                │   │
│  │   6 ─│                          -                     │   │
│  │      │                      -                          │   │
│  │   4 ─│                 -                              │   │
│  │      │            -                                   │   │
│  │   2 ─│       -                                        │   │
│  │      └─────────────────────────────────────────────   │   │
│  │          0    3    6    9    12   15   18   21  24   │   │
│  │                        Age (months)                    │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Current: 12.4 kg (75th percentile)                  │   │
│  │  Last check: 2 weeks ago                             │   │
│  │                                                      │   │
│  │  ✅ On track — maintaining consistent growth         │   │
│  │                                                      │   │
│  │  [Add Measurement]  [View Details]  [Share]          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### AI Features

| Feature | Description |
|---------|-------------|
| Trajectory analysis | Identify if growth is accelerating/decelerating |
| Crossing alerts | Warn if percentile crossing occurs |
| Adult height prediction | Estimate adult height based on growth |
| Growth velocity | Calculate rate of growth |
| Pattern detection | Identify concerning trends early |

---

### FR.9: Developmental Milestone Tracker

**Priority:** P1 (High)
**Target Users:** Parents/Caregivers, Clinicians
**Phase:** MVP (Phase 1)

#### Problem Solved
Tracking developmental milestones is overwhelming without professional guidance.

#### Feature Description
Comprehensive milestone tracking across all developmental domains.

#### Developmental Domains

| Domain | Description | Example Milestones |
|--------|-------------|-------------------|
| **Gross Motor** | Large muscle movements | Walking, running, jumping |
| **Fine Motor** | Small muscle movements | Grasping, drawing, stacking |
| **Language** | Communication skills | Babbling, words, sentences |
| **Cognitive** | Thinking and learning | Object permanence, problem-solving |
| **Social-Emotional** | Social interactions | Smiling, playing, empathy |

#### Milestone Framework

| Source | Guidelines Used |
|--------|----------------|
| **CDC** | Milestone Checklist (2 months - 5 years) |
| **AAP** | Bright Futures guidelines |
| **WHO** | Motor development standards |

#### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│               MILESTONE TRACKER FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Dashboard: Upcoming Milestones                             │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🎯 Next Milestone                                  │   │
│  │  👶 14 months old                                  │   │
│  │                                                      │   │
│  │  Stands without support                             │   │
│  │  Expected: 12-15 months                            │   │
│  │  Status: Due this month                            │   │
│  │                                                      │   │
│  │  [Mark as Achieved]  [Record Video]  [Ask AI]     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ──────────────────────────────────────────────────────     │
│                                                              │
│  📋 All Milestones (14 months)                              │
│                                                              │
│  ✓ Walks with one hand held        [Achieved: 13m]         │
│  ✓ Pulls to stand                  [Achieved: 12m]         │
│  ◐ Stands without support          [In progress]             │
│  ○ Walks without support           [Expected: 15-18m]       │
│  ○ Says 3-5 words                  [Expected: 15-18m]       │
│  ○ Points to show interest         [Expected: 14-15m]       │
│                                                              │
│  ──────────────────────────────────────────────────────     │
│                                                              │
│  ⚠️ Development Watch                                        │
│  Your child may benefit from extra attention to:            │
│  • Fine motor skills (stacking blocks)                      │
│  • Social games (peek-a-boo)                               │
│                                                              │
│  [Learn More]  [Set Milestone Reminders]                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Gap Detection

| Gap Size | Action |
|----------|--------|
| < 25% delayed | Monitor closely |
| 25-50% delayed | Discuss with pediatrician |
| > 50% delayed | Recommend evaluation |
| > 2 domains affected | Expedite referral |

---

## 🟡 Tier 3: Chronic Condition Management

### FR.10: Asthma Flare Forecasting

**Priority:** P1 (High)
**Target Users:** Parents/Caregivers, Clinicians
**Phase:** Expansion (Phase 2)

#### Problem Solved
Only 50% of children achieve well-controlled asthma; 160,000+ hospitalizations annually.

#### Feature Description
Predictive modeling system that forecasts asthma attacks 48-72 hours in advance.

#### Data Sources

| Data Type | Source |
|-----------|--------|
| Weather conditions | Weather API |
| Air quality (AQI) | Air quality services |
| Pollen counts | Pollen databases |
| Historical symptoms | User-entered data |
| Medication use | Tracking logs |
| Peak flow readings | Manual entry or device |

#### Zone System

| Zone | Color | Meaning | Action |
|------|-------|---------|--------|
| **Green** | 🟢 | All clear | Normal activity |
| **Yellow** | 🟡 | Caution | Increase monitoring |
| **Red** | 🔴 | Alert | Take action immediately |

#### User Interface

```
┌─────────────────────────────────────────────────────────────┐
│              ASTHMA DASHBOARD                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Today's Forecast: Moderate Risk                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🟡 Air Quality: Moderate (AQI 75)                  │   │
│  │  🌸 Pollen: High (Grass)                            │   │
│  │  📊 Predicted Control: Good                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  3-DAY OUTLOOK                                       │   │
│  │                                                      │   │
│  │  Today     Tomorrow     Day 3                       │   │
│  │  🟡        🟢           🟡                          │   │
│  │  Moderate  Good         Moderate                     │   │
│  │                                                      │   │
│  │  ⚠️ Elevated pollen expected tomorrow               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Weekly Summary                                       │   │
│  │  • Symptom-free days: 6/7                          │   │
│  │  • Night wakings: 1                                │   │
│  │  • Rescue inhaler uses: 2                          │   │
│  │  • Average peak flow: 280 (Personal best: 320)     │   │
│  │                                                      │   │
│  │  Overall: Yellow Zone — Good control               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Log Symptoms]  [Record Peak Flow]  [View Action Plan]      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### AI Predictions

| Prediction | Accuracy Target |
|------------|----------------|
| 48-hour forecast | 80%+ |
| 72-hour forecast | 75%+ |
| Trigger identification | 70%+ |

---

### FR.11: Diabetes Carb Scanner

**Priority:** P1 (High)
**Target Users:** Parents/Caregivers
**Phase:** Full Platform (Phase 3)

#### Problem Solved
Carb counting is time-consuming and error-prone; only 21% achieve target HbA1c.

#### Feature Description
Image-based carbohydrate estimation with insulin dose calculations.

#### Features

| Feature | Description |
|---------|-------------|
| Photo-based carb counting | AI analysis of food photos |
| 85-90% accuracy | Target accuracy rate |
| Plate scanning | Analyze entire meals at once |
| CGM integration | Sync with glucose monitors |
| Insulin calculator | Calculate doses based on I:C ratio |
| Hypoglycemia prediction | 30-60 minute advance warning |

#### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│              CARB SCANNING FLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User taps "Scan Food"                                       │
│      │                                                      │
│      ▼                                                      │
│  Camera opens with overlay                                   │
│      │                                                      │
│  User takes photo of plate                                  │
│      │                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍 Analyzing...                                     │   │
│  │                                                      │   │
│  │  Identified items:                                   │   │
│  │  • White rice (1 cup) — 45g carbs                  │   │
│  │  • Chicken breast (4oz) — 0g carbs                 │   │
│  │  • Broccoli — 6g carbs                             │   │
│  │  • Orange juice (4oz) — 12g carbs                  │   │
│  │                                                      │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │  TOTAL CARBS: 63g                                   │   │
│  │                                                      │   │
│  │  [Edit if incorrect]  [Confirm]                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  After confirming:                                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💉 INSULIN RECOMMENDATION                          │   │
│  │                                                      │   │
│  │  Current glucose: 142 mg/dL ↑                       │   │
│  │  Carbs: 63g                                         │   │
│  │  Active insulin: 1.2 units                          │   │
│  │                                                      │   │
│  │  Recommended dose: 5.8 units                        │   │
│  │  I:C Ratio: 1:10                                    │   │
│  │                                                      │   │
│  │  ⚠️ Check with your healthcare provider before      │   │
│  │  adjusting insulin settings.                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Clinical Outcomes Target

| Metric | Target Improvement |
|--------|-------------------|
| HbA1c reduction | 0.3-0.5% |
| Time in range | +15-20% |
| Severe hypoglycemic events | -30-40% |

---

## 🟣 Tier 4: AI-Powered Features

### FR.24: 24/7 AI Parenting Consultant

**Priority:** P1 (High)
**Target Users:** Parents/Caregivers
**Phase:** MVP (Phase 1)

#### Problem Solved
Parents have questions at all hours with no reliable way to get evidence-based answers.

#### Feature Description
Always-available conversational AI trained on AAP guidelines and pediatric best practices.

#### Topics Covered

| Category | Example Questions |
|----------|------------------|
| **Sleep** | "Baby won't sleep through the night" |
| **Feeding** | "How do I introduce solid foods?" |
| **Development** | "Is my toddler supposed to..." |
| **Behavior** | "How do I handle tantrums?" |
| **Health** | "When should I worry about a fever?" |
| **Safety** | "Is this product safe for my baby?" |
| **Discipline** | "Time-out isn't working..." |
| **Toilet Training** | "When should we start?" |

#### User Interface

```
┌─────────────────────────────────────────────────────────────┐
│                  AI CONSULTANT                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Pedi: Hi! I'm here to help with any parenting     │   │
│  │  questions. What would you like to know?           │   │
│  │  [Powered by AAP guidelines]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  User: My 2-year-old has been waking up at         │   │
│  │  3am every night for the past week. Is this        │   │
│  │  normal?                                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🤖 Pedi: Night wakings are very common in         │   │
│  │  toddlers, especially around 2 years when they      │   │
│  │  are experiencing so much language and motor       │   │
│  │  development. Here's what's likely happening:      │   │
│  │                                                      │   │
│  │  1. **Developmental leaps** — Toddlers often       │   │
│  │  wake up when processing new skills                │   │
│  │                                                      │   │
│  │  2. **Separation anxiety** — Peak around 18-24m   │   │
│  │                                                      │   │
│  │  3. **Sleep regression** — Common at this age     │   │
│  │                                                      │   │
│  │  What to try:                                       │   │
│  │  • Keep the room dark and calm                    │   │
│  │  • Short, boring responses (no play!)             │   │
│  │  • Consistent timing                               │   │
│  │                                                      │   │
│  │  When to worry: If accompanied by fever, pain,    │   │
│  │  or breathing issues, check symptoms now.         │   │
│  │                                                      │   │
│  │  [Check Symptoms]  [Learn More]  [Got it!]         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Suggested questions...]                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### AI Specifications

| Metric | Target |
|--------|--------|
| User satisfaction | 85-90% |
| Response time | < 5 seconds |
| Accuracy (evidence-based) | 95%+ |
| Red flag escalation | 100% when appropriate |

#### Safety Guardrails

```
1. Always provide disclaimer: "Not a substitute for medical advice"
2. Escalate to symptom triage for health concerns
3. Recognize red flag keywords and escalate immediately
4. Provide emergency resources for crisis situations
5. Never diagnose — always recommend consulting a provider
6. Flag for human review if uncertain
```

---

## 🔵 Tier 5: Healthcare Coordination

### FR.27: Vaccination Tracker

**Priority:** P0 (Critical)
**Target Users:** Parents/Caregivers
**Phase:** MVP (Phase 1)

#### Problem Solved
Parents struggle to keep track of vaccination schedules and miss important doses.

#### Feature Description
Personalized vaccination schedules with reminders and state registry integration.

#### Schedule Sources

| Region | Schedule Source |
|--------|-----------------|
| India | IAP (Indian Academy of Pediatrics) |
| USA | CDC Immunization Schedule |
| UK | NHS Vaccination Schedule |
| WHO | General recommendations |

#### User Interface

```
┌─────────────────────────────────────────────────────────────┐
│              VACCINATION TRACKER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Arjun (3 years) ▼]                                        │
│                                                              │
│  ──────────────────────────────────────────────────────     │
│                                                              │
│  📅 Upcoming Vaccinations                                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔴 Due Now                                          │   │
│  │                                                      │   │
│  │  MMR 2nd Dose                                       │   │
│  │  Due: Today                                         │   │
│  │  Location: Your pediatrician                        │   │
│  │                                                      │   │
│  │  [Mark as Done]  [Set Reminder]  [Find Provider]   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🟡 Due in 2 weeks                                  │   │
│  │                                                      │   │
│  │  Varicella 2nd Dose                                 │   │
│  │  Due: June 25, 2026                                │   │
│  │                                                      │   │
│  │  [Set Reminder]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ──────────────────────────────────────────────────────     │
│                                                              │
│  ✓ Completed Vaccinations                                   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Hepatitis B (3 doses)           Done: 0, 1, 6m  │   │
│  │  ✓ DTaP (5 doses)                  Done: 2, 4...  │   │
│  │  ✓ Polio IPV (4 doses)             Done: 2, 4...  │   │
│  │  ✓ MMR 1st Dose                   Done: 12m      │   │
│  │  ✓ Varicella 1st Dose             Done: 12m      │   │
│  │  ✓ Hepatitis A (2 doses)          Done: 12, 18m  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Download Certificate]  [Share with School]  [More]         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Success Metrics

| Metric | Target Improvement |
|--------|-------------------|
| On-time vaccination rate | +15-25% |
| Missed dose reduction | 50%+ |
| Certificate requests | 80%+ compliance |

---

*Document Version: 1.0*
*Last Updated: June 2026*
*Total Features Documented: 10 of 32*
