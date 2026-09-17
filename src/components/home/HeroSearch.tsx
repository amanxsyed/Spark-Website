'use client';

import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { Icon } from './Icon';

const modes = [
  { id: 'pre', label: 'Pre-construction', path: '/new-construction', placeholder: 'City, project or builder' },
  { id: 'buy', label: 'Buy', path: '/resale', placeholder: 'City, neighbourhood or address' },
  { id: 'rent', label: 'Rent', path: '/resale?lease=1', placeholder: 'Where do you want to live?' },
  { id: 'sold', label: 'Sold', path: '/resale?sold=1', placeholder: 'Street or neighbourhood' },
];

const kinds = ['Any type', 'Condo', 'Townhouse', 'Semi-detached', 'Detached'];
const budgets = [
  { label: 'Any price', value: '' },
  { label: 'Under $500K', value: '500000' },
  { label: 'Under $750K', value: '750000' },
  { label: 'Under $1M', value: '1000000' },
  { label: 'Under $1.5M', value: '1500000' },
  { label: 'Under $2M', value: '2000000' },
];

export function HeroSearch() {
  const router = useRouter();
  const uid = useId();
  const [mode, setMode] = useState(0);
  const [term, setTerm] = useState('');
  const [kind, setKind] = useState(kinds[0]);
  const [max, setMax] = useState('');
  const m = modes[mode];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const [path, existing] = m.path.split('?');
    const qs = new URLSearchParams(existing);
    if (term.trim()) qs.set('q', term.trim());
    if (kind !== kinds[0]) qs.set('type', kind.toLowerCase());
    if (max) qs.set('max', max);
    const s = qs.toString();
    router.push(s ? `${path}?${s}` : path);
  };

  return (
    <form className="hx-search" role="search" onSubmit={submit} aria-label="Search properties">
      <div className="hx-search-modes" role="tablist" aria-label="Search type">
        {modes.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === mode}
            className="hx-search-mode"
            onClick={() => setMode(i)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="hx-search-fields">
        <label className="hx-field hx-field--grow" htmlFor={`${uid}-q`}>
          <span className="hx-field-label">Location</span>
          <span className="hx-field-control">
            <Icon name="pin" size={17} />
            <input
              id={`${uid}-q`}
              type="search"
              value={term}
              placeholder={m.placeholder}
              onChange={(e) => setTerm(e.target.value)}
              autoComplete="off"
            />
          </span>
        </label>

        <label className="hx-field" htmlFor={`${uid}-k`}>
          <span className="hx-field-label">Property type</span>
          <select id={`${uid}-k`} value={kind} onChange={(e) => setKind(e.target.value)}>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>

        <label className="hx-field" htmlFor={`${uid}-p`}>
          <span className="hx-field-label">Budget</span>
          <select id={`${uid}-p`} value={max} onChange={(e) => setMax(e.target.value)}>
            {budgets.map((b) => (
              <option key={b.label} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="hx-search-go">
          <Icon name="search" size={18} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
