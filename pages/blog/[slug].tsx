// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getPost, getAllPosts, PostMeta } from '@/lib/server/markdown';
import Head from 'next/head';

export default function PostPage({ post }: { post: PostMeta }) {
  const router = useRouter();

  // If we set fallback: true we can show a loading state,
  // but we’ll keep fallback: false for now.
  if (router.isFallback) return <p>Loading…</p>;

  return (
    <article className="prose mx-auto p-4">
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-600">{post.date}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: post.bodyHtml || '',
        }}
      />
    </article>
  );
}

/** --------------------------------------------------------------------- */
/**  Static Generation – get all slugs                                    */
/** --------------------------------------------------------------------- */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(); // returns an array of PostMeta
  const paths = posts.map((p) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: false }; // false → 404 if slug not found
};

/** --------------------------------------------------------------------- */
/**  Static Generation – fetch single post                               */
/** --------------------------------------------------------------------- */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPost(slug);

  if (!post) {
    // Just in case – will trigger a 404
    return { notFound: true };
  }

  return { props: { post } };
};
