import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCamera, faSave } from '@fortawesome/free-solid-svg-icons';

const ProfileSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center animate-pulse">Profile Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-field relative">
            <input
              {...register('name', { required: 'Full Name is required' })}
              type="text"
              id="name"
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Full Name"
            />
            <FontAwesomeIcon icon={faUser} className="absolute right-4 top-4 text-white" />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>
          <div className="input-field relative">
            <input
              {...register('email', { 
                required: 'Email Address is required', 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: 'Invalid email address' 
                }
              })}
              type="email"
              id="email"
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Email Address"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-white" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <div className="input-field relative">
            <input
              {...register('phone', { 
                required: 'Phone Number is required', 
                pattern: { 
                  value: /^\d{10}$/, 
                  message: 'Invalid phone number' 
                } 
              })}
              type="tel"
              id="phone"
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Phone Number"
            />
            <FontAwesomeIcon icon={faPhone} className="absolute right-4 top-4 text-white" />
            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
          </div>
          <div className="input-field relative flex flex-col items-center justify-center">
            <label htmlFor="profile-picture" className="cursor-pointer flex items-center justify-center w-full h-32 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition duration-200">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="h-full w-auto rounded-lg" />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-white text-2xl" />
              )}
              <input
                {...register('profilePicture')}
                type="file"
                id="profile-picture"
                className="hidden"
                onChange={handleImageChange}
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

