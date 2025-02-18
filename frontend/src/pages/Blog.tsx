import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import FullBlog from '../components/FullBlog';
import {BlogSkeleton} from '../components/BlogSkeleton'
import AppBar from '../components/AppBar';
const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className='flex flex-col'>
        <AppBar></AppBar>
        <BlogSkeleton></BlogSkeleton>
      </div>
    )
  }

  return blog ? <FullBlog blog={blog} /> : <p className="text-center text-gray-500">Blog not found.</p>;
};

export default Blog;
