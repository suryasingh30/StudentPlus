import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from './config';

export const useLike = (initialLikeCount: number, postId: string) => {
  const [likes, setLikes] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [isSigninupPop, setIsSigninupPop] = useState(false); // State for popup

  useEffect(() => {
    const checkIfLiked = async () => {
      const token = localStorage.getItem('token') || '';
      if(token === "")
            return;
      try {
        const response = await axios.get(`${BACKEND_URL}api/v1/blog/${postId}/liked`, {
          headers: {
            Authorization: token,
          },
        });
        setLiked(response.data.liked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkIfLiked();
  }, [postId]);

  const handleToggleLike = async () => {
    const token = localStorage.getItem('token') || '';
    if(token === '')
    {
        setIsSigninupPop(true);
        return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}api/v1/blog/${postId}/like`, {}, {
        headers: {
          Authorization: token,
        },
      });
      setLikes(response.data.likeCount);
      setLiked(!liked);
    } catch (error) {
      if (error === 403) {
        setIsSigninupPop(true); // Show popup if authentication fails
      } else {
        toast.error('Error toggling like');
      }
    }
  };

  return { likes, liked, handleToggleLike, isSigninupPop, setIsSigninupPop };
};
