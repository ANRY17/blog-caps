import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Travel Blog</div>
        <div>
          <Link href="/" className="px-3 py-2 hover:bg-blue-700 rounded">
            Home
          </Link>
          <Link
            href="/blog"
            className="px-3 py-2 hover:bg-blue-700 rounded ml-4"
          >
            Blog
          </Link>
          <Link
            href="/profile"
            className="px-3 py-2 hover:bg-blue-700 rounded ml-4"
          >
            profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
