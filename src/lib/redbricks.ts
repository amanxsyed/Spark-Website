/**
 * ---------------------------------------------------------------
 *  RED BRICKS API CLIENT
 *
 *  Every call to the Red Bricks feed goes through this file. Pages
 *  and components never see the raw API response — they get the
 *  clean types defined below.
 *
 *  Key (server only, never NEXT_PUBLIC_):
 *      .env.local  ->  REDBRICKS_API_KEY=rb_live_xxxxx
 *
 *  Free (sandbox) plan: 100 API calls in total, 15 curated projects.
 *  Every response below is cached (revalidate) so the site uses only
 *  a handful of calls per day no matter how many visitors it gets.
 * ---------------------------------------------------------------
 */

import type { Project } from './data';

const BASE = process.env.REDBRICKS_API_BASE ?? 'https://api.redbricks.ca/api/v1';
const KEY = process.env.REDBRICKS_API_KEY;

/** Seconds before a response is fetched again. Raise on the free plan, lower on Pro. */
const DAY = 60 * 60 * 24;

/* ============================================================ raw API types */

export type RbCard = {
  id: number;
  name: string;
  slug: string;
  current_sales_status: string | null;
  current_price_from: number | null;
  current_price_to: number | null;
  price_per_sqft: number | null;
  building_type: string | null;
  city_name: string | null;
  neighbourhood_name: string | null;
  developer_name: string | null;
  address: string | null;
  occupancy_date: string | null;
  storeys: number | null;
  suites: number | null;
  size: { min: number | null; max: number | null } | null;
  media: string[] | null;
};

export type RbBedroomInfo = {
  psf: number | null;
  count: number;
  sizes: { from: number; to: number; average: number };
  prices: { from: number; to: number; average: number };
  percentage: number;
};

export type RbDocument = {
  id: number;
  project_id: number;
  name: string;
  document_type: string;
  type: 'latest' | 'historical';
  file_url: string;
  updated_at: string;
};

export type RbProject = RbCard & {
  description: string | null;
  status: string | null;
  highlights: string | null;
  amenities: string | null;
  district_name: string | null;
  deposit_with_time: string | null;
  deposit_full: string | null;
  deposit_data: { label: string }[] | null;
  developers: { id: number; name: string; slug: string; logo: string | null }[] | null;
  architects: { id: number; name: string }[] | null;
  interior_designers: { id: number; name: string }[] | null;
  walk_score: number | null;
  transit_score: number | null;
  google_map_link: string | null;
  location: { coordinates: [number, number] } | null;
  maintenance_fees: string | null;
  parking_price: string | null;
  locker_price: string | null;
  development_charges: string | null;
  launch_psf_avg: string | null;
  building_height_m: string | null;
  bedrooms_info: Record<string, RbBedroomInfo> | RbBedroomInfo[] | null;
  special_incentives: { id: number; name: string; slug: string }[] | null;
  latest_documents: RbDocument[] | null;
  historical_documents: RbDocument[] | null;
};

export type RbFloorplan = {
  id: number;
  project_id: number;
  name: string;
  bedrooms: number | null;
  bathrooms: string | null;
  size: string | null;
  exposure: string | null;
  availability: string | null;
  current_price: string | null;
  current_psf: number | null;
  images: { full: string | null; medium: string | null; thumbnail: string | null; alt: string | null } | null;
};

export type RbCity = { id: number; name: string; slug: string };
export type RbNeighbourhood = { id: number; name: string; slug: string; district_id: number };
export type RbIncentive = { id: number; name: string; slug: string; description: string | null };

type Paginated<T> = { data?: T[]; meta?: { total?: number; last_page?: number } };

/* =============================================================== the fetcher */

