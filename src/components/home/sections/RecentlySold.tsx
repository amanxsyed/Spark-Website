import Image from 'next/image';
import Link from 'next/link';
import { recentlySold } from '@/lib/home';
import { Icon } from '../Icon';
import { SectionHead } from './SectionHead';

/** Sold prices stay hidden until sign-in (VOW rules). */
export function RecentlySold() {
  return (
    <section className="hx-section" aria-labelledby="hx-sold">
      <div className="shell">
        <SectionHead
          id="hx-sold"
          title="Recently sold near you"
          lede="See what homes actually sold for. Sold prices are free for registered clients."
          action={{ label: 'See more sold homes', href: '/resale?sold=1' }}
        />
        <ul className="hx-sold">
          {recentlySold.map((s) => (
            <li key={s.id} className="hx-sold-card">
              <div className="hx-sold-media">
                <Image src={s.image} alt="" fill sizes="(max-width: 700px) 80vw, 300px" />
                <span className="hx-sold-when">{s.soldWhen}</span>
                <Link href="/register?next=sold" className="hx-sold-unlock">
                  <Icon name="lock" size={16} />
                  Sign in to see price
                </Link>
              </div>
              <div className="hx-sold-body">
                <div className="hx-sold-prices" aria-label="Prices hidden until you sign in">
                  <span>
                    Listed <b aria-hidden="true">$•,•••,•••</b>
                  </span>
                  <span>
                    Sold <b aria-hidden="true">$•,•••,•••</b>
                  </span>
                </div>
                <h3>{s.street}</h3>
                <p>{s.area}</p>
                <ul className="hx-card-facts">
                  <li>
                    <Icon name="bed" size={15} />
                    {s.beds} bed
                  </li>
                  <li>
                    <Icon name="bath" size={15} />
                    {s.baths} bath
                  </li>
                  <li>{s.kind}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
