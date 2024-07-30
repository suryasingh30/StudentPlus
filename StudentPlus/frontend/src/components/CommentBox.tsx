import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { TextEditor } from './TextEditor';

interface CommentBoxProps {
    postId: string;
    onCommentAdded: (comment: Comment) => void;
}

export const CommentBox = ({ postId, onCommentAdded }: CommentBoxProps) => {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const handleSubmit = async () => {
        if (comment.trim() === '') {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`http://127.0.0.1:8787/api/v1/blog/${postId}/comment`, 
            { content: comment }, 
            {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });

            onCommentAdded(response.data.comment);
            setComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4">
            <TextEditor
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <button
                className={`mt-2 p-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Posting...' : 'Post Comment'}
            </button>
        </div>
    );
};
