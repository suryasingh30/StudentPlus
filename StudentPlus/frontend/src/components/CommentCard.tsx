import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserId";
interface CommentCardProps {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        anonymousName: string;
        shortCollegeName: string;
    };
    onDelete: (commentId: string) => void;
}

export const CommentCard = ({ id, content, createdAt, user, onDelete }: CommentCardProps) => {
    
    const [currentUserId, setCurrentUserId] = useState<string|null>(null)

    useEffect(()=>{
        const userId = getUserIdFromToken();
        setCurrentUserId(userId);
    }, []);

    return (
        <div className='comment-card'>
            {/* <div className='comment-author'>
                {user.anonymousName && user.shortCollegeName ? (
                    `${user.anonymousName} (${user.shortCollegeName})`
                ) : user.anonymousName ? (
                    user.anonymousName
                ) : user.shortCollegeName ? (
                    user.shortCollegeName
                ) : null}
            </div> */}
            <div className='comment-content'>
                {content}
            </div>
            <div className='comment-date'>
                {new Date(createdAt).toLocaleDateString()}
            </div>
            <h3>{currentUserId}</h3>
            {currentUserId === user.id && (
                <button onClick={()=>onDelete(id)}> delete</button>
            )}
        </div>
    );
};
