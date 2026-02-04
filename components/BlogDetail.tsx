 // components/BlogDetail.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/app/blog/blogData';

interface BlogDetailProps {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
}

export default function BlogDetail({ blog, relatedBlogs }: BlogDetailProps) {
  // Social Share Function
  const handleShare = (platform: string) => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(blog.title);

    let shareLink = '';
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div>
      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 font-semibold transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold">
            {blog.category}
          </span>
          <span className="text-gray-600 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {blog.publishedDate}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 lg:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            unoptimized={blog.image.startsWith('http')}
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 leading-relaxed font-light">
            {blog.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            In today's digital landscape, staying ahead of the curve requires not just knowledge, but actionable insights that can transform your approach to web development and design. This comprehensive guide delves deep into the essential aspects that every modern developer and designer should understand.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Concepts to Master</h2>
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. User-Centered Design Principles</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            At the heart of every successful digital product lies a deep understanding of user needs. User-centered design goes beyond aesthetics—it's about creating intuitive, accessible, and delightful experiences that solve real problems.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Performance Optimization</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            In an era where users expect instant gratification, performance is non-negotiable. From optimizing images and leveraging browser caching to implementing lazy loading and code splitting, every millisecond counts.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-3">💡 Pro Tip</h4>
            <p className="text-gray-700 leading-relaxed">
              Always start with mobile-first design principles. This approach ensures your core content and functionality work perfectly on smaller screens, then progressively enhance the experience for larger devices.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Best Practices</h2>
          <ul className="space-y-4 my-8">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
              <span className="text-gray-700">Prioritize accessibility from the beginning—it's not an afterthought but a fundamental requirement</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
              <span className="text-gray-700">Implement progressive enhancement to ensure core functionality works everywhere</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
              <span className="text-gray-700">Use semantic HTML to improve SEO and assistive technology compatibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
              <span className="text-gray-700">Maintain consistent design patterns across your entire application</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Success in web development and design comes from a combination of technical skills, creative thinking, and a genuine desire to create meaningful experiences for users. By mastering these concepts and staying curious about new developments in the field, you'll be well-equipped to tackle any challenge that comes your way.
          </p>
        </div>

        {/* Share Section */}
        <div className="border-t border-gray-200 mt-16 pt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Share this article</h3>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            
            <button 
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 bg-white text-sky-500 border-2 border-sky-500 px-6 py-3 rounded-lg hover:bg-sky-50 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            
            <button 
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 bg-white text-blue-700 border-2 border-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            
            <button 
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-2 bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map(relatedBlog => (
                <Link key={relatedBlog._id} href={`/blog/${relatedBlog._id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={relatedBlog.image.startsWith('http')}
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                        {relatedBlog.category}
                      </span>
                      <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {relatedBlog.publishedDate}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}