 import BlogsTable from '@/components/admin/BlogsTable';

export default function BlogsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Blogs</h1>
      <BlogsTable />
    </div>
  );
}