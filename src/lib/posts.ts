import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  tags: string[];
  html: string;
};

function formatDate(value: unknown): string {
  const raw = value instanceof Date ? value.toISOString() : String(value ?? "");
  const day = raw.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (!day) return "";
  const date = new Date(`${day}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function toTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function excerptFrom(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

function youtubeId(url: string): string | null {
  const decoded = url.replace(/&amp;/g, "&");
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/,
    /youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function youtubeEmbed(id: string, title: string): string {
  const safeTitle = title.replace(/"/g, "&quot;");
  return (
    `<iframe src="https://www.youtube-nocookie.com/embed/${id}"` +
    ` title="${safeTitle}"` +
    ` loading="lazy"` +
    ` allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"` +
    ` referrerpolicy="strict-origin-when-cross-origin"` +
    ` allowfullscreen></iframe>`
  );
}

function embedYouTubeLinks(html: string): string {
  return html.replace(
    /<p>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/p>/gi,
    (match, href: string, text: string) => {
      const id = youtubeId(href);
      if (!id) return match;

      const label = text.replace(/<[^>]+>/g, "").trim();
      const title = !label || /^https?:\/\//i.test(label) ? "YouTube video" : label;
      return youtubeEmbed(id, title);
    }
  );
}

function render(body: string): string {
  const html = marked.parse(body) as string;
  const withBasePath = basePath
    ? html.replace(/(\s(?:src|href)=")\/(blog\/[^"]*)/g, `$1${basePath}/$2`)
    : html;

  return embedYouTubeLinks(withBasePath).replace(
    /<img (?![^>]*\bloading=)/g,
    '<img loading="lazy" '
  );
}

function readPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.md$/i.test(file))
    .map((file) => {
      const slug = file.replace(/\.md$/i, "");
      const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(source);
      const html = render(content);

      return {
        slug,
        title: String(data.title || slug),
        date: String(data.date ?? ""),
        dateLabel: formatDate(data.date),
        excerpt: String(data.excerpt || excerptFrom(html)),
        tags: toTags(data.tags),
        html,
      } satisfies Post;
    });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (process.env.NODE_ENV !== "production") return readPosts();
  if (!cache) cache = readPosts();
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
