'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

/**
 * Horizontal row of cards. Native scrolling does the work (touch, trackpad,
 * keyboard); the arrows jump one card; a thin line shows where you are.
 */
export function Rail({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ progress: 0, visible: 1, start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      progress: max > 0 ? el.scrollLeft / max : 0,
      visible: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
      start: el.scrollLeft <= 4,
      end: max - el.scrollLeft <= 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 24;
    const step = item ? item.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(max, el.scrollLeft + step * dir));
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const thumb = state.visible * 100;
  const offset = state.visible < 1 ? (state.progress * (100 - thumb)) / state.visible : 0;

  return (
    <div className="hx-rail">
      <div className="hx-rail-track" ref={ref} role="list" aria-label={label} tabIndex={0}>
        {children}
      </div>

      <div className="hx-rail-foot">
        <div className="hx-rail-progress" aria-hidden="true">
          <span style={{ width: `${thumb}%`, transform: `translateX(${offset}%)` }} />
        </div>
        <div className="hx-rail-nav">
          <button type="button" onClick={() => go(-1)} disabled={state.start} aria-label={`Previous: ${label}`}>
            <Icon name="chevronL" size={18} />
          </button>
          <button type="button" onClick={() => go(1)} disabled={state.end} aria-label={`Next: ${label}`}>
            <Icon name="chevronR" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
