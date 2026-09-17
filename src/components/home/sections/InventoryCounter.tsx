import Link from 'next/link';
import { Counter } from '@/components/Counter';
import { cities } from '@/lib/data';

/** Dark resale inventory band with the animated counter — styles in home.css. */
export function InventoryCounter() {
  return (
    <section className="section dark">
      <div className="shell">
        <div className="inventory">
          <div>
            <p className="counter">
              <Counter to={54056} />
            </p>
            <p className="lede on-dark" style={{ marginTop: '1.5rem', color: '#c3ccd9' }}>
              Every active resale listing in the Greater Toronto Area, in one search, updated
              through the day. No sign-up wall on the map, no lead form before you can see a price.
            </p>
            <div className="section-foot">
              <Link href="/resale" className="btn btn--spark">
                Search resale listings
              </Link>
              <Link href="/sell" className="btn btn--ghost">
                Get a valuation
              </Link>
            </div>
            <p className="meta" style={{ marginTop: '2rem', color: '#8e9aab' }}>
              Sold and historical data is available to signed-in clients under VOW terms.
            </p>
          </div>

          <ul className="city-list">
            {cities.map((city) => (
              <li key={city.name}>
                <Link href={`/resale?city=${encodeURIComponent(city.name.toLowerCase())}`}>
                  {city.name}
                </Link>
                <span>{city.count} listings</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
