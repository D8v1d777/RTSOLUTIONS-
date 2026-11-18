'use client';

import { motion } from 'motion/react';
import {
  Search,
  Lightbulb,
  PenTool,
  Code2,
  CheckCircle2,
  Rocket,
  Quote,
} from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    icon: Search,
    description:
      'We clarify the problem, the people it affects, and the constraints around it. The goal is a shared brief before a solution is chosen.',
    deliverables: [
      'Project brief & success criteria',
      'Technical feasibility notes',
      'Risks and constraints',
      'Rough timeline & budget range',
    ],
    duration: 'Varies by scope',
  },
  {
    number: '02',
    title: 'Direction',
    icon: Lightbulb,
    description:
      'We explore the creative and technical direction before committing to a build. Trade-offs are made visible early.',
    deliverables: [
      'Creative directions, where useful',
      'Architecture decisions and trade-offs',
      'Design system foundations',
      'Prototype of key interactions',
    ],
    duration: 'Varies by scope',
  },
  {
    number: '03',
    title: 'Design',
    icon: PenTool,
    description:
      'We shape the visual system, page structure, and interaction details around the agreed goals.',
    deliverables: [
      'Page and screen designs',
      'Interaction and motion notes',
      'Reusable component patterns',
      'Responsive and accessibility considerations',
    ],
    duration: 'Varies by scope',
  },
  {
    number: '04',
    title: 'Engineering',
    icon: Code2,
    description:
      'We implement the agreed experience with maintainable structure, typed code, and checks appropriate to the product.',
    deliverables: [
      'Working codebase',
      'Automated checks suited to scope',
      'Performance checks on key paths',
      'Setup and handoff notes',
    ],
    duration: 'Varies by scope',
  },
  {
    number: '05',
    title: 'Refinement',
    icon: CheckCircle2,
    description:
      'We test the important paths, address defects, and tune the experience before release.',
    deliverables: [
      'QA findings and fixes',
      'Browser and device checks',
      'Accessibility checks within agreed scope',
      'Release-readiness checklist',
    ],
    duration: 'Varies by scope',
  },
  {
    number: '06',
    title: 'Launch',
    icon: Rocket,
    description:
      'We prepare the release, deploy to the agreed environment, and make the handoff clear. Any ongoing support is defined in the project scope.',
    deliverables: [
      'Release deployment',
      'Operational handoff notes',
      'Monitoring or analytics, if agreed',
      'Post-launch support as scoped',
    ],
    duration: 'Varies by scope',
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
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
            Our Process
          </span>
          <h2
            id="process-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]"
          >
            Six phases.
            <br />
            <span className="text-crimson-glow">No shortcuts.</span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed">
            Timing and deliverables are agreed once the scope is clear.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-crimson-glow/20 via-crimson-glow/40 to-crimson-glow/20" aria-hidden="true" />

          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative flex gap-6 lg:gap-8"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
              >
                {/* Number & Icon Column */}
                <div className="relative flex flex-col items-center lg:items-end w-20 lg:w-24 flex-shrink-0">
                  {/* Number */}
                  <span className="font-display text-4xl lg:text-5xl font-medium text-crimson-glow/20 tracking-tight mb-2">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative w-14 h-14 glass-panel-crimson rounded-xl flex items-center justify-center z-10">
                    <step.icon className="w-6 h-6 text-crimson-glow" aria-hidden="true" />
                  </div>

                  {/* Duration */}
                  <span className="mt-3 font-mono text-xs text-text-dim text-right w-full">
                    {step.duration}
                  </span>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                  <div className="glass-panel-strong rounded-2xl p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-xl lg:text-2xl font-medium text-white mb-2">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Deliverables */}
                    <div className="pt-4 border-t border-white/5">
                      <h4 className="font-mono text-xs text-text-dim uppercase tracking-wider mb-4">
                        Deliverables
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {step.deliverables.map((deliverable, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <motion.span
                              className="w-1.5 h-1.5 bg-crimson-glow/40 rounded-full mt-1.5 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.05, type: 'spring', stiffness: 200 }}
                            />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy note */}
        <motion.div
          className="mt-20 lg:mt-24 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
        >
          <div className="glass-panel-crimson rounded-2xl p-8 lg:p-12">
            <Quote className="w-10 h-10 text-crimson-glow/30 mx-auto mb-4" aria-hidden="true" />
            <p className="font-display text-lg lg:text-xl text-text-secondary leading-relaxed mb-4">
              "A clear process makes room for good judgment."
            </p>
            <p className="text-sm text-text-dim font-mono tracking-wider uppercase">
              A NOTE ON PROCESS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}