import React, { Suspense } from 'react';
import Image from 'next/image';
import CommentSection from '@/app/_components/CommentSection';

export default function BlogDetail({ blogData }) {
  const { id, title, content, cover, comments } = blogData;

  return (
    <div className="container mx-auto py-6">
      {cover && (
        <div className="relative w-full h-96">
          <Image
            src={cover}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {content.map((block, index) => (
        <p key={index}>
          {block.children.map((child, childIndex) =>
            child.type === 'text' ? (
              <span key={childIndex}>{child.text}</span>
            ) : null
          )}
        </p>
      ))}
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentSection blogId={id} initialComments={comments} />
      </Suspense>
    </div>
  );
}
