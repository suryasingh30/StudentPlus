import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const useLike = (initialLikeCount: number, postId: string) => {
    const [likes, setLikes] = useState(initialLikeCount);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkIfLiked = async () => {
            const token = localStorage.getItem("token") || "";
            try {
                const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${postId}/liked`, {
                    headers: {
                        Authorization: token
                    }
                });
                setLiked(response.data.liked);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };

        checkIfLiked();
    }, [postId]);

    const handleToggleLike = async () => {
        const token = localStorage.getItem("token") || "";
        try {
            const response = await axios.post(`http://127.0.0.1:8787/api/v1/blog/${postId}/like`, {}, {
                headers: {
                    Authorization: token
                }
            });
            setLikes(response.data.likeCount);
            setLiked(!liked);
            toast.success(liked ? 'Unliked!' : 'Liked!');
        } catch (error) {
            toast.error("Error toggling like");
        }
    };

    return { likes, liked, handleToggleLike };
};
