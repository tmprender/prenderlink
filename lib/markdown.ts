// lib/markdown.ts
import matter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';

export interface PostMeta {
  title: string;
  date: string;          // e.g. "2025-07-01"
  slug: string;
  description: string;
  image?: string;
  bodyHtml?: string;     // rendered markdown
}

/**
 * Read a single markdown file and return the front‑matter + rendered html
 */
export async function getPost(slug: string): Promise<PostMeta | null> {
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  try {
    const file = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(file);

    const processed = await remark().use(html).process(content);

    return {
      ...(data as PostMeta),
      bodyHtml: processed.toString(),
    };
  } catch (e) {
    // file not found or parse error – return null
    return null;
  }
}

/**
 * Read every .md file under `content/posts` and return an array of
 * PostMeta objects (no rendered html – only meta)
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const files = await fs.readdir(postsDir);

  return Promise.all(
    files
      .filter(name => name.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const post = await getPost(slug);
        if (!post) throw new Error(`Failed to read ${slug}.md`);
        return post;
      })
  );
}