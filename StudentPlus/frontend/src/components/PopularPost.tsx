import React from 'react';

interface PopularPost {
    id: string;
    fullCollegeName: string;
    likeCount: number;
    title: string;
}

interface PopularPostsProps {
    posts: PopularPost[];
}

const PopularPost: React.FC<PopularPostsProps> = ({ posts }) => {
    return (
        <div className="hidden lg:block fixed top-20 right-10 bg-gray-800 p-4 rounded-lg shadow-lg w-80 max-h-96 overflow-auto pt-3">
            <h2>Popular Posts</h2>
            <hr className="border-blue-400 my-2" />
            {posts.map((post) => (
                <div key={post.id} className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">{post.fullCollegeName}</span>
                        <span className="text-sm text-gray-400">{post.likeCount} Likes</span>
                    </div>
                    <a href={`/blog/${post.id}`} className="text-white hover:underline">
                        {post.title}
                    </a>
                    <hr className="border-gray-600 my-2" />
                </div>
            ))}
        </div>
    );
};

export default PopularPost;
