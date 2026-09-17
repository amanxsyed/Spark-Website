import type { Metadata } from 'next';
import { brokerage } from '@/lib/data';
import {
  AccessBand,
  AdvisorsGrid,
  AllocationSteps,
  BrowseCities,
  ExploreSection,
  FeaturedProjects,
  HeroSection,
  InventoryCounter,
  JournalPreview,
  LatestProjects,
  PlacesPanels,
  RecentlySold,
  RegisterCloser,
  TestimonialsBand,
  TickerBar,
  ValuationBanner,
} from '@/components/home/sections';

export const metadata: Metadata = {
  title: {
    absolute: 'Pre-Construction Condos & Homes in Toronto and the GTA | Spark Realty',
  },
  description:
    'Browse pre-construction condos, townhomes and detached homes across Toronto and the GTA. Floor plans, price lists and platinum pricing from Spark Realty Inc., Brokerage.',
  alternates: { canonical: '/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      name: brokerage.name,
      url: 'https://www.sparkrealty.ca',
      telephone: brokerage.phone,
      email: brokerage.email,
      areaServed: 'Greater Toronto Area, Ontario',
    },
    {
      '@type': 'WebSite',
      url: 'https://www.sparkrealty.ca',
      name: brokerage.short,
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.sparkrealty.ca/new-construction?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

/**
 * Homepage = a list of sections. To add, remove or reorder a section,
 * change this list. Each section lives in src/components/home/sections/.
 */
export default function HomePage() {
  return (
    <div className="hx">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection />
      <TickerBar />
      <FeaturedProjects />
      <LatestProjects />
      <AccessBand />
      <RecentlySold />
      <PlacesPanels />
      <BrowseCities />
      <InventoryCounter />
      <AdvisorsGrid />
      <ValuationBanner />
      <ExploreSection />
      <TestimonialsBand />
      <AllocationSteps />
      <JournalPreview />
      <RegisterCloser />
    </div>
  );
}
