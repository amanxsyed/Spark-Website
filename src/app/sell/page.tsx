import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';

export const metadata: Metadata = {
  title: 'Sell your home',
  description:
    'Pricing, preparation and marketing for sellers across the Greater Toronto Area.',
};

const stages = [
  { t: 'Walk the property', d: 'An advisor sees the home before quoting a price. Photos and comparables come after that, not instead of it.' },
  { t: 'Price against real comparables', d: 'You get the sold data behind the number, including the three sales that argue against it.' },
  { t: 'Prepare and photograph', d: 'Staging, repairs worth doing and the ones that are not, then a full media package.' },
  { t: 'Take it to market', d: 'Feed syndication, paid placement, agent outreach and open houses on a schedule you approve.' },
  { t: 'Negotiate and close', d: 'Every offer summarised in plain language: price, conditions, dates, and what each one is really worth.' },
];

export default function SellPage() {
  return (
    <>
      <PageHead
        crumb="Sell"
        title="Selling, without the theatre"
        intro="A realistic price with the evidence behind it, a marketing plan you can see, and one advisor who answers the phone."
        image="/media/place-4.jpg"
      />

      <section className="section band-paper">
        <div className="shell">
          <ol className="steps" style={{ maxWidth: '62rem' }}>
            {stages.map((s, i) => (
              <li key={s.t}>
                <span className="step-n" aria-hidden="true">{i + 1}</span>
                <div className="step-b">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="section-foot">
            <Link href="/contact" className="btn btn--spark">Book a valuation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
