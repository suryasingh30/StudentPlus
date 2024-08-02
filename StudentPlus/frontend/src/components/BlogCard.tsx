import React from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike';
import { getUserIdFromToken } from '../components/getUserId';
import { Blog } from '../pages/Blogs';
import { HeartIcon, TrashIcon} from '@heroicons/react/solid';
import { ChatBubbleLeftIcon } from '@heroicons/react';

interface BlogCardProps {
    authorName: string;
    shortCollegeName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    authorId: string;
    photoUrl?: string;
    likeCount: number;
    commentCount: number;
    onToggleLike: () => Promise<void>; // Updated here
    handleDeleteBlog: (postId: string) => Promise<void>; 
    setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

export const BlogCard = ({
    id,
    authorId,
    authorName,
    shortCollegeName,
    title,  
    content,
    publishedDate,
    photoUrl,
    likeCount,
    commentCount,
    handleDeleteBlog, // Receive the function as a prop
}: BlogCardProps) => {
    const { likes, liked, handleToggleLike } = useLike(likeCount, id);
    const userId = getUserIdFromToken();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent navigation
        await handleToggleLike();
    };

    const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await handleDeleteBlog(id);
    };

    return (
        <>
    {/* <ToastContainer /> */}
    <Link to={`/blog/${id}`}>
        <div style={{background: '#ffffff', maxWidth: '45rem'}} className="p-4 mb-4 text-black rounded-lg shadow-lg w-screen cursor-pointer"> {/* Padding 4, Margin Bottom 4, Background Blue, Text White, Rounded Large, Shadow Medium, Width Screen, Max Width Screen Medium, Cursor Pointer */}
            <div className="flex items-start mb-2"> {/* Flex Container, Align Items Start, Margin Bottom 2 */}
                <Avatar name={authorName} />
                <div className="font-bold pl-2 text-2xl flex justify-center"> {/* Font Extra Light, Padding Left 2, Text Small, Flex Container, Justify Center, Flex Column */}
                    {shortCollegeName}
                </div>
                <div className="flex justify-center flex-col pl-2"> {/* Flex Container, Justify Center, Flex Column, Padding Left 2 */}
                    <Circle />
                </div>
                <div className="font-normal pl-2 text-lg flex justify-center flex-col"> {/* Font Extra Light, Padding Left 2, Text Small, Flex Container, Justify Center, Flex Column */}
                    {authorName}
                </div>
                <div className="pl-2 font-thin text-black-200 text-sm flex justify-center flex-col"> 
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2"> {/* Text Extra Large, Font Semibold, Padding Top 2 */}
                {title}
            </div>
            <div className="text-md font-normal"> {/* Text Medium, Font Thin */}
                {content.slice(0, 300) + "..."}
            </div>
            {photoUrl && (
                <div className="pt-4 relative h-70 w-full inset-0"> {/* Padding Top 4, Relative Position, Height Full, Width Full, Inset 0 */}
                    <img 
                        src={photoUrl} 
                        alt="Blog Photo" 
                        className="w-full h-60 rounded object-cover" 
                    /> {/* Width Full, Height Auto, Rounded, Object Cover */}
                </div>
            )}

<div className="text-slate-200 text-sm font-thin pt-4 flex justify-between items-center"> {/* Flex Container, Justify Between, Align Items Center */}
<div className="flex items-center p-2" style={{ maxWidth: '200px' }}>
            <button 
                onClick={handleClick} 
                className={`flex items-center py-1 px-3 rounded-full ${liked ? 'bg-red-600' : 'bg-gray-400'} text-white`}
                style={{ marginRight: 'auto' }}
            >
                <HeartIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>{likes}</span>
            </button>
            {userId === authorId && (
                <button
                    onClick={handleDeleteClick}
                    className="flex items-center py-1 px-3 rounded-full bg-red-600 text-white ml-3" // Added margin-left for gap
                >
                    {/* Delete Post */}
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            )}
    <div className="flex flex-col items-end gap-1"> {/* Flex Column, Align Items End, Gap 1 */}
    </div>
            <div className='text-black'>{`${Math.ceil(content.length / 100)} minute(s) read`}</div> {/* Read Time */}
        </div>
        <div className="flex items-center py-1 px-3 rounded-full bg-blue-600 text-white ml-4">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" /> {/* Comment Icon */}
                <span>{commentCount}</span> {/* Comment Count */}
            </div>
</div>
        </div>
    </Link>
</>

    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-white" />;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-md" : "text-lg"} font-extralight text-gray-800`}>
                {name[0]}
            </span>
        </div>
    );
}
