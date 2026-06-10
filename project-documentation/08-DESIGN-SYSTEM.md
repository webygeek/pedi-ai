# Design System Reference

Quick reference to the complete design system. For full documentation, see [docs/design-system.md](../docs/design-system.md).

---

## 🎨 Design Philosophy

| Principle | Implementation |
|-----------|----------------|
| **Trust** | Medical-grade feel with clinical review signals |
| **Clarity** | Clear hierarchy, plain language, immediate comprehension |
| **Warmth** | Soft colors, friendly typography, approachable tone |
| **Calm** | Reduced visual noise, soothing palette, no overwhelming elements |

---

## 🌈 Color Palette

### Primary Colors

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

---

## ✏️ Typography

### Font Families

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Size | Weight |
|---------|------|--------|
| Hero Title | 64px | 400 |
| Section Title | 48px | 500 |
| Card Title | 14px | 400 |
| Body Text | 11-14px | 400-500 |
| Labels | 8px | 500 |

---

## 📐 Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight spacing |
| `--space-sm` | 6-8px | Inner padding |
| `--space-md` | 10-12px | Card padding |
| `--space-lg` | 14-16px | Section spacing |
| `--space-xl` | 22px | Page margins |

### Border Radius

| Element | Radius |
|---------|--------|
| Dashboard Container | 14px |
| Cards | 10px |
| Buttons (pill) | 999px |
| Badges (pill) | 999px |
| Input Fields | 20px |

---

## 🧩 Component Quick Reference

### Button Variants

```tsx
// Primary
<Button variant="primary">Check symptoms now</Button>

// Secondary
<Button variant="secondary">Learn more</Button>

// Danger
<Button variant="danger">Call 911</Button>

// Ghost
<Button variant="ghost">Cancel</Button>
```

### Badge Variants

| Variant | Background | Text | Use Case |
|---------|------------|------|----------|
| success | `#e8f0ee` | `#2c5f58` | On track |
| warning | `#faeeda` | `#7a4e00` | Attention |
| danger | `#fde8e8` | `#8c2020` | Urgent |
| info | `#edf3fe` | varies | Vaccinations |
| action | `#fbeaf0` | `#7a1040` | Action needed |

### Card Variants

```tsx
// Default card
<Card>Content here</Card>

// Highlight card (for urgent items)
<Card variant="highlight">Urgent content</Card>

// Flat card (for backgrounds)
<Card variant="flat">Background content</Card>
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, bottom nav |
| Tablet | 768-1023px | 2 columns, collapsible sidebar |
| Desktop | 1024px+ | Full layout, always-visible sidebar |

---

## ♿ Accessibility

| Standard | Requirement |
|----------|-------------|
| **WCAG** | Level AA compliance minimum |
| **Screen Readers** | Full VoiceOver/TalkBack support |
| **Text Size** | Scalable up to 200% |
| **Color Contrast** | 4.5:1 minimum for text |
| **Motion** | Reduced motion option |

### Key Accessibility Requirements

- All interactive elements must be keyboard accessible
- Focus states must be visible (`:focus-visible`)
- Images must have alt text
- Color must not be the only indicator of state
- Touch targets must be at least 44x44px

---

## 🎬 Animation Guidelines

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

| Class | Delay |
|-------|-------|
| `.d1` | 0.05s |
| `.d2` | 0.1s |
| `.d3` | 0.15s |
| `.d4` | 0.2s |
| `.d5` | 0.25s |
| `.d6` | 0.3s |

---

## 🔗 Full Design System

For complete documentation including:

- Detailed component specifications
- Complete CSS variable reference
- Storybook integration guides
- Dark mode implementation
- Icon usage guidelines

**See:** [docs/design-system.md](../docs/design-system.md)

---

## 📁 Related Files

| File | Description |
|------|-------------|
| [docs/design-system.md](../docs/design-system.md) | Full design system documentation |
| [docs/design-tokens.css](../docs/design-tokens.css) | Exportable CSS variables |
| [src/app/landing-page.html](../src/app/landing-page.html) | Landing page implementation |
| [src/app/components/Button.tsx](../src/app/components/Button.tsx) | Button component |
| [src/app/components/PhoneMockup.tsx](../src/app/components/PhoneMockup.tsx) | Mobile mockup component |

---

*Version: 1.0*
*Last Updated: June 2026*
