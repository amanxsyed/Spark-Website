'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { brokerage, cities, navigation } from '@/lib/data';

export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', drawer);
    return () => document.body.classList.remove('is-locked');
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMega(false);
      setDrawer(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openMega = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  }, []);

  return (
    <>
      <header
        className="masthead-bar"
        data-solid={solid && !drawer}
        data-open={drawer}
      >
        <div className="shell bar-inner">
          <Link href="/" className="brand" aria-label={`${brokerage.short} — home`}>
            <Logo />
          </Link>

          <nav aria-label="Primary">
            <ul className="nav">
              {navigation.map((item) =>
                item.mega ? (
                  <li
                    key={item.href}
                    className="nav-item"
                    ref={megaRef}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className="nav-link"
                      aria-expanded={mega}
                      aria-haspopup="true"
                      data-active={pathname.startsWith(item.href)}
                      onClick={() => setMega((v) => !v)}
                    >
                      {item.label}
                      <i className="nav-caret" aria-hidden="true" />
                    </button>

                    <div className="mega" data-open={mega} onMouseEnter={openMega}>
                      <div>
                        <h3>Browse launches by city</h3>
                        <div className="mega-list">
                          {cities.map((c) => (
                            <Link
                              key={c.name}
                              href={`/new-construction?city=${encodeURIComponent(
                                c.name.toLowerCase(),
                              )}`}
                            >
                              {c.name}
                              <span>{c.count}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="mega-feature">
                        <h3>Platinum list</h3>
                        <p>
                          Allocation at most GTA launches is settled before the
                          public sees a floorplan. Get on the list once and stay
                          on it.
                        </p>
                        <Link href="/register" className="btn btn--spark">
                          Join the platinum list
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href} className="nav-item">
                    <Link
                      href={item.href}
                      className="nav-link"
                      data-active={pathname.startsWith(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="bar-actions">
            <a href={brokerage.phoneHref} className="bar-phone tlink">
              {brokerage.phone}
            </a>
            <Link href="/register" className="bar-cta">
              Register
            </Link>
          </div>

          <button
            type="button"
            className="burger"
            aria-expanded={drawer}
            aria-controls="site-drawer"
            onClick={() => setDrawer((v) => !v)}
          >
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <span className="sr-only">{drawer ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </header>

      <div id="site-drawer" className="drawer" data-open={drawer} aria-hidden={!drawer}>
        <nav className="drawer-nav" aria-label="Mobile">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ ['--i' as string]: i }}
              tabIndex={drawer ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{ ['--i' as string]: navigation.length }}
            tabIndex={drawer ? 0 : -1}
          >
            Contact
          </Link>
        </nav>
        <div className="drawer-foot">
          <Link href="/register" className="btn btn--spark btn--wide" tabIndex={drawer ? 0 : -1}>
            Join the platinum list
          </Link>
          <a href={brokerage.phoneHref} className="meta" tabIndex={drawer ? 0 : -1}>
            {brokerage.phone}
          </a>
        </div>
      </div>
    </>
  );
}
