'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Layers3, ScanSearch } from 'lucide-react';
import Link from 'next/link';

const principles = [
  {
    number: '01',
    title: 'Find the signal',
    description: 'We listen, question assumptions, and make the real problem visible before choosing a direction.',
    icon: ScanSearch,
  },
  {
    number: '02',
    title: 'Shape the experience',
    description: 'We give the idea a clear visual language, useful structure, and interactions that feel considered.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Build for the long run',
    description: 'We care about the details beneath the surface: accessibility, performance, maintainability, and craft.',
    icon: Layers3,
  },
];

export function StudioManifesto() {
  return (
    <section id="manifesto" className="studio-section relative overflow-hidden" aria-labelledby="manifesto-heading">
      <div className="container relative">
        <div className="studio-section-heading">
          <span className="section-overline"><span /> A little about us</span>
          <span className="section-index">RT / STUDIO — 001</span>
        </div>

        <div className="studio-bento-grid">
          <motion.article
            className="studio-bento-card studio-bento-card--feature"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="studio-bento-copy">
              <span className="bento-tag">THE STUDIO</span>
              <h2 id="manifesto-heading">
                The brief is rarely neat.
                <br />
                The <em>outcome</em> should be.
              </h2>
              <p>
                RTSOLUTIONS is an independent software studio for people with an idea worth making real.
                We bring creative direction and serious engineering into the same room.
              </p>
              <Link href="#process" className="text-link">
                How we work <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="studio-visual" aria-hidden="true">
              <div className="studio-visual-orbit studio-visual-orbit--outer" />
              <div className="studio-visual-orbit studio-visual-orbit--inner" />
              <div className="studio-visual-core"><span>RT</span></div>
              <div className="studio-visual-node studio-visual-node--one">IDEA</div>
              <div className="studio-visual-node studio-visual-node--two">DESIGN</div>
              <div className="studio-visual-node studio-visual-node--three">BUILD</div>
              <span className="studio-visual-coordinate">A SYSTEM, NOT A TEMPLATE</span>
            </div>
          </motion.article>

          <motion.article
            className="studio-bento-card studio-bento-card--principles"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <span className="bento-tag">WHAT GUIDES US</span>
            <div className="principle-stack">
              {principles.map((item) => (
                <div className="principle-row" key={item.number}>
                  <div className="principle-icon"><item.icon size={17} aria-hidden="true" /></div>
                  <div className="principle-copy">
                    <div className="principle-heading"><span>{item.number}</span><h3>{item.title}</h3></div>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="studio-footline">
          <span>INDEPENDENT BY DESIGN</span>
          <span className="studio-footline-mark">✳</span>
          <span>THOUGHTFUL BY DEFAULT</span>
        </div>
      </div>
    </section>
  );
}
