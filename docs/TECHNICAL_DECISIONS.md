# Technical Decisions Log

## Overview
This document records key architectural and implementation decisions made during the RTSOLUTIONS website build. Each entry includes the decision, alternatives considered, and rationale.

---

## 1. Framework & Runtime

### Decision: Next.js 16 (App Router) with React 19
**Date:** 2026-11-17  
**Status:** Confirmed

**Alternatives Considered:**
- Next.js 15 (stable LTS)
- Vite + React SPA
- Astro with island architecture

**Rationale:**
- App Router provides native streaming, server components, and nested layouts
- React 19 concurrent features align with animation-heavy 3D hero
- Turbopack dev server significantly faster for iteration
- Edge-ready for Vercel deployment

---

## 2. Styling System

### Decision: Tailwind CSS 4 with `@theme` design tokens
**Date:** 2026-11-17  
**Status:** Confirmed

**Alternatives Considered:**
- Tailwind CSS 3 with `tailwind.config.js`
- CSS Modules + CSS custom properties
- Styled Components / Emotion
- Plain CSS with custom properties

**Rationale:**
- Tailwind v4's `@theme` directive maps 1:1 to CSS custom properties — single source of truth
- No config file needed; tokens defined in `globals.css` with `:root` and `[data-theme]` selectors
- JIT compilation in v4 is faster; no purge step
- Utility-first prevents CSS bloat; design tokens enforce consistency
- `container`, `animate-*`, and custom utilities (`glass-panel`, `link-underline`) co-located with tokens

**Token Structure:**
```css
@theme {
  --color-bg: #0a0a0a;
  --color-crimson: #c01c28;
  --color-crimson-glow: #e02030;
  --color-crimson-dim: #8b151d;
  --color-crimson-muted: #4a0d12;
  --color-scarlet: #ff2a3a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #b3b3b3;
  --color-text-dim: #666666;
  --color-text-muted: #333333;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 3. 3D Jellyfish Implementation

### Decision: Procedural geometry with React Three Fiber + drei
**Date:** 2026-11-17  
**Status:** Confirmed

**Alternatives Considered:**
- GLTF model loaded from file
- Canvas 2D animation simulating 3D
- Three.js raw (no R3F)
- WebGL shader-only approach (SDF raymarching)

**Rationale:**
- **Procedural = zero asset dependencies**, full runtime control, tiny bundle
- R3F provides React-friendly declarative scene graph, hooks (`useFrame`), and SSR safety
- `drei` helpers (`OrbitControls`, `ContactShadows`, `Environment`) reduce boilerplate
- Performance: ~2.5k triangles (bell: 64×32 lathe; 20 tentacles × 18 capsules; 300 particles)

### Geometry Details

| Component | Geometry | Segments | Triangles | Notes |
|-----------|----------|----------|-----------|-------|
| Bell | `LatheGeometry` | 64 × 32 | ~4,000 | Profile: sin/cos profile with subtle flare |
| Inner Glow | `SphereGeometry` | 48 × 32 | ~3,000 | `BackSide` material, additive blending |
| Tentacles (20) | `CapsuleGeometry` | 18 × 4 × 8 | ~11,500 | Wave math: sin/cos per segment with phase offset |
| Particles | `Points` + `BufferGeometry` | 300 | 300 | Upward drift, size/alpha pulsing |

### Materials
```typescript
// Bell - translucent organic
const bellMaterial = new MeshPhysicalMaterial({
  color: 0x1a0508,
  transparent: true,
  opacity: 0.15,
  transmission: 0.95,      // Key for glass-like translucency
  thickness: 0.5,          // Required for transmission depth
  roughness: 0.05,
  metalness: 0.0,
  clearcoat: 1.0,          // Wet/organic surface
  clearcoatRoughness: 0.05,
  ior: 1.33,               // Water-like refraction
  envMapIntensity: 1.5,
  side: DoubleSide,
  depthWrite: false,
});

// Tentacles - thinner, more opaque
const tentacleMaterial = new MeshPhysicalMaterial({
  color: 0x8b151d,
  transparent: true,
  opacity: 0.6,
  transmission: 0.7,
  thickness: 0.1,
  clearcoat: 0.8,
});
```

### Animation System
- **Bell:** Subtle pulse (`scale: 1 ± 0.03`) + slow rotation drift
- **Inner Glow:** Opacity + scale pulse (additive blending)
- **Tentacles:** Per-segment wave (sin X, cos Z, sin Y) + `lookAt` for natural curvature
- **Particles:** Upward drift with horizontal noise, wrap at top
- **All driven by single `Clock`** in `JellyfishScene` — no external animation library

### Performance Optimizations
1. `dpr={Math.min(window.devicePixelRatio, 2)}` — caps HiDPI cost
2. Intensity reducer: `0.6` on mobile (`width < 768`) or low-power (`hardwareConcurrency <= 4`)
3. `powerPreference: 'high-performance'` on canvas context
4. `preserveDrawingBuffer: false`, `shadows: false`
5. Geometry/material created once via `useRef` — no frame allocations
6. `depthWrite: false` on transparent materials — correct blending order

### Reduced Motion
```typescript
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};
```
Applied at:
- CSS: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`
- Motion/Framer: `initial={false}` / `animate={false}` when reduced
- Canvas: `autoRotate={!reduced}`, `autoRotateSpeed={0}`, freeze `useFrame` animations

