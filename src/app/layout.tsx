import type { Metadata, Viewport } from 'next';
import { fraunces, interTight } from '@/lib/fonts';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import '@/styles/base.css';
import '@/styles/chrome.css';
import '@/styles/home.css';
import '@/styles/pages.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sparkrealty.ca'),
  title: {
    default: 'Spark Realty Inc., Brokerage — GTA pre-construction and resale',
    template: '%s · Spark Realty',
  },
  description:
    'A Greater Toronto Area brokerage with platinum allocation at pre-construction launches, plus full resale, leasing and investment services.',
  applicationName: 'Spark Realty',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Spark Realty Inc., Brokerage',
    title: 'Spark Realty Inc., Brokerage — GTA pre-construction and resale',
    description:
      'Platinum access to GTA pre-construction launches, plus resale, leasing and investment services.',
    images: ['/media/og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spark Realty Inc., Brokerage',
    description:
      'Platinum access to GTA pre-construction launches, plus resale, leasing and investment services.',
    images: ['/media/og.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1220',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${interTight.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
