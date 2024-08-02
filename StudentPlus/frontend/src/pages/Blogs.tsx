import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import axios from 'axios';
import { toggleLike } from '../components/ToggleLike';
import CreatePostBtn from '../components/CreatePostBtn';
import { getUserIdFromToken } from '../components/getUserId';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Blog {
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
    publishedDate: string;
}

function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
    const userId = getUserIdFromToken();

    useEffect(() => {
        axios.get('http://127.0.0.1:8787/api/v1/blog/bulk', {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs);
            } else {
                console.error('Unexpected response format');
            }
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
        });
    }, []);

    const handleDeleteBlog = async (postId: string) => {
        try {
            await axios.delete(`http://127.0.0.1:8787/api/v1/blog/${postId}`, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            toast.done("post deleted");
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== postId));
            setFilteredBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    

    const handleToggleLike = async (id: string) => {
        try {
            const token = localStorage.getItem("token") || "";
            const result = await toggleLike(id, token);
            const updatedBlogs = blogs.map(blog => 
                blog.id === id ? { ...blog, likeCount: result.likeCount } : blog
            );
            setBlogs(updatedBlogs);
            setFilteredBlogs(updatedBlogs);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const filterMyPosts = () => {
        if (showMyPosts) {
            setFilteredBlogs(blogs);
        } else {
            const myPosts = blogs.filter(blog => blog.author.id === userId);
            setFilteredBlogs(myPosts);
        }
        setShowMyPosts(!showMyPosts);
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'latest' ? 'oldest' : 'latest';
        setSortOrder(newSortOrder);
        const sortedBlogs = [...filteredBlogs].sort((a, b) => newSortOrder === 'latest'
            ? new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
            : new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        );
        setFilteredBlogs(sortedBlogs);
    };

    const handleBlogAdded = (newBlog: Blog) => {
        setBlogs(prevBlogs => {
            const updatedBlogs = [newBlog, ...prevBlogs];
            setFilteredBlogs(updatedBlogs);
            return updatedBlogs;
        });
    }

    return (
        <div style={{ backgroundColor: '#eff0f4', minHeight: '100vh', color: 'white' }}>
            <Appbar />
            <div className='flex flex-col items-center'>
                <CreatePostBtn handleBlogAdded={handleBlogAdded}/>
            </div>
            <div className='flex justify-between items-center px-4 py-2 text-black'>
                <button onClick={filterMyPosts}>
                    {showMyPosts ? "Show all posts" : "My Posts"}
                </button>
                <button onClick={toggleSortOrder}>
                    Sort by {sortOrder === 'latest' ? "Oldest First" : "Latest First"}
                </button>
            </div>
            <div className='flex flex-col items-center'>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorId={blog.author.id}
                            shortCollegeName={blog.author.shortCollegeName || 'Unknown'}
                            authorName={blog.author.anonymousName || 'Unknown'}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                            photoUrl={blog.photoUrl}
                            likeCount={blog.likeCount}
                            commentCount={blog.commentCount}
                            onToggleLike={() => handleToggleLike(blog.id)}
                            handleDeleteBlog={handleDeleteBlog}
                            setBlogs={setBlogs}
                        />
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Blogs;
