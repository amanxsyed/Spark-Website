/**
 * ---------------------------------------------------------------
 *  ALL SITE CONTENT LIVES HERE.
 *
 *  Everything below is placeholder copy written to look and read
 *  like the real thing. Replace it with Spark Realty's own numbers,
 *  projects, people and testimonials before launch — nothing here
 *  has been verified.
 *
 *  Later, this file is the seam where the RedBricks / Repliers feed
 *  gets plugged in: swap the exported arrays for API calls and no
 *  component has to change.
 * ---------------------------------------------------------------
 */

export const brokerage = {
  name: 'Spark Realty Inc., Brokerage',
  short: 'Spark Realty',
  phone: '(416) 000-0000',
  phoneHref: 'tel:+14160000000',
  email: 'hello@sparkrealty.ca',
  address: '000 Placeholder Ave, Suite 000, Toronto, ON M0M 0M0',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  youtube: 'https://youtube.com',
};

export type Project = {
  slug: string;
  name: string;
  city: string;
  developer: string;
  priceFrom: string;
  beds: string;
  occupancy: string;
  status: string;
  tone?: 'quiet';
  image: string;
};

export const projects: Project[] = [
  {
    slug: 'vantage-yards',
    name: 'Vantage Yards',
    city: 'Vaughan',
    developer: 'Northcrest Developments',
    priceFrom: 'From $649,900',
    beds: '1–3 bed',
    occupancy: 'Occupancy 2029',
    status: 'Platinum access',
    image: '/media/project-1.jpg',
  },
  {
    slug: 'the-bellwood',
    name: 'The Bellwood',
    city: 'Yorkville, Toronto',
    developer: 'Marchetti Group',
    priceFrom: 'From $1,140,000',
    beds: '1–3 bed + den',
    occupancy: 'Occupancy 2028',
    status: 'Final release',
    image: '/media/project-2.jpg',
  },
  {
    slug: 'rivet-towns',
    name: 'Rivet Towns',
    city: 'Markham',
    developer: 'Halden Homes',
    priceFrom: 'From $829,000',
    beds: '3–4 bed towns',
    occupancy: 'Occupancy 2027',
    status: 'Selling now',
    tone: 'quiet',
    image: '/media/project-3.jpg',
  },
  {
    slug: 'kingsway-rail',
    name: 'Kingsway Rail',
    city: 'Etobicoke, Toronto',
    developer: 'Ardwell Property',
    priceFrom: 'From $598,000',
    beds: 'Studio–2 bed',
    occupancy: 'Occupancy 2029',
    status: 'Platinum access',
    image: '/media/project-4.jpg',
  },
  {
    slug: 'perch-condos',
    name: 'Perch Condos',
    city: 'Mississauga',
    developer: 'Lantern Property Co.',
    priceFrom: 'From $571,000',
    beds: '1–2 bed',
    occupancy: 'Occupancy 2028',
    status: 'VIP preview',
    image: '/media/project-5.jpg',
  },
  {
    slug: 'nord-at-downsview',
    name: 'Nord at Downsview',
    city: 'North York',
    developer: 'Fieldstone Group',
    priceFrom: 'Pricing on release',
    beds: '1–3 bed',
    occupancy: 'Occupancy 2030',
    status: 'Register first',
    tone: 'quiet',
    image: '/media/project-6.jpg',
  },
];

export type Place = {
  name: string;
  region: string;
  benchmark: string;
  note: string;
  image: string;
};

export const places: Place[] = [
  {
    name: 'Yorkville',
    region: 'Toronto',
    benchmark: 'Benchmark $1.42M',
    note: 'Low-rise luxury and boutique towers',
    image: '/media/place-1.jpg',
  },
  {
    name: 'King West',
    region: 'Toronto',
    benchmark: 'Benchmark $842K',
    note: 'Highest resale turnover downtown',
    image: '/media/place-2.jpg',
  },
  {
    name: 'Vaughan Metropolitan Centre',
    region: 'York Region',
    benchmark: 'Benchmark $718K',
    note: 'Subway-connected, six towers underway',
    image: '/media/place-3.jpg',
  },
  {
    name: 'Unionville',
    region: 'Markham',
    benchmark: 'Benchmark $1.19M',
    note: 'Freehold towns and family detached',
    image: '/media/place-4.jpg',
  },
  {
    name: 'Port Credit',
    region: 'Mississauga',
    benchmark: 'Benchmark $915K',
    note: 'Waterfront master-planned communities',
    image: '/media/place-5.jpg',
  },
];

