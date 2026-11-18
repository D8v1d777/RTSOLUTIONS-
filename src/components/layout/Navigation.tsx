'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <nav className="site-nav container" aria-label="Main navigation">
        <Link href="/" className="site-brand" aria-label="RTSOLUTIONS home">
          <span className="site-brand-mark"><span /></span>
          <span>RT<span className="site-brand-light">SOLUTIONS</span></span>
        </Link>

        <div className="nav-pill hidden md:flex">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} className={index === 0 ? 'nav-pill-link nav-pill-link--active' : 'nav-pill-link'}>
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="site-nav-cta">
          <span>Start a project</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>

        <button
          className="site-mobile-toggle md:hidden"
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="site-mobile-menu md:hidden"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="#contact" className="site-mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
              Start a project <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
