import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import axios from 'axios';
import { toggleLike } from '../components/ToggleLike';

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
    createdAt: string;
}

function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8787/api/v1/blog/bulk', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setBlogs(response.data);
            } else {
                console.error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
        });
    }, []);

    const handleToggleLike = async (id: string) => {
        try {
            const token = localStorage.getItem("token") || "";
            const result = await toggleLike(id, token);
            const updatedBlogs = blogs.map(blog => 
                blog.id === id ? { ...blog, likeCount: result.likeCount } : blog
            );
            setBlogs(updatedBlogs);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div>
            <Appbar />
            <div className='flex flex-col items-center'>
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.anonymousName || 'Unknown'}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={new Date(blog.createdAt).toLocaleDateString()}
                            photoUrl={blog.photoUrl}
                            likeCount={blog.likeCount}
                            commentCount={blog.commentCount}
                            onToggleLike={() => handleToggleLike(blog.id)}
                        />
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
        </div>
    );
}

export default Blogs;
