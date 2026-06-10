# Pedi-Ai Screen Inventory

> **Purpose**: Complete documentation of all screens/routes in the Pedi-Ai application
> **Total Screens**: 43 screens across 7 route groups
> **Last Updated**: 2026-06-10

---

## Table of Contents

1. [Public Routes](#1-public-routes)
2. [Authentication Routes](#2-authentication-routes)
3. [Parent Dashboard Routes](#3-parent-dashboard-routes)
4. [Healthcare Provider Routes (App)](#4-healthcare-provider-routes-app)
5. [Admin Routes](#5-admin-routes)
6. [Navigation Structure](#6-navigation-structure)
7. [Screen Component Summary](#7-screen-component-summary)

---

## 1. Public Routes

### 1.1 Landing Page
| Property | Value |
|----------|-------|
| **Route** | `/` |
| **File** | `src/app/page.tsx` |
| **Purpose** | Main landing/marketing page for the application |
| **Key Components** | Navigation, HeroSection, FeatureCards, StatsSection, Testimonials, FAQ, CTA |
| **User Roles** | Public (unauthenticated users) |
| **Related Features** | Marketing, Feature Showcase, Signup CTA |

**Key Sections**:
- Hero section with problem statements (ER visits, dosing errors, developmental delays)
- Feature highlights: AI Symptom Triage, Dosage Calculator, Growth Tracking, Milestones, AI Consultant, Vaccinations
- Statistics: 40% fewer ER visits, 14mo earlier autism detection, 85% triage accuracy, 0 medication errors
- Testimonials from parents and pediatricians
- FAQ section
- CTA for signup

---

### 1.2 FAQ Page
| Property | Value |
|----------|-------|
| **Route** | `/faq` |
| **File** | `src/app/faq/page.tsx` |
| **Purpose** | Frequently asked questions about the platform |
| **Key Components** | Navigation, FAQAccordion |
| **User Roles** | Public |
| **Related Features** | Help & Support |

**FAQ Categories**:
- General (What is Pedi-Ai, age range, not a replacement for pediatrician)
- Features (AI triage accuracy, dosage calculator, WHO growth charts)
- Security & Privacy (data security, HIPAA compliance)
- Pricing & Plans (free features, premium features)
- Technical (app availability, offline mode)

---

## 2. Authentication Routes

### 2.1 Login Page
| Property | Value |
|----------|-------|
| **Route** | `/login` |
| **File** | `src/app/(auth)/login/page.tsx` |
| **Purpose** | User authentication and login |
| **Key Components** | LoginForm, DemoAccountSelector, PasswordToggle |
| **User Roles** | All authenticated users |
| **Related Features** | Authentication, RBAC, Session Management |

**Functionality**:
- Email/password login form
- Demo account quick-select (parent, doctor, nurse, clinic_admin, platform_admin)
- Role-based redirect after login:
  - `parent` → `/dashboard`
  - `doctor` → `/doctor`
  - `nurse` → `/nurse`
  - `clinic_admin` → `/clinic-admin`
  - `platform_admin` → `/platform-admin`
- Password visibility toggle
- Error handling for invalid credentials

---

### 2.2 Signup Page
| Property | Value |
|----------|-------|
| **Route** | `/signup` |
| **File** | `src/app/(auth)/signup/page.tsx` |
| **Purpose** | New user registration |
| **Key Components** | SignupForm, ChildInfoForm, TermsCheckbox |
| **User Roles** | Public |
| **Related Features** | User Registration, Child Profile Creation |

**Form Fields**:
- Parent name
- Email address
- Password + confirm password
- Child name
- Child date of birth
- Terms agreement checkbox

**Validation**:
- Email format validation
- Password length (min 6 characters)
- Password match confirmation
- Required field validation

---

## 3. Parent Dashboard Routes

### 3.1 Main Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/dashboard` |
| **File** | `src/app/(dashboard)/dashboard/page.tsx` |
| **Purpose** | Central hub for parent health management |
| **Key Components** | ChildSelector, QuickActions, HealthSummary, UpcomingReminders |
| **User Roles** | parent, caregiver |
| **Related Features** | Child Management, Quick Access, Health Overview |

**Features**:
- Child selector for multi-child households
- Age calculation display (months/years)
- Quick action cards: Symptom Check, Growth Charts, Vaccinations, AI Consultant
- Health summary widgets
- Upcoming reminders

---

### 3.2 Symptom Checker
| Property | Value |
|----------|-------|
| **Route** | `/symptom-check` |
| **File** | `src/app/(dashboard)/symptom-check/page.tsx` |
| **Purpose** | AI-powered symptom triage and guidance |
| **Key Components** | BodyAreaSelector, SymptomPicker, SeveritySelector, TriageResult |
| **User Roles** | parent, caregiver |
| **Related Features** | Symptom Triage (Feature #1), AI Assessment |

**Flow**:
1. Select body area (Head & Face, Chest & Breathing, Stomach & Digestion, etc.)
2. Select specific symptoms from categorized list
3. Rate severity (mild, moderate, severe)
4. Enter duration
5. AI asks follow-up questions
6. Display triage result with urgency level

**Triage Levels**:
- **Home Care** - Manageable at home
- **Urgent Care** - See doctor within timeframe
- **Emergency** - Call 911 / go to ER immediately

---

### 3.3 Growth Charts
| Property | Value |
|----------|-------|
| **Route** | `/growth-charts` |
| **File** | `src/app/(dashboard)/growth-charts/page.tsx` |
| **Purpose** | Track and visualize child growth metrics |
| **Key Components** | ChildSelector, MeasurementForm, GrowthChart, PercentileBands |
| **User Roles** | parent, caregiver |
| **Related Features** | Growth Tracking (Feature #3), WHO/CDC Standards |

**Measurements**:
- Weight (kg)
- Height/Length (cm)
- Head Circumference (cm)

**Chart Features**:
- WHO percentile bands (P3, P15, P50, P85, P97)
- Multiple chart types (weight-for-age, height-for-age, BMI)
- Gender-specific charts
- Age range: Birth to 5 years
- Percentile crossing alerts

---

### 3.4 Dosage Calculator
| Property | Value |
|----------|-------|
| **Route** | `/dosage-calculator` |
| **File** | `src/app/(dashboard)/dosage-calculator/page.tsx` |
| **Purpose** | Calculate safe medication dosages based on weight |
| **Key Components** | ChildSelector, MedicationSelector, DoseDisplay, SafetyWarnings |
| **User Roles** | parent, caregiver |
| **Related Features** | Dosage Calculator (Feature #2), Medication Safety |

**Medications Supported**:
- Acetaminophen (Calpol, Tylenol, Dolo) - Syrup 120mg/5ml, 250mg/5ml
- Ibuprofen (Motrin, Ibugard) - Syrup 100mg/5ml
- Cetirizine (Citriz) - Drops
- Diphenhydramine (Benadryl) - Syrup/Syrup Forte
- Ondansetron (Emeset) - Drops
- Metoclopramide (Perinorm) - Drops/Syrup
- Salbutamol (Asthalin) - Respirator Solution
- Prednisolone (Prelone) - Syrup
- Azithromycin (Azee) - Syrup
- Amoxicillin (Novamox) - Syrup

**Safety Features**:
- Weight-based calculation
- Maximum dose warnings
- Overdose alerts
- Visual dose representation
- Dosing frequency guidance

---

### 3.5 Emergency Guide
| Property | Value |
|----------|-------|
| **Route** | `/emergency` |
| **File** | `src/app/(dashboard)/emergency/page.tsx` |
| **Purpose** | Step-by-step emergency first aid instructions |
| **Key Components** | EmergencyCategoryGrid, StepByStepGuide, CPRTimer |
| **User Roles** | parent, caregiver |
| **Related Features** | Emergency Guide (Feature #11), First Aid |

**Emergency Categories**:
1. **CPR** - Cardiopulmonary resuscitation
   - Infant (0-12 months)
   - Child (1-8 years)
   - Adult
   
2. **Choking** - Airway obstruction
   - Infant back blows, chest thrusts
   - Child abdominal thrusts

3. **Poisoning** - Ingestion of harmful substances
   - Immediate actions
   - Poison control contact

4. **Allergic Reaction** - Severe allergic response
   - Epinephrine administration
   - When to use EpiPen

5. **Seizures** - Convulsive episodes
   - Safety measures
   - Recovery position

6. **Burns** - Thermal injuries
   - Cool running water
   - When to seek care

7. **Head Injury** - Head trauma
   - Monitoring symptoms
   - Red flag signs

8. **Breathing Difficulty** - Respiratory distress
   - Signs of respiratory distress
   - Positioning

---

### 3.6 Milestones Tracker
| Property | Value |
|----------|-------|
| **Route** | `/milestones` |
| **File** | `src/app/(dashboard)/milestones/page.tsx` |
| **Purpose** | Track developmental milestones across domains |
| **Key Components** | ChildSelector, DomainCards, MilestoneList, AchievementBadge |
| **User Roles** | parent, caregiver |
| **Related Features** | Milestone Tracking (Feature #5), Development Monitoring |

**Development Domains**:
- **Gross Motor** - Large muscle movements (sitting, walking, running)
- **Fine Motor** - Small movements (grasping, drawing)
- **Language** - Communication (babbling, words, sentences)
- **Social** - Social interactions (smiling, playing, sharing)

**Age Groups**:
- 2 months, 4 months, 6 months, 9 months
- 12 months, 15 months, 18 months
- 2 years, 3 years, 4 years, 5 years

**Features**:
- Status indicators: Achieved, In Progress, Not Yet
- Progress percentages per domain
- Warning signs for delays
- Activities to encourage development
- CDC guideline references

---

### 3.7 Vaccinations
| Property | Value |
|----------|-------|
| **Route** | `/vaccinations` |
| **File** | `src/app/(dashboard)/vaccinations/page.tsx` |
| **Purpose** | Track immunization schedule and records |
| **Key Components** | ChildSelector, ScheduleTimeline, VaccineCard, DueAlert |
| **User Roles** | parent, caregiver |
| **Related Features** | Vaccination Tracker (Feature #6), IAP Schedule |

**Vaccine Schedule (IAP - Indian Academy of Pediatrics)**:
- **Birth**: BCG, Hep B (0), OPV (0)
- **6 Weeks**: Pentavalent 1, Rotavirus 1, IPV 1, PCV 1, Hib 1
- **10 Weeks**: Pentavalent 2, Rotavirus 2, IPV 2, PCV 2, Hib 2
- **14 Weeks**: Pentavalent 3, Rotavirus 3, IPV 3, PCV 3, Hib 3
- **6 Months**: Hep B (3), OPV (1), Flu (annual)
- **9 Months**: MMR 1, Typhoid (if using ViPS)
- **12 Months**: Hep A 1
- **15 Months**: MMR 2, Varicella 1, PCV Booster
- **16-18 Months**: DTP Booster 1, Hib Booster, Hep A 2
- **18 Months**: Japanese Encephalitis 1
- **2 Years**: Typhoid Booster (ViPS/TCV)
- **5 Years**: DTP Booster 2, Polio Booster, Typhoid Booster

**Vaccine Details Include**:
- Protects against
- Importance
- Side effects
- Watch for signs
- Educational info

---

### 3.8 Medical History
| Property | Value |
|----------|-------|
| **Route** | `/medical-history` |
| **File** | `src/app/(dashboard)/medical-history/page.tsx` |
| **Purpose** | Manage comprehensive health records |
| **Key Components** | ChildSelector, RecordTabs, EntryCard, AllergyBadge |
| **User Roles** | parent, caregiver |
| **Related Features** | Medical History (Feature #7), Health Records |

**Record Types**:
- **Visits** - Doctor appointments, checkups
- **Hospitalizations** - Inpatient stays
- **Surgeries** - Surgical procedures
- **Allergies** - Drug, food, environmental
- **Diagnoses** - Medical conditions
- **Tests** - Lab results, imaging
- **Vaccinations** - Immunization records

**Features**:
- Entry filtering and search
- Share with doctor toggle
- Attachment support
- Emergency contacts
- Chronic conditions tracking
- Current medications list

---

### 3.9 Medicine Cabinet
| Property | Value |
|----------|-------|
| **Route** | `/medicine-cabinet` |
| **File** | `src/app/(dashboard)/medicine-cabinet/page.tsx` |
| **Purpose** | Manage household medications |
| **Key Components** | MedicineList, ExpiryAlerts, UsageHistory, AddMedicineForm |
| **User Roles** | parent, caregiver |
| **Related Features** | Medicine Cabinet (Feature #8), Inventory Management |

**Medicine Properties**:
- Name and brand
- Form (Syrup, Drops, Tablets)
- Strength
- Quantity remaining
- Expiry date
- Last used date
- Restock reminder threshold

**Features**:
- Expiry date warnings
- Low quantity alerts
- Usage history tracking
- Who administered (Mom, Dad, etc.)
- Notes per medication
- Refill reminders

---

### 3.10 Drug Interactions
| Property | Value |
|----------|-------|
| **Route** | `/drug-interactions` |
| **File** | `src/app/(dashboard)/drug-interactions/page.tsx` |
| **Purpose** | Check for drug interaction warnings |
| **Key Components** | DrugSelector, InteractionResult, SeverityIndicator |
| **User Roles** | parent, caregiver |
| **Related Features** | Drug Interaction Checker (Feature #10), Medication Safety |

**Supported Drugs**:
- Amoxicillin (Antibiotic)
- Acetaminophen/Paracetamol (Analgesic)
- Ibuprofen (NSAID)
- Azithromycin (Antibiotic)
- Cetirizine (Antihistamine)
- Diphenhydramine (Antihistamine)
- Metoclopramide (Antiemetic)
- Ondansetron (Antiemetic)
- Prednisolone (Corticosteroid)
- Salbutamol/Albuterol (Bronchodilator)

**Interaction Severity**:
- **High** - Avoid combination
- **Moderate** - Use with caution
- **Low** - Generally safe

---

### 3.11 Growth Reference
| Property | Value |
|----------|-------|
| **Route** | `/growth-reference` |
| **File** | `src/app/(dashboard)/growth-reference/page.tsx` |
| **Purpose** | WHO growth standards reference for clinicians |
| **Key Components** | AgeSelector, GenderToggle, ReferenceTable |
| **User Roles** | parent, caregiver, doctor, nurse |
| **Related Features** | Growth Reference Charts, WHO Standards |

**Reference Data** (Birth to 5 years):
- Heights at P3, P50, P97 for boys and girls
- Weights at P3, P50, P97 for boys and girls
- BMI at P3, P50, P97 for boys and girls

**Age Points**: 0m, 3m, 6m, 12m, 2y, 3y, 4y, 5y

---

### 3.12 Triage Review
| Property | Value |
|----------|-------|
| **Route** | `/triage-review` |
| **File** | `src/app/(dashboard)/triage-review/page.tsx` |
| **Purpose** | Review past symptom triage assessments |
| **Key Components** | CaseList, TriageBadge, StatusIndicator |
| **User Roles** | parent, doctor, nurse |
| **Related Features** | Triage History, Assessment Review |

**Case Properties**:
- Patient name
- Parent name
- Symptoms list
- AI triage level
- AI confidence score
- Status (Pending, Reviewed, Confirmed)
- Submission timestamp
- Clinical concern

---

### 3.13 AI Consultant
| Property | Value |
|----------|-------|
| **Route** | `/consultant` |
| **File** | `src/app/(dashboard)/consultant/page.tsx` |
| **Purpose** | 24/7 AI-powered parenting assistant |
| **Key Components** | ChatInterface, MessageBubble, SuggestedTopics, SessionHistory |
| **User Roles** | parent, caregiver |
| **Related Features** | AI Parenting Consultant (Feature #9), Chat Support |

**Modes**:
1. **Chat Mode** - Conversational AI assistance
2. **QA Mode** - Structured question and answer

**Suggested Topics**:
- Sleep regression tips 🌙
- Picky eating solutions 🥦
- Tantrum management 😤
- Potty training 🚽
- Screen time guidelines 📱
- Developmental concerns 🧠

**AI Response Categories**:
- Sleep issues
- Picky eating
- Tantrums
- Potty training
- Screen time
- Development
- Feeding
- Behavior

---

### 3.14 Appointments
| Property | Value |
|----------|-------|
| **Route** | `/appointments` |
| **File** | `src/app/(app)/appointments/page.tsx` |
| **Purpose** | Schedule and manage appointments |
| **Key Components** | ProviderSelector, DatePicker, TimeSlotGrid, BookingConfirmation |
| **User Roles** | parent, caregiver |
| **Related Features** | Appointment Scheduling (Feature #14) |

**Booking Flow**:
1. Select provider (Doctor or Clinic)
2. Choose appointment type (Checkup, Vaccination, Sick Visit, Follow-up)
3. Pick available date (weekdays, next 2 weeks)
4. Select time slot
5. Add notes
6. Confirm booking

**Appointment Types**:
- Regular Checkup 🩺
- Vaccination 💉
- Sick Visit 🤒
- Follow-up 📋

---

### 3.15 Reports
| Property | Value |
|----------|-------|
| **Route** | `/reports` |
| **File** | `src/app/(app)/reports/page.tsx` |
| **Purpose** | Generate health reports and certificates |
| **Key Components** | ReportTypeSelector, ChildSelector, ReportPreview, ExportOptions |
| **User Roles** | parent, caregiver |
| **Related Features** | Reports (Feature #12), Document Generation |

**Report Types**:
1. **Growth Report** - Height, weight, growth patterns with charts
2. **Vaccination Certificate** - Official immunization record
3. **Medical History Summary** - Complete health records overview
4. **Development Milestones** - Cognitive, motor, social development

**Features**:
- Date range selection
- Include/exclude options (charts, notes)
- PDF/print export
- Share with doctor

---

### 3.16 Notifications
| Property | Value |
|----------|-------|
| **Route** | `/notifications` |
| **File** | `src/app/(app)/notifications/page.tsx` |
| **Purpose** | View and manage notifications |
| **Key Components** | NotificationList, NotificationCard, TabFilters |
| **User Roles** | All users |
| **Related Features** | Notifications, Alerts, Reminders |

**Notification Types**:
- Appointment reminders
- Vaccination due alerts
- Growth milestone achievements
- AI consultation summaries
- System announcements

**Features**:
- Tab filters: All, Unread, Important
- Mark as read/unread
- Delete notifications
- Action URL navigation

---

### 3.17 Patients (Multi-child)
| Property | Value |
|----------|-------|
| **Route** | `/patients` |
| **File** | `src/app/(dashboard)/patients/page.tsx` |
| **Purpose** | Manage multiple children profiles |
| **Key Components** | PatientList, AddPatientButton, PatientCard |
| **User Roles** | parent |
| **Related Features** | Multi-child Management |

---

### 3.18 Admin Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/admin` |
| **File** | `src/app/(dashboard)/admin/page.tsx` |
| **Purpose** | Parent admin panel |
| **Key Components** | SettingsPanel, ProfileEditor, Preferences |
| **User Roles** | parent |
| **Related Features** | Account Settings |

---

## 4. Healthcare Provider Routes (App)

### 4.1 AI Consultant (Healthcare)
| Property | Value |
|----------|-------|
| **Route** | `/ai-consultant` |
| **File** | `src/app/(app)/ai-consultant/page.tsx` |
| **Purpose** | AI chat interface for healthcare providers |
| **Key Components** | ChatInterface, QAMode, SessionList |
| **User Roles** | doctor, nurse |
| **Related Features** | Clinical AI Support |

---

### 4.2 Doctor Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/doctor` |
| **File** | `src/app/(app)/doctor/page.tsx` |
| **Purpose** | Main dashboard for pediatricians |
| **Key Components** | PatientOverview, AppointmentSummary, QuickActions |
| **User Roles** | doctor |
| **Related Features** | Doctor Portal, Patient Management |

**Stats Displayed**:
- Total patients
- Today's appointments
- Pending reviews (no visit in 90+ days)
- Unread messages

---

### 4.3 Doctor - Patients List
| Property | Value |
|----------|-------|
| **Route** | `/doctor/patients` |
| **File** | `src/app/(app)/doctor/patients/page.tsx` |
| **Purpose** | View and search patient roster |
| **Key Components** | PatientSearch, PatientCard, FilterOptions |
| **User Roles** | doctor, nurse |
| **Related Features** | Patient List |

---

### 4.4 Doctor - Patient Detail
| Property | Value |
|----------|-------|
| **Route** | `/doctor/patient/[id]` |
| **File** | `src/app/(app)/doctor/patient/[id]/page.tsx` |
| **Purpose** | Individual patient medical record view |
| **Key Components** | PatientHeader, Tabs, GrowthChart, VisitHistory |
| **User Roles** | doctor, nurse |
| **Related Features** | Patient Detail View |

---

### 4.5 Doctor - Appointments
| Property | Value |
|----------|-------|
| **Route** | `/doctor/appointments` |
| **File** | `src/app/(app)/doctor/appointments/page.tsx` |
| **Purpose** | Manage doctor's appointment schedule |
| **Key Components** | CalendarView, AppointmentList, TimeSlots |
| **User Roles** | doctor |
| **Related Features** | Doctor Scheduling |

---

### 4.6 Nurse Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/nurse` |
| **File** | `src/app/(app)/nurse/page.tsx` |
| **Purpose** | Main dashboard for pediatric nurses |
| **Key Components** | TaskList, PatientQueue, QuickActions |
| **User Roles** | nurse |
| **Related Features** | Nurse Portal |

**Stats Displayed**:
- Patients under care
- Pending tasks
- Vitals to record

**Task Types**:
- Vitals 📊
- Medication 💊
- Vaccination 💉
- Follow-up 📞

---

### 4.7 Nurse - Vitals Recording
| Property | Value |
|----------|-------|
| **Route** | `/nurse/vitals` |
| **File** | `src/app/(app)/nurse/vitals/page.tsx` |
| **Purpose** | Record patient vital signs |
| **Key Components** | PatientSelector, VitalsForm, RecentReadings |
| **User Roles** | nurse |
| **Related Features** | Vitals Recording |

**Vital Signs**:
- Temperature
- Heart rate
- Respiratory rate
- Blood pressure
- Oxygen saturation
- Weight
- Height

---

### 4.8 Nurse - Tasks
| Property | Value |
|----------|-------|
| **Route** | `/nurse/tasks` |
| **File** | `src/app/(app)/nurse/tasks/page.tsx` |
| **Purpose** | Manage nursing task list |
| **Key Components** | TaskList, TaskFilters, TaskDetail |
| **User Roles** | nurse |
| **Related Features** | Task Management |

---

## 5. Admin Routes

### 5.1 Clinic Admin Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/clinic-admin` |
| **File** | `src/app/(app)/clinic-admin/page.tsx` |
| **Purpose** | Multi-clinic management dashboard |
| **Key Components** | ClinicSelector, ClinicStats, ActivityFeed |
| **User Roles** | clinic_admin |
| **Related Features** | Clinic Management |

**Stats**:
- Total patients
- Today's appointments
- Staff count
- Pending reviews

**Activity Types**:
- Patient added
- Appointment booked
- Staff update
- Vaccination administered
- Report generated

---

### 5.2 Clinic Admin - Staff Management
| Property | Value |
|----------|-------|
| **Route** | `/clinic-admin/staff` |
| **File** | `src/app/(app)/clinic-admin/staff/page.tsx` |
| **Purpose** | Manage clinic staff members |
| **Key Components** | StaffList, AddStaffForm, RoleEditor |
| **User Roles** | clinic_admin |
| **Related Features** | Staff Management |

---

### 5.3 Clinic Admin - Clinic Management
| Property | Value |
|----------|-------|
| **Route** | `/clinic-admin/clinics` |
| **File** | `src/app/(app)/clinic-admin/clinics/page.tsx` |
| **Purpose** | Manage clinic information and settings |
| **Key Components** | ClinicForm, LocationEditor, OperatingHours |
| **User Roles** | clinic_admin |
| **Related Features** | Clinic Settings |

---

### 5.4 Clinic Admin - Reports
| Property | Value |
|----------|-------|
| **Route** | `/clinic-admin/reports` |
| **File** | `src/app/(app)/clinic-admin/reports/page.tsx` |
| **Purpose** | Generate clinic performance reports |
| **Key Components** | ReportGenerator, DateRangeSelector, ExportOptions |
| **User Roles** | clinic_admin |
| **Related Features** | Clinic Analytics |

---

### 5.5 Platform Admin Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/platform-admin` |
| **File** | `src/app/(app)/platform-admin/page.tsx` |
| **Purpose** | Platform-wide administration |
| **Key Components** | AlertPanel, PlatformStats, RecentActivity |
| **User Roles** | platform_admin |
| **Related Features** | Platform Management |

**Stats**:
- Total users
- Active clinics
- Consultations today
- System health

---

### 5.6 Platform Admin - User Management
| Property | Value |
|----------|-------|
| **Route** | `/platform-admin/users` |
| **File** | `src/app/(app)/platform-admin/users/page.tsx` |
| **Purpose** | Manage platform users |
| **Key Components** | UserTable, UserFilters, RoleEditor |
| **User Roles** | platform_admin |
| **Related Features** | User Administration |

---

### 5.7 Platform Admin - Audit Logs
| Property | Value |
|----------|-------|
| **Route** | `/platform-admin/audit` |
| **File** | `src/app/(app)/platform-admin/audit/page.tsx` |
| **Purpose** | View system audit logs |
| **Key Components** | LogTable, FilterBar, LogDetail |
| **User Roles** | platform_admin |
| **Related Features** | Compliance, Security |

---

### 5.8 Caregiver Management
| Property | Value |
|----------|-------|
| **Route** | `/caregiver` |
| **File** | `src/app/(app)/caregiver/page.tsx` |
| **Purpose** | Manage caregiver access to child profiles |
| **Key Components** | CaregiverList, InviteForm, AccessControls |
| **User Roles** | parent |
| **Related Features** | Caregiver Access (Feature #15) |

---

### 5.9 Caregiver Invite
| Property | Value |
|----------|-------|
| **Route** | `/caregiver/invite` |
| **File** | `src/app/(app)/caregiver/invite/page.tsx` |
| **Purpose** | Invite new caregiver |
| **Key Components** | InviteForm, RoleSelector, ExpirySettings |
| **User Roles** | parent |
| **Related Features** | Caregiver Invitation |

---

## 6. Navigation Structure

### 6.1 Public Navigation
```
/ (Landing)
├── /faq
├── /login
└── /signup
```

### 6.2 Parent Dashboard Navigation
```
/dashboard (Parent Hub)
├── /symptom-check
├── /growth-charts
├── /growth-reference
├── /dosage-calculator
├── /emergency
├── /milestones
├── /vaccinations
├── /medical-history
├── /medicine-cabinet
├── /drug-interactions
├── /triage-review
├── /consultant
├── /patients
├── /admin
├── /reports (from app group)
├── /appointments (from app group)
├── /notifications (from app group)
└── /caregiver (from app group)
    └── /caregiver/invite
```

### 6.3 Doctor Navigation
```
/doctor (Doctor Hub)
├── /doctor/patients
├── /doctor/patient/[id]
├── /doctor/appointments
├── /ai-consultant
├── /notifications
└── /reports
```

### 6.4 Nurse Navigation
```
/nurse (Nurse Hub)
├── /nurse/vitals
├── /nurse/tasks
├── /ai-consultant
├── /notifications
└── /reports
```

### 6.5 Clinic Admin Navigation
```
/clinic-admin (Clinic Hub)
├── /clinic-admin/staff
├── /clinic-admin/clinics
├── /clinic-admin/reports
├── /ai-consultant
├── /notifications
└── /reports
```

### 6.6 Platform Admin Navigation
```
/platform-admin (Platform Hub)
├── /platform-admin/users
├── /platform-admin/audit
├── /ai-consultant
├── /notifications
└── /reports
```

---

## 7. Screen Component Summary

### 7.1 Route Group Distribution

| Route Group | Screen Count | Files |
|------------|--------------|-------|
| Public (/) | 2 | page.tsx, faq/page.tsx |
| Auth (/auth) | 2 | login/page.tsx, signup/page.tsx |
| Dashboard (/dashboard) | 16 | Various pages under (dashboard) |
| App (/app) | 20 | Various pages under (app) |
| **Total** | **40** | |

### 7.2 Screen Complexity Distribution

| Complexity | Screens |
|-----------|---------|
| **Complex** (multi-step, charts, forms) | 15 |
| **Medium** (lists, cards, tabs) | 18 |
| **Simple** (basic display, settings) | 7 |

### 7.3 Role-Based Screen Access

| Role | Primary Screens |
|------|----------------|
| **Public** | Landing, FAQ, Login, Signup |
| **Parent** | Dashboard hub + 16 feature screens |
| **Caregiver** | Limited dashboard + 6 feature screens |
| **Doctor** | Doctor hub + 5 doctor-specific screens |
| **Nurse** | Nurse hub + 3 nurse-specific screens |
| **Clinic Admin** | Clinic admin hub + 4 management screens |
| **Platform Admin** | Platform admin hub + 2 admin screens |

---

## 8. Key UI Components Used

### 8.1 Shared Components
- **Navigation** - Public site navigation
- **Button** - Primary, secondary, ghost variants
- **Topbar** - Dashboard top bar with user info
- **Sidebar** - Side navigation with role-based menu
- **BottomNav** - Mobile bottom navigation
- **ProtectedRoute** - Route guard with role checking

### 8.2 Form Components
- Input fields
- Select dropdowns
- Date pickers
- Checkboxes
- Radio buttons
- Toggle switches
- Search inputs

### 8.3 Data Display
- Cards
- Tables
- Lists
- Charts (growth charts)
- Badges/Tags
- Avatars
- Progress indicators
- Empty states

### 8.4 Feedback
- Toast notifications
- Loading spinners
- Error messages
- Success confirmations
- Modals/Dialogs
- Alerts

---

## 9. Implementation Notes for New Project

### 9.1 Recommended Architecture

1. **Route Organization**
   - Use Next.js App Router with route groups
   - Separate public, auth, dashboard, and admin routes
   - Implement dynamic routes for patient details (`/patient/[id]`)

2. **Component Structure**
   ```
   components/
   ├── ui/          # Reusable UI components
   ├── features/    # Feature-specific components
   ├── layouts/      # Layout components
   └── providers/    # Context providers
   ```

3. **State Management**
   - React Context for auth state
   - React Query for server state
   - Local state for component-specific data

4. **Authentication Flow**
   - Implement role-based routing
   - Protected route wrapper component
   - Session management with cookies/tokens

5. **API Design**
   - RESTful endpoints
   - FHIR-compliant health data
   - JWT authentication

### 9.2 Priority Screens for MVP

**Phase 1 - Core (15 screens)**:
1. Landing Page
2. Login / Signup
3. Parent Dashboard
4. Symptom Checker
5. Growth Charts
6. Dosage Calculator
7. Vaccinations
8. Milestones
9. Medical History
10. Medicine Cabinet
11. Emergency Guide
12. AI Consultant
13. Notifications
14. Doctor Dashboard
15. Patient Detail View

**Phase 2 - Extended (12 screens)**:
1. Appointments
2. Reports
3. Triage Review
4. Growth Reference
5. Drug Interactions
6. Caregiver Management
7. Doctor Patients List
8. Nurse Dashboard
9. Nurse Vitals
10. Nurse Tasks
11. Clinic Admin Dashboard
12. Platform Admin Dashboard

**Phase 3 - Management (13 screens)**:
1. Staff Management
2. Clinic Management
3. Clinic Reports
4. User Management
5. Audit Logs
6. Settings Pages
7. Profile Pages
8. Help/FAQ expansion
9. Onboarding flows
10. Analytics dashboards
11. Export/Import features
12. Notification preferences
13. Security settings

---

## Appendix: Screen IDs and File Paths

| Screen ID | Route | File Path |
|-----------|-------|-----------|
| SCR-001 | / | src/app/page.tsx |
| SCR-002 | /faq | src/app/faq/page.tsx |
| SCR-003 | /login | src/app/(auth)/login/page.tsx |
| SCR-004 | /signup | src/app/(auth)/signup/page.tsx |
| SCR-005 | /dashboard | src/app/(dashboard)/dashboard/page.tsx |
| SCR-006 | /symptom-check | src/app/(dashboard)/symptom-check/page.tsx |
| SCR-007 | /growth-charts | src/app/(dashboard)/growth-charts/page.tsx |
| SCR-008 | /dosage-calculator | src/app/(dashboard)/dosage-calculator/page.tsx |
| SCR-009 | /emergency | src/app/(dashboard)/emergency/page.tsx |
| SCR-010 | /milestones | src/app/(dashboard)/milestones/page.tsx |
| SCR-011 | /vaccinations | src/app/(dashboard)/vaccinations/page.tsx |
| SCR-012 | /medical-history | src/app/(dashboard)/medical-history/page.tsx |
| SCR-013 | /medicine-cabinet | src/app/(dashboard)/medicine-cabinet/page.tsx |
| SCR-014 | /drug-interactions | src/app/(dashboard)/drug-interactions/page.tsx |
| SCR-015 | /growth-reference | src/app/(dashboard)/growth-reference/page.tsx |
| SCR-016 | /triage-review | src/app/(dashboard)/triage-review/page.tsx |
| SCR-017 | /consultant | src/app/(dashboard)/consultant/page.tsx |
| SCR-018 | /ai-consultant | src/app/(app)/ai-consultant/page.tsx |
| SCR-019 | /appointments | src/app/(app)/appointments/page.tsx |
| SCR-020 | /reports | src/app/(app)/reports/page.tsx |
| SCR-021 | /notifications | src/app/(app)/notifications/page.tsx |
| SCR-022 | /patients | src/app/(dashboard)/patients/page.tsx |
| SCR-023 | /admin | src/app/(dashboard)/admin/page.tsx |
| SCR-024 | /doctor | src/app/(app)/doctor/page.tsx |
| SCR-025 | /doctor/patients | src/app/(app)/doctor/patients/page.tsx |
| SCR-026 | /doctor/patient/[id] | src/app/(app)/doctor/patient/[id]/page.tsx |
| SCR-027 | /doctor/appointments | src/app/(app)/doctor/appointments/page.tsx |
| SCR-028 | /nurse | src/app/(app)/nurse/page.tsx |
| SCR-029 | /nurse/vitals | src/app/(app)/nurse/vitals/page.tsx |
| SCR-030 | /nurse/tasks | src/app/(app)/nurse/tasks/page.tsx |
| SCR-031 | /clinic-admin | src/app/(app)/clinic-admin/page.tsx |
| SCR-032 | /clinic-admin/staff | src/app/(app)/clinic-admin/staff/page.tsx |
| SCR-033 | /clinic-admin/clinics | src/app/(app)/clinic-admin/clinics/page.tsx |
| SCR-034 | /clinic-admin/reports | src/app/(app)/clinic-admin/reports/page.tsx |
| SCR-035 | /platform-admin | src/app/(app)/platform-admin/page.tsx |
| SCR-036 | /platform-admin/users | src/app/(app)/platform-admin/users/page.tsx |
| SCR-037 | /platform-admin/audit | src/app/(app)/platform-admin/audit/page.tsx |
| SCR-038 | /caregiver | src/app/(app)/caregiver/page.tsx |
| SCR-039 | /caregiver/invite | src/app/(app)/caregiver/invite/page.tsx |

---

*Document generated for Pedi-Ai project documentation*
*Purpose: Support clean slate project implementation*
