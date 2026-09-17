/**
 * ---------------------------------------------------------------
 *  HOMEPAGE CONTENT (v2)
 *
 *  Placeholder content for the new homepage. Project cards reuse
 *  `projects` from data.ts; everything homepage-specific lives here.
 *  When the Red Bricks API is connected, swap these arrays for
 *  server-side fetches — the components only care about the shape.
 * ---------------------------------------------------------------
 */

export type PropertyKind = 'Condo' | 'Townhouse' | 'Detached' | 'Semi-detached';

/** Extra fields the homepage cards need, keyed by project slug. */
export const projectMeta: Record<string, { kind: PropertyKind; featured?: boolean }> = {
  'vantage-yards': { kind: 'Condo', featured: true },
  'the-bellwood': { kind: 'Condo', featured: true },
  'rivet-towns': { kind: 'Townhouse', featured: true },
  'kingsway-rail': { kind: 'Condo', featured: true },
  'perch-condos': { kind: 'Condo', featured: true },
  'nord-at-downsview': { kind: 'Condo' },
};

export const quickSearches = [
  { label: 'Toronto condos', href: '/new-construction?city=toronto&type=condo' },
  { label: 'Towns under $900K', href: '/new-construction?type=townhouse&max=900000' },
  { label: 'Launching soon', href: '/new-construction?status=launching-soon' },
  { label: 'Move-in ready', href: '/new-construction?status=move-in-ready' },
  { label: 'Assignments', href: '/new-construction?type=assignment' },
];

export type SoldListing = {
  id: string;
  street: string;
  area: string;
  kind: string;
  beds: string;
  baths: string;
  soldWhen: string;
  image: string;
};

/** Sold prices are shown only to signed-in clients (VOW rules). */
export const recentlySold: SoldListing[] = [
  { id: 's1', street: 'Lake Shore Boulevard West', area: 'Mimico, Toronto', kind: 'Condo apartment', beds: '1+1', baths: '1', soldWhen: 'Sold today', image: '/media/place-2.jpg' },
  { id: 's2', street: 'Kilbride Street', area: 'Rural Burlington', kind: 'Detached', beds: '3+1', baths: '3', soldWhen: 'Sold yesterday', image: '/media/place-4.jpg' },
  { id: 's3', street: 'Bignell Crescent', area: 'Northeast Ajax', kind: 'Detached', beds: '4+1', baths: '4', soldWhen: 'Sold yesterday', image: '/media/place-5.jpg' },
  { id: 's4', street: 'Moffatt Avenue', area: "Fletcher's West, Brampton", kind: 'Detached', beds: '4+3', baths: '5', soldWhen: 'Sold 2 days ago', image: '/media/place-3.jpg' },
];

export const cityTiles = [
  { name: 'Toronto', count: 612, image: '/media/place-1.jpg', href: '/new-construction?city=toronto' },
  { name: 'Mississauga', count: 148, image: '/media/place-5.jpg', href: '/new-construction?city=mississauga' },
  { name: 'Vaughan', count: 121, image: '/media/place-3.jpg', href: '/new-construction?city=vaughan' },
  { name: 'Markham', count: 97, image: '/media/place-4.jpg', href: '/new-construction?city=markham' },
  { name: 'Oakville', count: 84, image: '/media/place-2.jpg', href: '/new-construction?city=oakville' },
];

const exploreCities = ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Oakville', 'Burlington', 'Hamilton'];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export type LinkGroup = { title: string; links: { label: string; href: string }[] };

export const exploreTabs: { id: string; label: string; groups: LinkGroup[] }[] = [
  {
    id: 'type',
    label: 'Property type',
    groups: [
      { title: 'Pre-construction condos', kind: 'condo' },
      { title: 'Pre-construction towns', kind: 'townhouse' },
      { title: 'Detached homes', kind: 'detached' },
      { title: 'Homes for sale', kind: 'resale' },
    ].map((g) => ({
      title: g.title,
      links: exploreCities.map((c) => ({
        label: c,
        href: g.kind === 'resale' ? `/resale?city=${slug(c)}` : `/new-construction?city=${slug(c)}&type=${g.kind}`,
      })),
    })),
  },
  {
    id: 'budget',
    label: 'Budget',
    groups: [
      { title: 'Under $500K', max: 500000 },
      { title: 'Under $750K', max: 750000 },
      { title: 'Under $1M', max: 1000000 },
      { title: '$1M to $2M', min: 1000000, max: 2000000 },
      { title: '$2M and above', min: 2000000 },
    ].map((g) => ({
      title: g.title,
      links: exploreCities.slice(0, 6).map((c) => ({
        label: c,
        href: `/new-construction?city=${slug(c)}${g.min ? `&min=${g.min}` : ''}${g.max ? `&max=${g.max}` : ''}`,
      })),
    })),
  },
  {
    id: 'beds',
    label: 'Bedrooms',
    groups: ['1 bedroom', '2 bedrooms', '3 bedrooms', '4+ bedrooms'].map((title, i) => ({
      title,
      links: exploreCities.slice(0, 6).map((c) => ({
        label: c,
        href: `/new-construction?city=${slug(c)}&beds=${i + 1}${i === 3 ? '-plus' : ''}`,
      })),
    })),
  },
  {
    id: 'hoods',
    label: 'Neighbourhoods',
    groups: [
      { title: 'Toronto', links: ['Yorkville', 'King West', 'Liberty Village', 'The Annex', 'Leslieville', 'Mimico'] },
      { title: 'Mississauga', links: ['Port Credit', 'Square One', 'Erin Mills', 'Lakeview', 'Streetsville'] },
      { title: 'Vaughan', links: ['Vaughan Metropolitan Centre', 'Maple', 'Woodbridge', 'Kleinburg', 'Concord'] },
      { title: 'Markham', links: ['Unionville', 'Cornell', 'Berczy', 'Markham Village'] },
      { title: 'Oakville', links: ['Bronte', 'Old Oakville', 'Glen Abbey', 'Joshua Creek'] },
      { title: 'Burlington', links: ['Alton Village', 'Roseland', 'Millcroft'] },
    ].map((g) => ({
      title: g.title,
      links: g.links.map((n) => ({ label: n, href: `/new-construction?area=${slug(n)}` })),
    })),
  },
];

export const investmentMarkets = [
  { name: 'Brampton', count: 205 },
  { name: 'Burlington', count: 141 },
  { name: 'Barrie', count: 46 },
  { name: 'Ajax', count: 45 },
  { name: 'Cambridge', count: 38 },
  { name: 'Aurora', count: 37 },
  { name: 'Brantford', count: 16 },
  { name: 'East Gwillimbury', count: 15 },
  { name: 'Bowmanville', count: 13 },
  { name: 'Collingwood', count: 13 },
  { name: 'Fort Erie', count: 13 },
  { name: 'Caledon', count: 10 },
].map((m) => ({ ...m, href: `/new-construction?city=${slug(m.name)}` }));

export const accessSteps = [
  { title: 'Create a free account', body: 'Takes under a minute. Floor plans, price lists and sold prices unlock straight away.' },
  { title: 'Get launches before the public', body: 'Registered clients receive platinum pricing and first pick of units at new releases.' },
  { title: 'Review every number with an advisor', body: 'Deposits, occupancy fees and assignment clauses explained line by line before you sign.' },
];
