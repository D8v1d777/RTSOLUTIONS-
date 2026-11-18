# RTSOLUTIONS

An independent software and digital product studio. We build custom websites, web applications, and desktop applications. Our point of difference is creative frontend craft: gathering messy ideas and shaping them into expressive, useful digital experiences built to last.

## Project Status

**Implementation branch:** `claude/fable-5-2-build`  
**Current live Render service:** [`rtsolutions-site`](https://rtsolutions-site.onrender.com), sourced from `claude/fable-5-2-build`; inspected live commit `14ca098dbdd429b75098b43e447a4d87678eb0f8`. This service auto-deploys when its source branch receives a commit.  
**Manual preview services:** [`rtsolutions-preview-live`](https://rtsolutions-preview-live.onrender.com) and [`rtsolutions-preview`](https://rtsolutions-preview.onrender.com) use the same branch but have auto-deploy disabled; both were last inspected at commit `2a001db51e3c4bafd11335adc23d407da8d7c2ed`.  
**Independent quality PR:** [#4](https://github.com/D8v1d777/RTSOLUTIONS-/pull/4) targets the implementation branch and remains separate from the visual rebuild.  
**Contact/social:** Public contact and social details are intentionally unpublished until verified. The form has no backend; it creates a mailto draft only after a verified recipient is configured.  
**Verification:** CI run [#45](https://github.com/D8v1d777/RTSOLUTIONS-/actions/runs/44407284465) passed 49/49 Chromium tests and produced the four reviewed viewport screenshots. Run [#46](https://github.com/D8v1d777/RTSOLUTIONS-/actions/runs/44409796316) passed lint, typecheck, and production build; its one Playwright failure was a stale assertion for the placeholder wording that this branch intentionally replaced. The assertion is corrected in the current head and awaits run #47.

## Quick Start

```bash
# Install dependencies
npm ci --no-audit --no-fund

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

# Lighthouse report (requires a running server; not part of the current CI gate)
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
- **Language:** TypeScript 6.0.3 (strict mode)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, OG tags
│   ├── page.tsx            # Homepage composition
│   ├── not-found.tsx       # 404 page (client component)
│   ├── robots.ts           # Robots rules and sitemap discovery
│   └── sitemap.ts          # Sitemap generation
├── components/
│   ├── canvas/
│   │   └── JellyfishCanvas.tsx  # Real-time 3D jellyfish (procedural)
│   ├── layout/
│   │   ├── Navigation.tsx       # Fixed header, keyboard-aware mobile menu
│   │   ├── Navigation.module.css # Mobile-only toggle visibility
│   │   └── Footer.tsx           # Footer; social links only after verification
│   └── sections/
│       ├── Hero.tsx             # Split layout: copy + JellyfishCanvas
│       ├── StudioManifesto.tsx  # 3-principle card grid
│       ├── Capabilities.tsx     # 3 service areas and scoped capabilities
│       ├── SelectedWork.tsx     # 3 clearly labelled concept studies
│       ├── Process.tsx          # 6-step timeline
│       ├── WhyRTSolutions.tsx   # 6 differentiators + "not for everyone"
│       └── Contact.tsx          # Validation and verified-recipient mailto draft; no backend
├── lib/
│   └── config.ts           # Centralized placeholder config
└── styles/
    └── globals.css         # Design system, animations, utilities

tests/
├── home.spec.ts            # E2E: sections, navigation, form, focus, reduced motion
├── seo.spec.ts             # SEO, honest copy, dead links, mobile navigation
└── capture-screenshots.spec.ts  # Four viewport screenshot capture

docs/
├── screenshots/            # Tracked baseline captures; latest CI evidence is linked above
├── BUILD_BRIEF.md          # Product & creative brief
├── ACCEPTANCE_CRITERIA.md  # Verifiable acceptance criteria
├── CLAUDE_HANDOFF_PROMPT.md
├── RENDER_PREVIEW.md       # Verified Render service map and release safety
├── TECHNICAL_DECISIONS.md  # Key architectural decisions
├── TECHNICAL_DECISIONS_2026-11-19.md
├── QA_REPORT.md            # Historical QA snapshot; see dated report
└── QA_REPORT_2026-11-19.md # Independent quality pass and evidence
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
| Contact Form | Client-side validation; mailto draft only after a verified recipient is configured | No backend; placeholder mode suppresses all contact links |

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
- Contrast is a WCAG AA target; no conformance certification is claimed
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
  domain: '',                               // Set only after owner verifies domain
  social: {
    github: '',
    twitter: '',
    linkedin: '',
  },
  contact: { verifiedEmail: '' },       // Single verified recipient field
  isPlaceholder: true,                  // Keep true until all public contact details are verified
};
```

**Do not commit secrets.** Supply verified email/social/domain details, then flip `isPlaceholder: false` only after every enabled public link has been checked.

## Verification Checklist

| Check | Command | Status |
|-------|---------|--------|
| Production build | `npm run build` | CI run #46 passed |
| TypeScript strict | `npm run typecheck` | CI run #46 passed |
| Lint | `npm run lint` | CI run #46 passed |
| E2E tests (Chromium) | `npm run test -- --project=chromium` | Run #45: 49/49; run #46: 49/50 because one contact-copy assertion was stale; corrected in current head, run #47 pending |
| Viewport screenshots | `npm run test -- --project=chromium` | Four captures uploaded in [CI artifact #45](https://github.com/D8v1d777/RTSOLUTIONS-/actions/runs/44407284465) |
| Lighthouse | `npm run lighthouse` | Not run in this quality pass |
| axe-core | `@axe-core/playwright` | Not installed or run; no automated axe result claimed |

## Known Limitations

1. **TypeScript version:** Pinned to 6.0.3 for `eslint-config-next` compatibility (TS 7.x unsupported as of 2026-11).
2. **WebGL fallback:** The 3D jellyfish gracefully degrades to SVG on WebGL failure, but GPU-dependent features (transmission, SSS) are unavailable in fallback.
3. **Contact form:** Uses `mailto:` fallback; no backend endpoint implemented. Replace with API route when infrastructure exists. Honeypot field is client-side filtering only; it is not server-side bot protection.
4. **Contact/social details:** Intentionally blank and suppressed until owner-verified. Configure `src/lib/config.ts` before enabling these links.
5. **Environment lighting:** The Drei `Environment` component was removed because no cubemap assets were supplied. The scene currently uses procedural lighting; add a tracked HDR/EXR environment only if visual testing demonstrates a clear benefit.
6. **Playwright on CI:** Firefox/WebKit require system dependencies (`libgtk-4`, etc.). Chromium is the primary CI target.
7. **Content Security Policy:** Not configured. Recommended for production deployment.
8. **Reference image:** No visual-direction reference file is currently tracked in this repository. Do not treat a missing path as an available asset.
9. **Automated accessibility/performance audits:** axe-core and Lighthouse were not run in the independent quality pass. The WCAG AA language is a target, not a certification.

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Current deployment target is Render; do not deploy this quality branch.
# The live service tracks claude/fable-5-2-build and auto-deploys on that branch.
```

Environment configuration:
- `NEXT_PUBLIC_SITE_URL` — Optional override for a verified canonical domain; otherwise the config falls back to the current Render service URL.
- Contact email is configured in `src/lib/config.ts` only after the owner supplies and verifies it. There is no `NEXT_PUBLIC_CONTACT_EMAIL` implementation.
- No custom domain, social profile, or public address is currently verified.

## License

No license file is currently present. The repository owner must choose and add a license before granting reuse or redistribution rights.