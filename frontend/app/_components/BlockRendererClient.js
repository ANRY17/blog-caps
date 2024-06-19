'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function BlockRendererClient({ content }) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="text-gray-800 text-lg leading-relaxed my-4">{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-4xl font-bold my-6">{children}</h1>;
            case 2:
              return <h2 className="text-3xl font-bold my-5">{children}</h2>;
            case 3:
              return <h3 className="text-2xl font-bold my-4">{children}</h3>;
            case 4:
              return <h4 className="text-xl font-bold my-3">{children}</h4>;
            case 5:
              return <h5 className="text-lg font-bold my-2">{children}</h5>;
            case 6:
              return <h6 className="text-base font-bold my-2">{children}</h6>;
            default:
              return <h1 className="text-4xl font-bold my-6">{children}</h1>;
          }
        },
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return <ol className="list-decimal ml-8 text-lg">{children}</ol>;
          } else {
            return <ul className="list-disc ml-8 text-lg">{children}</ul>;
          }
        },
        quote: ({ children }) => <blockquote className="italic border-l-4 border-gray-400 pl-4 my-4 text-lg">{children}</blockquote>,
        code: ({ children }) => <code className="bg-gray-200 p-1 rounded-md text-sm">{children}</code>,
        image: ({ image }) => (
          <div className="relative w-full h-96 mb-6 mx-auto overflow-hidden rounded-lg shadow-lg">
            <Image src={image.url} alt={image.alternativeText || ''} layout="fill" objectFit="cover" />
          </div>
        ),
        link: ({ children, url }) => (
          <Link href={url} passHref>
            <a className="text-blue-500 hover:underline">{children}</a>
          </Link>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-bold">{children}</strong>,
        italic: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <u className="underline">{children}</u>,
        strikethrough: ({ children }) => <s className="line-through">{children}</s>,
        code: ({ children }) => <code className="bg-gray-200 p-1 rounded-md">{children}</code>,
      }}
    />
  );
}

