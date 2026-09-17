import Link from 'next/link';
import { exploreTabs, investmentMarkets } from '@/lib/home';
import { ExploreTabs } from '../ExploreTabs';
import { Icon } from '../Icon';
import { SectionHead } from './SectionHead';

export function ExploreSection() {
  return (
    <section className="hx-section" aria-labelledby="hx-explore">
      <div className="shell">
        <SectionHead
          id="hx-explore"
          title="Explore real estate"
          lede="Jump straight to the homes that match what you have in mind."
        />
        <ExploreTabs tabs={exploreTabs} />

        <div className="hx-markets">
          <h3>Investment markets</h3>
          <ul>
            {investmentMarkets.map((m) => (
              <li key={m.name}>
                <Link href={m.href}>
                  <Icon name="pin" size={14} />
                  {m.name}
                  <span>{m.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
