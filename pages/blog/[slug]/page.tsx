import { notFound } from 'next/navigation';
import { getPost } from '@/lib/markdown';

export default async function PostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full mb-4" />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        className="prose"
      />
    </article>
  );
}
