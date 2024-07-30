import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import axios from 'axios';
import { toggleLike } from '../components/ToggleLike';
import CreatePostBtn from '../components/CreatePostBtn'
import { getUserIdFromToken } from '../components/getUserId';

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
    };
    createdAt: string; 
}

function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const userId = getUserIdFromToken();

    useEffect(() => {
        axios.get('http://127.0.0.1:8787/api/v1/blog/bulk', {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setBlogs(response.data);
                setFilteredBlogs(response.data);
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

    const filterMyPosts = () => {
        if(showMyPosts){
            setFilteredBlogs(blogs);
        }
        else{
            const myPosts = blogs.filter(blog => blog.author.id === userId)
            setFilteredBlogs(myPosts);
        }
        setShowMyPosts(!showMyPosts);
    };

    return (
        <div>
            <Appbar />
            <div className='flex flex-col items-center'>
                <CreatePostBtn/>
            </div>
            <div>
                <button onClick={filterMyPosts}>
                    {showMyPosts ? "Show all posts" : "MY Posts"}
                </button>
            </div>
            <div className='flex flex-col items-center'>
            {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
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
