// pages/index.tsx
import type { GetStaticProps } from 'next';
import { PostMeta, getAllPosts } from '@/lib/server/markdown'; // <-- named import
import Link from 'next/link';
import React from 'react';

interface Props {
  posts: PostMeta[];
}

export default function Home({ posts }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.slug} className="mb-4">
            <Link href={`/blog/${p.slug}`} className="text-blue-600 hover:underline">
+              {p.title}
+           </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts();   // <-- works now
  return { props: { posts } };
};
