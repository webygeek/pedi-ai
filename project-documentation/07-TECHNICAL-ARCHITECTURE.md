# Technical Architecture

Complete technical specification for Pedi-Ai platform.

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Mobile App     │  │    Web App      │  │ Clinician      │  │
│  │  (React Native)  │  │   (Next.js)    │  │   Portal       │  │
│  │                  │  │                 │  │  (Next.js)     │  │
│  │  • iOS          │  │  • Dashboard    │  │                │  │
│  │  • Android      │  │  • Settings     │  │  • Patients    │  │
│  │                  │  │  • Reports      │  │  • Analytics   │  │
│  └────────┬────────┘  └────────┬────────┘  └───────┬────────┘  │
│           │                    │                    │           │
└───────────┼────────────────────┼────────────────────┼───────────┘
            │                    │                    │
            ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Kong / AWS API Gateway                    ││
│  │                                                              ││
│  │  • Rate Limiting          • Request Authentication         ││
│  │  • Load Balancing         • API Versioning                 ││
│  │  • SSL Termination         • Request Logging                ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │   REST API   │    │   GraphQL    │    │  WebSocket   │    │
│  │  (Express)   │    │   (Apollo)   │    │  (Socket.io) │    │
│  │              │    │              │    │              │    │
│  │  CRUD Ops    │    │  Flexible    │    │ Real-time    │    │
│  │  Standard    │    │   Queries    │    │   Updates    │    │
│  │  Endpoints   │    │              │    │              │    │
│  └──────────────┘    └──────────────┘    └──────────────┘    │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MICROSERVICES LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  User Service   │  │  Health Service │  │   AI Services  │   │
│  │                 │  │                │  │                │   │
│  │  • Auth        │  │  • Symptoms    │  │  • Triage ML   │   │
│  │  • Profiles    │  │  • Growth      │  │  • NLP Engine  │   │
│  │  • Family      │  │  • Milestones  │  │  • Predictions │   │
│  │  • Settings    │  │  • Conditions  │  │                │   │
│  └────────┬───────┘  └────────┬───────┘  └───────┬────────┘   │
│           │                    │                    │           │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  Auth Service   │  │ Growth Service │  │  ML Pipeline    │   │
│  │                 │  │                │  │                │   │
│  │  • JWT Tokens  │  │  • WHO/CDC     │  │  • TensorFlow  │   │
│  │  • OAuth 2.0   │  │  • Percentiles │  │  • HuggingFace  │   │
│  │  • MFA         │  │  • Trajectories│  │                │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │ Notification   │  │ Appointment    │  │ EHR Integration│   │
│  │   Service      │  │    Service     │  │    Service     │   │
│  │                │  │                │  │                │   │
│  │  • Push (FCM)  │  │  • Scheduling │  │  • FHIR R4    │   │
│  │  • SMS (Twilio)│  │  • Reminders  │  │  • Epic       │   │
│  │  • Email       │  │  • Calendar   │  │  • Cerner     │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │    MongoDB      │  │     Redis      │  │   AWS S3       │   │
│  │   (Primary)     │  │   (Cache)     │  │  (Storage)    │   │
│  │                 │  │                │  │                │   │
│  │  • Users        │  │  • Sessions   │  │  • Images     │   │
│  │  • Profiles     │  │  • Cache     │  │  • Videos     │   │
│  │  • Health Data  │  │  • Rate Limit │  │  • Documents  │   │
│  │  • Logs         │  │               │  │               │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                    FHIR Server (Mirth/IBM)               │   │
│  │                                                          │   │
│  │  • Patient resources     • Observation resources          │   │
│  │  • Condition resources   • Procedure resources          │   │
│  │  • Medication resources  • Encounter resources           │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Technology Stack

### Client Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Mobile Framework** | React Native | 0.73+ | Cross-platform mobile |
| **Mobile Runtime** | Expo | SDK 50+ | Development tooling |
| **Web Framework** | Next.js | 14+ | Web application |
| **UI Library** | React | 18+ | Component framework |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first CSS |
| **State Management** | Zustand | 4+ | Lightweight state |
| **Navigation** | React Navigation | 6+ | Mobile navigation |
| **HTTP Client** | Axios | 1+ | API communication |

