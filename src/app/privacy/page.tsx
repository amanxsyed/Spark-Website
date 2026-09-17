import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';

export const metadata: Metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <>
      <PageHead crumb="Privacy" title="Privacy policy" />
      <section className="section band-paper">
        <div className="shell">
          <div className="notice" style={{ maxWidth: '68ch' }}>
            <h2>Policy text goes here</h2>
            <p>
              Ontario brokerages collect personal information under PIPEDA and
              board rules. Have the brokerage&rsquo;s own privacy policy
              reviewed and pasted in before launch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
