import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'RTSOLUTIONS — Creative Frontend Studio',
  description: 'An independent software and digital product studio. We build custom websites, web applications, and desktop applications. Our differentiator is creative frontend craft.',
  keywords: ['software studio', 'web development', 'frontend craft', 'web applications', 'desktop applications', 'digital products'],
  authors: [{ name: 'RTSOLUTIONS' }],
  creator: 'RTSOLUTIONS',
  publisher: 'RTSOLUTIONS',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rtsolutions.dev',
    title: 'RTSOLUTIONS — Creative Frontend Studio',
    description: 'We gather the mess. Find the meaning. Make something that lasts.',
    siteName: 'RTSOLUTIONS',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RTSOLUTIONS — Creative Frontend Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTSOLUTIONS — Creative Frontend Studio',
    description: 'We gather the mess. Find the meaning. Make something that lasts.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}