### Backend Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Runtime** | Node.js | 20 LTS | Server runtime |
| **Framework** | Express.js | 4.18+ | REST API |
| **GraphQL** | Apollo Server | 4+ | GraphQL API |
| **Real-time** | Socket.io | 4+ | WebSocket support |
| **Authentication** | Firebase Auth | - | User authentication |
| **Queue** | BullMQ | 5+ | Job processing |
| **Logging** | Winston | 3+ | Application logging |

### Data Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Primary Database** | MongoDB | 7+ | Document storage |
| **Cache** | Redis | 7+ | Session & cache |
| **Object Storage** | AWS S3 | - | File storage |
| **Search** | Elasticsearch | 8+ | Full-text search |
| **FHIR Server** | IBM FHIR Server | 5+ | Healthcare data |

### AI/ML Technologies

| Layer | Technology | Purpose |
|-------|------------|---------|
| **LLM** | Med-PaLM 2 / Claude | Symptom triage, chat |
| **NLP** | Hugging Face Transformers | Text processing |
| **CV** | TensorFlow.js | Image analysis |
| **ML Pipeline** | MLflow | Model versioning |
| **Embeddings** | OpenAI Embeddings | Semantic search |

---

## 📁 Project Structure

### Mobile App Structure

```
pedi-ai-app/
├── src/
│   ├── app/                          # Expo Router pages
│   │   ├── _layout.tsx               # Root layout
│   │   ├── index.tsx                 # Home/Dashboard
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── forgot-password.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── growth.tsx
│   │   │   ├── milestones.tsx
│   │   │   ├── vaccines.tsx
│   │   │   └── more.tsx
│   │   ├── symptoms/
│   │   │   ├── index.tsx
│   │   │   └── results.tsx
│   │   ├── dosage/
│   │   │   └── index.tsx
│   │   ├── emergency/
│   │   │   ├── index.tsx
│   │   │   ├── cpr.tsx
│   │   │   ├── choking.tsx
│   │   │   └── ...
│   │   ├── chat/
│   │   │   └── index.tsx
│   │   └── settings/
│   │       ├── index.tsx
│   │       ├── profile.tsx
│   │       └── notifications.tsx
│   │
│   ├── components/
│   │   ├── ui/                       # Design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── SafeArea.tsx
│   │   ├── features/
│   │   │   ├── GrowthChart.tsx
│   │   │   ├── MilestoneCard.tsx
│   │   │   ├── DosageCalculator.tsx
│   │   │   ├── SymptomInput.tsx
│   │   │   └── ...
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── features/                     # Feature modules
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── stores/
│   │   ├── health/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── stores/
│   │   ├── growth/
│   │   ├── milestones/
│   │   ├── symptoms/
│   │   ├── dosage/
│   │   ├── vaccines/
│   │   └── chat/
│   │
│   ├── services/                      # API services
│   │   ├── api.ts                     # Axios instance
│   │   ├── auth.service.ts
│   │   ├── health.service.ts
│   │   ├── growth.service.ts
│   │   ├── milestone.service.ts
│   │   └── chat.service.ts
│   │
│   ├── stores/                        # Global state
│   │   ├── authStore.ts
│   │   ├── profileStore.ts
│   │   ├── childStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── hooks/                         # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useChild.ts
│   │   └── useNotification.ts
│   │
│   ├── utils/                         # Utilities
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   │
│   ├── types/                         # TypeScript types
│   │   ├── user.ts
│   │   ├── child.ts
│   │   ├── health.ts
│   │   └── api.ts
│   │
│   ├── constants/                      # App constants
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── medications.ts
│   │
│   ├── assets/                        # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── animations/
│   │
│   └── lib/                           # Third-party config
│       ├── firebase.ts
│       ├──amplitude.ts
│       └── sentry.ts
│
├── ios/                               # iOS native code
├── android/                           # Android native code
├── app.json
├── package.json
└── tsconfig.json
```

### Web Application Structure

