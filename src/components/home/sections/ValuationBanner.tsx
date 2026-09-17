import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '../Icon';

export function ValuationBanner() {
  return (
    <section className="hx-section" aria-labelledby="hx-value">
      <div className="shell">
        <div className="hx-value">
          <Image src="/media/interior-dark.jpg" alt="" fill sizes="(max-width: 1360px) 92vw, 1240px" />
          <div className="hx-value-copy">
            <h2 id="hx-value" className="hx-h2">
              What is your home worth today?
            </h2>
            <p>
              A free, no-obligation valuation from an advisor who knows your street, based on recent
              sales rather than an online guess.
            </p>
            <Link href="/sell" className="hx-btn hx-btn--red">
              Get my free valuation <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
