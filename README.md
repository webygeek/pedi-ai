# Pedi-Ai Next.js Project

AI-powered pediatric care platform for the first 2,000 days of life.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Navigation.tsx
│   │   └── PhoneMockup.tsx
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── docs/
│   ├── design-system.md  # Design system documentation
│   └── design-tokens.css # CSS variables export
└── package.json
```

## Design System

Colors, typography, and spacing tokens are defined in:
- `tailwind.config.js` - Tailwind theme extension
- `src/app/globals.css` - CSS custom properties

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
