import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const { title, slug, coverUrl } = post;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      {coverUrl && (
        <div className="relative w-full h-48">
          <Image
            src={coverUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/blog/${slug}`}>
            <p>{title}</p>
          </Link>
        </h2>
      </div>
    </div>
  );
}
