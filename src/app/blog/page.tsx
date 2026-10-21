import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Parth Sarthi",
  description:
    "Short notes on animation systems, Unreal Engine tools, and the unglamorous parts of shipping games.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs tracking-widest opacity-60">WRITINGS</span>
        <h1 className="font-display text-5xl lg:text-7xl mt-3 leading-[0.95]">
          Notes from the{" "}
          <span className="font-serif italic normal-case text-sakura">engine room.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
          Short posts about animation systems, Unreal tools, and the unglamorous
          parts of shipping games.
        </p>

        <div className="mt-14 space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block p-6 sm:p-8 bg-card rounded-3xl border border-foreground/5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest uppercase opacity-60">
                <span>{post.dateLabel}</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl mt-2 group-hover:text-sakura transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-foreground/75 leading-relaxed">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-background border border-foreground/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
