import type { Metadata, Viewport } from 'next';

import { SiteFooter } from '@/components/brand/site-footer';
import { SiteHeader } from '@/components/brand/site-header';
import { JsonLd } from '@/components/brand/json-ld';
import { siteConfig } from '@/content/site';
import { getSiteUrl } from '@/lib/site-url';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/og.png',
        width: 1680,
        height: 945,
        alt: "Bella's Baskett — Celebrations, beautifully imagined.",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F3ED',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-24 bg-[var(--wine)] px-4 py-3 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
