import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { steps } from '@/lib/data';

/** "How allocation actually works" — original section, styles in home.css. */
export function AllocationSteps() {
  return (
    <section className="section band-mist">
      <div className="shell">
        <Reveal>
          <div className="masthead">
            <div>
              <h2 className="display d-1">How allocation actually works</h2>
            </div>
            <div className="masthead-side">
              <p className="lede">
                Most buyers meet a project on the day it opens to the public. By then the good
                stacks are gone. This is the order things really happen in.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="split">
          <Reveal mode="clip">
            <figure className="split-media">
              <Image
                src="/media/interior-dark.jpg"
                alt="Placeholder image of a sales gallery interior"
                width={1500}
                height={1100}
                sizes="(max-width: 980px) 92vw, 420px"
              />
              <figcaption>Presentation gallery, Vantage Yards — placeholder image</figcaption>
            </figure>
          </Reveal>

          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="step-b">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="section-foot">
          <Link href="/register" className="btn btn--ink">
            Join the platinum list
          </Link>
          <Link href="/new-construction" className="tlink tlink--on">
            Browse launches by city
          </Link>
        </div>
      </div>
    </section>
  );
}
