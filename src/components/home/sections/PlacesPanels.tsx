import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { places } from '@/lib/data';

/** "Where the GTA is moving" — original expanding panels, styles in home.css. */
export function PlacesPanels() {
  return (
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
                Five submarkets our advisors work in every week, with what a typical home costs and
                what is being built there.
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
  );
}
