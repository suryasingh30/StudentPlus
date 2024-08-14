import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./getUserId";
import { FaArrowRight } from "react-icons/fa";

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
    <div style={{marginLeft: '8rem', marginRight: '32rem'}} className="pl-6 border-l border-gray-600 pb-3 mb-2 bg-gray-800 rounded-lg shadow-lg pt-2">
      <div className="flex items-center mb-2">
        <FaArrowRight className="text-gray-500 mr-2" />
        <div className="text-lg text-white flex items-center">
          <span>{user.shortCollegeName}</span>
          <span className="mx-2">|</span>
          <span>{user.anonymousName} </span>
          <span className="ml-3 text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="ml-8 text-gray-300 pt-0.005 text-md">{content}</div>
      {currentUserId === user.id && (
        <div className="ml-8 mt-2">
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 text-sm bg-[#1E1E1E] rounded-full px-4 py-2"
        >
          Delete
        </button>
      </div>
      
      )}
    </div>
  );
};
