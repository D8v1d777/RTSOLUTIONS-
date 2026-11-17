'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function StudioManifesto() {
  const manifestoItems = [
    {
      number: '01',
      title: 'We gather the mess',
      description:
        'Most projects arrive as fragments: competing priorities, unclear scope, half-formed ideas. We don\'t judge the chaos—we listen, map it, and find the signal in the noise.',
    },
    {
      number: '02',
      title: 'We find the meaning',
      description:
        'Behind every request is a real problem. We dig past symptoms to understand the "why." That clarity becomes the north star for every design and engineering decision.',
    },
    {
      number: '03',
      title: 'We make something that lasts',
      description:
        'Trends expire. Craft endures. We build with intention—clean architecture, accessible interfaces, performant code, thoughtful motion. The result works today and adapts tomorrow.',
    },
  ];

  return (
    <section
      id="manifesto"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel text-xs font-medium text-crimson-glow uppercase tracking-wider mb-6">
            <Quote className="w-4 h-4" aria-hidden="true" />
            Studio Manifesto
          </span>
          <h2
            id="manifesto-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]"
          >
            How we work. <span className="text-crimson-glow">Why it matters.</span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Three principles that guide every engagement. Not a methodology—a mindset.
          </p>
        </motion.div>

        {/* Manifesto Items */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {manifestoItems.map((item, index) => (
            <motion.article
              key={item.number}
              className="group relative glass-panel-strong rounded-2xl p-8 lg:p-10 h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.15 }}
            >
              {/* Number */}
              <div className="mb-6">
                <span className="font-display text-5xl lg:text-6xl font-medium text-crimson-glow/20 tracking-tight">
                  {item.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl lg:text-2xl font-medium text-white mb-4 group-hover:text-crimson-glow transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-crimson-glow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.article>
          ))}

          {/* Center connecting line - decorative */}
          <div className="hidden lg:block absolute top-20 bottom-20 left-1/2 w-px bg-gradient-to-b from-crimson-glow/20 via-crimson-glow/40 to-crimson-glow/20 -translate-x-1/2" aria-hidden="true" />
          <div className="hidden lg:block absolute top-20 bottom-20 right-1/2 w-px bg-gradient-to-b from-crimson-glow/20 via-crimson-glow/40 to-crimson-glow/20 translate-x-1/2" aria-hidden="true" />
        </div>

        {/* Closing statement */}
        <motion.div
          className="mt-20 lg:mt-28 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
        >
          <p className="font-display text-xl lg:text-2xl text-text-secondary leading-relaxed">
            "We don't just build interfaces. We shape how people experience your product."
          </p>
          <p className="mt-4 text-sm text-text-dim font-mono tracking-wider uppercase">
            — RTSOLUTIONS founding principle
          </p>
        </motion.div>
      </div>
    </section>
  );
}