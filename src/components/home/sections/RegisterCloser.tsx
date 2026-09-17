import { RegisterForm } from '@/components/RegisterForm';
import { brokerage } from '@/lib/data';

export function RegisterCloser() {
  return (
    <section className="section dark hx-closer" id="register" aria-labelledby="hx-closer">
      <div className="shell">
        <div className="closer">
          <div>
            <h2 id="hx-closer" className="hx-h2">
              Get the launch list before the launch
            </h2>
            <p className="hx-lede">
              Tell us once what you are looking for. We will send the projects that fit, with price
              lists, while the best units are still available.
            </p>
            <div className="rail on-dark" style={{ marginTop: '2rem' }}>
              <span>
                <b>41</b> launches this season
              </span>
              <span>
                <b>No fee</b> to buyers on pre-construction
              </span>
              <span>
                Prefer to talk?{' '}
                <a href={brokerage.phoneHref} className="tlink">
                  {brokerage.phone}
                </a>
              </span>
            </div>
          </div>
          <div className="on-dark">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
