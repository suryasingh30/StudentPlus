import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike';
import { CommentBox } from "./CommentBox";
import { useState } from "react";
import Comments from "./Comments";
import axios from "axios";

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
            await axios.delete(`http://127.0.0.1:8787/api/v1/blog/${blog.id}/${commentId}`, {
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
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
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
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author?.anonymousName || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">{blog.author?.anonymousName || "Anonymous"}</div>
                                <div className="pt-2 text-slate-500">
                                    Random catchphrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                        {blog.author?.shortCollegeName && (
                            <div className="pt-4 text-slate-500">{blog.author.shortCollegeName}</div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Comments comments={comments} onDelete={handleDeleteComment} />
            </div>
            <div>
                <CommentBox postId={blog.id} onCommentAdded={handleCommentAdded} />
            </div>
        </div>
    );
};
