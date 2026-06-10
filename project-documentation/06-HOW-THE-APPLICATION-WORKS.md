# How the Application Works

Complete guide to user journeys, workflows, and application processes.

---

## 📱 Application Overview

### Platforms

| Platform | Technology | Primary Users |
|----------|-----------|--------------|
| **Mobile App** | React Native + Expo | Parents, daily use |
| **Web App** | Next.js | Parents, web access |
| **Clinician Portal** | Next.js | Pediatricians, specialists |
| **Admin Dashboard** | Next.js | Healthcare system admins |

### Application States

```
┌─────────────────────────────────────────────────────────────┐
│                 APPLICATION STATES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │   Unauthed   │  Landing, Marketing, Authentication        │
│  └──────┬───────┘                                           │
│         │ Login/Register                                      │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │    Authed    │  Dashboard, Core Features                 │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ├──► Parent Flow                                     │
│         ├──► Clinician Flow                                  │
│         └──► Admin Flow                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 👨‍👩‍👧 Parent User Journey

### Onboarding Flow

```
┌─────────────────────────────────────────────────────────────┐
│              PARENT ONBOARDING JOURNEY                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Account Creation                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Create your account                                 │   │
│  │  ┌─────────────────────────────────────────────┐ │   │
│  │  │  Email: sarah@example.com                   │ │   │
│  │  │  Password: ••••••••                        │ │   │
│  │  │  [Create Account]                          │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  │  Or: [Continue with Google] [Continue with Apple] │   │
│  │  [Already have an account? Sign in]              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 2: Profile Setup                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Who's using Pedi-Ai today?                        │   │
│  │                                                      │   │
│  │  [👤 I'm a parent]                                 │   │
│  │  [👨‍⚕️ I'm a healthcare provider]                   │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 3: Add First Child                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Add your child's information                       │   │
│  │                                                      │   │
│  │  Name: [Arjun]                                     │   │
│  │  Date of Birth: [Jan 15, 2024]                   │   │
│  │  Sex: [Male] [Female]                             │   │
│  │  Photo: [📷 Add Photo]                           │   │
│  │                                                      │   │
│  │  [Add Child]                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 4: Health Profile (Quick)                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Help us personalize your experience                │   │
│  │                                                      │   │
│  │  Any known allergies?                               │   │
│  │  [✓ Penicillin] [✓ Peanuts] [+Add More]          │   │
│  │                                                      │   │
│  │  Any chronic conditions?                            │   │
│  │  [ ] Asthma [ ] Diabetes [ ] None               │   │
│  │                                                      │   │
│  │  [Skip for Now] [Save & Continue]                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 5: Welcome to Dashboard                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✅ Welcome, Sarah!                                 │   │
│  │                                                      │   │
│  │  Your dashboard is ready. Arjun's profile has     │   │
│  │  been created with age-appropriate features.        │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  Quick actions to get started:               │ │   │
│  │  │                                              │ │   │
│  │  │  📏 Log today's height & weight             │ │   │
│  │  │  💉 Check vaccination status                 │ │   │
│  │  │  🩺 Explore symptom checker                   │ │   │
│  │  │  🤖 Meet your AI consultant                  │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [Go to Dashboard →]                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Daily Parent Flows

#### Flow 1: Symptom Check (Most Common)

```
┌─────────────────────────────────────────────────────────────┐
│              DAILY FLOW: SYMPTOM CHECK                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIGGER: Parent opens app (morning or when child is sick)    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HOME DASHBOARD                                    │   │
│  │  Good morning, Sarah! 👋                          │   │
│  │                                                      │   │
│  │  [Quick Symptom Check]  [Growth Update]            │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  Arjun (14 months)                            │ │   │
│  │  │  💤 Good morning! No health concerns noted.  │ │   │
│  │  │                                              │ │   │
│  │  │  📅 Today's Schedule                         │ │   │
│  │  │  • Next vaccine due in 3 weeks               │ │   │
│  │  │  • Milestone check-in: Walking              │ │   │
│  │  │                                              │ │   │
│  │  │  [View Dashboard]  [🔍 Symptom Check]      │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [Quick Actions: 🩺 💊 📏 🎯]                    │   │
│  │  [Menu: 📋 ⚙️ ❓]                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  STEP 1: User taps "Symptom Check"                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🩺 SYMPTOM CHECK                                  │   │
│  │                                                      │   │
│  │  Select child: [Arjun ▼]                          │   │
│  │                                                      │   │
│  │  What's happening with Arjun today?                │   │
│  │  Describe symptoms or concerns...                  │   │
│  │                                                      │   │
│  │  [──────────────────────────────────────────────] │   │
│  │  [                                              ] │   │
│  │  [                                              ] │   │
│  │  [──────────────────────────────────────────────] │   │
│  │                                                      │   │
│  │  Or choose:                                         │   │
│  │  [🤒 Fever] [🤧 Cold/Cough] [🤢 Stomach]         │   │
│  │  [🔴 Rash] [😢 Ear Pain] [🦵 Injury]              │   │
│  │                                                      │   │
│  │  [Get Guidance]                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  STEP 2: User enters symptoms                                │
│                                                              │
│  Input: "He's been tugging at his right ear for a day,       │
│         running fever around 101, and hasn't been eating well" │
│                                                              │
│  STEP 3: AI asks follow-up questions                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💬 Pedi-Ai:                                       │   │
│  │                                                      │   │
│  │  "Thanks for that information. A few quick        │   │
│  │  questions to give you the best guidance:"         │   │
│  │                                                      │   │
│  │  1. When did you first notice the ear pulling?     │   │
│  │     [Today] [Yesterday] [2-3 days ago] [Longer]   │   │
│  │                                                      │   │
│  │  2. How high is the fever?                        │   │
│  │     [Under 101°F] [101-102°F] [103+] [Not sure]   │   │
│  │                                                      │   │
│  │  [Continue]                                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  STEP 4: Assessment complete                                 │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 YOUR ASSESSMENT                                 │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  🟡 URGENT CARE                              │ │   │
│  │  │                                               │ │   │
│  │  │  Possible ear infection (otitis media)         │ │   │
│  │  │  detected based on symptoms.                   │ │   │
│  │  │                                               │ │   │
│  │  │  Ear pain + fever is a common sign of         │ │   │
│  │  │  middle ear infection.                         │ │   │
│  │  │                                               │ │   │
│  │  │  What to do:                                   │ │   │
│  │  │  • See your pediatrician within 24-48 hours   │ │   │
│  │  │  • Keep child comfortable                     │ │   │
│  │  │  • Use pain reliever as directed             │ │   │
│  │  │                                               │ │   │
│  │  │  [Find pediatrician]  [Calculate dosage]       │ │   │
│  │  │                                               │ │   │
│  │  │  Red flags requiring immediate ER care:        │ │   │
│  │  │  • Neck stiffness or severe headache          │ │   │
│  │  │  • Fever over 104°F                          │ │   │
│  │  │  • Swelling behind ear                       │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [Save to History]  [Ask Follow-up]  [Done]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  COMPLETE ✓                                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Flow 2: Medication Dosing

```
┌─────────────────────────────────────────────────────────────┐
│              DAILY FLOW: MEDICATION DOSING                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIGGER: Child needs medication                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💊 DOSAGE CALCULATOR                               │   │
│  │                                                      │   │
│  │  Select medication:                                 │   │
│  │  [Acetaminophen (Tylenol)        ▼]               │   │
│  │                                                      │   │
│  │  Select concentration:                             │   │
│  │  [160 mg / 5 mL (Liquid)       ▼]               │   │
│  │                                                      │   │
│  │  Child's weight:                                    │   │
│  │  [22 lbs ▾] (10.0 kg)                            │   │
│  │  [Using Arjun's saved profile]                     │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  CALCULATED DOSE:                             │ │   │
│  │  │                                               │ │   │
│  │  │       5.0 mL                                  │ │   │
│  │  │       (160 mg)                                │ │   │
│  │  │                                               │ │   │
│  │  │  Every 4-6 hours as needed                    │ │   │
│  │  │  Maximum 5 doses per 24 hours                │ │   │
│  │  │                                               │ │   │
│  │  │  ⚠️ Do not exceed 3200mg in 24 hours        │ │   │
│  │  │                                               │ │   │
│  │  │  Last dose: 6 hours ago ✓                     │ │   │
│  │  │  Next dose: After 2:00 PM if needed           │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [📯 Set Reminder]  [✓ Log Dose]  [💾 Save]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  After logging:                                             │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Dose logged successfully                        │   │
│  │                                                      │   │
│  │  Reminder set for 6 hours from now                 │   │
│  │  [Modify Reminder]  [Done]                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Flow 3: Growth Tracking

```
┌─────────────────────────────────────────────────────────────┐
│              DAILY FLOW: GROWTH TRACKING                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TRIGGER: Periodic measurement (monthly or as prompted)      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📏 LOG GROWTH MEASUREMENT                          │   │
│  │                                                      │   │
│  │  Child: [Arjun ▼]                                  │   │
│  │  Date: [June 10, 2026]                            │   │
│  │                                                      │   │
│  │  Weight: [________] [lbs ▼]                        │   │
│  │         or  [________] [kg ▼]                     │   │
│  │                                                      │   │
│  │  Length/Height: [________] [in ▼]                  │   │
│  │                or  [________] [cm ▼]               │   │
│  │                                                      │   │
│  │  Head Circumference: [Optional] [cm ▼]              │   │
│  │                                                      │   │
│  │  Tips for accurate measurement:                      │   │
│  │  • Weight: Same time of day, minimal clothing     │   │
│  │  • Height: Standing straight, no shoes              │   │
│  │  • Use same scale each time                        │   │
│  │                                                      │   │
│  │  [Cancel]  [Save Measurement]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  After saving:                                              │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📊 UPDATED GROWTH CHART                            │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  Weight: 10.2 kg (75th percentile)           │ │   │
│  │  │  Height: 78 cm (60th percentile)             │ │   │
│  │  │  BMI: 16.8 (65th percentile)                 │ │   │
│  │  │                                               │ │   │
│  │  │  ✅ Great progress! On track for all metrics.│ │   │
│  │  │  Weight jumped from 50th to 75th percentile  │ │   │
│  │  │  since last measurement.                     │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [View Full Chart]  [Compare to WHO]  [Share]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 👨‍⚕️ Clinician User Journey

### Clinician Onboarding

```
┌─────────────────────────────────────────────────────────────┐
│              CLINICIAN ONBOARDING JOURNEY                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Professional Registration                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🩺 Clinician Registration                         │   │
│  │                                                      │   │
│  │  I am a:                                            │   │
│  │  [ ] Pediatrician                                  │   │
│  │  [ ] Family Physician                              │   │
│  │  [ ] Nurse Practitioner                             │   │
│  │  [ ] Developmental Specialist                      │   │
│  │                                                      │   │
│  │  License Number: [________________]                │   │
│  │  State/Country: [________________]                │   │
│  │  [Verify License]                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 2: Practice Connection                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Connect Your Practice                              │   │
│  │                                                      │   │
│  │  [Search for practice or hospital]                 │   │
│  │                                                      │   │
│  │  Or enter manually:                                │   │
│  │  Practice Name: [________________]                │   │
│  │  Address: [________________]                       │   │
│  │                                                      │   │
│  │  [Connect Practice]                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 3: EHR Integration (Optional)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📡 EHR Integration                                 │   │
│  │                                                      │   │
│  │  Connect your Electronic Health Records for seamless │   │
│  │  patient data access.                               │   │
│  │                                                      │   │
│  │  [Epic]  [Cerner]  [Allscripts]  [Other]          │   │
│  │                                                      │   │
│  │  [Skip for Now]  [Set Up Later]                   │   │
│  │                                                      │   │
│  │  * HIPAA-compliant integration                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Step 4: Alert Preferences                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⚙️ Alert Configuration                             │   │
│  │                                                      │   │
│  │  How should we alert you?                          │   │
│  │  [✓] High-risk patient alerts  [Email] [App]       │   │
│  │  [✓] Developmental concerns     [App]               │   │
│  │  [✓] Daily patient summary       [Email]             │   │
│  │  [ ] All messages                [SMS]              │   │
│  │                                                      │   │
│  │  [Save Preferences]                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Clinician Daily Flow

```
┌─────────────────────────────────────────────────────────────┐
│              CLINICIAN DAILY WORKFLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Morning: Start of Day                                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Good morning, Dr. Iyer!                             │   │
│  │  June 10, 2026                                      │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  📋 TODAY'S SCHEDULE                         │ │   │
│  │  │  15 patients scheduled                      │ │   │
│  │  │  3 Pedi-Ai alerts require attention          │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  ⚠️ ALERTS REQUIRING ATTENTION                    │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  🔴 High Risk Alert                           │ │   │
│  │  │  Patient: Rohan Shah (4 years)               │ │   │
│  │  │  Alert: Asthma symptoms increasing over        │ │   │
│  │  │  past week. 4 rescue inhaler uses.           │ │   │
│  │  │  AQI was 'Unhealthy' on 3 days.              │ │   │
│  │  │  [View Details]  [Contact Family]           │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  🟡 Developmental Concern                    │ │   │
│  │  │  Patient: Priya Patel (18 months)            │ │   │
│  │  │  Alert: Language milestones 3 months behind.   │ │   │
│  │  │  Only 3 words vs expected 15+.               │ │   │
│  │  │  [View Milestone History]  [Schedule Eval]   │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Before Patient Visit                                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 VISIT PREPARATION                               │   │
│  │  Patient: Aisha Khan (2 years)                     │   │
│  │  Scheduled: 10:30 AM - Checkup                     │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  PARENT CONCERNS (submitted via app)          │ │   │
│  │  │  "She's been having trouble with potty       │ │   │
│  │  │  training. Getting frustrated."               │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │  KEY DATA SINCE LAST VISIT                    │ │   │
│  │  │  • Growth: +2cm, +0.5kg (stable)             │ │   │
│  │  │  • Vaccines: MMR due today                    │ │   │
│  │  │  • Milestones: On track for all domains      │ │   │
│  │  │  • Sleep: Improved (was having issues)       │ │   │
│  │  │  • No symptom checks logged                   │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                      │   │
│  │  [Open Full Patient View]  [Start Visit Notes]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

### User Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐                                             │
│  │   PARENT    │                                             │
│  │   (Input)   │                                             │
│  └──────┬──────┘                                             │
│         │                                                    │
│         ├──► Manual Entry                                    │
│         │    ├── Growth measurements                        │
│         │    ├── Symptom descriptions                       │
│         │    ├── Medication logs                            │
│         │    └── Milestone achievements                     │
│         │                                                    │
│         ├──► Device Data                                     │
│         │    ├── Photos/Videos (milestones)                  │
│         │    └── Wearable data (future)                     │
│         │                                                    │
│         ├──► API Data                                        │
│         │    ├── Weather                                    │
│         │    ├── Air Quality                                │
│         │    └── Pollen counts                              │
│         │                                                    │
│         └──► AI Analysis                                     │
│              ├── Symptom triage                             │
│              ├── Growth analysis                            │
│              └── Predictive models                           │
│                                                              │
│  ┌─────────────┐                                             │
│  │   CLOUD     │                                             │
│  │  PROCESSING  │                                             │
│  └──────┬──────┘                                             │
│         │                                                    │
│         ├──► Data Storage (MongoDB)                          │
│         │    ├── User profiles                             │
│         │    ├── Health records                            │
│         │    └── Activity logs                             │
│         │                                                    │
│         ├──► AI Processing                                   │
│         │    ├── Med-PaLM triage                          │
│         │    ├── Growth algorithms                          │
│         │    └── Predictive models                         │
│         │                                                    │
│         └──► Analytics Engine                                │
│              ├── Trend analysis                             │
│              └── Report generation                          │
│                                                              │
│  ┌─────────────┐                                             │
│  │   OUTPUT    │                                             │
│  └──────┬──────┘                                             │
│         │                                                    │
│         ├──► Parent App                                     │
│         │    ├── Dashboard                                  │
│         │    ├── Recommendations                            │
│         │    └── Alerts & Reminders                        │
│         │                                                    │
│         ├──► Clinician Portal                               │
│         │    ├── Patient summaries                          │
│         │    ├── Risk alerts                                │
│         │    └── Visit preparation                          │
│         │                                                    │
│         └──► EHR Integration (FHIR)                        │
│              ├── Patient records                            │
│              ├── Growth data                                │
│              └── Clinical notes                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### EHR Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   EHR INTEGRATION FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PEDI-AI                                    EHR SYSTEM        │
│  ┌───────────┐                         ┌───────────────┐   │
│  │           │    Patient Data         │               │   │
│  │  Growth   │ ─────────────────────► │    Epic/      │   │
│  │  Metrics  │                         │    Cerner     │   │
│  └───────────┘                         └───────────────┘   │
│                                                              │
│  ┌───────────┐                         ┌───────────────┐   │
│  │ Chronic   │    Flare Events         │               │   │
│  │ Condition │ ─────────────────────► │               │   │
│  │   Logs    │                         │               │   │
│  └───────────┘                         └───────────────┘   │
│                                                              │
│  ┌───────────┐                         ┌───────────────┐   │
│  │ Medication│    Orders/Plans         │               │   │
│  │  Dosage   │ ◄───────────────────── │   Provider    │   │
│  │ Calculator│                         │   Orders      │   │
│  └───────────┘                         └───────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  FHIR R4 API                        │   │
│  │                                                      │   │
│  │  Resources synced:                                   │   │
│  │  • Patient (demographics)                           │   │
│  │  • Observation (growth, vitals)                     │   │
│  │  • Condition (diagnoses, allergies)                  │   │
│  │  • MedicationRequest (prescriptions)                  │   │
│  │  • Encounter (appointments)                          │   │
│  │  • Procedure (vaccinations)                         │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔔 Notification System

### Notification Types

| Category | Notification | Channel |
|----------|-------------|---------|
| **Safety** | Emergency protocols | Push + Haptic |
| **Health** | Symptom assessment ready | Push |
| **Growth** | Growth update reminder | Push + Email |
| **Vaccines** | Vaccine due | Push + Email |
| **Milestones** | Upcoming milestone | Push |
| **Alerts** | High-risk alert (clinician) | Push + Email |
| **Reminders** | Medication reminder | Push |
| **Insights** | Weekly summary | Email |

### Notification Preferences

```
┌─────────────────────────────────────────────────────────────┐
│              NOTIFICATION SETTINGS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔔 Critical Notifications                           │   │
│  │                                                      │   │
│  │  Emergency protocols & safety alerts                 │   │
│  │  [✓] Push Notifications  [✓] SMS  [✓] Haptic      │   │
│  │  Always enabled (cannot disable)                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 Health Reminders                               │   │
│  │                                                      │   │
│  │  Vaccination reminders          [✓] [Email]         │   │
│  │  Growth measurement prompts      [✓] [Push]          │   │
│  │  Milestone check-ins             [✓] [Push]          │   │
│  │  Medication reminders            [✓] [Push]          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📊 Insights & Reports                              │   │
│  │                                                      │   │
│  │  Weekly health summary          [ ] [Email]         │   │
│  │  Monthly development report       [✓] [Email]        │   │
│  │  New feature announcements       [ ] [Push]          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⏰ Quiet Hours                                     │   │
│  │                                                      │   │
│  │  Do not disturb: 10:00 PM - 7:00 AM               │   │
│  │  Emergency alerts will always come through.          │   │
│  │                                                      │   │
│  │  [Edit Quiet Hours]                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.0*
*Last Updated: June 2026*
