import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserId";

interface CommentCardProps {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    anonymousName: string;
    shortCollegeName: string;
  };
  onDelete: (commentId: string) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  id,
  content,
  createdAt,
  user,
  onDelete,
}) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = getUserIdFromToken();
    setCurrentUserId(userId);
  }, []);

  return (
    <div className="comment-card">
      <div className="comment-author">
        {user.anonymousName && user.shortCollegeName
          ? `${user.anonymousName} (${user.shortCollegeName})`
          : user.anonymousName || user.shortCollegeName || "Anonymous"}
      </div>
      <div className="comment-content">{content}</div>
      <div className="comment-date">
        {new Date(createdAt).toLocaleDateString()}
      </div>
      {currentUserId === user.id && (
        <button onClick={() => onDelete(id)}>Delete</button>
      )}
      {/* {user.id} */}
    </div>
  );
};
