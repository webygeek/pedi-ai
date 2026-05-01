# Pedi-Ai Design System

**Version:** 1.0
**Last Updated:** April 2026
**Based On:** pedi_ai_redesigned_dashboard_v2.html

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Shadows & Effects](#6-shadows--effects)
7. [Motion & Animation](#7-motion--animation)
8. [Accessibility](#8-accessibility)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Component Specs for Developers](#10-component-specs-for-developers)
11. [Design Direction Comparison](#11-design-direction-comparison)
12. [CSS Variables Reference](#12-css-variables-reference)

---

## 1. Design Philosophy

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Trust** | Medical-grade feel with clinical review signals |
| **Clarity** | Clear hierarchy, plain language, immediate comprehension |
| **Warmth** | Soft colors, friendly typography, approachable tone |
| **Calm** | Reduced visual noise, soothing palette, no overwhelming elements |

### Personality

- **Voice:** Warm, supportive, medically credible
- **Tone:** Encouraging for parents, professional for clinicians
- **Visual Style:** Editorial-meets-clinical, serif headlines with modern body text

---

## 2. Color System

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Forest | `#2c4a45` | Primary dark (sidebar, headings, text) |
| Sage | `#7bada6` | Secondary accent (success states, active elements) |
| Teal Light | `#a8d5c8` | Light accents, hover states |
| Coral | `#c04f7a` | Primary action, highlights, urgent badges |
| Cream | `#faf8f5` | Main content background |
| Mist | `#e8efee` | Dashboard/container background |

### Semantic Colors

| Purpose | Hex | Usage |
|---------|-----|-------|
| Success | `#7bada6` | On track, resolved, completed |
| Warning | `#faeeda` / `#b07850` | Attention needed, pending |
| Danger | `#9e3535` / `#8c2020` | Emergency, urgent care |
| Info | `#edf3fe` | Vaccinations, informational |

### Badge Colors

| Badge | Background | Text |
|-------|------------|------|
| On Track | `#e8f0ee` | `#2c5f58` |
| Home Care | `#e8f0ee` | `#2c5f58` |
| Warning | `#faeeda` | `#7a4e00` |
| Urgent | `#fde8e8` | `#8c2020` |
| Action | `#fbeaf0` | `#7a1040` |
| Pending | `#edf3fe` | varies |

### Sidebar Colors

| Element | Hex | Notes |
|---------|-----|-------|
| Background | `#2c4a45` | Dark forest green |
| Logo Text | `#ffffff` | White |
| Logo Tagline | `rgba(255,255,255,0.38)` | Subtle white |
| Nav Text | `rgba(255,255,255,0.5)` | Muted white |
| Nav Hover | `rgba(255,255,255,0.8)` | Brighter white |
| Active BG | `rgba(120,185,170,0.2)` | Semi-transparent sage |
| Active Border | `#7bada6` | Sage accent |

### Chart Colors

| Element | Hex |
|---------|-----|
| Chart Background | `#f6faf9` |
| Target Band | `#e1f5ee` |
| Inactive Bar | `#c5d8d4` |
| Active Bar | `#7bada6` |

---

## 3. Typography

### Font Families

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Logo | Playfair Display | 19px | 400 | - |
| Hero Name | Playfair Display | 26px | 400 | 1.1 |
| Card Title | Playfair Display | 14px | 400 | - |
| Stat Value | Playfair Display | 22px | 400 | 1 |
| Body | Inter | 10-11px | 400-500 | 1.5 |
| Labels | Inter | 8px | 500 | - |
| Badges | Inter | 8px | 500 | - |

### Text Transforms

```css
/* Uppercase labels */
text-transform: uppercase;
letter-spacing: 0.07em;

/* Subtle uppercase (sidebar) */
letter-spacing: 0.1em;
```

### Italic Usage

```css
.hero-name em {
  font-style: italic;
  color: #7bada6;
}
```

---

## 4. Spacing & Layout

### Border Radius

| Element | Radius |
|---------|--------|
| Dashboard Container | 14px |
| Cards | 10px |
| Buttons (pill) | 999px |
| Badges (pill) | 999px |
| Icons/Avatars | 50% (circles) or 7-8px |
| Input Fields | 20px |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight spacing |
| `--space-sm` | 6-8px | Inner padding |
| `--space-md` | 10-12px | Card padding |
| `--space-lg` | 14-16px | Section spacing |
| `--space-xl` | 22px | Page margins |

### Grid System

```css
/* Stats row - 4 columns */
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: 10px;

/* Bottom section - 2 columns */
grid-template-columns: 1fr 1fr;
gap: 12px;

/* Quick actions - 2x2 grid */
grid-template-columns: 1fr 1fr;
gap: 7px;
```

### Sidebar Width

```css
width: 200px;
```

---

## 5. Components

### 5.1 Buttons

#### Primary Button (Pill)
```css
background: #c04f7a;
border-radius: 999px;
padding: 9px 18px;
font-size: 11px;
font-weight: 500;
color: #fff;
```

#### Sidebar Navigation Item
```css
padding: 8px 16px;
font-size: 11px;
color: rgba(255,255,255,0.5);
border-radius: 0;

/* Active state */
background: rgba(120,185,170,0.2);
color: #a8d5c8;
border-left: 2px solid #7bada6;
```

#### Action Button
```css
background: #c04f7a;
border-radius: 999px;
padding: 5px 14px;
font-size: 10px;
font-weight: 500;
color: #fff;
```

### 5.2 Cards

#### Standard Card
```css
background: #fff;
border: 0.5px solid #dce8e5;
border-radius: 10px;
padding: 13px;
```

#### Highlight Card (urgent)
```css
border-color: #c04f7a;
background: #fff8fb;
```

### 5.3 Badges

```css
/* Standard badge */
display: inline-block;
padding: 2px 8px;
border-radius: 999px;
font-size: 8px;
font-weight: 500;

/* With accent bar (for stats) */
position: absolute;
top: 0;
left: 0;
right: 0;
height: 2px;
border-radius: 10px 10px 0 0;
```

### 5.4 Navigation

#### Sidebar Section Header
```css
font-size: 8px;
color: rgba(255,255,255,0.3);
letter-spacing: 0.1em;
text-transform: uppercase;
padding: 10px 16px 4px;
```

#### Nav Icon Container
```css
width: 14px;
height: 14px;
border-radius: 4px;
display: flex;
align-items: center;
justify-content: center;
font-size: 9px;
background: rgba(255,255,255,0.08);
```

### 5.5 Form Elements

#### Search Input
```css
background: #fff;
border: 0.5px solid #c5d8d4;
border-radius: 20px;
padding: 6px 14px;
font-size: 10px;
color: #9abbb7;
width: 170px;
```

#### Trust Indicator
```css
background: #e8f0ee;
border-radius: 20px;
padding: 4px 10px;

.trust-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7bada6;
}
```

### 5.6 Charts

#### Chart Container
```css
height: 80px;
background: #f6faf9;
border-radius: 6px;
```

#### Percentile Band
```css
position: absolute;
left: 0;
right: 0;
top: 20%;
height: 30%;
background: #e1f5ee;
opacity: 0.6;
```

#### Chart Bar
```css
flex: 1;
border-radius: 2px 2px 0 0;
```

### 5.7 Status Indicators

#### Milestone Checkbox
```css
width: 15px;
height: 15px;
border-radius: 50%;
border: 1.5px solid #c5d8d4;

/* Completed */
background: #7bada6;
border-color: #7bada6;
```

### 5.8 Trust Footer

```css
background: #f0f4f3;
border-top: 0.5px solid #dce8e5;
padding: 7px 22px;
```

---

## 6. Shadows & Effects

### Border Styles

```css
/* Standard card border */
border: 0.5px solid #dce8e5;

/* Sidebar separator */
border-bottom: 0.5px solid rgba(255,255,255,0.08);
```

### Hover States

```css
.sb-ni:hover {
  color: rgba(255,255,255,0.8);
}
```

---

## 7. Motion & Animation

### Fade Up Animation

```css
.anim-in {
  animation: fadeUp 0.4s ease both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Staggered Delays

```css
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.1s; }
.d3 { animation-delay: 0.15s; }
.d4 { animation-delay: 0.2s; }
.d5 { animation-delay: 0.25s; }
.d6 { animation-delay: 0.3s; }
.d7 { animation-delay: 0.35s; }
```

### Chart Bar Animation

```javascript
// Bars animate from 0 to target height
setTimeout(function() {
  bars.forEach(function(b) {
    b.style.height = b.getAttribute('data-h') + '%';
  });
}, 100);
```

---

## 8. Accessibility

### Color Contrast

| Element | Colors | Contrast Ratio |
|---------|--------|----------------|
| White on Forest | `#fff` / `#2c4a45` | ~10:1 ✓ |
| Sage on White | `#7bada6` / `#fff` | ~3:1 ⚠️ |
| Muted on Dark | `rgba(255,255,255,0.5)` / `#2c4a45` | ~5:1 ✓ |

### Focus States

```css
/* Ensure visible focus for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-sage);
  outline-offset: 2px;
}
```

### Screen Reader Support

```html
<h2 class="sr-only">Redesigned Pedi-Ai web dashboard...</h2>
```

---

## 9. Responsive Breakpoints

### Breakpoint System

```css
/* Mobile First Approach */

/* Small Mobile - 320px */
@media (max-width: 374px) { }

/* Mobile - 375px+ */
@media (min-width: 375px) { }

/* Large Mobile / Tablet - 768px+ */
@media (min-width: 768px) { }

/* Tablet / Small Desktop - 1024px+ */
@media (min-width: 1024px) { }

/* Desktop - 1280px+ */
@media (min-width: 1280px) { }

/* Large Desktop - 1536px+ */
@media (min-width: 1536px) { }
```

### Layout Behavior by Breakpoint

| Breakpoint | Layout | Sidebar | Stats Grid | Bottom Grid |
|------------|--------|---------|------------|-------------|
| < 375px | Single column | Hidden (hamburger) | 1 col | 1 col |
| 375-767px | Single column | Hidden (hamburger) | 2 col | 1 col |
| 768-1023px | With collapsible sidebar | Collapsible | 4 col | 2 col |
| 1024px+ | Full layout | Always visible | 4 col | 2 col |

### Mobile Adaptations

#### Sidebar → Mobile Navigation

```css
/* Mobile: Sidebar becomes bottom tab bar or hamburger menu */
@media (max-width: 767px) {
  .sb {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 8px 16px;
    z-index: 100;
  }

  .sb-nav {
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 0;
    overflow-x: auto;
  }

  .sb-sec {
    display: none; /* Hide section headers */
  }

  .sb-ni {
    padding: 8px 12px;
    font-size: 10px;
    border-radius: 8px;
    white-space: nowrap;
  }

  .sb-ni.active {
    border-left: none;
    border-bottom: 2px solid #7bada6;
  }

  .sb-logo,
  .sb-role,
  .sb-child,
  .sb-streak,
  .sb-emer {
    display: none; /* Hide non-essential elements */
  }

  .main {
    padding-bottom: 70px; /* Space for bottom nav */
  }
}
```

#### Stats Grid → Responsive

```css
/* Tablet+: 4 columns */
@media (min-width: 768px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Mobile: 2 columns */
@media (max-width: 480px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
}

/* Small Mobile: 1 column */
@media (max-width: 374px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
```

#### Bottom Section → Stacked

```css
/* Mobile: Stack columns */
@media (max-width: 767px) {
  .bottom {
    grid-template-columns: 1fr;
  }
}
```

#### Topbar Adaptations

```css
@media (max-width: 767px) {
  .topbar {
    padding: 10px 16px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .topbar-search {
    order: 3;
    width: 100%;
  }

  .topbar-right {
    margin-left: auto;
  }
}
```

#### Typography Scale Adjustments

```css
/* Large screens: Slightly larger text */
@media (min-width: 1280px) {
  .hero-name {
    font-size: 30px;
  }

  .card-title {
    font-size: 15px;
  }

  .stat-val {
    font-size: 24px;
  }
}

/* Mobile: Readable minimum sizes */
@media (max-width: 767px) {
  .hero-name {
    font-size: 22px;
  }

  .hero-sub {
    font-size: 12px;
  }

  .card-title {
    font-size: 14px;
  }

  .stat-val {
    font-size: 20px;
  }
}
```

### Touch Targets

```css
/* Minimum 44x44px touch targets for mobile */
@media (max-width: 767px) {
  .sb-ni,
  .hero-btn,
  .nba-btn,
  .card-link {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

### Mobile Gesture Zones

```css
/* Safe areas for notched devices */
@supports (padding: env(safe-area-inset-bottom)) {
  .sb {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

---

## 10. Component Specs for Developers

### 10.1 Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}
```

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| primary | `#c04f7a` | `#ffffff` | none |
| secondary | transparent | `#2c4a45` | `0.5px solid #dce8e5` |
| danger | `#9e3535` | `#ffffff` | none |
| ghost | transparent | `#7bada6` | none |

**Usage:**
```tsx
<Button variant="primary" size="md">
  Check symptoms now
</Button>
```

### 10.2 Card Component

```typescript
interface CardProps {
  variant?: 'default' | 'highlight' | 'flat';
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}
```

| Variant | Border | Background | Accent |
|---------|--------|------------|--------|
| default | `0.5px solid #dce8e5` | `#ffffff` | none |
| highlight | `0.5px solid #c04f7a` | `#fff8fb` | top bar |
| flat | none | `#faf8f5` | none |

### 10.3 Badge Component

```typescript
interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'info' | 'action';
  size?: 'sm' | 'md';
  children: ReactNode;
}
```

| Variant | Background | Text | Use Case |
|---------|------------|------|----------|
| success | `#e8f0ee` | `#2c5f58` | On track |
| warning | `#faeeda` | `#7a4e00` | Attention |
| danger | `#fde8e8` | `#8c2020` | Urgent |
| info | `#edf3fe` | varies | Vaccinations |
| action | `#fbeaf0` | `#7a1040` | Action needed |

### 10.4 Stat Card Component

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  percentile?: string;
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'action';
  };
  accentColor?: string;
  highlight?: boolean;
}
```

### 10.5 Navigation Item Component

```typescript
interface NavItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
}
```

### 10.6 Chart Component

```typescript
interface ChartProps {
  type: 'bar' | 'line';
  data: number[];
  labels: string[];
  targetBand?: { min: number; max: number };
  currentValue?: number;
  color?: string;
}
```

### 10.7 Avatar Component

```typescript
interface AvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor?: string;
}
```

### 10.8 Input Component

```typescript
interface InputProps {
  type: 'text' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: ReactNode;
}
```

### 10.9 Trust Indicator Component

```typescript
interface TrustIndicatorProps {
  items: string[];
  variant?: 'footer' | 'inline' | 'pill';
}
```

### 10.10 Component File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.stories.tsx
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── Card.module.css
│   │   │   └── Card.stories.tsx
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Avatar/
│   │   └── ...
│   ├── layout/
│   │   ├── Sidebar/
│   │   ├── Topbar/
│   │   └── Dashboard/
│   ├── charts/
│   │   └── GrowthChart/
│   └── features/
│       ├── StatCard/
│       ├── HealthLog/
│       └── MilestoneTracker/
├── styles/
│   ├── tokens.css       # CSS variables
│   ├── reset.css        # CSS reset
│   └── utilities.css    # Helper classes
└── theme/
    └── index.ts         # Theme configuration
```

### 10.11 Storybook Integration

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Check symptoms now',
  },
};
```

---

## 11. Design Direction Comparison

### This Design vs. Earlier Proposals

| Factor | Your Current Design | Soft Clinical | Warm Sanctuary | Confident Minimal |
|--------|---------------------|--------------|----------------|-------------------|
| **Primary Color** | `#2c4a45` (Forest) | `#0891B2` (Teal) | `#5B7B6A` (Sage) | `#1E3A5F` (Navy) |
| **Accent Color** | `#c04f7a` (Coral) | `#F97316` (Orange) | `#D4785C` (Terracotta) | `#0EA5E9` (Sky) |
| **Background** | `#faf8f5` (Warm Cream) | `#FAFCFC` (Cool) | `#F5EDE4` (Warm Cream) | `#FFFFFF` (Pure) |
| **Display Font** | Playfair Display | Nunito | Source Serif 4 | Geist |
| **Body Font** | Inter | DM Sans | Plus Jakarta Sans | Inter |
| **Feel** | Editorial-clinical | Medical-friendly | Nature-nurturing | Premium-clear |
| **Emergency Clarity** | High | High | Moderate | Very High |
| **Warmth Level** | High | Moderate | Very High | Low |
| **Differentiation** | High | Moderate | Very High | Low |

