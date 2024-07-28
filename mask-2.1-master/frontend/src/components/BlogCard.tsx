import React from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    photoUrl?: string;
    likeCount: number;
    commentCount: number;
    onToggleLike: () => Promise<void>; // Updated here
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    photoUrl,
    likeCount,
    commentCount,
    onToggleLike // Updated here
}: BlogCardProps) => {
    const { likes, liked, handleToggleLike } = useLike(likeCount, id);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent navigation
        await handleToggleLike();
    };

    return (
        <>
            <ToastContainer />
            <Link to={`/blog/${id}`}>
                <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex items-start">
                        <Avatar name={authorName} />
                        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                            {authorName}
                        </div>
                        <div className="flex justify-center flex-col pl-2">
                            <Circle />
                        </div>
                        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="text-xl font-semibold pt-2">
                        {title}
                    </div>
                    <div className="text-md font-thin">
                        {content.slice(0, 100) + "..."}
                    </div>
                    {photoUrl && (
                        <div className="pt-4">
                            <img 
                                src={photoUrl} 
                                alt="Blog Photo" 
                                className="w-full h-auto rounded object-cover" 
                            />
                        </div>
                    )}
                    <div className="text-slate-500 text-sm font-thin pt-4">
                        {`${Math.ceil(content.length / 100)} minute(s) read`}
                    </div>
                    <div className="flex justify-between text-slate-500 text-sm font-thin pt-2">
                        <div>{`${likes} ${likes === 1 ? "Like" : "Likes"}`}</div>
                        <div>{`${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}`}</div>
                    </div>
                    <div className="pt-2">
                        <button 
                            onClick={handleClick} 
                            className={`py-1 px-4 rounded ${liked ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
                        >
                            {liked ? 'Unlike' : 'Like'}
                        </button>
                    </div>
                </div>
            </Link>
        </>
    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500" />;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-md" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
}
