# User Types and Personas

Complete guide to all user types who interact with Pedi-Ai.

---

## 📋 Overview of User Types

| User Type | Role | Primary Goal | Access Level |
|-----------|------|--------------|--------------|
| **Parent/Caregiver** | Primary | Get reliable health guidance | Consumer App |
| **Pediatrician** | Secondary | Monitor patients effectively | Clinician Portal |
| **Healthcare System** | Enterprise | Improve outcomes, reduce costs | Enterprise Dashboard |
| **School/Educator** | Future | Support developmental needs | Limited Read Access |

---

## 👨‍👩‍👧 User Type 1: Parent/Caregiver

### Definition
Primary users who use Pedi-Ai to care for their children's health and development.

### Sub-Types

#### 1.1 First-Time Parents
| Attribute | Details |
|-----------|---------|
| **Age Range** | 25-35 |
| **Children** | First child, 0-2 years old |
| **Tech Proficiency** | High |
| **Anxiety Level** | Very High |
| **Key Needs** | Reassurance, quick answers, educational content |

**Personality Traits:**
- Overwhelmingly cautious
- Research everything extensively
- Need validation for decisions
- High information consumption

**Primary Use Cases:**
- Late-night fever concerns
- Developmental milestone questions
- Feeding and sleep guidance
- First aid information

#### 1.2 Experienced Parents
| Attribute | Details |
|-----------|---------|
| **Age Range** | 30-45 |
| **Children** | Multiple children, various ages |
| **Tech Proficiency** | Medium-High |
| **Anxiety Level** | Moderate |
| **Key Needs** | Efficient tools, chronic condition management |

**Personality Traits:**
- More confident but still concerned
- Time-constrained
- Value efficiency
- Appreciate automation

**Primary Use Cases:**
- Chronic condition management (asthma, allergies)
- Medication dosing for multiple children
- Vaccination scheduling
- Quick symptom checks

#### 1.3 Single Parents
| Attribute | Details |
|-----------|---------|
| **Challenge** | Managing healthcare alone |
| **Time Constraints** | Very High |
| **Support Needs** | Peer connections, practical tools |

**Primary Use Cases:**
- Emergency guidance
- Efficient appointment scheduling
- Self-care reminders for parent
- Resource connections

#### 1.4 Grandparents/Caregivers
| Attribute | Details |
|-----------|---------|
| **Role** | Occasional or full-time caregivers |
| **Tech Proficiency** | Variable (often lower) |
| **Key Needs** | Simple interface, clear guidance |

**Primary Use Cases:**
- Emergency protocols
- Medication reminders
- Quick symptom assessment
- Connection to parents for updates

#### 1.5 Parents of Children with Chronic Conditions
| Attribute | Details |
|-----------|---------|
| **Conditions** | Asthma, Diabetes, ADHD, Allergies, Eczema |
| **Healthcare Involvement** | High |
| **Tracking Needs** | Complex, ongoing |

**Primary Use Cases:**
- Condition-specific monitoring tools
- Medication and treatment tracking
- Trigger identification
- Healthcare coordination
- School/daycare communication

#### 1.6 Parents of Children with Special Needs
| Attribute | Details |
|-----------|---------|
| **Conditions** | Autism, Developmental Delays, Genetic Conditions |
| **Healthcare Involvement** | Very High |
| **Documentation Needs** | Extensive |

**Primary Use Cases:**
- Detailed developmental tracking
- IEP/504 support documentation
- Therapy coordination
- Behavior tracking
- Specialist appointment preparation

### Parent User Flows

