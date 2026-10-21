---
name: Blog Formatter
description: Use when the user gives you a .md file or a draft to publish on the portfolio blog, or asks to write, format, import, rename, or fix a blog post. Handles frontmatter, images, and the import script.
---

# Blog formatter

Turn a markdown draft into a post this site can render. Posts are plain `.md`
files in `content/blog/`, read at build time by `src/lib/posts.ts`.

## Workflow

1. Read the source `.md` the user provided. Note any images it references and
   where those images live relative to the file.
2. Make sure the frontmatter is correct (see schema below). You may fill in a
   missing title, date, excerpt, and tags, but never invent facts, metrics, or
   quotes that are not in the draft.
3. Import it:

   ```sh
   node scripts/import-post.mjs <path-to.md> --slug <kebab-slug>
   ```

   Add `--title`, `--date`, `--tags "a,b"` only when the file has no
   frontmatter. Use `--force` only when the user explicitly wants to overwrite
   an existing post.

   The script:
   - normalizes frontmatter and writes `content/blog/<slug>.md`
   - copies local images into `public/blog/<slug>/`
   - rewrites image paths to `/blog/<slug>/<file>`
   - leaves `https://` images alone

4. Verify locally (dev server runs on port 3000):

   ```sh
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/blog/<slug>/
   ```

   Open the rendered page if possible. Confirm images resolve and no headings
   are duplicated.
5. Report the slug, the file path, and any warnings the script printed
   (usually missing images).

## Frontmatter schema

```yaml
---
title: Sentence case title
date: 2026-10-22
excerpt: One or two sentences, max 220 characters.
tags:
  - Animation
  - Unreal Engine
---
```

- `title` — required. Rendered with `font-display`; no markdown in it.
- `date` — required, `YYYY-MM-DD`. Shows on the index and post page.
- `excerpt` — required. Used on the blog index card.
- `tags` — 1–3 short Title Case labels. Optional but preferred.

Do not add reading time, author, or cover-image fields. The design does not use
them.

## Writing style

- First person, plain and concrete. Short paragraphs.
- No hype ("revolutionary", "game-changing") and no filler intros.
- Start with the point, then the detail.
- Use `##` for sections. Never use `#` — the page renders the title as its H1.
- Prefer short lists for steps or takeaways.
- Use fenced code blocks with a language tag.
- Blockquotes are for a single takeaway, not for long passages.
- British or American spelling is fine; stay consistent within a post.

## Images

Images can be:

- local files sitting next to the `.md` (recommended), referenced as
  `![alt text](./diagram.png)` or `![alt text](diagram.png)`
- absolute URLs such as `https://...`

Always write meaningful alt text. The importer copies local files and rewrites
paths; the renderer adds the GitHub Pages base path automatically. Do not edit
the rewritten `/blog/<slug>/...` paths by hand.

If an image is missing, the script prints `! missing image: ...`. Fix the path
or ask the user for the file; never leave a broken reference.

## Video

Never commit video files and never paste iframe HTML. Put a YouTube URL on its
own line and the site turns it into a 16:9 embed automatically:

```md
https://www.youtube.com/watch?v=VIDEO_ID
```

To give the embed an accessible title, use a link with real text:

```md
[What the video shows](https://youtu.be/VIDEO_ID)
```

Supported URL forms: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`,
`youtube.com/live/`. A URL inside a sentence stays a normal link; only a URL on
its own line becomes an embed. Do not use Markdown image syntax for video.

## Files

- `references/post-template.md` — starter file to copy when the user has no draft.
- `src/lib/posts.ts` — frontmatter parsing and markdown rendering.
- `scripts/import-post.mjs` — the importer.
