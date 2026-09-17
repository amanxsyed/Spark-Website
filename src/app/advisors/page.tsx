import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { advisors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Advisors',
  description: 'The Spark Realty team across the Greater Toronto Area.',
};

export default function AdvisorsPage() {
  return (
    <>
      <PageHead
        crumb="Advisors"
        title="One advisor, start to close"
        intro="Placeholder profiles. Replace the names, photography and registration numbers before launch."
        image="/media/place-3.jpg"
      />

      <section className="section band-paper">
        <div className="shell">
          <div className="advisors">
            {advisors.map((person) => (
              <article className="advisor" key={person.name}>
                <div className="advisor-mono" aria-hidden="true">{person.initials}</div>
                <h3>{person.name}</h3>
                <p>{person.title}</p>
                <dl>
                  <div><dt>Works in</dt><dd>{person.area}</dd></div>
                  <div><dt>Speaks</dt><dd>{person.languages}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className="section-foot">
            <Link href="/contact" className="btn btn--ink">Ask to be matched</Link>
          </div>
        </div>
      </section>
    </>
  );
}
