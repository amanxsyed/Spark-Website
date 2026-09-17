import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { posts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Notes on buying, selling and investing in GTA real estate.',
};

export default function JournalPage() {
  return (
    <>
      <PageHead
        crumb="Journal"
        title="Notes worth reading before you sign"
        image="/media/place-5.jpg"
      />
      <section className="section band-paper">
        <div className="shell">
          <ul className="posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/journal/${post.slug}`}>
                  <span className="meta">{post.date} — {post.category}</span>
                  <span className="post-title">{post.title}</span>
                  <span className="post-read">{post.read}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
