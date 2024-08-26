import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCamera, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProfileSettings = () => {
  const [imagePreview, setImagePreview] = useState(null); // Corrected state variable name
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImagePreview(reader.result); // Corrected setImage call
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      profilePicture: imagePreview, 
    };
    
    axios.post('http://localhost:8000/UplodImg', formData, { withCredentials: true,})
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center animate-pulse">Profile Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-field relative flex flex-col items-center justify-center">
            <label htmlFor="profile-picture" className="cursor-pointer flex items-center justify-center w-full h-32 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition duration-200">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="h-full w-auto rounded-lg" />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
              )}
              <input
                {...register('profilePicture', { required: "Profile picture is required" })}
                type="file"
                id="profile-picture"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {errors.profilePicture && <span className="text-red-600">{errors.profilePicture.message}</span>}
          </div>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110"
          >
            Save Settings
            <FontAwesomeIcon icon={faSave} className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;

