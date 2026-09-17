import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/PageHead';
import { posts } from '@/lib/data';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post ? post.title : 'Journal' };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHead crumb="Journal" title={post.title} intro={`${post.date} · ${post.read} read`} />
      <section className="section band-paper">
        <div className="shell">
          <div className="notice" style={{ maxWidth: '68ch' }}>
            <h2>This article has not been written yet</h2>
            <p>
              Article layout, typography and metadata are ready. Drop the copy
              in — or connect a CMS — and it renders here.
            </p>
          </div>
          <div className="section-foot">
            <Link href="/journal" className="tlink tlink--on">Back to the journal</Link>
          </div>
        </div>
      </section>
    </>
  );
}