### Alignment with "Clinical Zen" Philosophy

| Principle | Your Design | Soft Clinical | Warm Sanctuary |
|-----------|-------------|---------------|----------------|
| Cleanliness | ✓ High | ✓ High | ✓ High |
| Clarity | ✓ High | ✓ High | ✓ Moderate |
| Calm | ✓ High | ✓ Moderate | ✓ Very High |
| Confidence | ✓ High | ✓ High | ✓ Moderate |

### Your Design Strengths

1. **Unique Color Story** — Forest green sidebar with coral accents is distinctive
2. **Editorial Typography** — Playfair Display + Inter is a sophisticated pairing
3. **Trust Signals** — IAP clinical review, WHO standards prominently displayed
4. **Warm but Professional** — Balances medical credibility with approachability
5. **Dense Information** — Dashboard-first design suits power users

### Recommendations

| Aspect | Current | Suggestion |
|--------|---------|------------|
| **Typography Scale** | Good | Add responsive scaling for mobile |
| **Dark Mode** | Not implemented | Consider `--color-dark-*` tokens |
| **Animation** | Basic | Expand with micro-interactions |
| **Mobile Nav** | Not designed | Add bottom tab bar pattern |
| **Component Tokens** | Inline | Extract to design tokens |

---

## 12. CSS Variables Reference

