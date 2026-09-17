'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/data';

export function ProjectRail({
  items,
  caption,
}: {
  items: Project[];
  caption?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(max - el.scrollLeft < 8);
  }, []);

  useEffect(() => {
    measure();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('.card') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const visible = Math.max(0.18, 1 / Math.max(1, items.length / 3));

  return (
    <>
      <div className="rail-head">
        {caption ? <p className="meta">{caption}</p> : <span />}
        <div className="rail-nav">
        <button
          type="button"
          className="rail-btn"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Previous launches"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button
          type="button"
          className="rail-btn"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="More launches"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        </div>
      </div>

      <div className="rail-scroll" ref={scroller} tabIndex={0} aria-label="Featured launches">
        {items.map((p, i) => (
          <article className="card" key={p.slug}>
            <Link href={`/new-construction/${p.slug}`}>
              <div className="card-media">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.city}`}
                  width={1000}
                  height={1300}
                  sizes="(max-width: 700px) 72vw, (max-width: 1100px) 34vw, 340px"
                  priority={i < 2}
                />
                <span className="card-flag" data-tone={p.tone}>
                  {p.status}
                </span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
                <p className="card-sub">
                  {p.city} · {p.developer}
                </p>
                <div className="card-rail">
                  <span>{p.priceFrom}</span>
                  <span>{p.beds}</span>
                </div>
                <div className="card-rail" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                  <span>{p.occupancy}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="rail-progress" aria-hidden="true">
        <span
          style={{
            width: `${visible * 100}%`,
            transform: `translateX(${(progress * (1 - visible) * 100) / visible}%)`,
          }}
        />
      </div>
    </>
  );
}
