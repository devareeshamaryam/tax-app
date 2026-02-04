'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/app/blog/blogData';

interface BlogsTableProps {
  blogs: BlogPost[];
}

export default function BlogsTable({ blogs }: BlogsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
            <tr key={blog._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative h-16 w-24 rounded overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    unoptimized={blog.image.startsWith('http')}
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-gray-900 line-clamp-2">
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
                  className="text-green-600 hover:text-green-900 mr-4"
                >
                  View
                </Link>
                <button className="text-blue-600 hover:text-blue-900 mr-4">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}