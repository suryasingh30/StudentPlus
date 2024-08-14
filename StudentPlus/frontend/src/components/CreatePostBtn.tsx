import React, { useState } from 'react';
import Popup from './Popup';
import WritePost from './WritePost';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from './LoginPopup';
import Signinup from './Signin-up';

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
    fullCollegeName: string;
  };
  published: Date;
}

interface CreatePostBtnProps {
  handleBlogAdded: (blog: Blog) => void;
}

const CreatePostBtn: React.FC<CreatePostBtnProps> = ({ handleBlogAdded }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isSigninupPop, setIsSigninupPop] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSigninupPop(true);
    } else {
      setIsOpenPopup(true);
    }
  };

  return (
    <div style={{ paddingTop: 8, paddingBottom: 10 }}>
      <Button
        style={{ maxWidth: '45rem' }}
        className='w-screen'
        variant='contained'
        endIcon={<SendIcon />}
        onClick={handleClick}
      >
        Create Post
      </Button>
      {isOpenPopup && (
        <Popup setIsOpenPopup={setIsOpenPopup} title="">
          <WritePost handleBlogAdded={handleBlogAdded} setIsOpenPopup={setIsOpenPopup} />
        </Popup>
      )}
      {isSigninupPop && (
        <LoginPopup setIsSigninupPop={setIsSigninupPop}>
          <Signinup />
        </LoginPopup>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreatePostBtn;
