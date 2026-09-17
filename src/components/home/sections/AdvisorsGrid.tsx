import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { advisors } from '@/lib/data';

/** "The people you will actually deal with" — original section, styles in home.css. */
export function AdvisorsGrid() {
  return (
    <section className="section band-paper">
      <div className="shell">
        <Reveal>
          <div className="masthead">
            <div>
              <h2 className="display d-1">The people you will actually deal with</h2>
            </div>
            <div className="masthead-side">
              <p className="lede">
                No call centre and no lead pool. You get one advisor who knows the buildings on your
                shortlist and stays with the file through closing.
              </p>
              <Link href="/advisors" className="tlink tlink--on">
                Meet the full team
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="advisors">
          {advisors.map((person) => (
            <article className="advisor" key={person.name}>
              <div className="advisor-mono" aria-hidden="true">
                {person.initials}
              </div>
              <h3>{person.name}</h3>
              <p>{person.title}</p>
              <dl>
                <div>
                  <dt>Works in</dt>
                  <dd>{person.area}</dd>
                </div>
                <div>
                  <dt>Speaks</dt>
                  <dd>{person.languages}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
