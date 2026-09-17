import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { Counter } from '@/components/Counter';
import { cities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resale listings',
  description:
    'Search every active resale home and condo across the Greater Toronto Area.',
};

export default function ResalePage() {
  return (
    <>
      <PageHead
        crumb="Resale"
        title="Every active listing in the GTA"
        intro="Map search, saved searches and sold data are wired to the Repliers and RedBricks feeds. This page is the shell they will render into."
        image="/media/place-2.jpg"
      />

      <section className="section band-paper">
        <div className="shell grid-2">
          <div>
            <p className="counter"><Counter to={54056} /></p>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Listings refresh through the day. Sold and historical data is
              available to signed-in clients under VOW terms, which is a rule
              set by the boards rather than by us.
            </p>
            <div className="section-foot">
              <Link href="/contact" className="btn btn--ink">Talk to an advisor</Link>
            </div>
          </div>
          <ul className="tiles" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {cities.map((c) => (
              <li className="tile" key={c.name}>
                <h3>{c.name}</h3>
                <p>{c.count} listings</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight band-mist">
        <div className="shell">
          <div className="notice">
            <h2>Search is not connected yet</h2>
            <p>
              The design and page structure are in place. Once the RedBricks
              and Repliers keys are added, this page renders the live map,
              filters and listing detail views without any layout changes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
