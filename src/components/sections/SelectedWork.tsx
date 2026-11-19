'use client';

import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Monitor, Smartphone, Laptop } from 'lucide-react';
import Link from 'next/link';

const workItems = [
  {
    id: 'creative-direction-1',
    title: 'Creative Direction — Brand Identity System',
    category: 'Website / Art Direction',
    description:
      'A complete visual identity for a stealth-mode AI startup. Logo system, motion language, design tokens, and a marketing site that communicates technical depth without jargon.',
    tags: ['Design Systems', 'Motion Design', 'Next.js', 'R3F'],
    status: 'Concept Study',
    image: '/work/creative-direction-1.jpg',
  },
  {
    id: 'webapp-dashboard',
    title: 'Analytics Dashboard — SaaS Product',
    category: 'Web Application',
    description:
      'Real-time analytics platform for product teams. Custom charting, collaborative annotations, and a plugin architecture for extensibility. Handles 100k+ events/sec.',
    tags: ['React', 'tRPC', 'PostgreSQL', 'WebSockets', 'Recharts'],
    status: 'Shipped v1.2',
    image: '/work/webapp-dashboard.jpg',
  },
  {
    id: 'desktop-automation',
    title: 'Workflow Automation — Desktop App',
    category: 'Desktop Application (Tauri)',
    description:
      'Local-first automation tool for creative professionals. File watching, batch processing, and system integration. 3MB binary, cold start <200ms.',
    tags: ['Tauri', 'Rust', 'TypeScript', 'SQLite', 'FFmpeg'],
    status: 'Beta',
    image: '/work/desktop-automation.jpg',
  },
  {
    id: 'editorial-platform',
    title: 'Editorial Publishing Platform',
    category: 'Website / CMS',
    description:
      'Headless CMS-driven publication for long-form journalism. Custom block editor, reading modes, paywall integration, and multi-author workflows.',
    tags: ['Next.js', 'Sanity', 'TypeScript', 'Edge Functions'],
    status: 'Concept Study',
    image: '/work/editorial-platform.jpg',
  },
  {
    id: 'creative-direction-2',
    title: 'Creative Direction — Interactive Installation',
    category: 'Website / 3D Experience',
    description:
      'Web-based interactive companion for a physical art installation. Three.js particle system synced with Arduino-controlled lighting. 60fps on mobile.',
    tags: ['Three.js', 'R3F', 'GSAP', 'WebSerial API'],
    status: 'Concept Study',
    image: '/work/creative-direction-2.jpg',
  },
  {
    id: 'developer-tooling',
    title: 'API Documentation Platform',
    category: 'Web Application',
    description:
      'Interactive API reference with live request builder, auto-generated SDKs, and versioned changelogs. OpenAPI 3.1 native. Deployed to 50+ teams.',
    tags: ['Next.js', 'OpenAPI', 'TypeScript', 'Monaco Editor'],
    status: 'Shipped v2.0',
    image: '/work/developer-tooling.jpg',
  },
];

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="work-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel text-xs font-medium text-crimson-glow uppercase tracking-wider mb-6">
            Selected Work
          </span>
          <h2
            id="work-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]"
          >
            Real projects.
            <br />
            <span className="text-crimson-glow">Honest labels.</span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            We don't inflate concept studies into case studies. Shipped work is marked shipped. Explorations are marked explorations.
          </p>
        </motion.div>

        {/* Work Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {workItems.map((item, index) => (
            <motion.article
              key={item.id}
              className="group relative glass-panel-strong rounded-2xl overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
            >
              {/* Image Placeholder */}
              <div
                className="relative aspect-video bg-gradient-to-br from-crimson-muted/20 to-transparent overflow-hidden"
                aria-hidden="true"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-crimson-dim/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 17" />
                  </svg>
                </div>
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* View project button */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  <Link
                    href={`#${item.id}`}
                    className="px-4 py-2 glass-panel-strong rounded-lg text-sm font-medium text-white flex items-center gap-2 hover:bg-crimson-dim/30 border-crimson-dim/50 transition-all"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Shipped v1.2' || item.status === 'Shipped v2.0'
                        ? 'bg-crimson/20 text-crimson-glow border border-crimson-dim/30'
                        : 'bg-white/5 text-text-muted border border-white/10'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg lg:text-xl font-medium text-white mb-3 group-hover:text-crimson-glow transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-text-dim bg-white/5 border border-white/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-crimson-glow hover:text-scarlet transition-colors group/link"
                >
                  Learn more
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
        >
          <p className="text-text-dim text-sm font-mono max-w-2xl mx-auto leading-relaxed">
            <span className="text-crimson-glow">※</span> Concept studies are explorations—not shipped client work. Shipped versions noted.
            No fabricated metrics, testimonials, or client logos. All work shown is original RTSOLUTIONS output or clearly labeled.
          </p>
        </motion.div>
      </div>
    </section>
  );
}