import Link from 'next/link';
import { brokerage } from '@/lib/data';
import { accessSteps } from '@/lib/home';

export function AccessBand() {
  return (
    <section className="hx-access" aria-labelledby="hx-access">
      <div className="shell hx-access-inner">
        <div>
          <h2 id="hx-access" className="hx-h2">
            Free account, first access
          </h2>
          <p className="hx-lede">
            Floor plans, price lists, deposit structures and sold prices are waiting on the other
            side of one short form.
          </p>
          <div className="hx-actions">
            <Link href="/register" className="hx-btn hx-btn--white">
              Create free account
            </Link>
            <a href={brokerage.phoneHref} className="hx-btn hx-btn--ghost">
              Call {brokerage.phone}
            </a>
          </div>
        </div>
        <ol className="hx-steps">
          {accessSteps.map((s, i) => (
            <li key={s.title}>
              <span className="hx-step-n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
