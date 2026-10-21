import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Parth Sarthi`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog/"
          className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:text-sakura transition-colors"
        >
          ← All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest uppercase opacity-60">
          <span>{post.dateLabel}</span>
        </div>

        <h1 className="font-display text-4xl lg:text-6xl mt-3 leading-[0.95]">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-card border border-foreground/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="blog-prose mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-14 pt-8 border-t border-foreground/10">
          <Link
            href="/blog/"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:text-sakura transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
