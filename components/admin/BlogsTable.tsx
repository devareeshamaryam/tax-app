 'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  publishedDate: string;
}

export default function BlogsTable() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch blogs from database
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data);
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

  // Delete blog function
  const handleDelete = async (blogId: string, blogTitle: string) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blogTitle}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(blogId);
      
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove deleted blog from state
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        alert('Blog deleted successfully! ✅');
      } else {
        alert(`Failed to delete blog: ${result.error}`);
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
        <button
          onClick={fetchBlogs}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600 text-lg">No blogs found.</p>
        <p className="text-gray-500 mt-2">Create your first blog to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-24 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized={blog.image.startsWith('http') || blog.image.startsWith('data:')}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900 line-clamp-2 max-w-md">
                    {blog.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {blog.publishedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/blog/${blog._id}`}
                    className="text-green-600 hover:text-green-900 mr-4 inline-block"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/blogs/edit/${blog._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4 inline-block"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    disabled={deletingId === blog._id}
                    className={`text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed ${
                      deletingId === blog._id ? 'animate-pulse' : ''
                    }`}
                  >
                    {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Total count */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total Blogs: <span className="font-semibold">{blogs.length}</span>
        </p>
      </div>
    </div>
  );
}