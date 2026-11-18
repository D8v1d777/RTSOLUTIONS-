'use client';

import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const disciplines = [
  { number: '01', title: 'Websites', detail: 'Brand worlds & digital experiences' },
  { number: '02', title: 'Web apps', detail: 'Interfaces for real workflows' },
  { number: '03', title: 'Desktop', detail: 'Purpose-built software' },
];

export function Hero() {
  return (
    <section id="hero" className="hero-stage relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-jelly-wrap" aria-hidden="true">
        <div className="hero-jelly-photo" />
        <div className="hero-jelly-glow" />
      </div>

      <div className="hero-coordinate hero-coordinate--top" aria-hidden="true">
        <span>RT / 01</span>
        <span>INDEPENDENT SOFTWARE STUDIO</span>
      </div>

      <div className="container hero-container relative">
        <div className="hero-main-copy">
          <motion.div
            className="hero-kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="hero-kicker-dot" />
            <span>Independent digital studio</span>
            <Sparkles aria-hidden="true" size={13} />
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="hero-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
          >
            We gather
            <br />
            the <em>mess.</em>
            <br />
            Find the meaning.
            <br />
            <span>Make something that lasts.</span>
          </motion.h1>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            We turn complex ideas into considered websites, web applications, and desktop software.
            Clear thinking first. Distinctive craft all the way through.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link href="#contact" className="hero-primary-action">
              Start a project <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="#capabilities" className="hero-secondary-action">
              Explore capabilities <ArrowDown size={15} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <motion.aside
          className="hero-float-card hero-float-card--top"
          initial={{ opacity: 0, y: 24, x: 10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
          aria-label="Studio approach"
        >
          <span className="hero-card-eyebrow">OUR APPROACH / 01</span>
          <strong>Less noise.<br /><em>More meaning.</em></strong>
          <span className="hero-card-rule" />
          <span className="hero-card-foot">Strategy · Design · Engineering</span>
        </motion.aside>

        <motion.aside
          className="hero-float-card hero-float-card--bottom"
          initial={{ opacity: 0, y: 24, x: 10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          aria-label="What the studio builds"
        >
          <span className="hero-card-eyebrow">WHAT WE BUILD</span>
          {disciplines.map((item) => (
            <div className="hero-discipline" key={item.number}>
              <span>{item.number}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </div>
            </div>
          ))}
        </motion.aside>

        <div className="hero-discipline-strip" aria-label="Studio disciplines">
          {disciplines.map((item) => (
            <div className="hero-discipline-chip" key={item.number}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>

        <div className="hero-bottom-caption">
          <span className="hero-caption-line" />
          <span>Designed with intent. Built to endure.</span>
        </div>

        <motion.div
          className="hero-bottom-statement"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.48, ease: [0.19, 1, 0.22, 1] }}
        >
          We design and build <em>digital products</em> with people at the core, so every system has a reason to exist.
        </motion.div>
      </div>
      <div className="hero-coordinate hero-coordinate--side" aria-hidden="true">
        <span>CRAFTED IN CODE</span>
        <span>01 — 03</span>
      </div>
    </section>
  );
}
