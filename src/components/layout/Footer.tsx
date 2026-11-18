import Link from 'next/link';
import { GitBranch, Mail, ExternalLink, Send, Link2 } from 'lucide-react';
import { config } from '@/lib/config';

interface FooterLink {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

const footerLinks = {
  studio: [
    { label: 'About', href: '#manifesto' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: 'Why RTSOLUTIONS', href: '#why' },
  ] as FooterLink[],
  work: [
    { label: 'Selected Work', href: '#work' },
    { label: 'Case Studies', href: '#', disabled: true },
    { label: 'Creative Directions', href: '#', disabled: true },
  ] as FooterLink[],
  connect: [
    { label: 'Start a Project', href: '#contact' },
    ...(!config.isPlaceholder && config.contact.verifiedEmail ? [{ label: 'Email Us', href: `mailto:${config.contact.verifiedEmail}` }] : []),
    ...( !config.isPlaceholder && config.social.github ? [{ label: 'GitHub', href: config.social.github, external: true }] : []),
    ...( !config.isPlaceholder && config.social.twitter ? [{ label: 'Twitter', href: config.social.twitter, external: true }] : []),
  ] as FooterLink[],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/50 backdrop-blur-xl" role="contentinfo">
      <div className="container py-16 lg:py-24">
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl lg:text-3xl font-medium tracking-tight text-white mb-6 block"
              aria-label="RTSOLUTIONS Home"
            >
              <span className="text-crimson-glow font-bold">RTSOLUTIONS</span>
              <span className="text-text-muted font-normal">studio</span>
            </Link>
            <p className="text-text-secondary text-base leading-relaxed max-w-xs">
              We gather the mess. Find the meaning. Make something that lasts.
            </p>
            {config.isPlaceholder && (
              <p className="mt-4 text-xs text-text-dim font-mono">
                Placeholder contact details — replace with verified info
              </p>
            )}
          </div>

          {/* Studio Links */}
          <nav aria-label="Studio">
            <h3 className="font-display text-sm font-medium text-white uppercase tracking-wider mb-4">
              Studio
            </h3>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200 text-sm link-underline"
                    aria-disabled={link.disabled}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Work Links */}
          <nav aria-label="Work">
            <h3 className="font-display text-sm font-medium text-white uppercase tracking-wider mb-4">
              Work
            </h3>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${
                      link.disabled
                        ? 'text-text-dim cursor-not-allowed'
                        : 'text-text-secondary hover:text-white link-underline'
                    }`}
                    aria-disabled={link.disabled}
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink className="inline-block ml-1 w-3 h-3 opacity-50" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Links */}
          <nav aria-label="Connect">
            <h3 className="font-display text-sm font-medium text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 text-sm link-underline"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Verified social and email links only */}
            {!config.isPlaceholder && (config.social.github || config.social.twitter || config.social.linkedin || config.contact.verifiedEmail) && (
              <div className="mt-8 flex items-center gap-4">
                {config.social.github && <a href={config.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-dim hover:text-white transition-colors duration-200"><GitBranch className="w-5 h-5" /></a>}
                {config.social.twitter && <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-text-dim hover:text-white transition-colors duration-200"><Send className="w-5 h-5" /></a>}
                {config.social.linkedin && <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-dim hover:text-white transition-colors duration-200"><Link2 className="w-5 h-5" /></a>}
                {config.contact.verifiedEmail && <a href={`mailto:${config.contact.verifiedEmail}`} aria-label="Email" className="text-text-dim hover:text-white transition-colors duration-200"><Mail className="w-5 h-5" /></a>}
              </div>
            )}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-sm">
            © {currentYear} RTSOLUTIONS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-text-dim text-sm font-mono">
            <span>Handcrafted with intent</span>
            <span className="text-crimson-glow">●</span>
            <span>Not a template</span>
          </div>
        </div>
      </div>
    </footer>
  );
}