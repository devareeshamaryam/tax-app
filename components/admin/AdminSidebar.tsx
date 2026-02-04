'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Add Blog',
      href: '/admin/add-blog',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      name: 'All Blogs',
      href: '/admin/blogs',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white fixed h-full">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 border-l-4 border-green-500' : ''
              }`}
            >
              <span className={isActive ? 'text-green-500' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Website */}
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}