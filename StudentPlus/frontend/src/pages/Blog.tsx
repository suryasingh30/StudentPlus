import React from 'react';
import { AppBar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { FullBlog } from '../components/FullBlog';
import { useBlog } from '../components/useBlog';

interface Blog {
  id: string;
  title: string;
  content: string;
  photoUrl?: string;
  likeCount: number;
  commentCount: number;
  comments: {
      id: string;
      content: string;
      createdAt: string;
      userId: string;
      user: {
          anonymousName: string;
          shortCollegeName: string;
      };
  }[];
  author: {
      shortCollegeName: string;
      anonymousName: string;
  };
  createdAt: string;
}


export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, error } = useBlog(id || "");

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className='h-screen flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <AppBar />
        <div className='h-screen flex flex-col justify-center'>
          <div className='flex justify-center'>
            <p>Error loading blog. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
