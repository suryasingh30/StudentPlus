import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike';
import { CommentBox } from "./CommentBox";
import { useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import { BACKEND_URL } from "./config";

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
        createdAt: Date;
        userId: string;
        user: {
            id: string,
            anonymousName: string;
            shortCollegeName: string;
        };
    }[];
    author: {
        shortCollegeName: string;
        anonymousName: string;
        fullCollegeName: string;
    };
    published: Date;
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const { likes, liked, handleToggleLike } = useLike(blog.likeCount, blog.id);
    const [comments, setComments] = useState(blog.comments);

    const handleCommentAdded = (newComment: any) => {
        setComments([...comments, newComment]);
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}api/v1/blog/${blog.id}/${commentId}`, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <Appbar />
            <div style={{backgroundColor: '#111111'}} className="flex justify-center pt-7">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    {/* Blog Content Card */}
                    <div className="col-span-8">
                        <div
                            style={{
                                background: '#1E1E1E',
                                padding: '2rem',
                                marginBottom: '1.5rem',
                                color: 'white',
                                borderRadius: '0.5rem',
                                border: '2px solid transparent',
                            }}
                        >
                            <div className="text-5xl font-extrabold">{blog.title}</div>
                            <div className="text-slate-500 pt-2">Posted on {new Date(blog.published).toLocaleDateString()}</div>
                            <div className="pt-4">{blog.content}</div>
                            {blog.photoUrl && (
                                <div className="pt-4">
                                    <img
                                        src={blog.photoUrl}
                                        alt="Blog Photo"
                                        className="w-full h-auto rounded object-cover"
                                    />
                                </div>
                            )}
                            <div className="pt-4">
                                <div className="text-slate-500">
                                    {likes} {likes === 1 ? "Like" : "Likes"} | {comments.length}{" "}
                                    {comments.length === 1 ? "Comment" : "Comments"}
                                </div>
                                <div className="pt-2">
                                    <button 
                                        onClick={handleToggleLike} 
                                        className={`py-1 px-4 rounded ${liked ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
                                    >
                                        {liked ? 'Unlike' : 'Like'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Author Info Card */}
                </div>
            </div>
            <div className="hidden lg:block fixed top-20 right-10 bg-gray-800 p-5 rounded-lg shadow-lg 
            overflow-auto pt-3 col-span-4" 
            style={{width: '500px', height: '250px', borderRadius: '0.5rem', transition: 'box-shadow 0.3s ease, border-color 0.3s ease'}}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.1), 0 0 25px rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'transparent';
                }}
            >
                <div style={{color: 'Highlight', fontSize: '25px'}}
                >
                    {blog.author.fullCollegeName}</div>
                <div className="flex w-full">
                <div className="flex items-center pt-4">
                            <Avatar size="big" name={blog.author?.anonymousName || "Anonymous"}/>
                            <div className="pl-4">
                                <div className="text-xl font-bold text-white">
                                    {blog.author?.anonymousName || "Anonymous"}
                                </div>
                                <div className="text-lg text-gray-400">
                                    {blog.author?.shortCollegeName || "Unknown College"}
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="pt-3 text-slate-500">
                        This post reflects the insights and perspectives from a student of {blog.author.fullCollegeName}, offering a unique view on the topics that matter most to their peers.
                        </div>
            </div>

            <div style={{
                        background: '#1E1E1E',
                        padding: '0rem',
                        color: 'white',
                        backgroundColor: '#111111'
                    }} className="pt-6 px-10">
                <CommentBox postId={blog.id} onCommentAdded={handleCommentAdded} />
            </div>

            {/* Comments Section */}
                <div className="bg-black px-10 py-4">
                    <Comments comments={comments} onDelete={handleDeleteComment} />
                </div>
            </div>
    );
};
