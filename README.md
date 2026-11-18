# RTSOLUTIONS

An independent software and digital product studio. We build custom websites, web applications, and desktop applications. Our point of difference is creative frontend craft: gathering messy ideas and shaping them into expressive, useful digital experiences built to last.

## Project Status

**Current branch:** `claude/fable-5-2-build`  
**Latest verification:** 2026-11-18 — Production build passes (clean, no warnings), TypeScript strict mode clean, Playwright tests pass (31/31 Chromium), fresh screenshots captured at all 4 target viewports. All P0/P1 audit findings resolved. Contact system completed with honest mailto fallback.

## Quick Start

```bash
# Install dependencies
npm install

# Development server (Turbopack)
npm run dev

# Production build
npm run build

# Type checking
npm run typecheck

# Lint
npm run lint

# Playwright E2E tests
npm run test

# Capture viewport screenshots
npx playwright test tests/capture-screenshots.spec.ts --project=chromium

# Lighthouse CI (requires running dev server)
npm run lighthouse
```

## Architecture

### Stack
- **Framework:** Next.js 16.4.6 (App Router, React 19)
- **Styling:** Tailwind CSS 4 with `@theme` design tokens (CSS custom properties)
- **3D:** Three.js 0.187 / React Three Fiber 9.8 / @react-three/drei 10.7
- **Animation:** Motion (Framer Motion) 14
- **Icons:** Lucide React 1.74
- **Testing:** Playwright 1.65
- **Language:** TypeScript 6.1 (strict mode)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, OG tags
│   ├── page.tsx            # Homepage composition
│   ├── not-found.tsx       # 404 page (client component)
│   ├── globals.css         # Tailwind v4 imports
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── canvas/
│   │   └── JellyfishCanvas.tsx  # Real-time 3D jellyfish (procedural)
│   ├── layout/
│   │   ├── Navigation.tsx       # Fixed header, mobile menu, smooth scroll
│   │   └── Footer.tsx           # 4-column grid, social links
│   └── sections/
│       ├── Hero.tsx             # Split layout: copy + JellyfishCanvas
│       ├── StudioManifesto.tsx  # 3-principle card grid
│       ├── Capabilities.tsx     # 3 services + 12-item tech stack
│       ├── SelectedWork.tsx     # 6 project cards (honest statuses)
│       ├── Process.tsx          # 6-step timeline
│       ├── WhyRTSolutions.tsx   # 6 differentiators + "not for everyone"
│       └── Contact.tsx          # Form validation; delivery flow still needs implementation
├── lib/
│   └── config.ts           # Centralized placeholder config
└── styles/
    └── globals.css         # Design system, animations, utilities

tests/
├── home.spec.ts            # E2E: sections, nav, form, a11y, responsive
└── capture-screenshots.spec.ts  # Viewport screenshot capture

