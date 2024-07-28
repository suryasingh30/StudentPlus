import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`, {
          headers: {
            Authorization: token
          }
        });
        setBlog(response.data.blog);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, blog, error };
};
