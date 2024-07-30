import { useState } from 'react';
import Popup from './Popup';
import WritePost from './WritePost';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

const App = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <div>
      <Button variant='contained' endIcon={<SendIcon/>} onClick={() => setIsOpenPopup(true)}>Create Post</Button>
      {isOpenPopup && (
        <Popup setIsOpenPopup={setIsOpenPopup} title="Create a New Post">
          <WritePost />
        </Popup>
      )}
    </div>
  );
};

export default App;
