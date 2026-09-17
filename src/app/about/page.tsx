import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';

export const metadata: Metadata = {
  title: 'About',
  description: 'Spark Realty Inc., Brokerage — who we are and how we work.',
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumb="About"
        title="A brokerage built around the paperwork nobody reads"
        intro="Placeholder copy. Replace with the brokerage's own history, licence details and leadership."
        image="/media/place-1.jpg"
      />

      <section className="section band-paper">
        <div className="shell grid-2">
          <div className="prose">
            <p>
              Spark Realty is a Greater Toronto Area brokerage working across
              pre-construction, resale, leasing and investment. Most of our
              buyers come to us for allocation at a launch and stay for the
              part that matters later: the agreement, the deposit schedule and
              the closing.
            </p>
            <h2>What we do differently</h2>
            <ul>
              <li>Every worksheet is read line by line with the buyer before it is signed.</li>
              <li>Buyers keep the full ten-day cooling-off period. We plan for it.</li>
              <li>One advisor owns the file from first call to final closing.</li>
              <li>Price lists and floorplans are shared as they arrive, not held back as bait.</li>
            </ul>
          </div>
          <div>
            <dl className="stat-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div><dt>2015</dt><dd>Placeholder year founded</dd></div>
              <div><dt>41</dt><dd>Launches this season</dd></div>
              <div><dt>1,340</dt><dd>Communities tracked</dd></div>
              <div><dt>9</dt><dd>Languages spoken on the team</dd></div>
            </dl>
            <div className="section-foot">
              <Link href="/contact" className="btn btn--ink">Contact the brokerage</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
