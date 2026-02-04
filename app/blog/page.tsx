 // app/blog/page.tsx
import Header from '@/components/Header';
import BlogSection from '@/components/BlogSection';

async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <BlogSection blogs={blogs} />
    </main>
  );
}
 