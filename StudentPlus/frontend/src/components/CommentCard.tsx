import React from 'react';

interface CommentCardProps {
    id: string;
    content: string;
    createdAt: string;
    user: {
        anonymousName: string;
        shortCollegeName: string;
    };
}

export const CommentCard = ({ id, content, createdAt, user }: CommentCardProps) => {
    return (
        <div className='comment-card'>
            <div className='comment-author'>
                {user.anonymousName} ({user.shortCollegeName})
            </div>
            <div className='comment-content'>
                {content}
            </div>
            <div className='comment-date'>
                {new Date(createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};
