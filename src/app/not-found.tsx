import Link from 'next/link';
import { PageHead } from '@/components/PageHead';

export default function NotFound() {
  return (
    <>
      <PageHead
        crumb="Not found"
        title="That page is not here"
        intro="The link may be old, or the listing may have come off the market."
      />
      <section className="section band-paper">
        <div className="shell section-foot" style={{ marginTop: 0 }}>
          <Link href="/" className="btn btn--ink">Back to home</Link>
          <Link href="/new-construction" className="tlink tlink--on">Browse launches</Link>
        </div>
      </section>
    </>
  );
}
