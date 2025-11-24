# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
# Development server with Turbopack (recommended)
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## Project Overview

**Labs Motion** is a Next.js 16 learning platform for exploring **Framer Motion** animations and interactive UI components. It showcases modern React patterns combined with smooth, production-quality animations.

### Technology Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Animation**: Framer Motion v12 (aliased as "motion")
- **Styling**: Tailwind CSS v4 + PostCSS with CSS variables
- **Language**: TypeScript 5 (strict mode)
- **UI Components**: Shadcn UI (New York style) + Radix UI primitives
- **Build Tool**: Turbopack
- **Icons**: Lucide React
- **Utilities**: Number Flow (animated numbers), rough-notation (hand-drawn text), Lenis (smooth scroll)

## Architecture and Code Organization

### Directory Structure

```
app/                          # Next.js App Router pages
├── page.tsx                  # Home page with animations showcase
├── layout.tsx                # Root layout with fonts & metadata
├── magic-wand/               # Magic Wand demo (in development)
├── feedback/                 # Feedback form with morphing animations
├── transaction-list-animation/ # Animated list with number transitions
└── inline-table-control/     # Editable table with layout animations

components/                   # React components
├── header.tsx               # Top navigation
├── sidebar.tsx              # Left navigation menu
├── docs-layout.tsx          # Main layout wrapper
└── ui/                      # Reusable UI components
    ├── light-rays.tsx       # Animated light ray background
    ├── pixel-image.tsx      # Pixelated image reveal
    ├── progressive-blur.tsx # Blur fade effects
    ├── infinite-slider.tsx  # Auto-scrolling carousel
    ├── interactive-hover-button.tsx
    ├── highlighter.tsx      # Text annotations
    └── [other shadcn components]

data/                         # Static data
├── transactions.ts          # Mock transaction data
└── images.ts               # Image paths

lib/
└── utils.ts                # cn() for Tailwind class merging

styles/
└── globals.css             # Tailwind v4 config + global styles
```

### Key Architectural Patterns

1. **Client Components**: Heavy use of `'use client'` for interactive features with animations
2. **Animation Patterns**:
   - `AnimatePresence` for enter/exit animations
   - `layoutId` for shared element transitions (inline-table-control)
   - Spring physics for natural motion
   - Gesture animations (hover, tap effects)
3. **Layout Pattern**: DocsLayout wraps page content with persistent Header + Sidebar navigation
4. **UI Component Pattern**: Reusable Shadcn components with custom animations added via `motion` wrapper

### Component Categories

#### Demo Pages
- **Home** (`/`): Showcases multiple animation techniques (light rays, pixel reveal, text highlight, carousel, blur effects)
- **Transaction List** (`/transaction-list-animation`): Real-time list with spring animations and animated number displays
- **Feedback Form** (`/feedback`): Morphing form with expand/collapse and loading states
- **Inline Table Control** (`/inline-table-control`): Editable table with layout animations for cell editing

#### Custom UI Components
- `LightRays`: Animated gradient light effect background
- `PixelImage`: Image pixelation with reveal animation
- `ProgressiveBlur`: Progressive blur effect on scroll edges
- `InfiniteSlider`: Auto-scrolling carousel component
- `InteractiveHoverButton`: Button with hover-triggered animations
- `Highlighter`: Text annotation with rough-notation style

## Configuration Details

### Tailwind CSS v4 (in styles/globals.css)
- Custom theme using CSS variables and OKLch color space
- Dark mode support with `prefers-color-scheme`
- Custom font families (IBM Plex Sans/Mono)
- Includes Lenis smooth scrolling integration
- Extended with `tw-animate-css` library

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to project root
- JSX: automatic runtime (React 19)
- ES2017 target with bundler module resolution
- Incremental compilation enabled

### Next.js Configuration
- Turbopack enabled for faster development
- Image optimization with Spotify CDN remote pattern (`i.scdn.co`)
- App Router with automatic static optimization

### Custom Hooks (used throughout components)
- `useOutSideClick`: Detect clicks outside a ref element
- `useMeasure`: Measure DOM element dimensions
- `useMotionValue`: Track Framer Motion animated values

## Working with Animations

### Adding Framer Motion to Components
1. Import `motion` from the "motion" alias: `import { motion } from 'motion'`
2. Wrap elements: `<motion.div>`
3. Use animation props: `animate`, `initial`, `exit`, `transition`, `whileHover`, etc.
4. For conditional rendering with animations: Use `AnimatePresence` wrapper

