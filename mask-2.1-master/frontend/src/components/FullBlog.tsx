import React from 'react';
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike'; // Import useLike

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
        createdAt: string;
        userId: string;
        user: {
            anonymousName: string;
            shortCollegeName: string;
        };
    }[];
    author: {
        shortCollegeName: string;
        anonymousName: string;
    };
    createdAt: string;
}


export const FullBlog = ({ blog }: { blog: Blog }) => {
    // Initialize the useLike hook with the blog's initial like count and ID
    const { likes, liked, handleToggleLike } = useLike(blog.likeCount, blog.id);

    return (
        <div>
            <ToastContainer />
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div className="text-slate-500 pt-2">Posted on {new Date(blog.createdAt).toLocaleDateString()}</div>
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
                                {likes} {likes === 1 ? "Like" : "Likes"} | {blog.commentCount}{" "}
                                {blog.commentCount === 1 ? "Comment" : "Comments"}
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
        </div>
    );
};
