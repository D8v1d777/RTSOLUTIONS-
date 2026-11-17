'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, RotateCcw, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-6 bg-black">
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[300px] opacity-30"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Error Code */}
        <div className="mb-8">
          <span className="font-display text-7xl sm:text-9xl font-medium text-crimson-glow/30 tracking-tighter">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-white mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-sm mx-auto">
          That page doesn't exist—or never did. No broken promises here, just a wrong turn.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group px-8 py-4 text-base font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-300 hover:shadow-crimson flex items-center gap-2"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="#contact"
            className="group px-8 py-4 text-base font-medium text-text-secondary hover:text-white bg-transparent border border-white/10 hover:border-white/20 rounded-md transition-all duration-300 flex items-center gap-2"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
            Contact Us
          </Link>
        </div>

        {/* Decorative element */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-4 opacity-40"
          animate={{ rotate: [0, 5, -5, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <RotateCcw className="w-6 h-6 text-crimson-dim" aria-hidden="true" />
          <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
            No dead ends
          </span>
          <RotateCcw className="w-6 h-6 text-crimson-dim" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </div>
  );
}