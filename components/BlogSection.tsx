 // components/BlogSection.tsx
import BlogCard from './BlogCard';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  category: string;
}

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading - Green Accent */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            See the Latest Blogs Here
          </h1>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>
        
        {/* Blog Grid - Responsive and Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {blogs.length > 0 ? (
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
  );
}