async function api<T>(path: string, revalidate = DAY): Promise<T | null> {
  if (!KEY) {
    console.warn('[redbricks] REDBRICKS_API_KEY is not set — skipping API call.');
    return null;
  }

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${KEY}`, Accept: 'application/json' },
      next: { revalidate, tags: ['redbricks'] },
    });

    if (!res.ok) {
      console.error(`[redbricks] ${res.status} ${res.statusText} on ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[redbricks] request failed on ${path}`, error);
    return null;
  }
}

const list = async <T>(path: string, revalidate = DAY): Promise<T[]> =>
  (await api<Paginated<T>>(path, revalidate))?.data ?? [];

/* ================================================================= helpers */

const FALLBACK_IMAGE = '/media/hero-skyline.jpg';

export const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#0?39;/g, "'");

export const money = (n: number | null | undefined) =>
  n && n > 0 ? `$${Math.round(n).toLocaleString('en-CA')}` : null;

/** "-Gym\r\n-Pool" → ["Gym", "Pool"] */
export const amenityList = (raw: string | null | undefined) =>
  (raw ?? '')
    .split(/\r?\n/)
    .map((a) => a.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);

/** bedrooms_info arrives as an object on some projects and an array on others. */
export function bedroomRows(info: RbProject['bedrooms_info']) {
  if (!info) return [];
  const label = (k: string) => {
    const n = Number(k);
    if (Number.isNaN(n)) return k;
    if (n === 0) return 'Studio';
    const den = !Number.isInteger(n);
    return `${Math.floor(n)} bed${den ? ' + den' : ''}`;
  };
  if (Array.isArray(info)) return info.map((v, i) => ({ label: `Type ${i + 1}`, ...v }));
  return Object.entries(info).map(([k, v]) => ({ label: label(k), ...v }));
}

/** Red Bricks project → the Project shape the cards on the site use. */
export function toProject(p: RbCard): Project {
  const price = p.current_price_from ?? 0;
  const sales = (p.current_sales_status ?? '').toLowerCase();
  const kindRaw = (p.building_type ?? '').toLowerCase();

  const badge: { status: string; tone?: 'quiet' } = sales.includes('launching')
    ? { status: 'Launching soon' }
    : sales.includes('planning')
      ? { status: 'Coming soon', tone: 'quiet' }
      : sales.includes('sold out')
        ? { status: 'Sold out', tone: 'quiet' }
        : sales.includes('selling')
          ? { status: 'Selling now' }
          : sales.includes('resale')
            ? { status: 'Resale', tone: 'quiet' }
            : { status: 'Pre-construction', tone: 'quiet' };

  return {
    slug: p.slug,
    name: decode(p.name),
    city: decode([p.neighbourhood_name, p.city_name].filter(Boolean).join(', ') || 'Ontario'),
    developer: decode(p.developer_name ?? 'Developer to be announced'),
    priceFrom: price > 0 ? `From ${money(price)}` : 'Pricing on release',
    beds: '',
    occupancy: p.occupancy_date ? `Occupancy ${p.occupancy_date}` : 'TBA',
    status: badge.status,
    tone: badge.tone,
    image: p.media?.[0] ?? FALLBACK_IMAGE,
    kind: kindRaw.includes('condo')
      ? 'Condo'
      : kindRaw.includes('town')
        ? 'Townhouse'
        : kindRaw.includes('single') || kindRaw.includes('detached')
          ? 'Detached'
          : 'Pre-construction',
  };
}

/* ============================================================== public API */

/** GET /projects/cards — light list, everything the cards need. */
export const getCards = () => list<RbCard>('/projects/cards?per_page=50');

/** GET /projects/map — id, slug, coordinates and price for map pins. */
export const getMapPins = () =>
  list<RbCard & { lat: number; lng: number }>('/projects/map');

/** GET /projects/{id} — the full project record. */
export const getProject = async (id: number) =>
  (await api<{ data: RbProject }>(`/projects/${id}`))?.data ?? null;

/** GET /projects/{id}/floorplans — all suites/models, paged 20 at a time. */
export const getFloorplans = (id: number, page = 1) =>
  list<RbFloorplan>(`/projects/${id}/floorplans?page=${page}`);

/** GET /projects/{id}/documents — brochures, price lists, floor plan PDFs. */
export const getDocuments = (id: number) => list<RbDocument>(`/projects/${id}/documents`);

/** GET /cities, /neighbourhoods, /special-incentives — small reference lists. */
export const getCities = () => list<RbCity>('/cities');
export const getNeighbourhoods = () => list<RbNeighbourhood>('/neighbourhoods');
export const getIncentives = () => list<RbIncentive>('/special-incentives');

/* -------------------------------------------------- convenience for pages */

/** Cards already mapped for the site's ProjectCard component. */
export async function getProjects(): Promise<Project[]> {
  return (await getCards()).map(toProject);
}

/** Newest-looking first, for the "Latest pre-construction" rail. */
export async function getLatestProjects(limit = 12): Promise<Project[]> {
  const cards = await getCards();
  const rank = (c: RbCard) => {
    const s = (c.current_sales_status ?? '').toLowerCase();
    if (s.includes('launching') || s.includes('planning')) return 0;
    if (s.includes('selling')) return 1;
    return 2;
  };
  return [...cards].sort((a, b) => rank(a) - rank(b)).slice(0, limit).map(toProject);
}

/** Projects that are actively selling go first in the Featured block. */
export async function getFeaturedProjects(limit = 5): Promise<Project[]> {
  const cards = await getCards();
  const rank = (c: RbCard) => {
    const s = (c.current_sales_status ?? '').toLowerCase();
    if (s.includes('selling')) return 0;
    if (s.includes('launching')) return 1;
    return 2;
  };
  return [...cards].sort((a, b) => rank(a) - rank(b)).slice(0, limit).map(toProject);
}

/**
 * The API has no "get by slug" endpoint, so the cached card list is used
 * to turn a URL slug into the project id, then the full record is fetched.
 */
export async function getProjectBySlug(slug: string) {
  const card = (await getCards()).find((c) => c.slug === slug);
  if (!card) return null;
  return getProject(card.id);
}

/** Cities with a live project count, for the "Browse by city" tiles. */
export async function getCityCounts(): Promise<{ name: string; slug: string; count: number }[]> {
  const cards = await getCards();
  const counts = new Map<string, number>();
  for (const c of cards) {
    if (!c.city_name) continue;
    const name = decode(c.city_name);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), count }))
    .sort((a, b) => b.count - a.count);
}
