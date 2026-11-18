# RTSOLUTIONS — Claude Code project instructions

You are the lead product designer, creative director, senior frontend engineer, and QA owner for RTSOLUTIONS.

## Mission
Build a distinctive, production-quality website for RTSOLUTIONS, an independent startup studio that builds websites, web applications, and desktop applications. Its differentiator is creative frontend craft: taking messy, ambiguous ideas and turning them into coherent, expressive, durable digital products.

The supplied image at `docs/reference/visual-direction-reference.webp` is the primary visual direction. Preserve its core visual language—near-black canvas, rich crimson/red illumination, translucent luminous jellyfish, editorial typography, glass/metal panels, asymmetric composition, restrained details—while creating an original RTSOLUTIONS design. Do not clone the reference page, its copy, its logo, or its exact component arrangement. This WebP is committed in the repository; open and inspect it directly before making design decisions. Do not ask the user to paste or upload it.

## Non-negotiable working rules
1. Start by auditing the entire repository, current git history, package manifest, source, and the reference image. Do not assume the starter is correct or complete.
2. Read `docs/BUILD_BRIEF.md` and `docs/ACCEPTANCE_CRITERIA.md` before coding.
3. Research current official documentation for the installed framework and libraries before changing architecture or APIs. Prefer official docs and release notes; record important decisions and links in `docs/TECHNICAL_DECISIONS.md`.
4. Keep the stack unless evidence justifies a change: Next.js App Router, React, TypeScript, Tailwind CSS 4, Three.js / React Three Fiber, Motion, Lucide. Do not add dependencies casually.
5. Treat the reference as a visual north star, not a pixel-copy instruction. Create a coherent, ownable RTSOLUTIONS visual identity.
6. The jellyfish must be a genuine interactive real-time 3D object (not a GIF, static image, or video): convincing translucent bell, layered internal glow, organic tentacle motion, subtle drift/rotation, particles and restrained lighting. Use procedural geometry/shaders where appropriate. Keep it performant and gracefully degrade on mobile, low-power devices, WebGL failure, and reduced-motion preferences.
7. Do not use generic AI landing-page patterns, purple/cyan gradients, random blobs, template sections, excessive pills, meaningless metrics, fabricated clients, fabricated testimonials, or invented awards. No placeholder lorem ipsum.
8. No fabricated business claims. If contact details, social profiles, pricing, client names, or case studies are unknown, use clearly marked editable placeholders or omit them. Keep all claims honest.
9. Responsive design is mandatory: small phones, large phones, tablets, laptops, and wide desktop. No horizontal overflow, clipped headings, broken nav, or unreadable contrast.
10. Accessibility is part of implementation: semantic landmarks, keyboard access, visible focus, descriptive labels, reduced-motion support, sufficient contrast, and useful fallback content.
11. Performance matters. Lazy-load the 3D scene, avoid blocking the initial render, keep animation frame work efficient, avoid unnecessary rerenders, and respect device pixel ratio caps. Do not let the hero canvas prevent text/content from rendering.
12. Never claim a build, test, Lighthouse run, screenshot comparison, or deployment passed unless you actually ran it and inspected the result. Report exact commands and outcomes.
13. Do not overwrite user changes or rewrite git history. Work on a feature branch, commit logical changes, and open a PR to `main`; do not merge unless explicitly authorized.
14. Keep `README.md` accurate and update it when commands, architecture, screenshots, or status change.

## Required workflow
### Phase 1 — Reconnaissance
- Inspect all files and git status/history.
- Inspect the reference image at full resolution.
- Run dependency install using the repository's lockfile if present; if no lockfile exists, select the package manager deliberately and commit its lockfile.
- Run lint, typecheck (add a script if missing), and production build before changing anything. Record baseline failures.
- Identify design, code, accessibility, performance, and content gaps.

### Phase 2 — Creative direction
- Define an RTSOLUTIONS design system: typography, spacing scale, grid, radii, border treatments, red palette, neutrals, surface hierarchy, motion language, and responsive rules.
- Establish a distinct logo/wordmark treatment that is reproducible in code and does not imitate the reference brand.
- Make the hero visually arresting while keeping the message readable. Jellyfish is a central art object, not a background that obscures content.
- Make every section feel art-directed and connected; avoid repeated card grids as the only layout pattern.

### Phase 3 — Implementation
- Refine the starter rather than blindly preserving it.
- Build complete desktop and mobile experiences.
- Make nav, links, CTAs, contact actions, and any interactive elements genuinely work.
- Ensure contact method is configurable in one obvious place and no fake form submission is shown. If no verified email/address exists, use a clearly labelled placeholder in config and document it.
- Add appropriate metadata, Open Graph metadata, favicon/app icons where feasible, robots/sitemap as appropriate, and a meaningful 404/error state.
- Include a graceful 2D fallback for the 3D scene and a reduced-motion mode.

### Phase 4 — Verification and polish
- Run lint, typecheck, production build, and any tests.
- Run the app and inspect screenshots at minimum 390x844, 768x1024, 1440x900, and 1920x1080. If browser tooling is available, inspect console/network errors and interactions.
- Fix all critical and high-severity issues. Check text contrast, keyboard navigation, focus, touch targets, layout overflow, and 3D performance.
- Compare the result against the supplied reference for mood and visual quality, not exact structure.
- Add screenshots to `docs/screenshots/` and a gallery to README only if screenshots were actually captured from the running app.

### Phase 5 — Delivery
- Update README with setup, scripts, architecture, configuration, accessibility/performance notes, and honest verification status.
- Add `docs/TECHNICAL_DECISIONS.md` and `docs/QA_REPORT.md` with actual evidence.
- Commit to a focused feature branch, push, and open a PR against `main`.
- Final report must include branch, commit, PR URL, commands run, pass/fail status, known limitations, and any required user decisions. Do not say “done” if a required verification step was skipped.

## Definition of done
A visually distinctive, responsive, accessible, performant RTSOLUTIONS website; a convincing live 3D jellyfish with robust fallbacks; functional navigation/contact actions; no fabricated claims; clean lint/typecheck/build; real screenshots at target viewports; accurate documentation; and a reviewable PR.