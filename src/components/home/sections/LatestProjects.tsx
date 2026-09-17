import { projects } from '@/lib/data';
import { ProjectCard } from '../ProjectCard';
import { Rail } from '../Rail';
import { SectionHead } from './SectionHead';

export function LatestProjects() {
  const latest = [...projects].reverse();

  return (
    <section className="hx-section hx-section--snow" aria-labelledby="hx-latest">
      <div className="shell">
        <SectionHead
          id="hx-latest"
          title="Latest pre-construction"
          lede="New releases and projects launching soon across the GTA."
          action={{ label: 'See new launches', href: '/new-construction?sort=newest' }}
        />
        <Rail label="Latest pre-construction projects">
          {latest.map((p) => (
            <div role="listitem" className="hx-rail-item" key={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </Rail>
      </div>
    </section>
  );
}
