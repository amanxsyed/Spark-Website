import Link from 'next/link';
import { brokerage } from '@/lib/data';

const columns = [
  {
    heading: 'Buy',
    links: [
      { label: 'New construction', href: '/new-construction' },
      { label: 'Resale listings', href: '/resale' },
      { label: 'Assignment sales', href: '/resale' },
      { label: 'First-time buyers', href: '/new-construction' },
    ],
  },
  {
    heading: 'Sell & lease',
    links: [
      { label: 'Sell with Spark', href: '/sell' },
      { label: 'Home evaluation', href: '/sell' },
      { label: 'Leasing', href: '/resale' },
      { label: 'Investor services', href: '/about' },
    ],
  },
  {
    heading: 'Brokerage',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our advisors', href: '/advisors' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-lead">
            <p className="d-3 display">
              Talk to someone who has read the agreement before.
            </p>
            <Link href="/contact" className="btn btn--ghost">
              Book a call
            </Link>
          </div>

          {columns.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h3>{col.heading}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          SPARK<i />
        </p>

        <div className="footer-legal">
          <div>
            <p>
              {brokerage.name} · {brokerage.address} ·{' '}
              <a href={brokerage.phoneHref}>{brokerage.phone}</a> ·{' '}
              <a href={`mailto:${brokerage.email}`}>{brokerage.email}</a>
            </p>
            <p style={{ marginTop: '0.85rem' }}>
              Listing information is supplied by third-party feeds and is
              believed to be reliable but is not guaranteed. Pricing,
              availability and occupancy dates change without notice — confirm
              material facts with a licensed representative before you rely on
              them. Not intended to solicit buyers or sellers currently under
              contract with another brokerage. MLS®, REALTOR® and associated
              logos are trademarks of the Canadian Real Estate Association.
            </p>
          </div>
          <div>
            <p>
              <Link href="/privacy">Privacy</Link> ·{' '}
              <Link href="/terms">Terms</Link> ·{' '}
              <Link href="/contact">Accessibility</Link>
            </p>
            <p style={{ marginTop: '0.85rem' }}>
              © {new Date().getFullYear()} {brokerage.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
