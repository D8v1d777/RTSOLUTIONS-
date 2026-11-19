'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#manifesto', label: 'Studio' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className="container h-full flex items-center justify-between" />
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="container h-full flex items-center justify-between" aria-label="Main navigation">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-white hover:text-crimson-glow transition-colors duration-300 flex items-center gap-2"
          aria-label="RTSOLUTIONS Home"
        >
          <span className="text-crimson-glow font-bold">RTSOLUTIONS</span>
          <span className="hidden sm:inline text-text-muted text-sm font-normal">studio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-secondary hover:text-white transition-colors duration-200 text-sm font-medium relative group"
            >
              {item.label}
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-crimson-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#contact"
            className="px-6 py-2.5 text-sm font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-200 hover:shadow-crimson"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/5 z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="container py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium text-text-secondary hover:text-white transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5" />
              <Link
                href="#contact"
                className="block w-full text-center px-6 py-3 text-sm font-medium text-white bg-crimson hover:bg-crimson-glow border border-crimson-dim rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}