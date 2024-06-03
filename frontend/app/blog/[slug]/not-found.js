import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto py-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <p className="text-blue-500">Go back home</p>
      </Link>
    </div>
  );
}
