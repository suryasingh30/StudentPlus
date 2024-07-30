import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  title: string;
  content: string;
  image: FileList;
}

const WritePost: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const saveImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload?key=6fe914dc248047f7247242bb1270d306', formData, {
      });
      return response.data.data.url;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error uploading image', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error uploading image', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error uploading image', error.message);
      }
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const imageUrl = await saveImage(data.image[0]);
      setImageUrl(imageUrl);

      const postData = {
        title: data.title,
        content: data.content,
        photoUrl: imageUrl || " ",
      };

      await axios.post('http://127.0.0.1:8787/api/v1/blog', postData, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });

      reset();
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error saving post', error);
      alert('Error saving post');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" {...register('title', { required: true })} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" {...register('content', { required: true })} />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" {...register('image', { required: true })} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default WritePost;
