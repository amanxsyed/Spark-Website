import Link from 'next/link';
import { posts } from '@/lib/data';
import { SectionHead } from './SectionHead';

export function JournalPreview() {
  return (
    <section className="hx-section" aria-labelledby="hx-journal">
      <div className="shell">
        <SectionHead
          id="hx-journal"
          title="Read before you sign"
          lede="Deposits, assignments and occupancy fees, explained plainly."
          action={{ label: 'All articles', href: '/journal' }}
        />
        <ul className="hx-posts">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/journal/${post.slug}`}>
                <span className="hx-post-cat">{post.category}</span>
                <span className="hx-post-title">{post.title}</span>
                <span className="hx-post-meta">
                  {post.date}, {post.read} read
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
