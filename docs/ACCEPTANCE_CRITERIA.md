# RTSOLUTIONS — Acceptance criteria

## Visual quality
- [ ] The site reads as a bespoke creative software studio, not a generic SaaS/agency template.
- [ ] The black/crimson palette is consistent, restrained, and high contrast; no purple/cyan gradients.
- [ ] Typography has clear hierarchy, deliberate line lengths, and responsive scaling.
- [ ] Layout uses art direction and asymmetry without sacrificing clarity or navigation.
- [ ] Jellyfish is the signature hero artwork and is a genuine real-time 3D scene.
- [ ] Jellyfish bell looks volumetric/translucent; tentacles have organic, non-synchronous motion.
- [ ] Lighting, particles, reflections and motion are restrained rather than visually noisy.
- [ ] The design works at 390px, 768px, 1440px and 1920px widths.

## Content and product truth
- [ ] RTSOLUTIONS is consistently named and branded.
- [ ] Services clearly include websites, web applications, and desktop applications.
- [ ] The creative frontend differentiator is immediately understandable.
- [ ] No fake clients, testimonials, metrics, case studies, awards, locations or claims.
- [ ] Contact details are verified or explicitly labelled placeholders.
- [ ] All CTA destinations and contact actions work.

## Engineering
- [ ] TypeScript strictness is preserved; no `any` escapes without justification.
- [ ] No hydration errors, console errors, missing assets, or broken links.
- [ ] 3D scene is lazy-loaded and has a graceful fallback.
- [ ] Device pixel ratio is capped and animation workload is bounded.
- [ ] Reduced-motion preference is respected.
- [ ] No horizontal overflow at target viewports.
- [ ] Keyboard navigation, visible focus, labels, and semantic structure work.
- [ ] Metadata and social sharing metadata are present and accurate.

## Verification evidence
- [ ] Install command and lockfile are documented.
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Production build passes.
- [ ] Real screenshots captured at all four target viewports.
- [ ] QA report records actual commands, outcomes, and known limitations.
- [ ] README matches the delivered repository state.