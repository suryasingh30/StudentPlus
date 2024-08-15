import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from './config';

interface FormData {
  title: string;
  content: string;
  image?: FileList;
}

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

interface WritePostProps {
  handleBlogAdded: (blog: Blog) => void;
  setIsOpenPopup: (isOpen: boolean) => void; // Added to control popup state
}

const notify = () => toast("post published");

const WritePost: React.FC<WritePostProps> = ({ handleBlogAdded, setIsOpenPopup }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [flag, setFlag] = useState(true);

  const saveImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload?key=d3fac97f0075b9c0cef17f2c1688518d', formData);
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image', error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setFlag(false);
    try {
      let imageUrl = null;
      if (data.image && data.image[0]) {
        imageUrl = await saveImage(data.image[0]);
        setImageUrl(imageUrl);
      }

      const postData = {
        title: data.title,
        content: data.content,
        photoUrl: imageUrl || "",
      };

      const response = await axios.post(`${BACKEND_URL}api/v1/blog`, postData, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });

      const newBlog: Blog = response.data;
      handleBlogAdded(newBlog);

      notify();
      toast.success("Post published");
      reset();
      // alert('Post created successfully!');
      setIsOpenPopup(false); // Close the popup after successful submission
      setFlag(true);
    } catch (error) {
      console.error('Error saving post', error);
      // alert('Error saving post');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black">
        Create a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium mb-1 text-black">Title</label>
          <input 
            id="title" 
            type="text" 
            {...register('title', { required: true })} 
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="content" className="font-medium mb-1 text-black">Content</label>
          <textarea 
            id="content" 
            {...register('content', { required: true })} 
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black rows='5'"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="image" className="font-medium mb-1 text-black">Drop Image (optional)</label>
          <input 
            id="image" 
            type="file" 
            {...register('image')} 
            className="p-2 border border-gray-300 rounded-lg file:border-0 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg cursor-pointer text-black"
          />
        </div>
        
        {flag && (
          <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        )}
      </form>
      
      {imageUrl && (
        <div className="mt-4">
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default WritePost;
