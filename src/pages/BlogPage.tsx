import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { format } from 'date-fns';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
    image: any;
  };
}

export function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          excerpt,
          author->{
            name,
            image
          }
        }`;
        
        const result = await client.fetch(query);
        setPosts(result);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5 dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Blog
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="mt-4 h-4 w-full bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="mt-2 h-4 w-2/3 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug.current}`}
                className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md dark:bg-gray-800"
              >
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(800).height(400).url()}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.author.image && (
                        <img
                          src={urlFor(post.author.image).width(32).height(32).url()}
                          alt={post.author.name}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}