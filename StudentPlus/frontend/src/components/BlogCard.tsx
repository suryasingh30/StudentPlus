import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useLike } from './UseLike';
import { getUserIdFromToken } from '../components/getUserId';
import { HeartIcon, TrashIcon, ChatIcon } from '@heroicons/react/solid';
import LoginPopup from '../components/LoginPopup';
import Signinup from './Signin-up';

interface BlogCardProps {
    authorName: string;
    shortCollegeName: string;
    title: string;
    content: string;
    published: Date;
    id: string;
    authorId: string;
    photoUrl?: string;
    likeCount: number;
    commentCount: number;
    handleDeleteBlog?: (postId: string) => Promise<void>;
    onToggleLike: () => Promise<void>;
}

export const BlogCard = ({
    id,
    authorId,
    authorName,
    shortCollegeName,
    title,
    content,
    published,
    photoUrl,
    likeCount,
    commentCount,
    handleDeleteBlog,
}: BlogCardProps) => {
    const { likes, liked, handleToggleLike, isSigninupPop, setIsSigninupPop } = useLike(likeCount, id);
    const userId = getUserIdFromToken();

    const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await handleToggleLike();
    }, [handleToggleLike]);

    const handleDeleteClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (handleDeleteBlog) {
            await handleDeleteBlog(id);
        }
    }, [handleDeleteBlog, id]);
    

    return (
        <>
            <Link to={`/blog/${id}`}>
            <div
            style={{
                background: '#1E1E1E',
                maxWidth: '45rem',
                minWidth: '45rem',
                padding: '1rem',
                marginBottom: '1rem',
                color: 'white',
                borderRadius: '0.5rem',
                border: '2px solid transparent',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 0 0 rgba(255, 255, 255, 0.5)', // Initial shadow
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5), 0 0 25px rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = 'transparent';
            }}
            >
                    <div className="flex items-start mb-2">
                        <Avatar name={authorName} />
                        <div className="font-bold pl-2 text-2xl flex justify-center">{authorName}</div>
                        <div className="flex justify-center flex-col pl-2">
                            <Circle />
                        </div>
                        <div className="font-normal pl-2 text-lg flex justify-center flex-col">{shortCollegeName}</div>
                        <div className="pl-10 font-thin text-black-200 text-sm flex flex-col ml-auto">{new Date(published).toLocaleDateString()}</div>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="text-xl font-semibold pt-2">{title}</div>
                    <div className="text-md font-normal">{content.slice(0, 300) + "..."}</div>
                    {photoUrl && (
                        <div className="pt-4 relative h-70 w-full inset-0">
                            <img src={photoUrl} alt="Blog Photo" className="w-full h-60 rounded object-cover" />
                        </div>
                    )}

                    <div className="text-slate-200 text-sm font-thin pt-4 flex justify-between items-center">
                        <div className="flex items-center p-2" style={{ maxWidth: '200px' }}>
                            <button
                                onClick={handleClick}
                                className={`flex items-center py-1 px-3 rounded-full ${liked ? 'bg-red-600' : 'bg-gray-400'} text-white`}
                                style={{ marginRight: 'auto' }}
                            >
                                <HeartIcon className="h-5 w-4 mr-2" aria-hidden="true" />
                                <span>{likes}</span>
                            </button>
                            <div className="flex flex-col items-end gap-2"></div>
                        <div className="flex items-center py-1 px-3 rounded-full bg-blue-600 text-white ml-4">
                            <ChatIcon className="w-4 h-4 mr-2" />
                            <span>{commentCount}</span>
                        </div>
                        </div>
                            <div className='text-black'>{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
                        <div>
                            {userId === authorId && (
                                <button
                                onClick={handleDeleteClick}
                                className="flex items-center py-1 px-3 rounded-full bg-red-600 text-white ml-3"
                                >
                                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
            {isSigninupPop && (
                <LoginPopup setIsSigninupPop={setIsSigninupPop}>
                    <Signinup/>
                </LoginPopup>
            )}
        </>
    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-white" />;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200 rounded-full ${size === "small" ? "w-12 h-12" : "w-20 h-20"}`}>
            <span className={`${size === "small" ? "text-md" : "text-2xl"} font-extralight text-gray-800`}>
                {name[0]}
            </span>
        </div>
    );
}
