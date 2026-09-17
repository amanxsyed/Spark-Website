'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tabs = [
  {
    id: 'pre',
    label: 'Pre-construction',
    placeholder: 'City, community or builder',
    path: '/new-construction',
  },
  {
    id: 'resale',
    label: 'Resale',
    placeholder: 'Neighbourhood, address or MLS® number',
    path: '/resale',
  },
  {
    id: 'lease',
    label: 'Lease',
    placeholder: 'Where do you want to live?',
    path: '/resale',
  },
];

export function Finder() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [term, setTerm] = useState('');
  const tab = tabs[active];

  const search = () => {
    const q = term.trim();
    router.push(q ? `${tab.path}?q=${encodeURIComponent(q)}` : tab.path);
  };

  return (
    <div className="finder">
      <div className="finder-tabs" role="tablist" aria-label="What are you looking for?">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className="finder-tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="finder-row">
        <label className="sr-only" htmlFor="finder-input">
          {tab.placeholder}
        </label>
        <input
          id="finder-input"
          type="search"
          value={term}
          placeholder={tab.placeholder}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search();
          }}
        />
        <button type="button" className="btn btn--spark" onClick={search}>
          Search
        </button>
      </div>
    </div>
  );
}
