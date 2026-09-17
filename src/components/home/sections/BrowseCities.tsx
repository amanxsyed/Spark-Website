import Image from 'next/image';
import Link from 'next/link';
import { cityTiles } from '@/lib/home';
import { SectionHead } from './SectionHead';

export function BrowseCities() {
  return (
    <section className="hx-section hx-section--snow" aria-labelledby="hx-cities">
      <div className="shell">
        <SectionHead id="hx-cities" title="Browse by city" lede="Where the GTA is building next." />
        <ul className="hx-cities">
          {cityTiles.map((c, i) => (
            <li key={c.name} className={i === 0 ? 'is-wide' : undefined}>
              <Link href={c.href} className="hx-city">
                <Image
                  src={c.image}
                  alt={`New homes in ${c.name}`}
                  fill
                  sizes={i === 0 ? '(max-width: 900px) 92vw, 50vw' : '(max-width: 900px) 46vw, 25vw'}
                />
                <span className="hx-city-text">
                  <b>{c.name}</b>
                  <span>{c.count} projects</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