```
pedi-ai-web/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   ├── globals.css                # Global styles
│   │   │
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── about/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── children/
│   │   │   ├── growth/
│   │   │   ├── milestones/
│   │   │   └── ...
│   │   │
│   │   ├── clinician/
│   │   │   ├── layout.tsx
│   │   │   ├── patients/
│   │   │   ├── alerts/
│   │   │   └── reports/
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── users/
│   │   │   ├── settings/
│   │   │   └── analytics/
│   │   │
│   │   └── api/                       # API routes
│   │       ├── auth/
│   │       ├── users/
│   │       ├── health/
│   │       ├── growth/
│   │       ├── chat/
│   │       └── webhooks/
│   │
│   ├── components/
│   │   ├── ui/                        # Design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── GrowthChart.tsx
│   │   │   ├── MilestoneProgress.tsx
│   │   │   └── ...
│   │   │
│   │   ├── clinician/
│   │   │   ├── PatientList.tsx
│   │   │   ├── PatientDetail.tsx
│   │   │   ├── AlertCard.tsx
│   │   │   └── ...
│   │   │
│   │   └── marketing/
│   │       ├── Hero.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── Testimonial.tsx
│   │       └── ...
│   │
│   ├── lib/                           # Utilities
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── validators.ts
│   │
│   ├── hooks/                         # Custom hooks
│   ├── stores/                        # State management
│   ├── types/                         # TypeScript types
│   └── constants/                     # Constants
│
├── public/                            # Static files
├── styles/                            # Global styles
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔌 API Design

### REST API Endpoints

#### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/forgot-password` | Password reset |
| POST | `/api/auth/verify-email` | Email verification |
| POST | `/api/auth/mfa/setup` | Setup MFA |
| POST | `/api/auth/mfa/verify` | Verify MFA code |

#### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user |
| PATCH | `/api/users/me` | Update user profile |
| GET | `/api/users/me/children` | Get children |
| POST | `/api/users/me/children` | Add child |
| GET | `/api/users/me/children/:id` | Get child details |
| PATCH | `/api/users/me/children/:id` | Update child |
| DELETE | `/api/users/me/children/:id` | Remove child |

#### Health Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health/symptoms` | Get symptom assessments |
| POST | `/api/health/symptoms` | Create symptom assessment |
| GET | `/api/health/symptoms/:id` | Get assessment result |
| POST | `/api/health/symptoms/:id/feedback` | Submit feedback |

#### Growth

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/growth/:childId` | Get growth records |
| POST | `/api/growth/:childId` | Add growth measurement |
| GET | `/api/growth/:childId/chart` | Get chart data |
| GET | `/api/growth/:childId/percentile` | Calculate percentile |

#### Milestones

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/milestones/:childId` | Get milestones |
| POST | `/api/milestones/:childId` | Log milestone achievement |
| GET | `/api/milestones/:childId/upcoming` | Get upcoming milestones |

#### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/message` | Send chat message |
| GET | `/api/chat/history` | Get chat history |
| DELETE | `/api/chat/history` | Clear chat history |

### GraphQL Schema (Excerpt)

```graphql
type User {
  id: ID!
  email: String!
  name: String!
  role: UserRole!
  children: [Child!]!
  createdAt: DateTime!
}

type Child {
  id: ID!
  name: String!
  dateOfBirth: Date!
  sex: Sex!
  photo: String
  healthProfile: HealthProfile!
  growth: [GrowthRecord!]!
  milestones: [Milestone!]!
}

type HealthProfile {
  allergies: [Allergy!]!
  medications: [Medication!]!
  conditions: [Condition!]!
  emergencyContacts: [Contact!]!
}

type Query {
  me: User!
  child(id: ID!): Child
  children: [Child!]!
  symptomAssessment(childId: ID!, input: SymptomInput!): AssessmentResult!
  growthChart(childId: ID!, type: GrowthChartType!): GrowthChartData!
  upcomingMilestones(childId: ID!): [Milestone!]!
}

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  addChild(input: ChildInput!): Child!
  updateChild(id: ID!, input: ChildInput!): Child!
  addGrowthRecord(childId: ID!, input: GrowthInput!): GrowthRecord!
  logMilestone(childId: ID!, milestoneId: ID!, date: Date!): Milestone!
  sendMessage(input: MessageInput!): Message!
}

input RegisterInput {
  email: String!
  password: String!
  name: String!
}

input ChildInput {
  name: String!
  dateOfBirth: Date!
  sex: Sex!
  photo: String
}
```

