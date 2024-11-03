import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import { client, urlFor } from '../lib/sanity';
import { ArrowLeft } from 'lucide-react';

interface Post {
  title: string;
  mainImage: any;
  publishedAt: string;
  body: any[];
  author: {
    name: string;
    image: any;
    bio: any[];
  };
}

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        title,
        mainImage,
        publishedAt,
        body,
        author->{
          name,
          image,
          bio
        }
      }`;

      const result = await client.fetch(query, { slug });
      setPost(result);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-2/3 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="mt-4 h-4 w-1/3 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="mt-8 h-64 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              {post.author.image && (
                <img
                  src={urlFor(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full"
                />
              )}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </div>
              </div>
            </div>
          </header>

          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              className="w-full rounded-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) => (
                    <img
                      src={urlFor(value).url()}
                      alt={value.alt || ''}
                      className="rounded-lg"
                    />
                  ),
                  code: ({ value }) => (
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <code>{value.code}</code>
                      {value.filename && (
                        <div className="mt-2 text-sm text-gray-400">
                          {value.filename}
                        </div>
                      )}
                    </pre>
                  ),
                },
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}