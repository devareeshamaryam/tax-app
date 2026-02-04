 // app/blog/[id]/page.tsx
import Header from '@/components/Header';
import BlogDetail from '@/components/BlogDetail';
import { blogPosts } from '../blogData';
import { notFound } from 'next/navigation';

// Generate static params for all blog posts (for build optimization)
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post._id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = blogPosts.find(post => post._id === id);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | Tax Calculator Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
      type: 'article',
    },
  };
}

// Main Page Component
export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params first
  const { id } = await params;
  
  // Find the blog post
  const blog = blogPosts.find(post => post._id === id);
  
  // If blog not found, show 404
  if (!blog) {
    notFound();
  }

  // Get related blogs (exclude current blog, take first 3)
  const relatedBlogs = blogPosts
    .filter(post => post._id !== id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}