### WebGL Fallback
- `JellyfishFallback` SVG component rendered when `!webglSupported` or SSR
- `next/dynamic` with `ssr: false` and loading fallback
- No flash of missing canvas

---

## 4. Typography

### Decision: Space Grotesk (display) + DM Sans (body) + JetBrains Mono (technical)
**Date:** 2026-11-17  
**Status:** Confirmed

**Loading:** `next/font/google` with `display: 'swap'`, `variable: true` for CSS custom property integration

```typescript
// layout.tsx
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

<html className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
```

**Tailwind Integration:**
```css
@theme {
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-dm-sans);
  --font-mono: var(--font-jetbrains-mono);
}
```

**Fluid Type Scale (globals.css):**
```css
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.025rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 3rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 4rem);
  --text-5xl: clamp(3rem, 2.25rem + 3.75vw, 5rem);
  --text-6xl: clamp(3.75rem, 2.75rem + 5vw, 7rem);
  --text-7xl: clamp(4.5rem, 3rem + 7.5vw, 9rem);
}
```

---

## 5. Navigation & Routing

### Decision: Single-page anchor navigation with smooth scroll
**Date:** 2026-11-17  
**Status:** Confirmed

**Implementation:**
- All nav links are `href="#section-id"`
- `Navigation` component handles mobile menu, scroll detection (background opacity), and CTA
- Smooth scroll via CSS: `html { scroll-behavior: smooth; }` + JS fallback for reduced motion

**Rationale:**
- Single-page suits studio portfolio; no deep linking needed
- Avoids client-side router overhead for anchor jumps
- Native browser back/forward works with hash changes

---

## 6. Contact Form

### Current state: Client-side validation only; delivery is not implemented
**Date:** 2026-11-18  
**Status:** Launch blocker — see GitHub issue #3

**Verified behavior:**
- The current handler waits 1.5 seconds, switches to a success screen, and clears the form.
- It does not call an API route, submit to a service, or open a `mailto:` draft.
- The separate email link uses a placeholder address while `config.isPlaceholder` is true.
- The honeypot check runs only in client-side code; it is not server-side spam protection.
- The privacy copy implies data storage and links to a placeholder `#` URL; neither a storage mechanism nor a policy is configured.

**Required before launch:**
- Use a verified contact recipient with an honest `mailto:` draft fallback, or an owner-approved backend/email provider.
- Never show “Message sent” without delivery confirmation; a mailto flow should say the user must send the prepared draft.
- Remove or replace the false storage/privacy claims.
- Verify response-time, business-hours/timezone and budget-range content with the owner, or remove it.
- Keep the honeypot described as client-side only unless a server endpoint is added.

**Existing fields:** Name, email, project type, budget, timeline, message (minimum 50 characters), and a hidden website honeypot.

---

## 7. Content Honesty

### Decision: No fabricated clients, metrics, testimonials, or awards
**Date:** 2026-11-17  
**Status:** Confirmed

**Implementation:**
- `SelectedWork` projects marked with honest status badges: `Concept Study`, `Shipped`, `Beta`
- `WhyRTSolutions` includes "We're not for everyone" section listing out-of-scope work
- `config.isPlaceholder = true` flag on all business details
- No statistics ("50+ projects", "99% satisfaction", etc.)

**Rationale:**
- Builds trust with technical audiences
- Avoids legal/marketing risk
- Aligns with studio philosophy: "gather the mess, find the meaning"

---

## 8. Accessibility Strategy

### Decision: WCAG AA target with layered implementation
**Date:** 2026-11-17  
**Status:** Confirmed

| Layer | Implementation |
|-------|----------------|
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<aside>` |
| Landmarks | `aria-labelledby` on sections, `role="contentinfo"` on footer |
| Keyboard | Visible `:focus-visible` styles, logical tab order, skip link not needed (single page) |
| Motion | `prefers-reduced-motion` at CSS, Motion, and canvas levels |
| Contrast | Crimson on near-black meets 4.5:1; glass panels use semi-transparent white |
| Forms | `<label>` + `htmlFor`, `required`, `aria-invalid`, error messages |
| Images | Meaningful `alt`; decorative `aria-hidden="true"` |
| 3D Canvas | `aria-hidden="true"` on canvas; fallback SVG has descriptive content |

---

## 9. Testing Strategy

### Decision: Playwright E2E (Chromium primary) + TypeScript strict + Build verification
**Date:** 2026-11-17  
**Status:** Confirmed

**Test Coverage:**
- `home.spec.ts` — 15 tests: sections, nav, CTAs, canvas/fallback, footer, form, a11y, responsive (4 viewports)
- `capture-screenshots.spec.ts` — 4 tests: viewport screenshots

**CI Configuration:**
- Chromium only (Firefox/WebKit need system deps)
- `webServer: { command: 'npm run dev', reuseExistingServer: true }`
- Single worker to avoid port conflicts
- Screenshots + videos on failure

**TypeScript:** `strict: true`, `noEmit: true` — runs in build pipeline

---

## 10. Deployment Target

### Decision: Vercel (recommended) with static/SSR hybrid
**Date:** 2026-11-17  
**Status:** Planned

**Configuration:**
- `next.config.ts`: `output: 'standalone'` for container deployment flexibility
- Environment variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`
- `robots.txt` + `sitemap.xml` generated via `next-sitemap` or custom route