export const cities = [
  { name: 'Toronto', count: '18,420' },
  { name: 'Mississauga', count: '4,905' },
  { name: 'Vaughan', count: '3,118' },
  { name: 'Brampton', count: '3,640' },
  { name: 'Markham', count: '2,214' },
  { name: 'Richmond Hill', count: '1,806' },
  { name: 'Oakville', count: '1,559' },
  { name: 'Burlington', count: '1,204' },
];

export const tickerItems = [
  { label: 'Active listings across the GTA', value: '54,056' },
  { label: 'Pre-construction communities tracked', value: '1,340' },
  { label: 'Toronto', value: '18,420' },
  { label: 'Peel Region', value: '8,545' },
  { label: 'York Region', value: '7,138' },
  { label: 'Halton Region', value: '3,902' },
  { label: 'Durham Region', value: '3,417' },
  { label: 'Feed refreshed', value: 'every 15 min' },
];

export type Advisor = {
  name: string;
  initials: string;
  title: string;
  area: string;
  languages: string;
};

export const advisors: Advisor[] = [
  {
    name: 'Ayesha Rahim',
    initials: 'AR',
    title: 'Sales Representative',
    area: 'Vaughan · Woodbridge',
    languages: 'English, Urdu, Punjabi',
  },
  {
    name: 'Daniel Okonjo',
    initials: 'DO',
    title: 'Sales Representative',
    area: 'Toronto core · King West',
    languages: 'English, French',
  },
  {
    name: 'Mei-Lin Chow',
    initials: 'MC',
    title: 'Broker',
    area: 'Markham · Richmond Hill',
    languages: 'English, Cantonese, Mandarin',
  },
  {
    name: 'Jordan Petrie',
    initials: 'JP',
    title: 'Sales Representative',
    area: 'Oakville · Burlington',
    languages: 'English',
  },
];

export const quotes = [
  {
    text: 'They had the floorplans in front of us two weeks before the public release, and told us which two units were actually worth buying.',
    who: 'R. & S. Malhotra',
    detail: 'Two-bedroom, Vaughan · closed 2025',
  },
  {
    text: 'I have bought pre-construction three times. This is the first brokerage that walked me through the cooling-off period instead of rushing the worksheet.',
    who: 'Kevin Tran',
    detail: 'Investor, four units across the GTA',
  },
  {
    text: 'We listed on a Thursday and had two offers by Sunday, at a price we had been told was not realistic.',
    who: 'Diane Osei',
    detail: 'Detached home, Markham · sold 2026',
  },
];

export const posts = [
  {
    slug: 'assignment-rules-2026',
    date: '18 August 2026',
    category: 'Pre-construction',
    title: 'What changed about assignment sales in Ontario this year',
    read: '6 min',
  },
  {
    slug: 'deposit-structures',
    date: '2 August 2026',
    category: 'Buying',
    title: 'Reading a deposit structure before you sign the worksheet',
    read: '8 min',
  },
  {
    slug: 'gta-rent-vs-carry',
    date: '21 July 2026',
    category: 'Investing',
    title: 'Rent versus carrying cost across nine GTA submarkets',
    read: '11 min',
  },
];

export const steps = [
  {
    title: 'Register before the launch date',
    body: 'Allocation is decided before a project opens to the public. Registering early puts your name on the brokerage list the developer draws from.',
  },
  {
    title: 'We request the units, not the building',
    body: 'You tell us the exposure, floor range and layout you want. We submit that request against the platinum allocation instead of taking whatever is left.',
  },
  {
    title: 'Review the worksheet with an advisor',
    body: 'Deposit schedule, occupancy fees, assignment and capping clauses get read line by line before anything is signed. Ten minutes here saves years.',
  },
  {
    title: 'Sign, then use the cooling-off period',
    body: 'Ontario gives you ten days to have a lawyer review the agreement and to arrange financing. We expect you to use all ten.',
  },
];

export const navigation = [
  { label: 'New construction', href: '/new-construction', mega: true },
  { label: 'Resale', href: '/resale' },
  { label: 'Sell', href: '/sell' },
  { label: 'Advisors', href: '/advisors' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
];
