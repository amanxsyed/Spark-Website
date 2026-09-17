import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/PageHead';
import { RegisterForm } from '@/components/RegisterForm';
import { projects } from '@/lib/data';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.name}, ${project.city}` : 'Project',
    description: project
      ? `${project.name} by ${project.developer} in ${project.city}. ${project.priceFrom}, ${project.occupancy}.`
      : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <PageHead
        crumb={project.name}
        title={project.name}
        intro={`${project.developer} · ${project.city}`}
        image={project.image}
      />

      <section className="section band-paper">
        <div className="shell grid-2">
          <Image
            src={project.image}
            alt={`${project.name}, ${project.city}`}
            width={1000}
            height={1300}
            sizes="(max-width: 900px) 92vw, 44vw"
            style={{ width: '100%', height: 'auto', borderRadius: '2px' }}
          />
          <div>
            <dl className="stat-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div><dt style={{ fontSize: '1.4rem' }}>{project.priceFrom}</dt><dd>Starting price</dd></div>
              <div><dt style={{ fontSize: '1.4rem' }}>{project.beds}</dt><dd>Suite range</dd></div>
              <div><dt style={{ fontSize: '1.4rem' }}>{project.occupancy}</dt><dd>Estimated occupancy</dd></div>
              <div><dt style={{ fontSize: '1.4rem' }}>{project.status}</dt><dd>Current stage</dd></div>
            </dl>

            <div className="notice" style={{ marginTop: '2.5rem' }}>
              <h2>Full project page is next</h2>
              <p>
                Floorplans, deposit structure, incentives and the gallery come
                from the RedBricks feed. This page is the layout they will fill.
              </p>
            </div>

            <div className="section-foot">
              <Link href="/new-construction" className="tlink tlink--on">Back to all launches</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="shell grid-2">
          <div>
            <h2 className="display d-2">Ask for allocation at {project.name}</h2>
            <p className="lede on-dark" style={{ marginTop: '1.2rem', color: '#c3ccd9' }}>
              Tell us the exposure, floor range and layout you want. We submit
              that against the platinum allocation.
            </p>
          </div>
          <div className="on-dark"><RegisterForm /></div>
        </div>
      </section>
    </>
  );
}
