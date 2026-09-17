'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { LinkGroup } from '@/lib/home';

/**
 * Every panel is rendered into the HTML (inactive ones use `hidden`), so all
 * links stay crawlable for search engines; the tabs only switch visibility.
 */
export function ExploreTabs({ tabs }: { tabs: { id: string; label: string; groups: LinkGroup[] }[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="hx-explore">
      <div className="hx-explore-tabs" role="tablist" aria-label="Browse by">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`hx-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`hx-panel-${t.id}`}
            className="hx-explore-tab"
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          id={`hx-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`hx-tab-${t.id}`}
          hidden={active !== t.id}
          className="hx-explore-panel"
        >
          {t.groups.map((g) => (
            <nav key={g.title} className="hx-explore-group" aria-label={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      ))}
    </div>
  );
}
