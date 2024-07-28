import React from "react";
import { CommentCard } from "../components/CommentCard";

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    user: {
        anonymousName: string;
        shortCollegeName: string;
    };
}

function Comments({ comments }: { comments: Comment[] }) {
    return (
        <div>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id}>
                        <CommentCard
                            id={comment.id}
                            content={comment.content}
                            createdAt={comment.createdAt}
                            user={comment.user}
                        />
                    </div>
                ))
            ) : (
                <p>No Comments</p>
            )}
        </div>
    );
}

export default Comments;
