import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  crumb: string;
  title: string;
  intro?: string;
  image?: string;
  children?: ReactNode;
};

export function PageHead({ crumb, title, intro, image = '/media/skyline-wide.jpg', children }: Props) {
  return (
    <section
      className="page-head"
      style={{ ['--head-image' as string]: `url(${image})` }}
    >
      <div className="shell">
        <p className="crumbs">
          <Link href="/">Home</Link>
          <i aria-hidden="true" />
          <span>{crumb}</span>
        </p>
        <h1 className="display d-1">{title}</h1>
        {intro ? <p>{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