### Complete Token Set

```css
:root {
  /* ============================================
   * PEDi-Ai Design Tokens
   * Version: 1.0
   * ============================================
   */

  /* --------------------------------------------
   * Colors - Primary Palette
   * -------------------------------------------- */
  --color-forest: #2c4a45;
  --color-forest-light: #3d5f58;
  --color-forest-dark: #1c3a35;
  --color-sage: #7bada6;
  --color-sage-light: #a8d5c8;
  --color-sage-dark: #5b8d86;
  --color-coral: #c04f7a;
  --color-coral-light: #d06a91;
  --color-coral-dark: #a03d64;
  --color-cream: #faf8f5;
  --color-cream-dark: #f0ebe4;
  --color-mist: #e8efee;

  /* --------------------------------------------
   * Colors - Semantic
   * -------------------------------------------- */
  --color-success: #7bada6;
  --color-success-bg: #e8f0ee;
  --color-success-text: #2c5f58;
  --color-warning: #b07850;
  --color-warning-bg: #faeeda;
  --color-warning-text: #7a4e00;
  --color-danger: #9e3535;
  --color-danger-light: #8c2020;
  --color-danger-bg: #fde8e8;
  --color-danger-text: #8c2020;
  --color-info: #edf3fe;
  --color-info-text: #3b5998;
  --color-action: #fbeaf0;
  --color-action-text: #7a1040;

  /* --------------------------------------------
   * Colors - Text
   * -------------------------------------------- */
  --color-text: #2c4a45;
  --color-text-muted: #8aada8;
  --color-text-light: #b8d0cc;
  --color-text-inverse: #ffffff;
  --color-text-link: #7bada6;

  /* --------------------------------------------
   * Colors - Borders
   * -------------------------------------------- */
  --color-border: #dce8e5;
  --color-border-light: rgba(255, 255, 255, 0.08);
  --color-border-focus: #7bada6;

  /* --------------------------------------------
   * Colors - Sidebar (Dark)
   * -------------------------------------------- */
  --sidebar-bg: #2c4a45;
  --sidebar-text: rgba(255, 255, 255, 0.5);
  --sidebar-text-hover: rgba(255, 255, 255, 0.8);
  --sidebar-text-active: #ffffff;
  --sidebar-active-bg: rgba(120, 185, 170, 0.2);
  --sidebar-active-border: #7bada6;
  --sidebar-streak-bg: rgba(240, 153, 123, 0.18);
  --sidebar-streak-text: #f0997b;

  /* --------------------------------------------
   * Colors - Chart
   * -------------------------------------------- */
  --chart-bg: #f6faf9;
  --chart-band: #e1f5ee;
  --chart-bar-inactive: #c5d8d4;
  --chart-bar-active: #7bada6;

  /* --------------------------------------------
   * Colors - Dark Mode (Future)
   * -------------------------------------------- */
  --color-bg-dark: #1a2c28;
  --color-surface-dark: #243832;
  --color-text-dark: #e8efee;
  --color-text-muted-dark: #a8d5c8;

  /* --------------------------------------------
   * Typography
   * -------------------------------------------- */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Type Scale */
  --text-xs: 0.6875rem;   /* 11px */
  --text-sm: 0.75rem;     /* 12px */
  --text-base: 0.875rem;  /* 14px */
  --text-lg: 1rem;        /* 16px */
  --text-xl: 1.125rem;    /* 18px */
  --text-2xl: 1.25rem;    /* 20px */
  --text-3xl: 1.5rem;     /* 24px */
  --text-4xl: 1.75rem;    /* 28px */
  --text-5xl: 2rem;       /* 32px */
  --text-hero: 1.625rem;   /* 26px */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.07em;
  --tracking-widest: 0.1em;

  /* --------------------------------------------
   * Spacing
   * -------------------------------------------- */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-16: 4rem;      /* 64px */

  /* --------------------------------------------
   * Border Radius
   * -------------------------------------------- */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 7px;
  --radius-lg: 10px;
  --radius-xl: 14px;
  --radius-2xl: 16px;
  --radius-3xl: 20px;
  --radius-full: 999px;

  /* --------------------------------------------
   * Borders
   * -------------------------------------------- */
  --border-thin: 0.5px;
  --border-normal: 1px;
  --border-thick: 2px;

  /* --------------------------------------------
   * Shadows
   * -------------------------------------------- */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.15);

  /* --------------------------------------------
   * Layout
   * -------------------------------------------- */
  --sidebar-width: 200px;
  --sidebar-collapsed-width: 64px;
  --topbar-height: 56px;
  --content-max-width: 1400px;

  /* --------------------------------------------
   * Z-Index Scale
   * -------------------------------------------- */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;

  /* --------------------------------------------
   * Transitions
   * -------------------------------------------- */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
  --transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* --------------------------------------------
   * Animation
   * -------------------------------------------- */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 400ms;

  /* --------------------------------------------
   * Breakpoints (as custom properties for JS)
   * -------------------------------------------- */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* --------------------------------------------
 * Dark Mode
 * -------------------------------------------- */
@media (prefers-color-scheme: dark) {
  :root.auto-dark {
    --color-bg: var(--color-bg-dark);
    --color-surface: var(--color-surface-dark);
    --color-text: var(--color-text-dark);
    --color-text-muted: var(--color-text-muted-dark);
  }
}

/* --------------------------------------------
 * Reduced Motion
 * -------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-base: 0ms;
    --transition-slow: 0ms;
  }
}
```

---

## Implementation Checklist

- [x] Import Google Fonts (Playfair Display, Inter)
- [x] Define CSS variables
- [x] Set up base typography
- [x] Create button components
- [x] Build card patterns
- [x] Implement navigation sidebar
- [x] Add chart components
- [x] Include badge variants
- [x] Set up animation utilities
- [x] Add trust indicators
- [x] Implement responsive breakpoints
- [x] Add mobile navigation patterns
- [x] Create component specs for developers
- [x] Add dark mode token placeholders
- [ ] Test accessibility
- [ ] Implement dark mode
- [ ] Create Storybook stories
- [ ] Add component tests

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | April 2026 | Added mobile breakpoints, component specs, design comparison |
| 1.0 | April 2026 | Initial design system from dashboard v2 |

---

## Related Files

| File | Description |
|------|-------------|
| [design-tokens.css](design-tokens.css) | Exportable CSS variables file |
| [pedi_ai_redesigned_dashboard_v2.html](../pedi_ai_redesigned_dashboard_v2.html) | Source design reference |
