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
      'We treat the browser as a creative medium. Typography, layout, interaction, and motion should support the idea—not decorate it. The result should feel authored, not assembled.',
    proof: 'Visual direction and interaction choices are developed alongside the interface, not added at the end.',
  },
  {
    icon: Brain,
    title: 'Thoughtful Engineering',
    description:
      'A clear visual experience still needs a sound foundation. We favour understandable structure, typed code, useful tests, and performance work tied to real user needs.',
    proof: 'Technical decisions, automated checks, and performance considerations are documented against the project's actual scope.',
  },
  {
    icon: Hammer,
    title: 'Full-Stack Ownership',
    description:
      'Design and engineering work best when they inform each other. We keep the people shaping the experience close to the people implementing it.',
    proof: 'Shared decisions, reusable interface patterns, and direct review of the finished interaction.',
  },
  {
    icon: Infinity,
    title: 'Longevity by Default',
    description:
      'We prefer maintainable foundations and introduce new technology only when it solves a real problem. The goal is a product the next person can understand and extend.',
    proof: 'Technology choices are weighed against product needs, constraints, and long-term maintenance—not trend cycles.',
  },
  {
    icon: Shield,
    title: 'Accessibility as Craft',
    description:
      'Accessibility is part of the craft: semantic structure, keyboard access, visible focus, and reduced-motion support should be considered from the start.',
    proof: 'We check the paths and criteria agreed for the project, record gaps, and avoid claiming certification without an independent assessment.',
  },
  {
    icon: Heart,
    title: 'Human Scale, Honest Work',
    description:
      'Clear scope and direct communication make collaboration easier. We keep decisions visible and explain trade-offs instead of hiding behind inflated language.',
    proof: 'Written scope, named responsibilities, and explicit assumptions—so expectations stay grounded.',
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