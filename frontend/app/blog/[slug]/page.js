import { getBlogBySlug } from '@/app/_lib/api';
import BlogDetail from '@/app/_components/BlogDetail';
import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';

export async function generateMetadata({ params }) {
  const { slug } = params;
  console.log(slug);
  const blogData = await getBlogBySlug(slug);
  console.log(blogData);
  const { seo } = blogData;

  return {
    title: seo.seoTitle,
    description: seo.seoDescription,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const blogData = await getBlogBySlug(slug);
  // console.log(blogData);

  // if (!blogData) {
  //   return <NotFound />;
  // }
  return (
    <Suspense fallback={<Spinner key={blogData} />}>
      <BlogDetail blogData={blogData} />;
    </Suspense>
  );
}