---

## 🔐 Security Architecture

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User enters credentials                                     │
│      │                                                      │
│      ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Firebase Auth                                        │   │
│  │  • Email/Password                                   │   │
│  │  • Google Sign-In                                    │   │
│  │  • Apple Sign-In                                     │   │
│  │  • Phone (future)                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│      │                                                      │
│      ▼                                                      │
│  JWT Token Generation                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Access Token (15 min) + Refresh Token (7 days)     │   │
│  │  • User ID                                          │   │
│  │  • Role (parent/clinician/admin)                   │   │
│  │  • Family/Organization ID                           │   │
│  │  • Expiration                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│      │                                                      │
│      ▼                                                      │
│  MFA (for clinicians)                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  • TOTP (Google Authenticator)                      │   │
│  │  • SMS backup codes                                │   │
│  │  • Biometrics (mobile)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│      │                                                      │
│      ▼                                                      │
│  Session stored in Redis                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Encryption

| Data State | Encryption | Standard |
|------------|------------|----------|
| **At Rest** | AES-256 | FIPS 140-2 |
| **In Transit** | TLS 1.3 | Modern protocols |
| **Passwords** | bcrypt | Cost factor 12 |
| **API Keys** | Encrypted at rest | AWS KMS |

### HIPAA Compliance

```
┌─────────────────────────────────────────────────────────────┐
│                 HIPAA COMPLIANCE MATRIX                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Administrative Safeguards                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Security Management Process                      │   │
│  │  ✓ Workforce Security                              │   │
│  │  ✓ Information Access Management                    │   │
│  │  ✓ Security Awareness Training                     │   │
│  │  ✓ Security Incident Procedures                    │   │
│  │  ✓ Contingency Planning                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Physical Safeguards                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Facility Access Controls                        │   │
│  │  ✓ Workstation Security                            │   │
│  │  ✓ Device and Media Controls                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Technical Safeguards                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✓ Access Control                                  │   │
│  │  ✓ Audit Controls                                  │   │
│  │  ✓ Integrity Controls                              │   │
│  │  ✓ Transmission Security                           │   │
│  │  ✓ Person or Entity Authentication                 │   │
│  │  ✓ Emergency Access                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

### Environment Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ENVIRONMENTS                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐   │
│  │   Development   │  │     Staging     │  │ Production  │   │
│  │                 │  │                 │  │             │   │
│  │  Local + Cloud  │  │  Pre-production │  │   Live      │   │
│  │                 │  │                 │  │             │   │
│  │  • Dev APIs    │  │  • Staging API  │  │  • Prod API │   │
│  │  • Test DB     │  │  • Copy of Prod │  │  • Prod DB  │   │
│  │  • Dev Apps    │  │  • Full Test    │  │  • Live App │   │
│  └─────────────────┘  └─────────────────┘  └─────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Infrastructure (AWS)

```
┌─────────────────────────────────────────────────────────────┐
│                    AWS INFRASTRUCTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Route 53                         │   │
│  │                   (DNS Management)                   │   │
│  └──────────────────────────┬────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    CloudFront                       │   │
│  │                  (CDN / Edge)                       │   │
│  └──────────────────────────┬────────────────────────┘   │
│                              │                              │
│              ┌───────────────┴───────────────┐             │
│              ▼                               ▼             │
│  ┌─────────────────────┐       ┌─────────────────────┐   │
│  │    EKS (Web App)     │       │  EKS (API Server)  │   │
│  │                      │       │                    │   │
│  │  • Next.js pods     │       │  • Express pods    │   │
│  │  • Auto-scaling     │       │  • Auto-scaling   │   │
│  │  • Multi-AZ         │       │  • Multi-AZ       │   │
│  └──────────┬──────────┘       └──────────┬──────────┘   │
│             │                               │               │
│             └───────────────┬───────────────┘             │
│                             │                              │
│                             ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    RDS (MongoDB)                     │   │
│  │                  (Primary + Replica)                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      ElastiCache                     │   │
│  │                       (Redis)                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      S3 + CloudFront                 │   │
│  │                  (Static Assets + Media)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.0*
*Last Updated: June 2026*
