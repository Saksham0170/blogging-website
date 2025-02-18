import Avatar from './Avatar';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="w-full max-w-2xl">
      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
        {/* Author Info */}
        <div className="flex items-center space-x-2">
          <Avatar name={authorName} />
          <div className="font-medium">{authorName}</div>
          <span className="text-gray-400">•</span>
          <div className="text-gray-500 text-sm">{publishedDate}</div>
        </div>

        {/* Blog Title */}
        <h2 className="text-lg font-semibold mt-2">{title}</h2>

        {/* Blog Content Preview */}
        <p className="text-gray-600 mt-1 line-clamp-2">{content.slice(0, 120) + '...'}</p>

        {/* Read Time */}
        <div className="text-gray-400 text-sm mt-3">{`${Math.ceil(content.length / 100)} min read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
