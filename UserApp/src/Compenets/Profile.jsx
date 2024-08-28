import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCamera, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/Slice';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage} from '../firbase/firebase.js'; 
import { useNavigate } from 'react-router-dom'; // Added import for navigation

const UserProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const user = useSelector((state) => state.user.user);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/profile', { withCredentials: true })
      .then(response => {
        if (response.data) {
          dispatch(setUser(response.data.user));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  const handleclick = () => {
    dispatch(setUser(null));
    navigate('/');
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    
    setImages([img]);
   
    if (img) {
      console.log('hai')
      const storageRef = ref(storage, `profilePictures/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log(storageRef)
      console.log(uploadTask)
     
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optionally handle progress updates here
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed", error);
      },
      () => {
        // Handle successful uploads and get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          axios.patch(`http://localhost:8000/Images?Url=${downloadURL}&&id=${user._id}`,{withCredentials:true})
          .then((response)=>{
           if(response.data.success){
             window.location.reload()
           }
          }).catch((err)=>{
            console.log(err)
          })
        });
      }
    );
  }
};

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 h-screen w-64 text-white p-5 flex flex-col items-center">
        <div className="bg-gray-800 bg-opacity-50 rounded-3xl p-6 shadow-2xl w-full transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            {/* Profile Picture Input */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={user?.profilePicture}
                alt='img'
                className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
              />
              <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md">
                <FontAwesomeIcon icon={faCamera} className="text-gray-700 text-sm" />
              </label>
              <input
                type="file"
                id="profilePicture"
                className="hidden"
                onChange={handleImage}
                accept="image/*"
              />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2">{user?.Name}</h2>
            <p className="text-sm text-gray-300 mb-4">{user?.bio}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 text-lg" />
              <div>
                <p className="font-bold text-sm">Name:</p>
                <p className="text-sm">{user?.Name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-lg" />
              <div>
                <p className="font-bold text-sm">Email:</p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-gray-400 text-lg" />
              <div>
                <p className="font-bold text-sm">Phone:</p>
                <p className="text-sm">{user?.phone}</p>
              </div>
            </div>

            <button
              onClick={handleclick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-3 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110 mt-4"
            >
              LogOut
              <FontAwesomeIcon icon={faUser} className="ml-2" />
            </button>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Your main content goes here */}
        <h1 className="text-2xl font-bold">Main Content Area</h1>
        {/* Add more content as needed */}
      </div>
    </div>
  );
}

export default UserProfile;
