import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RegisterForm } from '@/components/RegisterForm';
import { Icon } from '@/components/home/Icon';
import {
  amenityList,
  bedroomRows,
  decode,
  getCards,
  getDocuments,
  getFloorplans,
  getProjectBySlug,
  money,
} from '@/lib/redbricks';

/** Pre-build a page for every project in the feed. */
export async function generateStaticParams() {
  const cards = await getCards();
  return cards.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: 'Project' };

  const place = [p.neighbourhood_name, p.city_name].filter((x): x is string => Boolean(x)).map(decode).join(", ");
  return {
    title: `${decode(p.name)} — ${place}`,
    description:
      p.description?.slice(0, 180) ??
      `${decode(p.name)} by ${decode(p.developer_name ?? '')} in ${place}.`,
    alternates: { canonical: `/new-construction/${slug}` },
  };
}

/** Documents that are safe to show publicly. Everything else is for signed-in clients. */
const PUBLIC_DOC = /brochure|rendering|feature|fact|amenity|site plan|community map/i;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  const [floorplans, documents] = await Promise.all([getFloorplans(p.id), getDocuments(p.id)]);

  const place = [p.neighbourhood_name, p.city_name].filter((x): x is string => Boolean(x)).map(decode).join(", ");
  const gallery = p.media ?? [];
  const hero = gallery[0] ?? '/media/hero-skyline.jpg';
  const priceFrom = money(p.current_price_from);
  const priceTo = money(p.current_price_to);
  const amenities = amenityList(p.amenities);
  const beds = bedroomRows(p.bedrooms_info);
  const deposits = (p.deposit_full ?? '').split(/\r?\n/).filter(Boolean);

  const latestDocs = documents.filter((d) => d.type === 'latest');
  const publicDocs = latestDocs.filter((d) => PUBLIC_DOC.test(d.name));
  const lockedDocs = latestDocs.filter((d) => !PUBLIC_DOC.test(d.name));

  const facts = [
    { k: 'Developer', v: decode(p.developer_name ?? '—') },
    { k: 'Architect', v: p.architects?.map((a) => a.name).join(', ') || '—' },
    { k: 'Interior design', v: p.interior_designers?.map((d) => d.name).join(', ') || '—' },
    { k: 'Building type', v: p.building_type ?? '—' },
    { k: 'Storeys', v: p.storeys ? String(p.storeys) : '—' },
    { k: 'Suites', v: p.suites ? String(p.suites) : '—' },
    { k: 'Occupancy', v: p.occupancy_date ?? 'To be announced' },
    { k: 'Maintenance fees', v: p.maintenance_fees && Number(p.maintenance_fees) > 0 ? `$${p.maintenance_fees} / sq ft` : '—' },
    { k: 'Parking', v: money(Number(p.parking_price)) ?? '—' },
    { k: 'Locker', v: money(Number(p.locker_price)) ?? '—' },
  ];

  return (
    <div className="hx pj">
      {/* ------------------------------------------------------------- hero */}
      <header className="pj-hero">
        <Image src={hero} alt={`${decode(p.name)}, ${place}`} fill priority sizes="100vw" />
        <div className="pj-hero-shade" aria-hidden="true" />
        <div className="shell pj-hero-inner">
          <p className="pj-crumb">
            <Link href="/new-construction">New construction</Link> <span aria-hidden="true">/</span>{' '}
            {place}
          </p>
          <h1>{decode(p.name)}</h1>
          <p className="pj-sub">
            {decode(p.developer_name ?? '')} · {p.address ?? place}
          </p>
          <div className="pj-badges">
            <span className="hx-flag">{p.current_sales_status ?? p.status}</span>
            {priceFrom && (
              <span className="pj-price">
                From {priceFrom}
                {priceTo && priceTo !== priceFrom ? ` to ${priceTo}` : ''}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------ body */}
      <div className="hx-section">
        <div className="shell pj-grid">
          <main className="pj-main">
            {p.description && (
              <section aria-labelledby="pj-about">
                <h2 id="pj-about" className="hx-h2">
                  About {decode(p.name)}
                </h2>
                <p className="pj-body">{p.description}</p>
              </section>
            )}

            <section aria-labelledby="pj-facts">
              <h2 id="pj-facts" className="hx-h2">
                Building facts
              </h2>
              <dl className="pj-facts">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {beds.length > 0 && (
              <section aria-labelledby="pj-beds">
                <h2 id="pj-beds" className="hx-h2">
                  Available suites
                </h2>
                <div className="pj-table-wrap">
                  <table className="pj-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Available</th>
                        <th>Size</th>
                        <th>Price from</th>
                        <th>Avg. per sq ft</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beds.map((b) => (
                        <tr key={b.label}>
                          <td>{b.label}</td>
                          <td>{b.count}</td>
                          <td>
                            {b.sizes.from}–{b.sizes.to} sq ft
                          </td>
                          <td>{money(b.prices.from) ?? '—'}</td>
                          <td>{b.psf ? `$${b.psf}` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {floorplans.length > 0 && (
              <section aria-labelledby="pj-plans">
                <h2 id="pj-plans" className="hx-h2">
                  Floor plans
                </h2>
                <p className="hx-lede" style={{ paddingLeft: 0 }}>
                  {floorplans.length} plans shown. Sizes and prices are public; the full PDF set and
                  price list are for registered clients.
                </p>
                <ul className="pj-plans">
                  {floorplans.slice(0, 12).map((f) => (
                    <li key={f.id}>
                      <div className="pj-plan-img">
                        {f.images?.medium ? (
                          <Image
                            src={f.images.medium}
                            alt={f.images.alt ?? `${f.name} floor plan`}
                            fill
                            sizes="(max-width: 700px) 45vw, 220px"
                          />
                        ) : (
                          <span className="pj-plan-empty">Plan</span>
                        )}
                      </div>
                      <h3>{f.name}</h3>
                      <p>
                        {f.bedrooms ?? '—'} bed · {f.bathrooms ?? '—'} bath · {Math.round(Number(f.size))} sq ft
                      </p>
                      <p className="pj-plan-price">
                        {money(Number(f.current_price)) ?? 'Price on request'}
                        {f.availability ? ` · ${f.availability}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
                {floorplans.length > 12 && (
                  <p className="pj-note">
                    <Icon name="lock" size={15} /> {floorplans.length - 12} more plans unlock when you
                    register.
                  </p>
                )}
              </section>
            )}

            {amenities.length > 0 && (
              <section aria-labelledby="pj-amen">
                <h2 id="pj-amen" className="hx-h2">
                  Amenities
                </h2>
                <ul className="pj-amenities">
                  {amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </section>
            )}

            {deposits.length > 0 && (
              <section aria-labelledby="pj-dep">
                <h2 id="pj-dep" className="hx-h2">
                  Deposit structure
                </h2>
                {p.deposit_with_time && <p className="pj-body">{p.deposit_with_time}</p>}
                <ol className="pj-deposits">
                  {deposits.map((d, i) => (
                    <li key={`${d}-${i}`}>{d}</li>
                  ))}
                </ol>
                {p.development_charges && (
                  <p className="pj-note">Development charges: {p.development_charges}</p>
                )}
              </section>
            )}

            {(p.special_incentives?.length ?? 0) > 0 && (
              <section aria-labelledby="pj-inc">
                <h2 id="pj-inc" className="hx-h2">
                  Current incentives
                </h2>
                <ul className="pj-chips">
                  {p.special_incentives!.map((i) => (
                    <li key={i.id}>{i.name}</li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="pj-docs">
              <h2 id="pj-docs" className="hx-h2">
                Documents
              </h2>
              {publicDocs.length > 0 && (
                <ul className="pj-docs">
                  {publicDocs.map((d) => (
                    <li key={d.id}>
                      <a href={d.file_url} target="_blank" rel="noopener noreferrer">
                        {d.name.replace(/ - Pro\.pdf$/i, '').replace(/\.pdf$/i, '')}
                        <Icon name="arrow" size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {lockedDocs.length > 0 && (
                <div className="pj-locked">
                  <p>
                    <Icon name="lock" size={16} /> {lockedDocs.length} more documents, including the
                    current price list and floor plan PDFs, are available to registered clients.
                  </p>
                  <Link href="/register" className="hx-btn hx-btn--red">
                    Unlock documents
                  </Link>
                </div>
              )}
            </section>
          </main>

          {/* --------------------------------------------------------- side */}
          <aside className="pj-side">
            <div className="pj-card">
              <p className="pj-card-price">{priceFrom ? `From ${priceFrom}` : 'Pricing on release'}</p>
              <ul className="pj-card-facts">
                <li>
                  <Icon name="pin" size={15} />
                  {p.address ?? place}
                </li>
                <li>
                  <Icon name="building" size={15} />
                  {p.building_type ?? 'Pre-construction'}
                </li>
                <li>
                  <Icon name="calendar" size={15} />
                  {p.occupancy_date ? `Occupancy ${p.occupancy_date}` : 'Occupancy TBA'}
                </li>
              </ul>
              {(p.walk_score || p.transit_score) && (
                <p className="pj-scores">
                  Walk score {p.walk_score ?? '—'} · Transit score {p.transit_score ?? '—'}
                </p>
              )}
              {p.google_map_link && (
                <a
                  className="hx-btn hx-btn--line"
                  href={p.google_map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on the map
                </a>
              )}
            </div>

            <div className="pj-form on-dark">
              <h2 className="pj-form-title">Get the price list</h2>
              <p>Floor plans, pricing and incentives for {decode(p.name)}, sent within the hour.</p>
              <RegisterForm />
            </div>
          </aside>
        </div>
      </div>

      {gallery.length > 1 && (
        <section className="hx-section hx-section--snow" aria-labelledby="pj-gal">
          <div className="shell">
            <h2 id="pj-gal" className="hx-h2">
              Gallery
            </h2>
            <ul className="pj-gallery">
              {gallery.slice(1, 9).map((src) => (
                <li key={src}>
                  <Image
                    src={src}
                    alt={`${decode(p.name)} rendering`}
                    fill
                    sizes="(max-width: 700px) 90vw, 30vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}



// import type { Metadata } from 'next';
// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { PageHead } from '@/components/PageHead';
// import { RegisterForm } from '@/components/RegisterForm';
// import { projects } from '@/lib/data';

// export function generateStaticParams() {
//   return projects.map((p) => ({ slug: p.slug }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const project = projects.find((p) => p.slug === slug);
//   return {
//     title: project ? `${project.name}, ${project.city}` : 'Project',
//     description: project
//       ? `${project.name} by ${project.developer} in ${project.city}. ${project.priceFrom}, ${project.occupancy}.`
//       : undefined,
//   };
// }

// export default async function ProjectPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const project = projects.find((p) => p.slug === slug);
//   if (!project) notFound();

//   return (
//     <>
//       <PageHead
//         crumb={project.name}
//         title={project.name}
//         intro={`${project.developer} · ${project.city}`}
//         image={project.image}
//       />

//       <section className="section band-paper">
//         <div className="shell grid-2">
//           <Image
//             src={project.image}
//             alt={`${project.name}, ${project.city}`}
//             width={1000}
//             height={1300}
//             sizes="(max-width: 900px) 92vw, 44vw"
//             style={{ width: '100%', height: 'auto', borderRadius: '2px' }}
//           />
//           <div>
//             <dl className="stat-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
//               <div><dt style={{ fontSize: '1.4rem' }}>{project.priceFrom}</dt><dd>Starting price</dd></div>
//               <div><dt style={{ fontSize: '1.4rem' }}>{project.beds}</dt><dd>Suite range</dd></div>
//               <div><dt style={{ fontSize: '1.4rem' }}>{project.occupancy}</dt><dd>Estimated occupancy</dd></div>
//               <div><dt style={{ fontSize: '1.4rem' }}>{project.status}</dt><dd>Current stage</dd></div>
//             </dl>

//             <div className="notice" style={{ marginTop: '2.5rem' }}>
//               <h2>Full project page is next</h2>
//               <p>
//                 Floorplans, deposit structure, incentives and the gallery come
//                 from the RedBricks feed. This page is the layout they will fill.
//               </p>
//             </div>

//             <div className="section-foot">
//               <Link href="/new-construction" className="tlink tlink--on">Back to all launches</Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="section dark">
//         <div className="shell grid-2">
//           <div>
//             <h2 className="display d-2">Ask for allocation at {project.name}</h2>
//             <p className="lede on-dark" style={{ marginTop: '1.2rem', color: '#c3ccd9' }}>
//               Tell us the exposure, floor range and layout you want. We submit
//               that against the platinum allocation.
//             </p>
//           </div>
//           <div className="on-dark"><RegisterForm /></div>
//         </div>
//       </section>
//     </>
//   );
// }