```
┌─────────────────────────────────────────────────────────────┐
│                    ONBOARDING FLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Download App                                                │
│      │                                                      │
│      ▼                                                      │
│  Create Account (Email/Phone/Social)                        │
│      │                                                      │
│      ▼                                                      │
│  Add Child Profile                                           │
│      │  ├── Name, DOB, Gender                              │
│      │  ├── Photo (optional)                               │
│      │  └── Medical History (optional)                      │
│      │                                                      │
│      ▼                                                      │
│  Complete Health Profile                                     │
│      │  ├── Allergies                                      │
│      │  ├── Medications                                    │
│      │  ├── Chronic Conditions                             │
│      │  └── Emergency Contacts                             │
│      │                                                      │
│      ▼                                                      │
│  Set Preferences                                             │
│      │  ├── Notification Settings                           │
│      │  ├── Privacy Preferences                            │
│      │  └── Sharing Permissions                            │
│      │                                                      │
│      ▼                                                      │
│  Guided Tour (Optional)                                      │
│      │                                                      │
│      ▼                                                      │
│  Dashboard Ready ✓                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Parent Key Actions

| Action | Frequency | Purpose |
|--------|-----------|---------|
| Check Symptoms | As needed | Get triage guidance |
| Log Growth | Weekly/Monthly | Track development |
| Track Milestones | Weekly | Monitor progress |
| Calculate Dosage | As needed | Safe medication |
| Ask AI | Daily | Get answers |
| View Dashboard | Daily | Stay informed |

---

## 👨‍⚕️ User Type 2: Pediatrician/Clinician

### Definition
Healthcare professionals who use Pedi-Ai to monitor their patients and provide better care.

### Sub-Types

#### 2.1 General Pediatrician
| Attribute | Details |
|-----------|---------|
| **Setting** | Private practice or clinic |
| **Patient Volume** | 50-100+ patients daily |
| **Time Per Patient** | Limited |
| **Key Needs** | Quick insights, risk stratification |

**Primary Use Cases:**
- Review patient dashboards before visits
- Receive alerts for concerning trends
- Access longitudinal data
- Communicate with families

#### 2.2 Developmental Pediatrician
| Attribute | Details |
|-----------|---------|
| **Specialty** | Developmental delays, autism, ADHD |
| **Assessment Needs** | Detailed, longitudinal |
| **Key Needs** | Milestone tracking, video analysis |

**Primary Use Cases:**
- Review video AI screening results
- Track developmental trajectories
- Assess intervention progress
- Coordinate with early intervention

#### 2.3 Family Physician
| Attribute | Details |
|-----------|---------|
| **Scope** | All ages, including children |
| **Variety** | Broad but less deep specialization |
| **Key Needs** | General guidance, referral decision support |

**Primary Use Cases:**
- General pediatric guidance
- When to refer to specialist
- Growth and development monitoring
- Acute illness triage

#### 2.4 Nurse Practitioner
| Attribute | Details |
|-----------|---------|
| **Role** | Independent or collaborative practice |
| **Responsibilities** | Assessment, diagnosis, treatment |
| **Key Needs** | Clinical decision support |

**Primary Use Cases:**
- Patient monitoring
- Parent education resources
- Care coordination
- Documentation support

### Clinician User Flows

```
┌─────────────────────────────────────────────────────────────┐
│                 CLINICIAN ONBOARDING                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Register with Medical Credentials                           │
│      │                                                      │
│      ▼                                                      │
│  Verify Medical License                                      │
│      │                                                      │
│      ▼                                                      │
│  Connect Practice/Health System                               │
│      │                                                      │
│      ▼                                                      │
│  EHR Integration Setup                                       │
│      │  ├── Epic                                           │
│      │  ├── Cerner                                         │
│      │  └── Other (FHIR compatible)                        │
│      │                                                      │
│      ▼                                                      │
│  Set Alert Preferences                                       │
│      │  ├── Risk Thresholds                                │
│      │  ├── Notification Channels                           │
│      │  └── Patient Filters                                 │
│      │                                                      │
│      ▼                                                      │
│  Dashboard Ready ✓                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Clinician Key Actions

| Action | Frequency | Purpose |
|--------|-----------|---------|
| Review Patient Dashboard | Before each visit | Prepare |
| Check Alerts | Daily | Prioritize patients |
| View Growth Charts | As needed | Assess development |
| Access Milestone Data | During assessments | Supplement exam |
| Send Messages | As needed | Communicate with families |
| Generate Reports | Monthly | Track outcomes |

---

## 🏥 User Type 3: Healthcare System

### Definition
Organizations (hospitals, clinics, health systems) that deploy Pedi-Ai for their patient population.

### Sub-Types

#### 3.1 Hospital Systems
| Attribute | Details |
|-----------|---------|
| **Scope** | Multiple facilities |
| **Patient Base** | Large, diverse |
| **Integration Needs** | Complex, enterprise-grade |

**Key Features:**
- Population health dashboard
- Enterprise EHR integration
- Custom branding options
- API access
- Usage analytics

