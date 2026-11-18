# RTSOLUTIONS — Product and creative brief

## Business
**Name:** RTSOLUTIONS  
**Type:** Independent software and digital product studio / startup  
**Core services:**
- Custom websites and high-end frontend experiences
- Web applications
- Desktop applications

**Positioning:** We gather messy, half-formed, complicated ideas and craft something artistic, useful, technically sound, and durable. Our strongest differentiator is creative frontend execution paired with serious engineering.

**Core thought:** “We gather the mess. Find the meaning. Make something that lasts.” This is a working brand line; refine it if a stronger line emerges without losing the meaning.

## Audience
Founders, small businesses, teams, and organizations with an idea or operational problem that needs a thoughtful digital solution. The site should communicate craft and trust without pretending the studio is a large agency.

## Desired impression
- Artistic, confident, technically capable, considered, premium
- Distinctive rather than trendy-for-the-sake-of-trendy
- Human and direct, not corporate jargon
- Dark, cinematic, immersive, with red as a deliberate accent
- The work should feel authored and intentional

## Visual reference
`docs/reference/visual-direction-reference.webp` is committed directly in this repository. Open and inspect this exact file before design work; do not ask the user to paste or upload it. Carry forward:
- Near-black / black base
- Deep crimson shadows and scarlet highlights
- Glowing translucent jellyfish as the signature visual motif
- Editorial oversized sans-serif typography
- Asymmetric composition and carefully layered content
- Glass-like dark panels, thin borders, subtle reflections
- Small technical annotations and restrained micro-details

Do not copy the reference's AgentAI identity, wording, layout, statistics, client logos, testimonials, or exact section composition.

## Jellyfish art direction
The jellyfish should feel like a living, delicate deep-sea organism made of light. Bell: translucent, volumetric, soft red internal glow, subtle rim lighting, organic pulsation. Tentacles: multiple fine strands with independent phase offsets, fluid delayed movement, slight curl and drift. Add restrained particles and depth. It must look elegant and believable, not like a red balloon with straight wires. Use a real-time 3D scene and keep it performant. On touch devices and reduced-motion settings, simplify or freeze movement appropriately without removing the visual identity.

## Content architecture
Suggested page flow (change if a better story is found):
1. Navigation / identity
2. Hero: concise positioning, primary CTA, secondary CTA, jellyfish art object
3. Studio manifesto: what “gather the mess” means
4. Capabilities: websites, web applications, desktop applications
5. Selected work / creative directions: do not invent clients or imply concept studies are shipped client projects
6. Process: discovery → direction → design → engineering → refinement / launch
7. Why RTSOLUTIONS: creative frontend, thoughtful engineering, longevity
8. Contact: simple, honest, frictionless
9. Footer

## Copy guidance
Use concise, distinctive language. Explain outcomes, not just technologies. Avoid empty phrases like “innovative solutions,” “cutting-edge,” “revolutionary,” “world-class,” “next-generation,” and generic claims of excellence. Do not invent years in business, project counts, conversion lifts, customer counts, partner logos, reviews, or locations.

## Unknowns — do not fabricate
- Official domain
- Business email and phone
- Social profile URLs
- Location / service region
- Pricing and engagement model
- Real client projects, logos, testimonials, performance metrics

Centralize these in a simple config file and mark placeholders clearly. The user can supply verified details later.

## Technical starting point
Current starter is intended to use Next.js App Router, React, TypeScript, Tailwind CSS 4, Three.js / React Three Fiber, Motion, and Lucide. Audit the actual dependency versions and official compatibility before making changes. Keep the architecture lean; do not add a backend or CMS unless justified by the actual scope.