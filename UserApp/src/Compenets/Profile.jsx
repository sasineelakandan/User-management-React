import React, { useEffect, useState,memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const UserProfile = () => {
  const[user,setUser]=useState(null)
  
 
 useEffect(()=>{
  axios.get('http://localhost:8000/profile', { withCredentials: true })
  .then(response => {
    if (response.data) {
     setUser(response.data)
    }
  })
 },[])
 


  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-lg transform hover:scale-105 transition-all duration-300">
        <div className="text-center">
          <img 
            src={user?.profilePicture} 
            alt="Profile" 
            className="w-32 h-32 mx-auto rounded-full shadow-lg border-4 border-white mb-4 transform hover:scale-110 transition-all duration-300"
          />
          <h2 className="text-4xl font-extrabold text-white mb-2">{user?.Name}</h2>
          <p className="text-lg text-gray-200 mb-8">{user?.bio}</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
            <div className="text-white">
              <p className="font-bold">Name:</p>
              <p>{user?.Name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
            <div className="text-white">
              <p className="font-bold">Email:</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
            <div className="text-white">
              <p className="font-bold">Phone:</p>
              <p>{user?.phone}</p>
            </div>
          </div>
          <a href="/editProfile"><button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110 mt-6"
          >
            Edit Profile
            <FontAwesomeIcon icon={faEdit} className="ml-2" />
          </button></a>
        </div>
      </div>
    </div>
  );
};

export default memo(UserProfile)
