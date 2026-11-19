# RTSOLUTIONS — Fable 5.2 visual reconstruction & agentic build loop

**Purpose:** execution brief for Claude Fable 5.2. This document governs the next visual-design and implementation pass. It is not authorization to merge or deploy.

**Primary reference:** \`docs/reference/visual-direction-reference.webp\`  
**Project brief:** \`docs/BUILD_BRIEF.md\`  
**Acceptance criteria:** \`docs/ACCEPTANCE_CRITERIA.md\`  
**Project instructions:** \`CLAUDE.md\`

---

## 0. Mission and non-negotiable constraints

Rebuild the RTSOLUTIONS experience so it captures the visual force, composition, atmosphere, and polished UI language of the supplied reference while remaining an original, truthful RTSOLUTIONS website.

This is not a request for another generic dark agency landing page. The screenshot is the visual authority. The existing RTSOLUTIONS brand, business truth, services, copy intent, functional behavior, and existing working code are the product authority.

**The jellyfish is the signature art object. Its long, abundant tentacles are essential.** A bell with three or four thin dangling lines is a failed interpretation, even if the lighting is attractive.

### Rules

1. Read this document, \`CLAUDE.md\`, \`docs/BUILD_BRIEF.md\`, and \`docs/ACCEPTANCE_CRITERIA.md\` before implementation.
2. Open the actual reference image at full resolution. Do not work from a remembered or paraphrased description.
3. Inspect the current branch, latest commit, git status, existing UI, actual deployment configuration, package versions, and existing test evidence before editing. Treat reports and historical screenshots as claims until independently checked against the current revision.
4. Preserve the existing stack unless a measured technical reason justifies a change. Do not introduce dependencies just to imitate a visual effect.
5. Keep factual copy and product behavior intact unless the owner approves a change. Do not invent clients, logos, testimonials, staff, locations, metrics, awards, project outcomes, pricing, or contact details.
6. Never present the reference brand, its copy, its statistics, its testimonial, or its logo as RTSOLUTIONS content. Borrow visual principles, not another company's identity or unverified claims.
7. Do not use generic AI-design defaults as substitutes for art direction: no random blob gradients, repeated card grids, arbitrary glass cards, excessive pills, emoji icons, meaningless stats, or decorative motion with no purpose.
8. Work on a new feature branch. Do not commit to \`main\` or the Render production branch. Do not merge, change Render configuration, or trigger a deployment without explicit owner approval.
9. No claims of completion based only on a successful build. The actual page must be opened, screenshotted, inspected, and tested.
10. If the reference image, required browser tooling, or a necessary asset is unavailable, report the blocker precisely. Do not silently substitute a different visual direction.

---

## 1. Verified starting observations — re-check against fresh HEAD

The following observations were verified from the repository source during preparation of this brief. Reconfirm them before changing code because the branch may move.

- The reference screenshot is already committed at \`docs/reference/visual-direction-reference.webp\`.
- \`src/components/sections/Hero.tsx\` currently renders the hero's visual layer with \`hero-jelly-photo\` and \`hero-jelly-glow\` DOM elements.
- \`Hero.tsx\` does not currently import or mount \`JellyfishCanvas\`.
- \`src/components/canvas/JellyfishCanvas.tsx\` contains a procedural R3F/Three.js jellyfish implementation, but its existence alone does not mean it appears on the page.
- The current implementation therefore has two different visual routes: a CSS photographic layer in the hero and a procedural 3D component elsewhere in source. Establish which is actually mounted at runtime before making assumptions.

**Required outcome:** one deliberate hero-art pipeline. Do not layer two competing jellyfish implementations accidentally. The chosen hero visual must be the one the browser renders, and the QA screenshots must prove it.

---

## 2. Reference deconstruction

Read \`docs/reference/visual-direction-reference.webp\` as a composition, not as a palette swatch.

### 2.1 Visual language

| Dimension | What the reference is doing | RTSOLUTIONS adaptation |
|---|---|---|
| Canvas | Near-black, cinematic, very low visual noise | Keep the near-black / charcoal foundation |
| Accent | Saturated scarlet and deep crimson light, with bright red highlights | Use a controlled red ramp; avoid unrelated purple/cyan accents |
| Focal object | Large, luminous, translucent jellyfish in the upper centre/right | Make the jellyfish the unmistakable signature object |
| Typography | Oversized, lightweight editorial sans-serif; tight headline hierarchy | Preserve the RTS brand voice; tune size, leading, tracking, and line breaks to the reference's confidence |
| Composition | Asymmetrical, overlapping visual planes, deliberate negative space | Let copy, jellyfish, and information panels form one designed composition |
| UI surfaces | Dark glass/metal panels with restrained borders and reflections | Use a coherent family of surfaces, not identical cards everywhere |
| Details | Small technical labels, compact controls, discreet dividers | Use sparingly; every annotation must have a reason |
| Page rhythm | Hero transitions into manifesto/bento-style content, social proof-like zone, and a stronger services panel | Preserve RTS content truth; vary layouts and section pacing |

### 2.2 Hero composition

The first viewport should have a confident editorial composition:

- Brand/navigation is compact and legible, with a clear active state and one primary CTA.
- The main headline and explanation remain readable and have a deliberate line-break pattern.
- The jellyfish occupies a substantial central/right visual area. It must not be reduced to a tiny icon or faint outline.
- The hero's information panels should frame the scene rather than compete with it.
- The red glow should illuminate the surrounding space naturally; avoid an opaque red rectangle or a muddy red overlay.
- The art object can extend below the first viewport so its tentacles visually lead into the next content section.
- On mobile, recompose the scene intentionally. Do not simply shrink desktop coordinates until the copy and jellyfish collide.

### 2.3 Below-the-fold composition

Use the reference's variety of scale and surface treatment, but keep RTSOLUTIONS content truthful:

- A manifesto/editorial statement section with strong hierarchy.
- A two-panel or bento composition to introduce the studio and its working approach.
- A restrained discipline/technology strip can replace the reference's client-logo rail. Use only real technologies or service categories that RTS actually supports; do not invent clients or partners.
- A major capabilities/services area with editorial copy and carefully composed detail panels.
- Distinct selected-work/concept cards, clearly labelled as concepts when they are not delivered client work.
- A process section, differentiators, contact section, and footer consistent with the same design system.

Do not create a fake team portrait, fabricated customer quote, arbitrary client logos, fake star ratings, or invented numbers to fill the reference's content slots. Replace unsupported proof elements with honest studio information or omit them.

---

## 3. Jellyfish acceptance specification

### 3.1 Shape and anatomy

The jellyfish must read immediately as a real jellyfish, not a balloon, umbrella icon, jellyfish emoji, or wireframe ornament.

**Bell**
- Large, domed, softly flattened translucent bell with a recognizable underside and rim.
- Layered depth: outer membrane, inner body/structures, subtle radial folds or striations, and a visible inner glow.
- Bright scarlet highlights concentrated along the upper curvature and rim; darker crimson volume toward the underside.
- Organic asymmetry and subtle surface variation. Avoid a perfectly smooth plastic sphere.
- The bell must be large enough to carry visual weight at 1440px desktop.

**Oral arms and trailing tentacles**
- Distinguish the thicker, frilled oral arms from the finer trailing tentacles.
- Build a dense fan of individually visible strands: target approximately 24–36 long fine tentacles plus 6–10 broader oral-arm forms, adjusted to the chosen species-like silhouette and camera angle.
- Vary length, taper, thickness, curvature, root position, depth, and phase. A single repeated curve duplicated around a circle will look synthetic.
- Tentacles must extend substantially below the bell—visually reaching toward the next section in the reference composition.
- Use multiple layers and depths so strands overlap naturally. Ensure strands remain visible against the near-black background without becoming thick red ropes.
- Add delicate side filaments/frills where they improve the silhouette; do not create an unreadable spaghetti mass.
- At least 20 distinct long strands must be identifiable in the desktop visual. This is a visual acceptance test, not merely a geometry-count test.

**Lighting and material**
- Translucent, volumetric red shell with rim/specular highlights and internal scattering-like glow.
- Light should reveal volume and surface curvature; do not rely on emissive red alone.
- Use a restrained palette: scarlet, warm red, crimson, and near-black. Keep highlights controlled.
- Use fog/depth and particles only to support scale and atmosphere, not to obscure the organism.

### 3.2 Motion

- Bell pulse: slow, organic contraction/relaxation; no mechanical squash.
- Tentacles: independent, delayed, low-amplitude movement with phase offsets and subtle curl. Their roots follow the bell while their tips lag.
- The motion should feel fluid and buoyant, not like synchronized ropes or a rotating chandelier.
- Overall drift/rotation must be subtle enough that the object remains composed with the typography.
- Avoid pointer-chasing motion that makes the subject unstable or distracts from reading.
- Reduced-motion mode must preserve a complete, attractive static visual and stop or greatly reduce continuous movement.
- Pause or reduce work when the scene is offscreen and adapt quality for constrained devices.

### 3.3 Implementation strategy

Prefer a high-quality real-time 3D asset or a deliberately built procedural model using the project's installed Three.js/R3F stack.

If extending the current procedural implementation:
- Use a coherent bell mesh and separately controlled oral-arm/tentacle geometry.
- Use tapered curves/tubes, segmented buffers, or instanced segments with per-strand parameter variation.
- Keep geometry/material objects stable; do not allocate vectors, arrays, materials, or closures repeatedly inside the frame loop.
- Do not update every strand with identical sine values.
- Check transparency sorting, depth writing, overdraw, and instancing behavior.
- Use current official Three.js and React Three Fiber documentation for the versions actually installed.

If a production-quality licensed 3D jellyfish asset is the better route:
- Verify its licence, source, attribution requirements, triangle/texture budget, and mobile performance.
- Keep the asset and licence/credit record in the repository.
- Do not use an unlicensed model, an untracked remote URL, or a model whose provenance is unclear.

A real photographic poster can be used as the initial-loading fallback, but it must be a faithful jellyfish image with a convincing bell and long tentacles. Do not describe a static poster as a real-time 3D result.

### 3.4 Performance and fallback

- Render the hero text and a high-quality poster immediately; do not block the first content paint on WebGL.
- Load the 3D scene after the primary content is visible and when it is near the viewport.
- Reserve layout space to prevent CLS.
- Cap device pixel ratio and reduce geometry/effects on mobile or low-power devices.
- Respect \`prefers-reduced-motion\`.
- Provide a deterministic fallback for WebGL unavailable/context lost.
- Avoid remote image dependencies that fail silently. Prefer tracked, licensed, optimized assets.
- Measure real performance after the visual implementation. Do not dismiss a poor score as an inevitable cost of 3D; investigate LCP, long tasks, JS transfer, texture size, draw calls, frame time, and canvas startup.

---

## 4. Recommended Claude Code skills and plugins

Install only what is missing. First inspect Claude Code's installed plugins/skills with its plugin UI and \`/skills\`; do not create duplicate copies. Plugin installation changes the agent environment, so show the exact additions to the owner if approval is needed.

### 4.1 Primary design skills

| Tool | Role in this project | How to use it |
|---|---|---|
| **Taste Skill — Leonxlnx** | Primary anti-slop art-direction and website-design driver. Current upstream README identifies v2.5.1, with a browser checker/finish gate, real image sourcing/credits, one design system, and page-by-page planning. | Use as the lead direction skill for the reference-driven redesign. Do not let it replace the supplied visual brief. |
| **Impeccable — Paul Bakaus** | Design director workflow for shaping, critique, audit, layout, typography, polish, responsive adaptation, hardening, and performance. The inspected upstream skill identifies v4.10.0. | Use its \`shape\`/new-work flow before edits, then targeted \`critique\`, \`audit\`, \`layout\`, \`typeset\`, \`adapt\`, \`polish\`, and \`optimize\` passes. Read its current playbooks and craft-floor before any UI edits. |
| **UI UX Pro Max — Next Level Builder** | Searchable design-system and UX reference data. The inspected current skill describes 80 styles, 194 product palettes/reasoning profiles, 74 font pairings, 130 UX guidelines, and 22 technology stacks. | Use once for a tailored design-system baseline, then query only specific concerns (responsive layout, accessibility, typography, interaction). It is a reference database, not an automatic design decision maker. |
| **Emil Kowalski skills** | Fine-grained animation/design-engineering standards for interaction, motion decisions, animation construction, animation review, and performance. | Load only the relevant skills: \`emil-design-eng\`, \`animate\`, \`review-animations\`, \`improve-animations\`, \`choreograph\`, or \`animation-performance\`. Do not load every skill at once. |

**Install commands / entry points**

Taste Skill:
\`\`\`text
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
\`\`\`
Current upstream skill/installation source: https://github.com/Leonxlnx/taste-skill

Impeccable:
\`\`\`text
/plugin marketplace add pbakaus/impeccable
\`\`\`
Then open \`/plugin\` and install Impeccable from the marketplace list. The upstream CLI installer is also documented as:
\`\`\`bash
npx impeccable install
\`\`\`
Run the Impeccable setup/init flow once for this project and follow its current hook/trust instructions. Do not install both plugin and CLI copies if that produces duplicate skills or hooks.
Source: https://github.com/pbakaus/impeccable

UI UX Pro Max:
\`\`\`text
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
\`\`\`
Alternative CLI install:
\`\`\`bash
npx --yes ui-ux-pro-max-cli init --ai claude
\`\`\`
Its search script requires Python 3.x. If Python is missing, ask the owner; do not install system software without approval.
Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Emil Kowalski skills:
\`\`\`bash
npx skills@latest add emilkowalski/skills
\`\`\`
Upstream skill catalogue and descriptions: https://github.com/emilkowalski/skills

### 4.2 Official / verification plugins

| Plugin | Publisher / purpose | Required use |
|---|---|---|
| **Frontend Design** | Anthropic-verified frontend design skill; explicit focus on distinctive production UI and avoiding generic AI aesthetics. | Use as the official baseline if Taste Skill is unavailable. If both are installed, Taste remains the primary art director for this task; do not let two skills independently replace the same design system. |
| **Playwright** | Microsoft browser automation, accessibility-tree interaction, screenshots, responsive testing, forms, console/network and E2E checks. | Required browser-verification tool if available. |
| **Chrome DevTools** | Google DevTools MCP: screenshots, mobile emulation, console/network, performance traces, memory, Lighthouse. | Required for performance and runtime diagnosis if available. |
| **Context7** | Upstash current documentation lookup. | Use for version-specific Next.js, React, Three.js, R3F, Motion, and browser API documentation. |
| **Superpowers** | Structured brainstorming, subagent-driven development, review, systematic debugging, and TDD. | Use for staged plans, independent reviewers, and failing-test-first fixes. |
| **GitHub** | GitHub integration for branches, commits, PRs, and review. | Use for isolated branch workflow and evidence-backed PR delivery. |

Anthropic's Marketplace identifies Frontend Design, Superpowers, Code Review, Context7, Playwright, GitHub, and other plugins as available Claude Code plugins. Prefer the official Marketplace entry and publisher shown in Claude Code rather than installing a similarly named community fork.

Frontend Design official source: https://claude.com/marketplace/plugins/frontend-design  
Marketplace catalogue: https://claude.com/marketplace/plugins  
Playwright plugin: https://claude.com/plugins/playwright  
Chrome DevTools plugin: https://claude.com/plugins/chrome-devtools-mcp

Chrome DevTools plugin install:
\`\`\`text
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp@chrome-devtools-plugins
\`\`\`
Restart Claude Code after installation and confirm the MCP tools are available. Avoid duplicate Chrome DevTools MCP registrations.

Superpowers should be installed from the official Anthropic-managed \`claude-plugins-official\` marketplace entry. Confirm the exact plugin entry in \`/plugin\` before installing; do not guess a similarly named package.

### 4.3 REA — Reverse Engineer Anything: optional, not the design engine

REA is real and relevant when an agent must inspect a shipped application, browser target, Electron package, binary, runtime behavior, or capture without relying only on source code. It can return evidence-backed findings and route analysis to the appropriate tooling.

For this project, the source repository and exact visual reference already exist. Therefore REA is **not required for screenshot-to-frontend implementation**. Use it only if a specific behavior, bundled asset, runtime output, or deployed build cannot be understood from the source and normal browser inspection.

Official source: https://github.com/morluto/rea  
Setup entry point from its README:
\`\`\`bash
npx rea-agents setup
\`\`\`
The REA setup adds an MCP server and agent workflow configuration; it requires a supported Node.js/npm environment and explicit review of the configuration changes. Do not run setup blindly. The separate Agent Skill route is documented at https://openskills.app/skills/reverse-engineer-anything.

### 4.4 Skill conflict policy

Do not activate every installed skill for every phase. Too many overlapping design rulebooks produce conflicting layout, motion, typography, and component decisions.

Use this order:
1. Owner's screenshot + RTSOLUTIONS brief are the authority.
2. Taste Skill is the primary art-direction voice.
3. UI UX Pro Max supplies targeted design-system/UX evidence; it does not override the brief.
4. Impeccable performs structured critique and focused polish; it must preserve the agreed direction.
5. Emil skills are scoped to interaction and animation quality.
6. Playwright/Chrome DevTools provide observable evidence, not taste opinions.
7. A separate reviewer challenges the implementation against the reference and acceptance criteria.

If two skills conflict, write down the conflict, choose the behavior that best satisfies the user's reference and product truth, and record the reason. Never average two incompatible visual directions.

---

## 5. Agentic team structure

Fable 5.2 is the orchestrator and final decision-maker. Delegate bounded analysis/review tasks when the environment supports subagents. Keep one implementation owner to avoid concurrent edits to the same CSS, hero, or scene files.

### Agent A — Creative Director / Reference Analyst (read-only)

**Task:** inspect the exact reference and current RTSOLUTIONS site/source. Produce a visual deconstruction and a gap report before code changes.

Must deliver:
- Reference composition map by section and viewport.
- Hero layout map and jellyfish silhouette/anatomy notes.
- Typography, spacing, palette, border, glow, and surface observations.
- Existing-vs-reference discrepancy list ranked by visual impact.
- Content elements that must not be copied because they are unsupported or belong to the reference brand.

Must not edit files.

### Agent B — Jellyfish / Three.js Specialist (analysis first; implementation only when assigned)

**Task:** inspect the existing \`JellyfishCanvas.tsx\`, geometry, material, animation, and render lifecycle. Determine why the current visual is not delivering the reference silhouette.

Must deliver:
- Runtime mount path proving whether the canvas appears in the current Hero.
- Anatomy/geometry plan for bell, oral arms, tentacles, and fine filaments.
- Proposed geometry and material approach with expected render cost.
- Reduced-motion, mobile, and WebGL fallback strategy.
- A short performance-risk list.

No code edits until the orchestrator approves the architecture.

### Agent C — UI / Design Engineer (single write owner)

**Task:** implement the approved design system and page composition while preserving product truth and existing working behavior.

Owns:
- Design tokens, typography, layout, section composition, navigation, panels, buttons, cards, responsive rules, and page integration.
- Hero integration with the approved jellyfish implementation.
- UI states and small interaction details.

Only this agent writes the shared UI files during an iteration.

### Agent D — Motion / Interaction Specialist (scoped reviewer)

**Task:** review and improve animation decisions, curves, timing, origins, interruptibility, reduced-motion, and performance using Emil's skills.

Do not add animation just to make the site appear sophisticated. Every motion must have a purpose: feedback, state indication, spatial continuity, explanation, or an intentional first-visit moment.

### Agent E — Accessibility / Responsive QA (read-only until findings accepted)

**Task:** run browser checks at target viewports and test navigation, keyboard, focus, contrast, touch targets, zoom, form states, and content overflow.

Return reproducible findings with route, viewport, steps, and screenshot/console evidence.

### Agent F — Performance / Runtime QA (read-only until findings accepted)

**Task:** inspect browser traces, WebGL startup, frame time, network, JS payload, image transfer, long tasks, LCP, CLS, and memory.

Report actual measurements and recording conditions. Do not invent a Lighthouse score or claim 60 FPS based on visual impression.

### Agent G — Adversarial Design Critic (independent, no implementation)

**Task:** compare the latest screenshots and short motion capture against the reference and the agreed design system. Be strict, but distinguish defects from preference.

Must return:
- Weighted score.
- Top five visual mismatches.
- Jellyfish anatomy verdict.
- Most visible UI/UX defects.
- Any unsupported content claims.
- Pass / revise decision with screenshot evidence.

The critic must not approve work merely because the build passes.

---

## 6. The agentic build loop

Run the phases in order. Each phase produces an artifact/evidence checkpoint. Do not jump from planning to a full rewrite.

### Phase 0 — Baseline and safety gate

1. Confirm repository and branch. Record exact base SHA.
2. Confirm clean/dirty git state and preserve user changes.
3. Read the project brief, acceptance criteria, README, technical decisions, and source files.
4. Inspect the reference image at full size.
5. Inspect Render service configuration. The currently known production service has been configured to deploy from \`claude/fable-5-2-build\`; re-check before acting. Never push this visual work to that branch while it remains the production auto-deploy branch.
6. Run the existing install, lint, typecheck, build, tests, and baseline screenshots. Record pre-existing failures distinctly from regressions.
7. Capture actual current page screenshots at 390×844, 768×1024, 1440×900, and 1920×1080. Include a full-page capture and a hero-first-viewport capture.
8. Open the current deployed site and local build separately. Identify exactly which commit each represents.

**Gate 0 output:** \`docs/qa/baseline.md\` or an equivalent concise artifact with branch/SHA, commands, actual results, screenshot paths, and known blockers.

### Phase 1 — Design intelligence and visual direction

1. Invoke Taste Skill as the primary anti-slop design skill.
2. Run Impeccable's new-work / shape process for a replacement visual world. Read the current installed skill's required playbooks, including its craft-floor, before making UI edits.
3. Query UI UX Pro Max for the smallest relevant set of design-system recommendations and UX rules. Do not dump every database domain into context.
4. Define one RTSOLUTIONS design system:
   - Color tokens: ink, raised surfaces, border, muted text, crimson, scarlet, highlight, focus.
   - Typography: display, body, technical/metadata family; weights, size ramp, leading, tracking, text measure.
   - Layout: content width, grid, gutter, section spacing, breakpoints, z-index layers.
   - Surfaces: flat, raised, glass, image/media, highlighted CTA. Each has a defined role.
   - Motion: durations, easing tokens, hover policy, entrance choreography, reduced-motion variant.
5. Map the reference's visible content structure to RTSOLUTIONS's real content. Document what is reused, reinterpreted, omitted, or replaced for truthfulness.
6. Approve the jellyfish architecture before implementation.

**Gate 1 output:** \`docs/REFERENCE_DESIGN_PLAN.md\` with annotated reference map, agreed design tokens, content map, jellyfish plan, responsive behavior, and accepted tradeoffs.

### Phase 2 — Jellyfish proof-of-concept

Build the signature object before polishing every section. It is the project's largest visual risk.

1. Implement the bell and its lighting/material.
2. Implement distinctly visible oral arms and long tentacles with varied lengths, taper, curvature, and per-strand motion.
3. Integrate the object into the actual Hero, replacing the current unmounted/unused path cleanly.
4. Add a static poster fallback that matches the live subject.
5. Test on desktop and mobile; capture a short real browser recording so the tentacle motion can be inspected.
6. Compare at least three camera/composition treatments if the first silhouette is uncertain, then choose one.
7. Check the silhouette in a paused screenshot: the long tentacles must still be visible without animation.

**Gate 2 output:** working hero art object, evidence screenshots, motion capture, known performance cost, and a pass/fail anatomy review. Do not move on with a tiny bell, sparse strands, or a hidden canvas.

### Phase 3 — Page composition and UI implementation

1. Implement the navigation and hero around the approved visual anchor.
2. Make the text, CTA, jellyfish, annotations, and information panels form one hierarchy.
3. Recompose the reference's below-fold structure with original RTSOLUTIONS content and proof-safe substitutions.
4. Build the rest of the site with varied layouts rather than repeating one card component.
5. Polish actual component states:
   - Default, hover, active/pressed, focus-visible, disabled, loading, success/error where applicable.
   - Menus open/close and keyboard behavior.
   - Forms validate correctly and never claim a message was sent when no backend/verified recipient exists.
   - Links and buttons have real destinations/actions.
6. Keep the global design system consistent; do not apply local CSS patches that create a second token system.
7. Keep mobile layouts intentionally designed, not merely scaled down.

### Phase 4 — Visual verification and adversarial review

Capture fresh browser evidence after the page is running and fonts/images/canvas are fully ready.

**Required viewports**
- 390×844 — mobile
- 768×1024 — tablet
- 1440×900 — desktop
- 1920×1080 — wide desktop

At each relevant breakpoint inspect:
- Hero composition and visible jellyfish anatomy.
- Headline wrapping and text readability.
- Navigation and CTA.
- Panel alignment, spacing, and clipping.
- Section transition and page rhythm.
- Any content overlap or horizontal overflow.

Use Playwright for real screenshots and interactions. Use Chrome DevTools for console, network, device emulation, and performance traces. Compare full-page captures as well as the hero viewport. Wait for images and fonts to load; wait for the canvas to initialize; record capture conditions.

The adversarial critic must review the screenshots and motion capture independently. Fix the highest-impact visual mismatch first, not whichever defect is easiest to code.

### Phase 5 — Targeted revision loop

Run up to six substantial visual iterations. Stop early only when the acceptance gates pass.

For each iteration:
1. State the three largest measurable mismatches.
2. Select no more than three goals for the iteration.
3. Implement those goals.
4. Run build/typecheck/lint for the touched surface.
5. Capture the affected viewport(s) and a full-page desktop screenshot.
6. Have the critic score the result against the reference.
7. Record before/after screenshots and exact file changes.
8. Decide: accept, revise, or revert.

Do not make random changes between screenshots. Do not endlessly tweak small details while the main silhouette or composition is still wrong.

### Phase 6 — Complete QA and final gate

- Lint, typecheck, production build, and existing automated tests must pass.
- All four viewports must be captured from the final commit.
- No hydration errors, unhandled exceptions, missing critical assets, broken routes, or unexplained network failures.
- Navigation and CTAs must work.
- Keyboard navigation, focus-visible, labels, contrast, reduced motion, zoom, and touch targets must be checked.
- No horizontal overflow at 320px minimum, 390px, 768px, 1440px, and 1920px.
- WebGL failure and reduced-motion fallback must be tested.
- Performance traces must include conditions and actual measurements. Record desktop and mobile behavior separately.
- Any remaining defect must be documented; no silent waivers.

### Phase 7 — Git delivery for independent ChatGPT review

1. Re-check that the production branch has not been modified.
2. Push the implementation on a new feature branch created from the current approved base.
3. Commit source, tests, optimized/credited assets, screenshots, QA report, and README updates in logical commits.
4. Open a reviewable PR against the intended development base branch; keep it unmerged.
5. Include before/after screenshots in the PR body and link the final source screenshots.
6. Report branch, base SHA, head SHA, PR URL, files changed, exact tests and outcomes, Lighthouse/performance artifacts, and known limitations.
7. Do not merge or trigger Render deployment. Wait for the owner's and ChatGPT's review.

---

## 7. Scorecard and pass thresholds

Score each category from 0–10, with screenshot/recording evidence. Do not inflate the score to finish the task.

| Category | Weight | Pass requirement |
|---|---:|---|
| Reference composition and visual fidelity | 20% | 8.5/10 |
| Jellyfish anatomy, scale, and tentacle richness | 25% | 9/10 |
| Typography and hierarchy | 10% | 8/10 |
| UI component craft and section rhythm | 15% | 8.5/10 |
| Responsive behavior | 10% | 8.5/10 |
| Motion quality and performance | 10% | 8/10 |
| Accessibility and interaction correctness | 5% | 8/10 |
| Content truth / brand integrity | 5% | 10/10 |

**Overall pass:** at least 86/100 and all category minimums met.

**Automatic fail regardless of score**
- Jellyfish is missing, tiny, overly faint, or lacks clearly visible long tentacles.
- Hero still uses the old CSS photo without the approved replacement or a clearly intentional fallback.
- Main content is unreadable or obscured by the focal object.
- Any fake metrics, testimonials, clients, logos, location, awards, or business claims are introduced.
- Critical mobile overflow, broken navigation, serious accessibility failure, or runtime errors remain.
- Screenshots do not correspond to the reported final commit.
- Production branch/deployment is changed without authorization.

---

## 8. Required evidence package

The final PR must contain or link to:

- \`docs/REFERENCE_DESIGN_PLAN.md\` — reference deconstruction, design decisions, content mapping.
- \`docs/qa/baseline.md\` — baseline commit and checks.
- \`docs/qa/final-report.md\` — final commands, results, limitations, and scorecard.
- \`docs/screenshots/\` — final full-page and viewport screenshots actually captured from the final commit.
- A short motion capture of the jellyfish on desktop and mobile (or a truthful note if the environment cannot record it).
- Asset provenance/licence notes for any external model, texture, photo, or HDRI.
- Updated README matching the repository's actual state.

Never put illustrative/mock screenshots into the evidence folder and label them as captured output.

---

## 9. Fable 5.2 kickoff prompt

Use this as the first instruction after the required skills/plugins are available:

> You are Fable 5.2 acting as creative director, staff frontend engineer, 3D/web-graphics specialist, and verification lead for RTSOLUTIONS. Read \`docs/FABLE_5_2_REFERENCE_AGENTIC_LOOP.md\`, \`CLAUDE.md\`, \`docs/BUILD_BRIEF.md\`, \`docs/ACCEPTANCE_CRITERIA.md\`, and inspect \`docs/reference/visual-direction-reference.webp\` directly.
>
> Do not edit yet. Run Phase 0. Inspect the current source and prove which jellyfish visual is actually mounted in the running hero. Then produce the reference deconstruction, baseline evidence, plugin/skill availability report, design-system proposal, jellyfish anatomy/geometry proposal, and a ranked discrepancy list.
>
> The most important acceptance condition is the large, luminous red jellyfish with a substantial bell and a dense, clearly visible fan of long trailing tentacles. A sparse outlined bell is not acceptable. The object must be integrated into the hero and remain visually powerful while the RTSOLUTIONS copy remains readable.
>
> Use Taste as the lead design voice, Impeccable for structured critique/polish, UI UX Pro Max for targeted design-system research, Emil's skills for animation decisions, and Playwright/Chrome DevTools for real evidence. Use REA only if a specific shipped/runtime behavior cannot be understood from the repository and browser inspection.
>
> Preserve truthful RTSOLUTIONS content. Do not copy AgentAI's identity or fabricate its statistics/testimonials/logos. Use subagents for bounded read-only analysis and independent critique; keep one writer responsible for shared UI files. Do not start multiple overlapping design rewrites.
>
> Work on a new feature branch, not \`main\` and not the Render production branch. Iterate with real screenshots, a motion capture, a scored independent critique, and a maximum of six major revision passes. Push a review PR but do not merge or deploy. Report exact SHAs, files, commands, measurements, and evidence. If the result does not meet the scorecard, say so plainly instead of calling it complete.

---

## 10. Research sources and provenance

The setup and workflow above were based on the following upstream sources, inspected on 2026-11-19. Re-check their current instructions before installation because plugin registries and versions change.

- Taste Skill (Leonxlnx): https://github.com/Leonxlnx/taste-skill
- Impeccable (Paul Bakaus): https://github.com/pbakaus/impeccable
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Emil Kowalski skills: https://github.com/emilkowalski/skills
- Anthropic Claude plugin marketplace: https://claude.com/marketplace/plugins
- Anthropic Frontend Design: https://claude.com/marketplace/plugins/frontend-design
- Microsoft Playwright plugin: https://claude.com/plugins/playwright
- Google Chrome DevTools plugin: https://claude.com/plugins/chrome-devtools-mcp
- Chrome DevTools plugin installation: https://developer.chrome.com/docs/devtools/agents
- REA: https://github.com/morluto/rea
- REA Agent Skill listing: https://openskills.app/skills/reverse-engineer-anything
- UI UX Pro Max setup instructions: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill#installation
