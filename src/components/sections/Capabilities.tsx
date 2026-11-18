'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Monitor, PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';

const capabilities = [
  {
    number: '01',
    title: 'Websites & experiences',
    icon: PanelsTopLeft,
    description: 'Distinctive digital identities, marketing sites, editorial platforms, and immersive frontends.',
    points: ['Art direction & design systems', 'Responsive, accessible interfaces', 'Motion and 3D when it earns its place'],
  },
  {
    number: '02',
    title: 'Web applications',
    icon: Code2,
    description: 'Purposeful products, SaaS interfaces, dashboards, and complex workflows made easier to use.',
    points: ['Product architecture & UI systems', 'Data-rich interactive experiences', 'Testing, performance, and reliability'],
  },
  {
    number: '03',
    title: 'Desktop software',
    icon: Monitor,
    description: 'Focused software for people who need dependable tools that fit the way they actually work.',
    points: ['Tauri, Electron, or native approaches', 'Offline-first and local workflows', 'System integration and thoughtful UX'],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="capabilities-section relative overflow-hidden" aria-labelledby="capabilities-heading">
      <div className="container relative">
        <div className="capabilities-shell">
          <div className="capabilities-intro">
            <span className="section-overline section-overline--light"><span /> WHAT WE MAKE</span>
            <h2 id="capabilities-heading">
              End-to-end
              <br />
              digital <em>craft.</em>
            </h2>
            <p>
              From the first uncertain sketch to the last detail before launch, we connect design decisions
              to engineering decisions—and keep the experience coherent.
            </p>
            <Link href="#contact" className="text-link">
              Talk through an idea <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <div className="capabilities-index">
              <span>3 disciplines</span>
              <span className="capabilities-index-line" />
              <span>One standard of care</span>
            </div>
          </div>

          <div className="capabilities-list">
            {capabilities.map((item, index) => (
              <motion.article
                className="capability-row"
                key={item.number}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <div className="capability-row-top">
                  <span className="capability-number">{item.number}</span>
                  <div className="capability-icon"><item.icon size={20} aria-hidden="true" /></div>
                  <span className="capability-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
