// lib/server/markdown.ts
import matter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  description: string;
  image?: string;
  bodyHtml?: string;
}

export async function getPost(slug: string): Promise<PostMeta | null> {
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  console.log('[markdown] Trying to read:', filePath);   // <-- DEBUG

  try {
    const file = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(file);
    const processed = await remark().use(html).process(content);

    return { ...(data as PostMeta), bodyHtml: processed.toString() };
  } catch (err) {
    console.error('[markdown] Read error for', filePath, err);  // <-- DEBUG
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const files = await fs.readdir(postsDir);

  return Promise.all(
    files
      .filter(name => name.endsWith('.md'))
      .map(async name => {
        const slug = name.replace(/\.md$/, '');
        const post = await getPost(slug);
        if (!post) throw new Error(`Cannot load ${slug}.md`);
        return post;
      })
  );
}