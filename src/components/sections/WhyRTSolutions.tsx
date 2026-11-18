'use client';

import { motion } from 'motion/react';
import {
  Sparkles,
  Brain,
  Hammer,
  Infinity,
  Shield,
  Heart,
  Check,
  ArrowRight,
} from 'lucide-react';

const differentiators = [
  {
    icon: Sparkles,
    title: 'Creative Frontend Craft',
    description:
      'We treat the browser as a creative medium. Motion, interaction, 3D, typography, and layout aren\'t afterthoughts—they\'re the work. The result feels authored, not assembled.',
    proof: 'Custom design systems, motion languages, and 3D experiences built from scratch—not template configurations.',
  },
  {
    icon: Brain,
    title: 'Thoughtful Engineering',
    description:
      'Clean architecture, strict TypeScript, automated testing, performance budgets, and CI/CD aren\'t optional add-ons. They\'re how we ensure the craft survives contact with reality.',
    proof: 'Type-safe end-to-end, 80%+ test coverage targets, Lighthouse CI gates, and documented architecture decisions.',
  },
  {
    icon: Hammer,
    title: 'Full-Stack Ownership',
    description:
      'We don\'t hand off designs to separate dev teams. The people who design it build it. That continuity means intent survives implementation—and the result is cohesive.',
    proof: 'Designers who write production React. Engineers who make typography decisions. No handoff loss.',
  },
  {
    icon: Infinity,
    title: 'Longevity by Default',
    description:
      'We choose boring, proven technology for the foundation and spend our innovation budget on the experience. The result works today and adapts tomorrow without rewrite cycles.',
    proof: 'Tauri for desktop (Rust backend, web frontend), Next.js for web, PostgreSQL + Prisma. 5-year maintenance horizon minimum.',
  },
  {
    icon: Shield,
    title: 'Accessibility as Craft',
    description:
      'WCAG AA isn\'t a compliance checkbox—it\'s a quality standard. Semantic HTML, keyboard navigation, focus management, reduced motion, and screen reader testing are baked in.',
    proof: 'Automated aXe testing in CI, manual keyboard/screen reader QA, and accessibility annotations in every design handoff.',
  },
  {
    icon: Heart,
    title: 'Human Scale, Honest Work',
    description:
      'We\'re a small team by choice. You work directly with the people making your product. No account managers, no junior handoffs, no inflated headcounts. Just craft and accountability.',
    proof: 'Principal-level involvement on every engagement. Direct Slack/email access. Transparent pricing and timelines.',
  },
];

const notForEveryone = [
  'Teams wanting the cheapest option',
  'Projects requiring a large agency bench',
  'Fixed-scope waterfall engagements',
  'Commodity CMS implementations',
  'White-label reseller work',
];

export function WhyRTSolutions() {
  return (
    <section
      id="why"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
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
            Why RTSOLUTIONS
          </span>
          <h2
            id="why-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]"
          >
            Six reasons.
            <br />
            <span className="text-crimson-glow">One standard.</span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            We\'re not the right fit for everyone. That\'s intentional.
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16 lg:mb-20">
          {differentiators.map((diff, index) => (
            <motion.article
              key={diff.title}
              className="group glass-panel-strong rounded-2xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
            >
              <div className="flex gap-6">
                {/* Icon */}
                <div className="w-14 h-14 glass-panel-crimson rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <diff.icon className="w-7 h-7 text-crimson-glow" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-medium text-white mb-3">
                    {diff.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {diff.description}
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="font-mono text-xs text-text-dim uppercase tracking-wider mb-2">
                      What this looks like in practice
                    </p>
                    <p className="text-sm text-text-secondary">{diff.proof}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Not For Everyone */}
        <motion.div
          className="glass-panel-crimson rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center flex-shrink-0 text-crimson-glow">
              <Check className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl lg:text-2xl font-medium text-white mb-2">
                We\'re not for everyone
              </h3>
              <p className="text-text-secondary">
                And we\'re honest about it. These aren't value judgments—just scope clarity.
              </p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {notForEveryone.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-center gap-2 text-sm text-text-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
              >
                <span className="w-1.5 h-1.5 bg-crimson-glow/40 rounded-full flex-shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 1 }}
        >
          <p className="font-display text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6 max-w-2xl mx-auto">
            If this sounds like how you want to work, we should talk.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-300 hover:shadow-crimson"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}