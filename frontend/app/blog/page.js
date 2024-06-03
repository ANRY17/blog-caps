import { getAllBlogs } from "@/app/_lib/api";
import BlogCard from "@/app/_components/BlogCard";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Suspense fallback={<Spinner />}>
        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Suspense>
    </div>
  );
}
