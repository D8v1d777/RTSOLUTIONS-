'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const workItems = [
  {
    id: 'identity',
    number: '01',
    category: 'WEBSITE / ART DIRECTION',
    title: 'A more expressive digital identity',
    description: 'A concept study in visual systems, editorial typography, and a brand presence that feels unmistakably its own.',
    tags: ['Art direction', 'Design systems', 'Motion'],
    kind: 'identity',
  },
  {
    id: 'product',
    number: '02',
    category: 'WEB APPLICATION',
    title: 'Complex information, made clear',
    description: 'A product-interface exploration focused on readable data, useful hierarchy, and workflows that stay out of the way.',
    tags: ['Product UI', 'Data display', 'Interaction'],
    kind: 'product',
  },
  {
    id: 'desktop',
    number: '03',
    category: 'DESKTOP SOFTWARE',
    title: 'A calmer way to work',
    description: 'A desktop concept for focused local workflows, bringing utility and care to the everyday details.',
    tags: ['Desktop UX', 'Local-first', 'Systems'],
    kind: 'desktop',
  },
];

function WorkArtwork({ kind }: { kind: string }) {
  if (kind === 'identity') {
    return (
      <div className="work-artwork work-artwork--identity" aria-hidden="true">
        <div className="identity-art-top"><span>FORM / FIELD</span><span>VISUAL SYSTEM 001</span></div>
        <div className="identity-art-word">R<span>T</span></div>
        <div className="identity-art-bottom"><i /><i /><i /><span>MAKE SPACE FOR MEANING.</span></div>
      </div>
    );
  }

  if (kind === 'product') {
    return (
      <div className="work-artwork work-artwork--product" aria-hidden="true">
        <div className="product-art-window">
          <div className="product-art-bar"><span /><span /><span /><b>Overview / 01</b></div>
          <div className="product-art-content">
            <div className="product-art-sidebar"><i /><i /><i /><i /></div>
            <div className="product-art-main">
              <div className="product-art-heading"><i /><i /></div>
              <div className="product-art-chart"><span /><span /><span /><span /><span /><span /><span /></div>
              <div className="product-art-tiles"><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="work-artwork work-artwork--desktop" aria-hidden="true">
      <div className="desktop-art-window">
        <div className="desktop-art-title"><span /><span /><span /><b>WORKSPACE / LOCAL</b></div>
        <div className="desktop-art-layout">
          <div className="desktop-art-rail"><i /><i /><i /></div>
          <div className="desktop-art-panel">
            <small>YOUR WORK, IN ORDER.</small>
            <strong>Make room<br />for the work.</strong>
            <div className="desktop-art-progress"><i /></div>
            <span>Ready when you are <b>↗</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="work-section relative overflow-hidden" aria-labelledby="work-heading">
      <div className="container relative">
        <div className="work-section-head">
          <div>
            <span className="section-overline"><span /> SELECTED DIRECTIONS</span>
            <h2 id="work-heading">Ideas in <em>form.</em></h2>
          </div>
          <p>
            A glimpse of the visual and product problems we like to solve.
            These are concept explorations, clearly labelled—not presented as client case studies.
          </p>
        </div>

        <div className="work-bento-grid">
          {workItems.map((item, index) => (
            <motion.article
              key={item.id}
              className={`work-bento-card work-bento-card--${item.kind}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <WorkArtwork kind={item.kind} />
              <div className="work-card-copy">
                <div className="work-card-meta">
                  <span>{item.number} / {item.category}</span>
                  <span className="work-status">CONCEPT STUDY</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="work-card-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="work-bottom-link">
          <span>THE RIGHT START IS A GOOD CONVERSATION.</span>
          <Link href="#contact" className="text-link">Start yours <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
