 'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Header from './Header';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  category: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data || []); // Fallback to empty array
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Latest Articles
              </h2>
              <div className="w-20 h-1 bg-green-500 mx-auto"></div>
            </div>
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Latest Articles
              </h2>
              <div className="w-20 h-1 bg-green-500 mx-auto"></div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-center">
              <p className="font-semibold text-lg">Error loading blogs</p>
              <p className="mt-2">{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Blog Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading - Green Accent */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Latest Articles
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>
        
        {/* Blog Grid - 2 on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard 
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                publishedDate={blog.publishedDate}
                category={blog.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No blogs available at the moment</p>
            </div>
          )}
        </div>
        </div>
      </section>
    </>
  );
}