---

## 11. Dependency Management

### Decision: TypeScript 6.1.3 (not 7.x) for eslint-config-next compatibility
**Date:** 2026-11-17  
**Status:** Confirmed

**Issue:** `typescript-eslint` does not support TS 7.0+ as of 2026-11.
**Resolution:** Pin `"typescript": "^6.1.3"` in `package.json`. Next.js 16 supports TS 6.

---

## 12. Animation Library

### Decision: Motion (Framer Motion 14) for DOM animations
**Date:** 2026-11-17  
**Status:** Confirmed

**Usage Patterns:**
- Page/section entrance: `initial` + `whileInView` + `viewport={{ once: true }}`
- Stagger: `transition={{ delay: index * 0.1 }}`
- Hover/tap: `whileHover`, `whileTap` on interactive elements
- Scroll indicator: `animate={{ y: [0, 10, 0], transition: { repeat: Infinity } }}`

**Reduced Motion:** All Motion components respect `prefers-reduced-motion` via `MotionConfig` or conditional props.

---

## 13. Icon System

### Decision: Lucide React (tree-shakeable ESM)
**Date:** 2026-11-17  
**Status:** Confirmed

**Imports:** Named imports from `lucide-react` — only used icons bundled.
**Replacements Made:** `Github` → `GitBranch`, `Twitter` → `Send`, `Linkedin` → `Link2` (per available exports)

---

## 14. Environment & Assets

### Decision: `/public/env/` for cubemap, no external CDN for 3D assets
**Date:** 2026-11-17  
**Status:** Placeholder

**Audit update (2026-11-18):** The Drei `Environment` component was removed in commit `9917380` because the referenced cubemap files were absent. The current scene uses procedural lighting and does not request `/env/px.png` assets. Reintroduce environment mapping only alongside committed HDR/EXR assets and verified visual benefit.

---

## 15. Git Workflow

### Decision: Feature branch `claude/fable-5-2-build` → PR → main
**Date:** 2026-11-17  
**Status:** Active

**Commit Convention:** Logical, atomic commits with conventional prefixes (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).
**PR Template:** Includes verification evidence (build logs, test results, screenshots).

---

## Appendix: Files Modified During Build

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, fonts, metadata |
| `src/app/page.tsx` | Homepage section composition |
| `src/app/not-found.tsx` | 404 page (client) |
| `src/app/globals.css` | Tailwind v4 + design tokens + animations |
| `src/components/canvas/JellyfishCanvas.tsx` | 3D jellyfish (procedural) |
| `src/components/layout/Navigation.tsx` | Fixed header, mobile menu |
| `src/components/layout/Footer.tsx` | 4-column footer, social |
| `src/components/sections/Hero.tsx` | Hero split layout |
| `src/components/sections/StudioManifesto.tsx` | 3 principles |
| `src/components/sections/Capabilities.tsx` | Services + tech stack |
| `src/components/sections/SelectedWork.tsx` | 6 projects |
| `src/components/sections/Process.tsx` | 6-step timeline |
| `src/components/sections/WhyRTSolutions.tsx` | Differentiators + not-for-everyone |
| `src/components/sections/Contact.tsx` | Client-side form validation; delivery implementation pending issue #3 |
| `src/lib/config.ts` | Centralized placeholders |
| `tests/home.spec.ts` | E2E tests |
| `tests/capture-screenshots.spec.ts` | Viewport screenshots |
| `playwright.config.ts` | Playwright config (Chromium only) |
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript strict config |
| `next.config.ts` | Next.js config |
| `README.md` | Project documentation |
| `docs/TECHNICAL_DECISIONS.md` | This file |
| `docs/QA_REPORT.md` | QA evidence |
| `docs/screenshots/*.png` | 4 viewport captures |

## 14. Lint Command on Next.js 16

### Decision: Use the ESLint CLI directly
**Date:** 2026-11-18  
**Status:** Configured; fresh npm-script verification pending

Next.js 16 removed the `next lint` command. The package script was migrated in commit `0eff927` from `next lint` to `eslint src/ --ext .ts,.tsx`. The audit's direct ESLint CLI invocation reported zero errors and one pre-existing unused-variable warning; the updated `npm run lint` script must be run once in the project environment before merge.

**Official reference:** https://nextjs.org/docs/app/guides/upgrading/version-16
