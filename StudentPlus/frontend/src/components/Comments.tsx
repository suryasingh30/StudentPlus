import React from "react";
import { CommentCard } from "../components/CommentCard";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  user: {
    id: string;
    anonymousName: string;
    shortCollegeName: string;
  };
}

interface CommentsProps {
  comments: Comment[];
  onDelete: (commentId: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ comments, onDelete }) => {
  return (
    <div className="text-xl text-white">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              user={comment.user}
              onDelete={onDelete}
            />
          </div>
        ))
      ) : (
        <p>No Comments</p>
      )}
    </div>
  );
};

export default Comments;
