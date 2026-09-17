import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';
import { RegisterForm } from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Join the platinum list',
  description:
    'Register for platinum allocation at GTA pre-construction launches.',
};

export default function RegisterPage() {
  return (
    <>
      <PageHead
        crumb="Register"
        title="Join the platinum list"
        intro="Allocation at most launches is settled before the public sees a floorplan. Register once and stay on the list."
      />
      <section className="section band-paper">
        <div className="shell grid-2">
          <div className="prose">
            <h2>What you get</h2>
            <ul>
              <li>Launch dates and allocation windows as they are confirmed.</li>
              <li>Floorplans and price lists at platinum release, not after.</li>
              <li>A worksheet review with an advisor before anything is signed.</li>
              <li>No fee to buyers on pre-construction purchases.</li>
            </ul>
          </div>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
