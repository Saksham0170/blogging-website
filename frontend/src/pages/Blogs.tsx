import BlogCard from '../components/BlogCard';
import AppBar from '../components/AppBar';
import { useBlogs } from '../hooks';
import { BlogsSkeleton } from '../components/BlogsSkeleton';

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex flex-col">
        <AppBar />
        <BlogsSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppBar />
      <div className="flex flex-col items-center mt-6 space-y-4 w-full">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            authorName={blog.author.name}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate.slice(0, 10)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
