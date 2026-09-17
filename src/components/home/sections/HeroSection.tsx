import Image from 'next/image';
import Link from 'next/link';
import { quickSearches } from '@/lib/home';
import { HeroSearch } from '../HeroSearch';

export function HeroSection() {
  return (
    <section className="hx-hero" aria-labelledby="hx-hero-title">
      <div className="hx-hero-media">
        <Image src="/media/hero-skyline.jpg" alt="" fill priority sizes="100vw" quality={75} />
      </div>
      <div className="hx-hero-shade" aria-hidden="true" />

      <div className="shell hx-hero-inner">
        <p className="hx-hero-intro">A Toronto brokerage for pre-construction and resale</p>
        <h1 id="hx-hero-title" className="hx-hero-title">
          <span className="hx-line">
            <span>Your next address</span>
          </span>
          <span className="hx-line">
            <span>is already on the drawings.</span>
          </span>
        </h1>
        <p className="hx-hero-sub">
          Pre-construction condos, towns and homes across the GTA, with floor plans, price lists
          and platinum pricing for registered clients.
        </p>

        <HeroSearch />

        <nav className="hx-quick" aria-label="Popular searches">
          {quickSearches.map((q) => (
            <Link key={q.href} href={q.href}>
              {q.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
