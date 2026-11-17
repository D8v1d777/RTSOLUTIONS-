'use client';

import { motion } from 'motion/react';
import {
  Globe,
  Layers,
  Monitor,
  Code2,
  Database,
  Zap,
  Shield,
  GitBranch,
  Component,
} from 'lucide-react';

const capabilities = [
  {
    category: 'Custom Websites',
    icon: Globe,
    description: 'Brand experiences, marketing sites, editorial platforms, and landing pages that feel authored—not assembled.',
    details: [
      'Design systems & art direction',
      'Motion-first interactions',
      'Performance-optimized delivery',
      'CMS integration (headless)',
      'Multilingual & accessibility',
    ],
    highlight: 'Creative frontend craft',
  },
  {
    category: 'Web Applications',
    icon: Monitor,
    description: 'Custom interactive products, dashboards, SaaS interfaces, and complex client-side applications.',
    details: [
      'React/Next.js architecture',
      'Real-time features (WebSockets)',
      'Complex state management',
      'Data visualization & charts',
      'Progressive Web Apps',
    ],
    highlight: 'Thoughtful engineering',
  },
  {
    category: 'Desktop Applications',
    icon: Component,
    description: 'Purpose-built software for focused workflows—Tauri, Electron, or native where it matters.',
    details: [
      'Tauri (Rust + Web) preferred',
      'Electron for compatibility',
      'Native menus & system integration',
      'Auto-updates & code signing',
      'Offline-first architecture',
    ],
    highlight: 'Longevity by default',
  },
];

const techStack = [
  { name: 'Next.js 15', category: 'Framework' },
  { name: 'React 19', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS 4', category: 'Styling' },
  { name: 'Three.js / R3F', category: '3D Graphics' },
  { name: 'Motion (Framer)', category: 'Animation' },
  { name: 'Tauri', category: 'Desktop' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'tRPC / GraphQL', category: 'API' },
  { name: 'Vitest / Playwright', category: 'Testing' },
  { name: 'GitHub Actions', category: 'CI/CD' },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
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
            What we build
          </span>
          <h2
            id="capabilities-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]"
          >
            Three disciplines.
            <br />
            <span className="text-crimson-glow">One standard of craft.</span>
          </h2>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.category}
              className="group relative glass-panel-strong rounded-2xl p-8 lg:p-10 h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.15 }}
            >
              {/* Icon */}
              <div className="w-14 h-14 glass-panel-crimson rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <capability.icon className="w-7 h-7 text-crimson-glow" aria-hidden="true" />
              </div>

              {/* Category */}
              <h3 className="font-display text-xl lg:text-2xl font-medium text-white mb-3">
                {capability.category}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                {capability.description}
              </p>

              {/* Details */}
              <ul className="space-y-3 mb-8">
                {capability.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 bg-crimson-glow/40 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight tag */}
              <div className="pt-6 border-t border-white/5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-panel-crimson rounded-lg text-xs font-medium text-crimson-glow">
                  {capability.highlight}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          className="mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display text-xl lg:text-2xl font-medium text-white">
                Our toolkit
              </h3>
              <p className="text-text-dim text-sm mt-1">Chosen deliberately. Not every tool for every job.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group glass-panel rounded-xl p-4 lg:p-5 transition-all duration-300 hover:glass-panel-strong hover:border-crimson-dim/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.6 + index * 0.03 }}
              >
                <span className="font-display text-sm font-medium text-white group-hover:text-crimson-glow transition-colors">
                  {tech.name}
                </span>
                <span className="block mt-1 font-mono text-xs text-text-dim uppercase tracking-wider">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}