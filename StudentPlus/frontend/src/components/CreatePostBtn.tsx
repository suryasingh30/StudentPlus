import React, { useState } from 'react';
import Popup from './Popup';
import WritePost from './WritePost';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Blog {
  id: string;
  title: string;
  content: string;
  photoUrl?: string;
  likeCount: number;
  commentCount: number;
  author: {
    id: string;
    shortCollegeName: string;
    anonymousName: string;
  };
  publishedDate: string;
}

interface CreatePostBtnProps {
  handleBlogAdded: (blog: Blog) => void;
}

const CreatePostBtn:React.FC<CreatePostBtnProps> = ({ handleBlogAdded }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <div>
      <Button variant='contained' endIcon={<SendIcon />} onClick={() => setIsOpenPopup(true)}>Create Post</Button>
      {isOpenPopup && (
        <Popup setIsOpenPopup={setIsOpenPopup} title="Create a New Post">
          <WritePost handleBlogAdded={handleBlogAdded} setIsOpenPopup={setIsOpenPopup} />
        </Popup>
      )}
      <ToastContainer/>
    </div>
  );
};

export default CreatePostBtn;