#### 3.2 Pediatric Practices
| Attribute | Details |
|-----------|---------|
| **Scope** | Single or few locations |
| **Focus** | Pediatric-specific care |
| **Patient Relationship** | Long-term |

**Key Features:**
- Patient monitoring tools
- Parent engagement features
- Appointment integration
- Billing coordination

#### 3.3 Community Health Centers
| Attribute | Details |
|-----------|---------|
| **Scope** | Underserved populations |
| **Mission** | Access for all |
| **Special Needs** | Multi-language, low-tech options |

**Key Features:**
- Multi-language support
- Offline functionality
- Community resource integration
- Sliding scale coordination

#### 3.4 Health Insurance Companies
| Attribute | Details |
|-----------|---------|
| **Role** | Payer |
| **Interest** | Cost reduction, member health |
| **Data Needs** | Population analytics |

**Key Features:**
- Member utilization reports
- Outcome metrics
- Care gap identification
- ROI documentation

### Healthcare System User Flows

```
┌─────────────────────────────────────────────────────────────┐
│              HEALTHCARE SYSTEM ONBOARDING                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Initial Contact & Discovery                                 │
│      │                                                      │
│      ▼                                                      │
│  Requirements Gathering                                      │
│      │  ├── Integration needs                               │
│      │  ├── Customization requirements                      │
│      │  ├── User count and roles                            │
│      │  └── Compliance requirements                         │
│      │                                                      │
│      ▼                                                      │
│  Technical Integration                                       │
│      │  ├── EHR Connection (Epic/Cerner)                    │
│      │  ├── SSO Setup                                       │
│      │  ├── Data Mapping                                    │
│      │  └── Security Review                                 │
│      │                                                      │
│      ▼                                                      │
│  Staff Training                                              │
│      │  ├── Admin training                                 │
│      │  ├── Clinician training                             │
│      │  └── Parent/Family onboarding                       │
│      │                                                      │
│      ▼                                                      │
│  Pilot Launch                                               │
│      │                                                      │
│      ▼                                                      │
│  Full Rollout                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Healthcare System Key Actions

| Action | Frequency | Purpose |
|--------|-----------|---------|
| Monitor Population Health | Weekly | Identify trends |
| Generate Reports | Monthly | Track outcomes |
| Manage Users | As needed | Admin access |
| Review Integrations | Quarterly | Ensure stability |
| Configure Alerts | As needed | Customize settings |

---

## 🏫 User Type 4: School/Educator (Future)

### Definition
Schools and educators who need access to developmental data for educational planning.

### Sub-Types

#### 4.1 Early Childhood Education
| Attribute | Details |
|-----------|---------|
| **Setting** | Preschool, daycare |
| **Focus** | Developmental monitoring |
| **Age Group** | 0-5 years |

**Key Features:**
- Milestone access (parent-shared)
- Observation tools
- Communication with parents
- IEP/504 support

#### 4.2 K-12 Educators
| Attribute | Details |
|-----------|---------|
| **Setting** | Elementary school |
| **Focus** | Academic and behavioral support |
| **Age Group** | 5-12 years |

**Key Features:**
- ADHD behavior logging
- Academic progress tracking
- Accommodation tracking
- Teacher-parent communication

---

## 📊 User Type Comparison Matrix

| Feature | Parent | Clinician | Healthcare System | School |
|---------|--------|-----------|-------------------|--------|
| **Symptom Triage** | ✓ Full Access | — | — | — |
| **Growth Charts** | ✓ View | ✓ View | ✓ Aggregate | ✓ Read Only |
| **Milestone Tracker** | ✓ Full | ✓ View | ✓ Aggregate | ✓ Read Only |
| **AI Chatbot** | ✓ Full Access | — | — | — |
| **Dashboard** | ✓ Personal | ✓ Patient | ✓ Population | ✓ Limited |
| **Alerts** | ✓ Own Data | ✓ Own Patients | ✓ All Patients | ✓ Own Students |
| **EHR Integration** | — | ✓ | ✓ | — |
| **Reports** | ✓ Personal | ✓ Patient | ✓ Enterprise | ✓ Limited |
| **API Access** | — | — | ✓ | — |

---

*Document Version: 1.0*
*Last Updated: June 2026*
