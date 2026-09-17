import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '@/components/Counter';
import { Finder } from '@/components/Finder';
import { ProjectRail } from '@/components/ProjectRail';
import { Proof } from '@/components/Proof';
import { RegisterForm } from '@/components/RegisterForm';
import { Reveal } from '@/components/Reveal';
import {
  advisors,
  brokerage,
  cities,
  places,
  posts,
  projects,
  steps,
  tickerItems,
} from '@/lib/data';

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/media/hero-skyline.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={82}
          />
        </div>
        <div className="hero-scrim" />

        <div className="shell hero-inner">
          <p className="hero-kicker">
            <i aria-hidden="true" />
            A Greater Toronto Area brokerage
          </p>

          <h1 className="display d-hero">
            <span className="line">
              <span style={{ ['--i' as string]: 0 }}>
                Buy the
                <span className="chip">
                  <Image
                    src="/media/chip.jpg"
                    alt=""
                    width={480}
                    height={300}
                    sizes="180px"
                    priority
                  />
                </span>
                address
              </span>
            </span>
            <span className="line">
              <span style={{ ['--i' as string]: 1 }}>before it exists.</span>
            </span>
          </h1>

          <p className="hero-sub">
            Spark Realty holds platinum allocation at pre-construction launches
            across the GTA — and runs a full resale desk for everything already
            standing.
          </p>

          <Finder />

          <dl className="hero-stats">
            <div>
              <dt>54,056</dt>
              <dd>Active listings in the feed, refreshed every 15 minutes</dd>
            </div>
            <div>
              <dt>1,340</dt>
              <dd>Pre-construction communities tracked across Ontario</dd>
            </div>
            <div>
              <dt>10 days</dt>
              <dd>Cooling-off period we expect every buyer to use in full</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------------- ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: 'flex' }}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={`${copy}-${item.label}`}>
                  <i />
                  <b>{item.value}</b>
                  {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">
        54,056 active listings across the Greater Toronto Area, refreshed every
        fifteen minutes.
      </p>

      {/* ------------------------------------------------------ launches */}
      <section className="section band-paper">
        <div className="shell">
          <Reveal>
            <div className="masthead">
              <div>
                <h2 className="display d-1">
                  Launches we hold allocation at right now
                </h2>
                <div className="rail" style={{ marginTop: '1.5rem' }}>
                  <span>
                    <b>6</b> of 41 communities
                  </span>
                  <span>
                    Updated <b>9 September 2026</b>
                  </span>
                  <span>Platinum releases open first</span>
                </div>
              </div>
              <div className="masthead-side">
                <p className="lede">
                  Allocation is the whole game in pre-construction. These are
                  the projects where our buyers get floorplans and price lists
                  before the public opening, not after.
                </p>
                <Link href="/new-construction" className="tlink tlink--on">
                  See all 41 launches
                </Link>
              </div>
            </div>
          </Reveal>

          <ProjectRail items={projects} caption="Drag, scroll or use the arrows" />
        </div>
      </section>

      {/* ------------------------------------------------------ platinum */}
      <section className="section band-mist">
        <div className="shell">
          <Reveal>
            <div className="masthead">
              <div>
                <h2 className="display d-1">How allocation actually works</h2>
              </div>
              <div className="masthead-side">
                <p className="lede">
                  Most buyers meet a project on the day it opens to the public.
                  By then the good stacks are gone. This is the order things
                  really happen in.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="split">
            <Reveal mode="clip">
              <figure className="split-media">
                <Image
                  src="/media/interior-dark.jpg"
                  alt="Placeholder image of a sales gallery interior"
                  width={1500}
                  height={1100}
                  sizes="(max-width: 980px) 92vw, 420px"
                />
                <figcaption>
                  Presentation gallery, Vantage Yards — placeholder image
                </figcaption>
              </figure>
            </Reveal>

            <ol className="steps">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <span className="step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="step-b">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="section-foot">
            <Link href="/register" className="btn btn--ink">
              Join the platinum list
            </Link>
            <Link href="/new-construction" className="tlink tlink--on">
              Browse launches by city
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- places */}
      <section className="section band-paper">
        <div className="shell">
          <Reveal>
            <div className="masthead">
              <div>
                <h2 className="display d-1">Where the GTA is moving</h2>
                <div className="rail" style={{ marginTop: '1.5rem' }}>
                  <span>Benchmark prices, August 2026</span>
                  <span>
                    <b>Placeholder figures</b> until the live feed is connected
                  </span>
                </div>
              </div>
              <div className="masthead-side">
                <p className="lede">
                  Five submarkets our advisors work in every week, with what a
                  typical home costs and what is being built there.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="panels">
            {places.map((place) => (
              <Link
                className="panel"
                key={place.name}
                href={`/resale?area=${encodeURIComponent(place.name.toLowerCase())}`}
              >
                <Image
                  src={place.image}
                  alt={`${place.name}, ${place.region}`}
                  width={900}
                  height={1250}
                  sizes="(max-width: 900px) 92vw, 30vw"
                />
                <div className="panel-body">
                  <h3>{place.name}</h3>
                  <div className="panel-detail">
                    <span>{place.benchmark}</span>
                    <span>{place.note}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- inventory */}
      <section className="section dark">
        <div className="shell">
          <div className="inventory">
            <div>
              <p className="counter">
                <Counter to={54056} />
              </p>
              <p
                className="lede on-dark"
                style={{ marginTop: '1.5rem', color: '#c3ccd9' }}
              >
                Every active resale listing in the Greater Toronto Area, in one
                search, updated through the day. No sign-up wall on the map, no
                lead form before you can see a price.
              </p>
              <div className="section-foot">
                <Link href="/resale" className="btn btn--spark">
                  Search resale listings
                </Link>
                <Link href="/sell" className="btn btn--ghost">
                  Get a valuation
                </Link>
              </div>
              <p className="meta" style={{ marginTop: '2rem', color: '#8e9aab' }}>
                Sold and historical data is available to signed-in clients under
                VOW terms.
              </p>
            </div>

            <ul className="city-list">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link
                    href={`/resale?city=${encodeURIComponent(city.name.toLowerCase())}`}
                  >
                    {city.name}
                  </Link>
                  <span>{city.count} listings</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ advisors */}
      <section className="section band-paper">
        <div className="shell">
          <Reveal>
            <div className="masthead">
              <div>
                <h2 className="display d-1">
                  The people you will actually deal with
                </h2>
              </div>
              <div className="masthead-side">
                <p className="lede">
                  No call centre and no lead pool. You get one advisor who
                  knows the buildings on your shortlist and stays with the file
                  through closing.
                </p>
                <Link href="/advisors" className="tlink tlink--on">
                  Meet the full team
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="advisors">
            {advisors.map((person) => (
              <article className="advisor" key={person.name}>
                <div className="advisor-mono" aria-hidden="true">
                  {person.initials}
                </div>
                <h3>{person.name}</h3>
                <p>{person.title}</p>
                <dl>
                  <div>
                    <dt>Works in</dt>
                    <dd>{person.area}</dd>
                  </div>
                  <div>
                    <dt>Speaks</dt>
                    <dd>{person.languages}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- proof */}
      <section className="section section--tight band-mist">
        <div className="shell">
          <Proof />
        </div>
      </section>

      {/* ------------------------------------------------------- journal */}
      <section className="section band-paper">
        <div className="shell">
          <Reveal>
            <div className="masthead">
              <div>
                <h2 className="display d-1">Worth reading before you sign</h2>
              </div>
              <div className="masthead-side">
                <p className="lede">
                  Plain explanations of the parts of a deal that cost people
                  money: deposit structures, assignment clauses, occupancy fees.
                </p>
                <Link href="/journal" className="tlink tlink--on">
                  All articles
                </Link>
              </div>
            </div>
          </Reveal>

          <ul className="posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/journal/${post.slug}`}>
                  <span className="meta">
                    {post.date} — {post.category}
                  </span>
                  <span className="post-title">{post.title}</span>
                  <span className="post-read">{post.read}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- closer */}
      <section className="section dark" id="register">
        <div className="shell">
          <div className="closer">
            <div>
              <h2 className="display d-1">
                Get the launch list before the launch
              </h2>
              <p className="lede on-dark" style={{ marginTop: '1.4rem', color: '#c3ccd9' }}>
                Tell us what you are looking for once. We will bring you the
                projects that fit, with the allocation window and the price
                list, while there is still something worth buying.
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
    </>
  );
}
