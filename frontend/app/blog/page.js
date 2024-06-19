import BlogClient from '@/app/_components/BlogClient';
import HeroSection from '@/app/_components/HeroSection';
import museum from '@/public/museum.jpg';
import museum2 from '@/public/museum2.jpg';
import museum3 from '@/public/museum3.jpg';

export default function BlogPage() {
  const images = [{ src: museum }, { src: museum2 }, { src: museum3 }];

  return (
    <main className="min-h-screen">
      <HeroSection images={images} />
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center">Blogs</h2>
        <section className="px-4">
          <BlogClient />
        </section>
      </div>
    </main>
  );
}

