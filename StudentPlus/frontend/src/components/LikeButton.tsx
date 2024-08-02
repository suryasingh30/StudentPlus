import { useState } from "react";


interface LikeButtonProps {
  likes: number;
  onLike: () => Promise<void>; // Function to handle like toggle
}

const LikeButton = ({ likes, onLike }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);

  const handleClick = async () => {
    setLiked(!liked);
    await onLike(); // Call the function to toggle like
  };

  return (
    <button 
      onClick={handleClick} 
    >
      {/* Heart animation */}
      {/* <Heart isClick={liked} onClick={handleClick} /> */}
      <div>{`${likes}`}</div> {/* Like Count */}
    </button>
  );
};

export default LikeButton;
