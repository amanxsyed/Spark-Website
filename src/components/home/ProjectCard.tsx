import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import { projectMeta } from '@/lib/home';
import { Icon } from './Icon';

type Props = {
  project: Project;
  variant?: 'standard' | 'hero';
  priority?: boolean;
  sizes?: string;
};

export function ProjectCard({ project: p, variant = 'standard', priority, sizes }: Props) {
  const kind = projectMeta[p.slug]?.kind ?? 'Condo';
  const place = p.city.split(',')[0];

  return (
    <article className={`hx-card hx-card--${variant}`}>
      <Link href={`/new-construction/${p.slug}`} className="hx-card-link">
        <div className="hx-card-media">
          <Image
            src={p.image}
            alt={`${p.name} in ${p.city}`}
            fill
            priority={priority}
            sizes={sizes ?? '(max-width: 700px) 82vw, (max-width: 1100px) 44vw, 320px'}
          />
          <span className="hx-flag" data-tone={p.tone}>
            {p.status}
          </span>
        </div>
        <div className="hx-card-body">
          <p className="hx-card-price">{p.priceFrom}</p>
          <h3 className="hx-card-title">{p.name}</h3>
          <p className="hx-card-dev">by {p.developer}</p>
          <ul className="hx-card-facts">
            <li>
              <Icon name="building" size={15} />
              {kind}
            </li>
            <li>
              <Icon name="pin" size={15} />
              {place}
            </li>
            <li>
              <Icon name="calendar" size={15} />
              {p.occupancy.replace('Occupancy ', '')}
            </li>
          </ul>
        </div>
      </Link>
    </article>
  );
}
