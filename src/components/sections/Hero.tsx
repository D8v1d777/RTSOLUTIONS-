'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

const JellyfishCanvas = dynamic(() => import('@/components/canvas/JellyfishCanvas').then(mod => ({ default: mod.JellyfishCanvas })), {
  ssr: false,
  loading: () => <JellyfishFallback />,
});

function JellyfishFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[500px] lg:min-h-[600px] bg-gradient-radial from-crimson-muted/20 via-transparent to-transparent rounded-3xl"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-64 h-64 text-crimson-dim/30 animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="50" cy="35" rx="30" ry="18" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M30 53 Q25 75 35 90" />
            <path d="M40 53 Q40 80 45 92" />
            <path d="M50 53 Q50 82 50 95" />
            <path d="M60 53 Q60 80 55 92" />
            <path d="M70 53 Q75 75 65 90" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background atmospheric glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-crimson/10 rounded-full blur-[200px] opacity-30 animate-pulse-slow"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-scarlet/5 rounded-full blur-[150px] opacity-20 animate-pulse-slow"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-50" />
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content Column */}
          <div className="flex flex-col items-start">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel text-xs font-medium text-crimson-glow uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-crimson-glow rounded-full animate-pulse" />
                Independent software studio
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white leading-[1.05] max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            >
              We gather the mess.
              <br />
              <span className="text-crimson-glow">Find the meaning.</span>
              <br />
              Make something that lasts.
            </motion.h1>

            <motion.p
              className="mt-8 text-lg lg:text-xl text-text-secondary max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            >
              An independent studio building custom websites, web applications, and desktop applications.
              Our differentiator is creative frontend craft: turning messy ideas into expressive, durable digital products.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            >
              <Link
                href="#contact"
                className="group px-8 py-4 text-base font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-300 hover:shadow-crimson flex items-center gap-2"
              >
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="#work"
                className="group px-8 py-4 text-base font-medium text-text-secondary hover:text-white bg-transparent border border-white/10 hover:border-white/20 rounded-md transition-all duration-300 flex items-center gap-2"
              >
                View Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-0 md:relative md:bottom-auto md:mt-16 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 0.6, y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            >
              <MousePointer2 className="w-5 h-5 text-text-dim" aria-hidden="true" />
              <span className="text-xs text-text-dim font-mono uppercase tracking-wider hidden sm:block">Scroll</span>
            </motion.div>
          </div>

          {/* Jellyfish Canvas Column */}
          <div className="relative w-full lg:w-[110%] lg:-ml-12">
            <motion.div
              className="relative aspect-[4/5] lg:aspect-[1/1] min-h-[450px] lg:min-h-[550px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <JellyfishCanvas />
            </motion.div>

            {/* Technical annotations */}
            <motion.div
              className="absolute -bottom-8 -left-4 lg:-left-8 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="glass-panel-crimson px-4 py-3 rounded-lg min-w-[200px]">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-crimson-glow">mesh</span>
                  <span className="font-display text-lg font-medium text-white">Procedural</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-crimson-glow">material</span>
                  <span className="font-display text-lg font-medium text-white">Physical + SSS</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-crimson-glow">animation</span>
                  <span className="font-display text-lg font-medium text-white">Real-time</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-4 lg:-right-8 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="glass-panel px-4 py-3 rounded-lg min-w-[180px] text-right">
                <div className="font-mono text-xs text-text-dim mb-1">WebGL / R3F</div>
                <div className="font-display text-lg font-medium text-white">60fps Target</div>
                <div className="font-mono text-xs text-text-dim mt-1">Reduced motion supported</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}