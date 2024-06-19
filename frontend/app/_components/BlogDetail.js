'use client';
import Image from 'next/image';
import Link from 'next/link';
import CommentSection from '@/app/_components/CommentSection';
import SimilarPosts from '@/app/_components/SimilarPosts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BlockRendererClient from '@/app/_components/BlockRendererClient';

export default function BlogDetail({ blogData }) {
  const { id, title, cover, comments, tags, createdAt, content } = blogData;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-100">
      {cover ? (
        <div className="relative w-full h-custom-96 md:h-custom-128 mb-6 mx-auto overflow-hidden shadow-lg">
          <Image src={cover} alt={title} layout="fill" objectFit="cover" />
        </div>
      ) : (
        <Skeleton height={384} />
      )}

      <section className="my-10 px-4">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-center text-gray-800">
            {title || <Skeleton width="80%" />}
          </h1>
          <div className="text-center text-gray-600 mb-6">
            <span className="mr-2">📝</span>
            <span className="font-medium">Admin</span>
            <span className="mx-2">•</span>
            <span>{formattedDate || <Skeleton width="40%" />}</span>
            <span className="mx-2">•</span>
            {tags[0] && (
              <Link
                href={`/tags/${tags[0].slug}`}
                passHref
                className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm hover:bg-blue-200 transition duration-200"
              >
                {tags[0].name}
              </Link>
            )}
          </div>

          <div className="prose lg:prose-xl prose-gray mx-auto">
            {content?.length ? (
              <BlockRendererClient content={content} />
            ) : (
              <Skeleton count={5} />
            )}
          </div>

          {tags && tags.length > 1 && (
            <div className="flex flex-wrap space-x-2 mt-6">
              {tags.slice(1).map((tag, index) => (
                <Link
                  key={index}
                  href={`/tags/${tag.slug}`}
                  passHref
                  className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm hover:bg-blue-200 transition duration-200"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          <CommentSection blogId={id} initialComments={comments} />

          <SimilarPosts tags={tags} currentPostId={id} />
        </div>
      </section>
    </main>
  );
}

