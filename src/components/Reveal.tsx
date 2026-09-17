'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: 'reveal' | 'clip';
};

/**
 * Reveals content once, the first time it scrolls into view.
 *
 * The observed element is the outer wrapper and the animated element is the
 * inner one — a clipped or transparent element reports no intersection area
 * in Chromium, so observing it directly would mean it never reveals.
 *
 * Anything already on screen at mount is shown immediately, so content is
 * never left hidden if scripting or the observer is unavailable.
 */
export function Reveal({ children, className = '', delay = 0, mode = 'reveal' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'out' | 'in'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setState('in');
      return;
    }

    // Already on screen: leave it alone rather than animating it in late.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setState('in');
      return;
    }

    setState('out');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('in');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const inner =
    state === 'idle' ? '' : `${mode}${state === 'in' ? ' is-in' : ''}`;

  return (
    <div ref={ref} className={className || undefined}>
      <div
        className={inner || undefined}
        style={delay ? ({ ['--reveal-delay' as string]: `${delay}ms` } as React.CSSProperties) : undefined}
      >
        {children}
      </div>
    </div>
  );
}
