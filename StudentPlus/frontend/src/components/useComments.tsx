import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";

interface Comments{
    id: string;
    content: string;
    createdAt: Date,
    userId: string,
    user: {
        anonymousName: string;
        shortCollegeName: string;
    };
}[];

export const useComments = (id: string) => {
    const [comments, setComments] = useState<Comments | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}api/v1/blog/${id}/comments`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });
                setComments(response.data.comments);
            }catch(err){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
    fetchComments();
    }, [id]);

    return { loading, comments, error };
}