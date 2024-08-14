import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../components/config";

interface Blog {
    id: string;
    title: string;
    content: string;
    photoUrl?: string;
    likeCount: number;
    commentCount: number;
    author: {
      shortCollegeName: string;
      anonymousName: string;
    };
    publishedDate: string; // Adjust this if you are formatting this field differently
  }

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}