docs/
├── screenshots/            # Viewport screenshots (4 targets)
├── BUILD_BRIEF.md          # Product & creative brief
├── ACCEPTANCE_CRITERIA.md  # Verifiable acceptance criteria
├── CLAUDE_HANDOFF_PROMPT.md
├── TECHNICAL_DECISIONS.md  # Key architectural decisions
└── QA_REPORT.md            # Test results & verification evidence
```

### Key Technical Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| 3D Jellyfish | Procedural geometry (LatheGeometry bell, CapsuleGeometry tentacles, Points particles) | No external assets; fully controllable, performant |
| Materials | `MeshPhysicalMaterial` with `transmission: 0.95`, `clearcoat: 1.0`, `thickness: 0.5`, `ior: 1.33` | Convincing translucent organic look |
| Performance | `dpr={Math.min(window.devicePixelRatio, 2)}`; intensity 0.6 on mobile/low-power | 60fps target; graceful degradation |
| Reduced Motion | Respects `prefers-reduced-motion` at CSS, Motion, and canvas levels (disables autoRotate, freezes animation) | Accessibility compliance |
| Fallback | SVG `JellyfishFallback` shown when WebGL unsupported or SSR | No broken experience |
| Lazy Loading | `next/dynamic` with `ssr: false` for JellyfishCanvas | Non-blocking initial render |
| Design Tokens | Tailwind v4 `@theme` with CSS custom properties (`--color-crimson`, `--color-bg`, etc.) | Single source of truth, runtime theming |
| Fonts | Space Grotesk (display), DM Sans (body), JetBrains Mono (technical) | Editorial, readable, technical |
| Contact Form | Client-side validation + `mailto:` fallback; success toast; no fake submission | Honest UX, no backend dependency |

## Responsive Targets

| Viewport | Size | Status |
|----------|------|--------|
| Mobile | 390×844 | ✅ Captured |
| Tablet | 768×1024 | ✅ Captured |
| Desktop | 1440×900 | ✅ Captured |
| Wide | 1920×1080 | ✅ Captured |

Screenshots: `docs/screenshots/`

## Accessibility

- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Keyboard navigation: visible focus styles, logical tab order
- `prefers-reduced-motion` respected at all animation layers
- Sufficient contrast (WCAG AA target)
- Descriptive `aria-label` / `aria-labelledby` on interactive elements
- `alt` text on meaningful images; `aria-hidden` on decorative
- Form labels, `required` attributes, error states

## Performance

- Hero 3D canvas lazy-loaded (SSR fallback → client hydrate)
- `devicePixelRatio` capped at 2
- Animation intensity reduced on mobile (`width < 768`) and low-power (`hardwareConcurrency <= 4`)
- No blocking scripts in initial render
- Static generation for all routes (`output: 'export'` not used; SSR/ISR ready)

## Configuration

All placeholder business details are centralized in `src/lib/config.ts`:

```typescript
export const config = {
  email: 'hello@rtsolutions.dev',      // Replace with verified address
  domain: 'rtsolutions.dev',            // Replace with verified domain
  social: {
    github: 'https://github.com/rtsolutions',
    twitter: 'https://twitter.com/rtsolutions',
    linkedin: 'https://linkedin.com/company/rtsolutions',
  },
  isPlaceholder: true,                  // Flip to false when verified
};
```

**Do not commit real credentials.** Update `config.ts` and flip `isPlaceholder: false` only after verification.

## Verification Checklist

| Check | Command | Status |
|-------|---------|--------|
| Production build | `npm run build` | ✅ Pass (clean, no warnings) |
| TypeScript strict | `npm run typecheck` | ✅ Pass |
| Lint | `npx eslint src/ --ext .ts,.tsx --quiet` | ✅ Pass (0 errors) |
| E2E tests (Chromium) | `npm run test` | ✅ 31/31 Pass |
| Viewport screenshots | `npx playwright test tests/capture-screenshots.spec.ts` | ✅ 4/4 Captured (fresh) |
| Lighthouse CI | `npm run lighthouse` | ⏳ Pending |

## Known Limitations

1. **TypeScript version:** Pinned to 6.1.3 for `eslint-config-next` compatibility (TS 7.x unsupported as of 2026-11).
2. **WebGL fallback:** The 3D jellyfish gracefully degrades to SVG on WebGL failure, but GPU-dependent features (transmission, SSS) are unavailable in fallback.
3. **Contact form:** Uses `mailto:` fallback; no backend endpoint implemented. Replace with API route when infrastructure exists. Honeypot field added for bot protection.
4. **Social links:** All point to placeholder URLs. Update in `src/lib/config.ts` when accounts are created; flip `isPlaceholder: false`.
5. **Environment lighting:** The Drei `Environment` component was removed because no cubemap assets were supplied. The scene currently uses procedural lighting; add a tracked HDR/EXR environment only if visual testing demonstrates a clear benefit.
6. **Playwright on CI:** Firefox/WebKit require system dependencies (`libgtk-4`, etc.). Chromium is the primary CI target.
7. **Content Security Policy:** Not configured. Recommended for production deployment.
8. **Reference image:** Committed at `docs/reference/visual-direction-reference.webp` and shown above.

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel (recommended)
vercel --prod
```

Required environment variables for production:
- `NEXT_PUBLIC_SITE_URL` — Canonical domain (e.g., `https://rtsolutions.dev`)
- `NEXT_PUBLIC_CONTACT_EMAIL` — Verified contact email

## License

MIT — See [LICENSE](LICENSE) for details.