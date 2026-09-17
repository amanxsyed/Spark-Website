import localFont from 'next/font/local';

/**
 * Both faces are self-hosted and subset to Latin, so the site makes no
 * third-party font request at all. Fraunces keeps its optical-size and
 * weight axes (WONK pinned on, SOFT off) — that is where the display
 * voice comes from.
 */
export const fraunces = localFont({
  src: '../fonts/fraunces-var.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  weight: '200 900',
  style: 'normal',
  preload: true,
  fallback: ['Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
});

export const interTight = localFont({
  src: '../fonts/inter-tight-var.woff2',
  variable: '--font-inter-tight',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});
