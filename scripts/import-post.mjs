#!/usr/bin/env node
/**
 * Import a markdown file as a blog post.
 *
 * Usage:
 *   node scripts/import-post.mjs <file.md> [--slug my-post] [--date 2026-09-18]
 *                                 [--title "My post"] [--tags "Animation,Unreal"]
 *                                 [--force]
 *
 * What it does:
 *   - Reads YAML frontmatter (title, date, excerpt, tags) when present.
 *   - Fills missing fields from the first H1, today's date and the first paragraph.
 *   - Copies local images next to the .md into public/blog/<slug>/ and rewrites
 *     their paths so they resolve on the site (and under the GitHub Pages basePath).
 *   - Writes the normalized post to content/blog/<slug>.md.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";

const root = process.cwd();
const blogDir = path.join(root, "content", "blog");
const publicBlogDir = path.join(root, "public", "blog");

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function normalizeDate(value) {
  if (!value) return todayIso();
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value).trim();
  const match = text.match(/^\d{4}-\d{2}-\d{2}/);
  if (!match) fail(`Invalid --date "${text}". Use YYYY-MM-DD.`);
  return match[0];
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(body) {
  const blocks = body.split(/\n{2,}/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (/^#{1,6}\s/.test(trimmed)) continue;
    if (/^([-*+]|\d+\.)\s/.test(trimmed)) continue;
    if (trimmed.startsWith("```") || trimmed.startsWith("<")) continue;
    return stripMarkdown(trimmed);
  }
  return "";
}

function parseArgs(argv) {
  const opts = { positional: [], force: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--force") opts.force = true;
    else if (arg === "--slug") opts.slug = argv[++i];
    else if (arg === "--title") opts.title = argv[++i];
    else if (arg === "--date") opts.date = argv[++i];
    else if (arg === "--tags") opts.tags = argv[++i];
    else if (arg === "--help" || arg === "-h") {
      console.log(
        "Usage: node scripts/import-post.mjs <file.md> [--slug slug] [--title text] [--date YYYY-MM-DD] [--tags \"a,b\"] [--force]"
      );
      process.exit(0);
    } else if (arg.startsWith("--")) fail(`Unknown option ${arg}.`);
    else opts.positional.push(arg);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const input = opts.positional[0];
if (!input) fail("Pass the path to a .md file. See --help.");

const inputPath = path.resolve(process.cwd(), input);
if (!fs.existsSync(inputPath)) fail(`File not found: ${inputPath}`);
if (!/\.(md|markdown)$/i.test(inputPath)) fail("Input must be a .md or .markdown file.");

const raw = fs.readFileSync(inputPath, "utf8");
let parsed;
try {
  parsed = matter(raw);
} catch (error) {
  fail(`Could not parse frontmatter: ${error.message}`);
}

let body = parsed.content.trim();
const data = parsed.data ?? {};

const h1 = body.match(/^\s*#\s+(.+?)\s*$/m);
if (h1 && h1.index !== undefined && body.slice(0, h1.index).trim() === "") {
  body = body.replace(h1[0], "").trim();
}

const title = opts.title || data.title || (h1 ? h1[1].trim() : path.basename(inputPath, path.extname(inputPath)));
if (!title) fail("Could not determine a title. Pass --title.");

const slug = slugify(opts.slug || data.slug || title);
if (!slug) fail("Could not determine a slug. Pass --slug.");

const date = normalizeDate(opts.date || data.date);
const tags = (opts.tags ? opts.tags.split(",") : Array.isArray(data.tags) ? data.tags : data.tags ? String(data.tags).split(",") : [])
  .map((tag) => String(tag).trim())
  .filter(Boolean);

const excerpt = String(data.excerpt || firstParagraph(body) || "").slice(0, 220).trim();

const targetPath = path.join(blogDir, `${slug}.md`);
if (fs.existsSync(targetPath) && !opts.force) {
  fail(`content/blog/${slug}.md already exists. Re-run with --force to overwrite.`);
}

const srcDir = path.dirname(inputPath);
const destDir = path.join(publicBlogDir, slug);
const copied = [];
const warnings = [];

function copyImage(src) {
  if (/^(https?:)?\/\//i.test(src) || /^data:/i.test(src)) return src;
  if (src.startsWith("/blog/")) return src;

  const clean = src.split("#")[0].split("?")[0];
  const absolute = path.isAbsolute(clean) ? clean : path.resolve(srcDir, clean);

  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    warnings.push(`missing image: ${src}`);
    return src;
  }

  const ext = path.extname(clean) || ".png";
  const base = path.basename(clean, ext);
  fs.mkdirSync(destDir, { recursive: true });

  let name = `${base}${ext}`;
  let dest = path.join(destDir, name);
  if (fs.existsSync(dest)) {
    const existing = crypto.createHash("md5").update(fs.readFileSync(dest)).digest("hex");
    const incoming = crypto.createHash("md5").update(fs.readFileSync(absolute)).digest("hex");
    if (existing !== incoming) {
      name = `${base}-${crypto.createHash("md5").update(absolute).digest("hex").slice(0, 6)}${ext}`;
      dest = path.join(destDir, name);
    }
  }

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(absolute, dest);
    copied.push(`public/blog/${slug}/${name}`);
  }
  return `/blog/${slug}/${name}`;
}

body = body.replace(/(!\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g, (_match, pre, src, post) => {
  return `${pre}${copyImage(src)}${post}`;
});

body = body.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi, (_match, pre, src, post) => {
  return `${pre}${copyImage(src)}${post}`;
});

const output = matter.stringify(`${body.trim()}\n`, {
  title,
  date,
  excerpt,
  tags,
});

fs.mkdirSync(blogDir, { recursive: true });
fs.writeFileSync(targetPath, output, "utf8");

console.log(`\n✔ Imported "${title}"`);
console.log(`  post:   content/blog/${slug}.md`);
console.log(`  url:    /blog/${slug}/`);
if (copied.length) {
  console.log(`  images: ${copied.length} copied to public/blog/${slug}/`);
  for (const file of copied) console.log(`    - ${file}`);
}
for (const warning of warnings) console.log(`  ! ${warning}`);
console.log("");
