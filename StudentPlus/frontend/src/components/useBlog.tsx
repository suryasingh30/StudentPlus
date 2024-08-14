import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './config';

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
      createdAt: Date;
      userId: string;
      user: {
          id: string;
          anonymousName: string;
          shortCollegeName: string;
      };
  }[];
  author: {
      shortCollegeName: string;
      anonymousName: string;
      fullCollegeName: string;
  };
  published: Date;
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
          headers: {
            Authorization: token
          }
        });
        setBlog(response.data.blog);
      } catch (error) {
        // setError();
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, blog, error };
};