### Common Animation Patterns in This Project
```typescript
// Layout animation (shared element transition)
<motion.div layoutId="shared-id">

// Spring animation
<motion.div animate={{ x: 100 }} transition={{ type: "spring", stiffness: 300 }}

// Enter/exit with AnimatePresence
<AnimatePresence>
  {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
</AnimatePresence>

// Gesture animations
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
```

## Development Notes

### File Organization
- Keep animations in separate `motion.` wrapped components for clarity
- Use TypeScript for component props (no `any` types)
- Follow Shadcn UI styling patterns with Tailwind CSS classes
- Use CSS variables from globals.css for consistent theming

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Test animations on different screen sizes
- Use `useWindowSize` or similar hooks for responsive animation values

### Performance Considerations
- Avoid animating DOM properties that cause layout shifts (use `transform` instead)
- Use `will-change` CSS property for frequently animated elements
- Framer Motion's `layoutId` can be expensive—use sparingly for many elements

### Testing Animations
1. Run development server: `npm run dev`
2. Open http://localhost:3000
3. Test animations at different viewport sizes
4. Check browser DevTools Performance tab for jank

## Common Tasks

### Running the Development Server
```bash
npm run dev
```
Server runs on http://localhost:3000 with hot reload and Turbopack.

### Building for Production
```bash
npm run build && npm start
```

### Linting the Codebase
```bash
npm run lint
```
ESLint checks TypeScript and Next.js best practices.

### Adding a New Animation Component
1. Create new `.tsx` file in `components/ui/`
2. Use `'use client'` directive at top
3. Import motion: `import { motion } from 'motion'`
4. Build component with motion elements
5. Export and import in page that needs it
6. Test in browser

### Adding a New Page/Route
1. Create new directory in `app/` (e.g., `app/my-demo/`)
2. Create `page.tsx` inside with root component
3. Wrap with `DocsLayout` for consistent header/sidebar
4. Add route to Sidebar navigation in `components/sidebar.tsx`
5. Page auto-routes via file-based routing

### Debugging Animations
- Use Framer Motion DevTools (browser extension)
- Check browser console for React/Next.js warnings
- Verify motion values with `useMotionValue` hook
- Test with reduced motion: `prefers-reduced-motion: reduce`

## Current Status and Known Issues

- **Active Development**: Magic Wand page is a placeholder for future features
- **Recent Changes**: Code refactoring for improved readability and maintainability
- **Styling Update**: Migrated from deleted tailwind.config.ts to inline Tailwind v4 in globals.css

## Important Files to Know

- `app/page.tsx`: Primary showcase of animation techniques
- `components/sidebar.tsx`: Navigation routing—update here when adding new pages
- `styles/globals.css`: Tailwind theme, CSS variables, and global styles
- `tsconfig.json`: TypeScript configuration including path aliases
- `next.config.ts`: Next.js configuration for images and optimization

## Design and Interaction Guidelines (AGENTS.md)

**IMPORTANT**: Before implementing UI features, interactions, or animations, refer to `AGENTS.md` for comprehensive design and accessibility guidelines. It covers:

### Core Requirements
- **Interactions**: Keyboard support (WAI-ARIA), focus management, target sizing (≥24px), mobile input handling
- **Animation**: Always honor `prefers-reduced-motion`; animate compositor-friendly properties (`transform`, `opacity`); avoid layout shifts
- **Layout**: Optical alignment, grid adherence, responsive testing (mobile/laptop/ultra-wide), safe area respect
- **Content & Accessibility**: Semantic HTML, `aria-label` for icons, contrast (APCA), proper heading hierarchy, resilience to user-generated content
- **Performance**: Measure re-renders, batch layout operations, virtualize large lists, preload above-fold images only, prevent CLS
- **Forms**: Hydration-safe inputs, inline validation, error messaging, autocomplete support, unsaved change warnings

### Animation-Specific Requirements
- MUST honor `prefers-reduced-motion` with a reduced variant
- MUST animate only `transform` and `opacity` (avoid `top/left/width/height`)
- MUST ensure animations are interruptible and input-driven (no autoplay)
- SHOULD prefer CSS > Web Animations API > JS libraries
- MUST set correct `transform-origin` for natural motion

### Key Accessibility Patterns
- Full keyboard support with visible focus rings (`:focus-visible`)
- Icon-only buttons require `aria-label`
- Use native semantics (`button`, `a`, `label`, `table`) before ARIA
- Redundant status cues (not color-only)
- Locale-aware dates/times/numbers/currency

**Reference**: See `AGENTS.md` for the complete ruleset with MUST/SHOULD/NEVER directives.
