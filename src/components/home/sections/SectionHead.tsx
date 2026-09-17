import Link from 'next/link';
import { Icon } from '../Icon';

type Props = {
  id: string;
  title: string;
  lede?: string;
  action?: { label: string; href: string };
};

/** Shared heading row for every new-style homepage section. */
export function SectionHead({ id, title, lede, action }: Props) {
  return (
    <header className="hx-head">
      <div>
        <h2 id={id} className="hx-h2">
          {title}
        </h2>
        {lede && <p className="hx-lede">{lede}</p>}
      </div>
      {action && (
        <Link href={action.href} className="hx-btn hx-btn--line">
          {action.label} <Icon name="arrow" size={16} />
        </Link>
      )}
    </header>
  );
}
