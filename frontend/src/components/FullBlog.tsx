import React from 'react'
import AppBar from './AppBar' 
import { Blog } from '../hooks'  //interface
import Avatar from './Avatar'
const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <AppBar></AppBar>
            <div className='flex justify-center'>
                <div className='grid grid-cols-16 w-full pt-5 max-w-screen-xl'>
                    <div className='col-span-12'>
                        <div className='text-5xl font-extrabold'>
                            {blog.title}
                        </div>
                        <div className='text-slate-400 pt-3'>
                            Posted on {blog.publishedDate.slice(0, 10)}
                        </div>
                        <div className='pt-4'>
                            {blog.content}
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <div className='font-semibold mb-2'>Author</div>
                        <div className='flex flex-row items-center'>
                            <Avatar name={blog.author.name} size={32}></Avatar>
                            <div className='ml-3'>
                                <div className='text-2xl font-bold'>{blog.author.name}</div>
                                <div>Random catch line about author</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullBlog