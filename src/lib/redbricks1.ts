












// /**
//  * ---------------------------------------------------------------
//  *  RED BRICKS API
//  *
//  *  One place for every call to the Red Bricks feed. Components ask
//  *  for `Project` objects (the shape defined in data.ts) and never
//  *  see the raw API response.
//  *
//  *  The key is read on the server only — it never reaches the browser.
//  *  Put it in .env.local as:   REDBRICKS_API_KEY=rb_live_xxxxx
//  *
//  *  Free plan note: the sandbox allows 100 calls in total and returns
//  *  a small curated set of projects, so every request below is cached
//  *  for a full day (revalidate) and asks for a small page size.
//  * ---------------------------------------------------------------
//  */

// import type { Project } from './data';

// const BASE = process.env.REDBRICKS_API_BASE ?? 'https://api.redbricks.ca/api/v1';
// const KEY = process.env.REDBRICKS_API_KEY;

// /** How long a response is reused before Red Bricks is called again (seconds). */
// const REVALIDATE = 60 * 60 * 24; // 24 hours

// /** Only the fields the website actually uses. */
// type RbProject = {
//   id: number;
//   name: string;
//   slug: string;
//   status: string | null;
//   current_sales_status: string | null;
//   building_type: string | null;
//   media: string[] | null;
//   city_name: string | null;
//   neighbourhood_name: string | null;
//   developer_name: string | null;
//   developers: { name: string }[] | null;
//   current_price_from: number | null;
//   launch_price: { min: number | null; max: number | null } | null;
//   occupancy_date: string | null;
//   launching_soon_label: string | null;
//   updated_at: string | null;
// };

// const FALLBACK_IMAGE = '/media/hero-skyline.jpg';

// const money = (n: number) =>
//   `From $${Math.round(n).toLocaleString('en-CA')}`;

// const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#0?39;/g, "'");

// /** Red Bricks "Condo" / "Single Family Home" → what we print on the card. */
// function kindOf(p: RbProject): string {
//   const t = (p.building_type ?? '').toLowerCase();
//   if (t.includes('condo')) return 'Condo';
//   if (t.includes('town')) return 'Townhouse';
//   if (t.includes('single') || t.includes('detached')) return 'Detached';
//   return 'Pre-construction';
// }

// /** Short badge for the corner of the card. */
// function statusOf(p: RbProject): { status: string; tone?: 'quiet' } {
//   const sales = (p.current_sales_status ?? '').toLowerCase();
//   if (sales.includes('launching')) return { status: 'Launching soon' };
//   if (sales.includes('planning')) return { status: 'Coming soon', tone: 'quiet' };
//   if (sales.includes('sold out')) return { status: 'Sold out', tone: 'quiet' };
//   if (sales.includes('selling')) return { status: 'Selling now' };
//   if (sales.includes('resale')) return { status: 'Resale', tone: 'quiet' };
//   return { status: p.status ?? 'Pre-construction', tone: 'quiet' };
// }

// /** Red Bricks project → the Project shape every card on the site uses. */
// export function toProject(p: RbProject): Project {
//   const price = p.current_price_from || p.launch_price?.min || 0;
//   const badge = statusOf(p);

//   return {
//     slug: p.slug,
//     name: decode(p.name),
//     city: decode([p.neighbourhood_name, p.city_name].filter(Boolean).join(', ') || 'Ontario'),
//     developer: decode(p.developers?.[0]?.name ?? p.developer_name ?? 'Developer to be announced'),
//     priceFrom: price > 0 ? money(price) : 'Pricing on release',
//     beds: '',
//     occupancy: p.occupancy_date
//       ? `Occupancy ${p.occupancy_date}`
//       : p.launching_soon_label ?? 'TBA',
//     status: badge.status,
//     tone: badge.tone,
//     image: p.media?.[0] ?? FALLBACK_IMAGE,
//     kind: kindOf(p),
//   };
// }

// type FetchOptions = {
//   /** Extra query string parameters, e.g. { per_page: '12' }. */
//   params?: Record<string, string>;
// };

// /**
//  * Calls Red Bricks and returns projects already mapped for the site.
//  * Never throws: if the key is missing or the API is down, it returns
//  * an empty array so the page still renders.
//  */
// export async function getProjects({ params }: FetchOptions = {}): Promise<Project[]> {
//   if (!KEY) {
//     console.warn('[redbricks] REDBRICKS_API_KEY is not set — skipping API call.');
//     return [];
//   }

//   const qs = new URLSearchParams(params).toString();
//   const url = `${BASE}/projects${qs ? `?${qs}` : ''}`;

//   try {
//     const res = await fetch(url, {
//       headers: { Authorization: `Bearer ${KEY}`, Accept: 'application/json' },
//       next: { revalidate: REVALIDATE, tags: ['redbricks-projects'] },
//     });

//     if (!res.ok) {
//       console.error(`[redbricks] ${res.status} ${res.statusText} on ${url}`);
//       return [];
//     }

//     const json = (await res.json()) as { data?: RbProject[] };
//     return (json.data ?? []).map(toProject);
//   } catch (error) {
//     console.error('[redbricks] request failed', error);
//     return [];
//   }
// }

// /** Newest first, for the "Latest pre-construction" rail. */
// export async function getLatestProjects(limit = 12): Promise<Project[]> {
//   const all = await getProjects({ params: { per_page: String(limit) } });
//   return all.slice(0, limit);
// }

// /**
//  * Projects for the "Featured" block. Red Bricks has no "featured"
//  * flag, so we put the ones that are actually selling first.
//  */
// export async function getFeaturedProjects(limit = 5): Promise<Project[]> {
//   const all = await getProjects({ params: { per_page: '20' } });
//   const rank = (p: Project) =>
//     p.status === 'Selling now' ? 0 : p.status === 'Launching soon' ? 1 : 2;
//   return [...all].sort((a, b) => rank(a) - rank(b)).slice(0, limit);
// }
