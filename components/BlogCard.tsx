 // components/BlogCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  category: string;
}

export default function BlogCard({ _id, title, description, image, publishedDate, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${_id}`}>
      <div className="group cursor-pointer">
        {/* Image Container - No Badge */}
        <div className="relative w-full h-48 sm:h-56 rounded-lg overflow-hidden mb-4 bg-gray-200">
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={image.startsWith('http')}
          />
        </div>
        
        {/* Content - Green Accent Color */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            Published {publishedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}