import React from 'react';

const BlogSkeleton: React.FC = () => {
    return (
        <div role="status" className="animate-pulse max-w-2xl w-full mx-auto mb-4 p-4 border border-1E1E1E-300 rounded-md bg-1E1E1E shadow-md">
            <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
            <div className="flex items-center">
        </div>
        </div>
    );
}

export default BlogSkeleton;
