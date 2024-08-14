import { useState } from 'react';
import axios from 'axios';
import { TextEditor } from './TextEditor';
import LoginPopup from './LoginPopup';
import Signinup from './Signin-up';
import { BACKEND_URL } from './config';

interface CommentBoxProps {
    postId: string;
    onCommentAdded: (comment: Comment) => void;
}

export const CommentBox = ({ postId, onCommentAdded }: CommentBoxProps) => {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSigninupPop, setIsSigninupPop] = useState(false);

    const handleSubmit = async () => {
        if (comment.trim() === '') {
            return; // Prevent submission if the comment is empty
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}api/v1/blog/${postId}/comment`,
                { content: comment },
                {
                    headers: {
                        Authorization: localStorage.getItem('token') || '',
                    },
                }
            );

            onCommentAdded(response.data.comment);
            setComment(''); // Clear the comment input after successful submission
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                setIsSigninupPop(true); // Show popup if authentication fails
            } else {
                console.error('Error posting comment:', error); // Log other errors
            }
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    return (
        <div
            style={{ width: '800px', marginLeft: '10rem', maxHeight: '50px' }}
            className="my-0 px-10 flex justify-center mt-0 text-black"
        >
            <TextEditor
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <button
                style={{ width: '200px' }}
                className={`mt-0 p-1 rounded-md ${
                    loading ? 'bg-gray-400' : 'bg-blue-500 text-white'
                }`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Posting...' : 'Post Comment'}
            </button>
            {isSigninupPop && (
                <LoginPopup setIsSigninupPop={setIsSigninupPop}>
                    <Signinup />
                </LoginPopup>
            )}
        </div>
    );
};
