import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { ProjectCard } from '@/components/home/ProjectCard';
import { getCards, decode, toProject } from '@/lib/redbricks';

export const metadata: Metadata = {
  title: 'Pre-Construction Projects in Toronto & the GTA',
  description:
    'Every pre-construction condo, townhome and detached community Spark Realty tracks across Toronto and the Greater Toronto Area.',
};

type Search = Promise<{
  city?: string;
  type?: string;
  status?: string;
  max?: string;
  q?: string;
}>;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default async function ProjectsPage({ searchParams }: { searchParams: Search }) {
  const filters = await searchParams;
  const cards = await getCards();

  // Filtering happens here on the server, on data that is already cached.
  const filtered = cards.filter((c) => {
    if (filters.city && slugify(c.city_name ?? '') !== filters.city) return false;

    if (filters.type) {
      const t = (c.building_type ?? '').toLowerCase();
      const want = filters.type.toLowerCase();
      const isCondo = t.includes('condo');
      const isTown = t.includes('town');
      const isHouse = t.includes('single') || t.includes('detached');
      if (want === 'condo' && !isCondo) return false;
      if (want === 'townhouse' && !isTown) return false;
      if ((want === 'detached' || want === 'semi-detached') && !isHouse) return false;
    }

    if (filters.status) {
      const s = (c.current_sales_status ?? '').toLowerCase();
      if (filters.status === 'launching-soon' && !s.includes('launching')) return false;
      if (filters.status === 'selling' && !s.includes('selling')) return false;
      if (filters.status === 'sold-out' && !s.includes('sold out')) return false;
    }

    if (filters.max) {
      const max = Number(filters.max);
      const from = c.current_price_from ?? 0;
      if (from > 0 && max > 0 && from > max) return false;
    }

    if (filters.q) {
      const hay = [c.name, c.developer_name, c.city_name, c.neighbourhood_name, c.address]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(filters.q.toLowerCase())) return false;
    }

    return true;
  });

  const cities = [...new Set(cards.map((c) => c.city_name).filter(Boolean) as string[])];
  const activeCity = filters.city;

  return (
    <>
      <PageHead
        crumb="New construction"
        title="Pre-construction across the GTA"
        intro={`${filtered.length} project${filtered.length === 1 ? '' : 's'} currently tracked. Prices, floor plans and incentives update with the Red Bricks feed.`}
        image="/media/hero-skyline.jpg"
      />

      <section className="hx">
        <div className="hx-section">
          <div className="shell">
            <nav className="hx-quick" aria-label="Filter by city" style={{ marginBottom: '2rem' }}>
              <Link href="/new-construction" data-active={!activeCity}>
                All cities
              </Link>
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/new-construction?city=${slugify(city)}`}
                  data-active={activeCity === slugify(city)}
                >
                  {decode(city)}
                </Link>
              ))}
            </nav>

            {filtered.length === 0 ? (
              <p className="hx-lede">
                No projects match this filter yet.{' '}
                <Link href="/new-construction" className="tlink tlink--on">
                  Clear filters
                </Link>
              </p>
            ) : (
              <div className="hx-feature-grid">
                {filtered.map((c) => (
                  <ProjectCard key={c.slug} project={toProject(c)} sizes="(max-width: 900px) 92vw, 320px" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}





// import type { Metadata } from 'next';
// import Image from 'next/image';
// import Link from 'next/link';
// import { PageHead } from '@/components/PageHead';
// import { cities, projects } from '@/lib/data';

// export const metadata: Metadata = {
//   title: 'New construction',
//   description:
//     'Pre-construction condos, towns and homes across the Greater Toronto Area, with platinum allocation at launch.',
// };

// export default function NewConstructionPage() {
//   return (
//     <>
//       <PageHead
//         crumb="New construction"
//         title="Pre-construction across the GTA"
//         intro="Forty-one communities are in registration or release right now. The grid below is a static sample — the live feed comes from RedBricks once the integration is switched on."
//       />

//       <section className="section band-paper">
//         <div className="shell">
//           <div className="tiles">
//             {projects.map((p) => (
//               <article className="tile" key={p.slug} style={{ borderTop: 0, paddingTop: 0 }}>
//                 <Link href={`/new-construction/${p.slug}`}>
//                   <div className="card-media">
//                     <Image
//                       src={p.image}
//                       alt={`${p.name}, ${p.city}`}
//                       width={1000}
//                       height={1300}
//                       sizes="(max-width: 700px) 92vw, 30vw"
//                     />
//                     <span className="card-flag" data-tone={p.tone}>{p.status}</span>
//                   </div>
//                   <div className="card-body">
//                     <h3 className="card-title">{p.name}</h3>
//                     <p className="card-sub">{p.city} · {p.developer}</p>
//                     <div className="card-rail">
//                       <span>{p.priceFrom}</span>
//                       <span>{p.occupancy}</span>
//                     </div>
//                   </div>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="section section--tight band-mist">
//         <div className="shell">
//           <h2 className="display d-2" style={{ marginBottom: '1.75rem' }}>Browse by city</h2>
//           <ul className="tiles">
//             {cities.map((c) => (
//               <li className="tile" key={c.name}>
//                 <h3>{c.name}</h3>
//                 <p>{c.count} active listings and pre-construction releases.</p>
//                 <Link className="tlink tlink--on" href={`/new-construction?city=${c.name.toLowerCase()}`}>
//                   See {c.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </>
//   );
// }
