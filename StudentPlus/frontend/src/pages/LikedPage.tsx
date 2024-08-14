import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { toggleLike } from '../components/ToggleLike';
import { ToastContainer } from 'react-toastify';
import BlogSkeleton from '../components/BlogSkeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../components/config';

interface Blog {
    id: string;
    title: string;
    content: string;
    photoUrl?: string;
    likeCount: number;
    commentCount: number;
    author: {
        id: string;
        shortCollegeName: string;
        anonymousName: string;
        fullCollegeName: string;
    };
    published: Date;
}

function LikedPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}api/v1/blog/likedPosts`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });

                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
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
        <div style={{ backgroundColor: '#111111', minHeight: '100vh', color: 'white' }}>
            <Appbar />

            <div className='pt-6 flex flex-col items-center mt-10'>
                {loading ? (
                    <div className="w-full space-y-4">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                ) : (
                    blogs.length > 0 ? (
                        blogs.map(blog => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorId={blog.author.id}
                                shortCollegeName={blog.author.shortCollegeName || 'Unknown'}
                                authorName={blog.author.anonymousName || 'Unknown'}
                                title={blog.title}
                                content={blog.content}
                                published={blog.published}
                                photoUrl={blog.photoUrl}
                                likeCount={blog.likeCount}
                                commentCount={blog.commentCount}
                                onToggleLike={() => handleToggleLike(blog.id)}
                            />
                        ))
                    ) : (
                        <p>No liked posts</p>
                    )
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default LikedPage;
