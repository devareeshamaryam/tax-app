 // app/blog/blogData.ts
export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "Information Websites For Your Inspiration",
    description: "Discover the best information websites that can inspire your next web design project. Learn about modern design trends and user experience.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    publishedDate: "January 05, 2026",
    category: "Web Design"
  },
  {
    _id: "2",
    title: "How to Use Website Templates: 10 Things You Need to Notice",
    description: "Essential tips and tricks for using website templates effectively. Make your template-based website stand out from the crowd.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80",
    publishedDate: "April 25, 2025",
    category: "Templates"
  },
  {
    _id: "3",
    title: "10 Luxurious Websites for Your Design Inspiration in 2025",
    description: "Explore premium website designs that showcase luxury and elegance. Get inspired by the best in class web experiences.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    publishedDate: "February 18, 2025",
    category: "Inspiration"
  },
  {
    _id: "4",
    title: "Website Development Best Practices 2026",
    description: "Learn the latest best practices in website development. From performance optimization to security measures.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    publishedDate: "January 15, 2026",
    category: "Development"
  },
  {
    _id: "5",
    title: "Responsive Design Patterns You Should Know",
    description: "Master responsive design patterns that work across all devices. Create seamless user experiences.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop&q=80",
    publishedDate: "December 10, 2025",
    category: "Design"
  },
  {
    _id: "6",
    title: "SEO Optimization for Modern Websites",
    description: "Boost your website's search engine rankings with these proven SEO strategies and techniques.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop&q=80",
    publishedDate: "November 20, 2025",
    category: "SEO"
  }
];