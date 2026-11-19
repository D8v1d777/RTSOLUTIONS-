// RTSOLUTIONS Configuration
// Replace placeholder values with verified business details before launch

export const config = {
  // Business Identity
  name: 'RTSOLUTIONS',
  tagline: 'We gather the mess. Find the meaning. Make something that lasts.',
  description:
    'An independent software and digital product studio building custom websites, web applications, and desktop applications. Our differentiator is creative frontend craft.',

  // Contact Information (PLACEHOLDERS - replace with verified details)
  email: 'hello@rtsolutions.dev',
  phone: '', // Optional
  address: '', // Optional
  isPlaceholder: true,

  // Social Profiles (PLACEHOLDERS - replace with verified URLs)
  social: {
    github: 'https://github.com/rtsolutions',
    twitter: 'https://twitter.com/rtsolutions',
    linkedin: 'https://linkedin.com/company/rtsolutions',
    dribbble: '',
    behance: '',
  },

  // Domain (PLACEHOLDER - replace with verified domain)
  domain: 'rtsolutions.dev',
  url: 'https://rtsolutions.dev',

  // SEO
  ogImage: '/og-image.jpg',
  twitterHandle: '@rtsolutions',

  // Services
  services: [
    {
      id: 'websites',
      name: 'Custom Websites',
      description: 'Brand experiences, marketing sites, editorial platforms',
    },
    {
      id: 'webapps',
      name: 'Web Applications',
      description: 'SaaS interfaces, dashboards, interactive products',
    },
    {
      id: 'desktop',
      name: 'Desktop Applications',
      description: 'Tauri/Electron apps for focused workflows',
    },
  ],

  // Project Types for Contact Form
  projectTypes: [
    { value: 'website', label: 'Custom Website' },
    { value: 'webapp', label: 'Web Application' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'multiple', label: 'Multiple / Not Sure' },
  ],

  // Budget Ranges
  budgetRanges: [
    { value: '10-25', label: '$10k – $25k' },
    { value: '25-50', label: '$25k – $50k' },
    { value: '50-100', label: '$50k – $100k' },
    { value: '100+', label: '$100k+' },
    { value: 'unknown', label: 'Prefer to discuss' },
  ],

  // Timelines
  timelines: [
    { value: 'asap', label: 'ASAP' },
    { value: '1-3', label: '1–3 months' },
    { value: '3-6', label: '3–6 months' },
    { value: '6+', label: '6+ months' },
    { value: 'flexible', label: 'Flexible' },
  ],

  // Contact Configuration (single source of truth for contact form)
  contact: {
    verifiedEmail: 'hello@rtsolutions.dev',
    // Use config.isPlaceholder as single source - contact form checks this
    responseTime: '1–2 business days',
    businessHours: 'Mon–Fri, 9am–6pm CET',
    privacyPolicyUrl: '',
  } as const,
} as const;

export type Config = typeof config;