 // app/blog/[id]/page.tsx
import Header from '@/components/Header';
import BlogDetail from '@/components/BlogDetail';
import { notFound } from 'next/navigation';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  publishedDate: string;
}

// Fetch single blog from API
async function getBlog(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${id}`,
      { 
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    );
    
    if (!res.ok) {
      console.error('Failed to fetch blog:', res.status);
      return null;
    }
    
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Fetch all blogs for related section
async function getAllBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  
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
  const { id } = await params;
  
  // Fetch current blog and all blogs in parallel
  const [blog, allBlogs] = await Promise.all([
    getBlog(id),
    getAllBlogs()
  ]);
  
  // If blog not found, show 404
  if (!blog) {
    notFound();
  }

  // Get related blogs (same category, exclude current blog, take first 3)
  const relatedBlogs = allBlogs
    .filter((post: BlogPost) => post._id !== id && post.category === blog.category)
    .slice(0, 3);
  
  // If not enough related blogs from same category, fill with other blogs
  if (relatedBlogs.length < 3) {
    const additionalBlogs = allBlogs
      .filter((post: BlogPost) => post._id !== id && post.category !== blog.category)
      .slice(0, 3 - relatedBlogs.length);
    relatedBlogs.push(...additionalBlogs);
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}