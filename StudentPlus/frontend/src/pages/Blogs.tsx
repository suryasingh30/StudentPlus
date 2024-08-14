import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import BlogSkeleton from '../components/BlogSkeleton';
import axios from 'axios';
import { toggleLike } from '../components/ToggleLike';
import CreatePostBtn from '../components/CreatePostBtn';
import { getUserIdFromToken } from '../components/getUserId';
import PopularPost from '../components/PopularPost'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from '../components/SideBar';
import { BACKEND_URL } from '../components/config';

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
        fullCollegeName: string;
    };
    published: Date;
}

function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
    const [loading, setLoading] = useState(true); // Loading state
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });

                if (Array.isArray(response.data)) {
                    const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setBlogs(sortedBlogs);
                    setFilteredBlogs(sortedBlogs);
                } else {
                    console.error('Unexpected response format');
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false); // Ensure loading state is turned off
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (postId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}api/v1/blog/${postId}`, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            toast.done("Post deleted");
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
            ? new Date(b.published).getTime() - new Date(a.published).getTime()
            : new Date(a.published).getTime() - new Date(b.published).getTime()
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

    const transformBlogsToPopularPosts = (blogs: Blog[]): PopularPost[] => {
        return blogs.map(blog => ({
            id: blog.id,
            fullCollegeName: blog.author.fullCollegeName,
            likeCount: blog.likeCount,
            title: blog.title,
        }));
    };

    return (
        <div style={{ backgroundColor: '#111111', minHeight: '100vh', color: 'white', paddingTop: '56px' }}>
            <SideBar/>
            <Appbar/>
            <div className='pt-3 pb-0.15 flex flex-col items-center'>
                <CreatePostBtn handleBlogAdded={handleBlogAdded} />
                <div className='absolute pt-5 top-28 flex justify-between' 
                    style={{marginRight: '32rem'}}>
                    <button onClick={filterMyPosts} style={{backgroundColor: '#7091E6'}} className='text-white px-4 py-2 rounded mr-28'>
                        {showMyPosts ? "Show all posts" : "My Posts"}
                    </button>
                </div>
                <div className='absolute pt-5 top-28 flex justify-between'
                    style={{marginLeft: '27rem'}}>
                    <button onClick={toggleSortOrder} style={{backgroundColor: '#7091E6'}} className='text-white px-4 py-2 rounded ml-28'>
                        Sort by {sortOrder === 'latest' ? "Oldest First" : "Latest First"}
                    </button>
                </div>
            </div>

            <div className='pt-6 flex flex-col items-center mt-10'>
                {loading ? (
                    <div className="w-full space-y-4">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorId={blog.author.id}
                            shortCollegeName={blog.author.anonymousName || 'Unknown'}
                            authorName={blog.author.shortCollegeName || 'Unknown'}
                            title={blog.title}
                            content={blog.content}
                            published={blog.published}
                            photoUrl={blog.photoUrl}
                            likeCount={blog.likeCount}
                            commentCount={blog.commentCount}
                            onToggleLike={() => handleToggleLike(blog.id)}
                            handleDeleteBlog={handleDeleteBlog}
                            // setBlogs={setBlogs}
                        />
                    ))
                ) : (
                    <p>No Posts available</p>
                )}
            </div>
            <ToastContainer />
            <PopularPost posts={transformBlogsToPopularPosts(blogs.slice(0, 4))} />
        </div>
    );
}

export default Blogs;
