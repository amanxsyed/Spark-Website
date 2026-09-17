import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';
import { RegisterForm } from '@/components/RegisterForm';
import { brokerage } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Spark Realty Inc., Brokerage.',
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumb="Contact"
        title="Talk to an advisor"
        intro="One call, no script. Tell us what you are trying to do and we will tell you whether we are the right brokerage for it."
        image="/media/interior-dark.jpg"
      />

      <section className="section band-paper">
        <div className="shell grid-2">
          <div className="prose">
            <h2>Office</h2>
            <p>{brokerage.address}</p>
            <p>
              <a className="tlink tlink--on" href={brokerage.phoneHref}>{brokerage.phone}</a>
              <br />
              <a className="tlink tlink--on" href={`mailto:${brokerage.email}`}>{brokerage.email}</a>
            </p>
            <h2>Hours</h2>
            <p>Monday to Friday, 9am – 7pm. Weekends by appointment.</p>
            <p className="form-note">
              Address, phone and hours are placeholders — replace them in
              <code> src/lib/data.ts</code>.
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
