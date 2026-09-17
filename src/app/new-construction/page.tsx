import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { cities, projects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'New construction',
  description:
    'Pre-construction condos, towns and homes across the Greater Toronto Area, with platinum allocation at launch.',
};

export default function NewConstructionPage() {
  return (
    <>
      <PageHead
        crumb="New construction"
        title="Pre-construction across the GTA"
        intro="Forty-one communities are in registration or release right now. The grid below is a static sample — the live feed comes from RedBricks once the integration is switched on."
      />

      <section className="section band-paper">
        <div className="shell">
          <div className="tiles">
            {projects.map((p) => (
              <article className="tile" key={p.slug} style={{ borderTop: 0, paddingTop: 0 }}>
                <Link href={`/new-construction/${p.slug}`}>
                  <div className="card-media">
                    <Image
                      src={p.image}
                      alt={`${p.name}, ${p.city}`}
                      width={1000}
                      height={1300}
                      sizes="(max-width: 700px) 92vw, 30vw"
                    />
                    <span className="card-flag" data-tone={p.tone}>{p.status}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{p.name}</h3>
                    <p className="card-sub">{p.city} · {p.developer}</p>
                    <div className="card-rail">
                      <span>{p.priceFrom}</span>
                      <span>{p.occupancy}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight band-mist">
        <div className="shell">
          <h2 className="display d-2" style={{ marginBottom: '1.75rem' }}>Browse by city</h2>
          <ul className="tiles">
            {cities.map((c) => (
              <li className="tile" key={c.name}>
                <h3>{c.name}</h3>
                <p>{c.count} active listings and pre-construction releases.</p>
                <Link className="tlink tlink--on" href={`/new-construction?city=${c.name.toLowerCase()}`}>
                  See {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
