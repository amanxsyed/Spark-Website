'use client';

import { useState } from 'react';
import { quotes } from '@/lib/data';

export function Proof() {
  const [i, setI] = useState(0);
  const q = quotes[i];

  return (
    <div className="proof">
      <figure>
        <blockquote className="quote display">{q.text}</blockquote>
        <figcaption className="quote-who">
          <b>{q.who}</b> — {q.detail}
        </figcaption>
      </figure>
      <div className="dots" role="tablist" aria-label="More from clients">
        {quotes.map((item, index) => (
          <button
            key={item.who}
            type="button"
            role="tab"
            className="dot"
            aria-current={index === i}
            aria-label={`Read what ${item.who} said`}
            onClick={() => setI(index)}
          />
        ))}
      </div>
    </div>
  );
}
