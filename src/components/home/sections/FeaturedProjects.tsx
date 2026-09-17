import { projects } from '@/lib/data';
import { projectMeta } from '@/lib/home';
import { ProjectCard } from '../ProjectCard';
import { SectionHead } from './SectionHead';

export function FeaturedProjects() {
  const featured = projects.filter((p) => projectMeta[p.slug]?.featured);
  const [lead, ...rest] = featured;

  return (
    <section className="hx-section" aria-labelledby="hx-featured">
      <div className="shell">
        <SectionHead
          id="hx-featured"
          title="Featured projects"
          lede="Hand-picked launches where our clients get first access."
          action={{ label: 'View all projects', href: '/new-construction' }}
        />
        <div className="hx-feature">
          {lead && (
            <ProjectCard project={lead} variant="hero" priority sizes="(max-width: 900px) 92vw, 640px" />
          )}
          <div className="hx-feature-grid">
            {rest.slice(0, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} sizes="(max-width: 900px) 46vw, 300px" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
