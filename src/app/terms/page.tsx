import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';

export const metadata: Metadata = { title: 'Terms' };

export default function TermsPage() {
  return (
    <>
      <PageHead crumb="Terms" title="Terms of use" />
      <section className="section band-paper">
        <div className="shell">
          <div className="notice" style={{ maxWidth: '68ch' }}>
            <h2>Terms text goes here</h2>
            <p>
              Include VOW terms, listing data attribution and trademark notices
              required by the boards the brokerage is a member of.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
