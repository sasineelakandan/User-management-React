import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCamera,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Slice";
import { uploadImagesToFireStore } from "../firbase/firebase.js";
import { useNavigate } from "react-router-dom"; // Added import for navigation
import Swal from "sweetalert2";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [image, setImage] = useState(null);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          dispatch(setUser(response.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, changed]);

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setUser(null));
        navigate("/");
      }
    });
  }

  const uploadImage = async () => {
    try {
      if (!image) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Select an image to upload!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const imageUrl = await uploadImagesToFireStore(image, user._id);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, url: imageUrl })
        );
        setImage(imageUrl);
        Swal.fire({
          icon: "success",
          title: "Image Uploaded!",
          text: "Image uploaded successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setChanged((p) => !p);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Something went wrong while uploading the image.",
        timer: 2000,
        showConfirmButton: false,
      });
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
                src={user?.profilePicture || "/default-profile.png"} // Fallback to default image if none is set
                alt="Profile"
                id="profile-img"
                className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md"
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-gray-700 text-sm"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                className="mb-2 hidden" // Hide the input by default
                id="profilePicture"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imgElement = document.getElementById("profile-img");
                    imgElement.src = URL.createObjectURL(file);
                    setImage(file);
                  }
                }}
              />
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2">
              {user?.Name}
            </h2>
            <p className="text-sm text-gray-300 mb-4">{user?.bio}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-400 text-lg"
              />
              <div>
                <p className="font-bold text-sm">Name:</p>
                <p className="text-sm">{user?.Name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 text-lg"
              />
              <div>
                <p className="font-bold text-sm">Email:</p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-gray-400 text-lg"
              />
              <div>
                <p className="font-bold text-sm">Phone:</p>
                <p className="text-sm">{user?.phone}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-3 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110 mt-4"
            >
              LogOut
              <FontAwesomeIcon icon={faUser} className="ml-2" />
            </button>
          </div>

          <button
            onClick={uploadImage}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 px-3 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-teal-500 transition duration-300 transform hover:scale-110"
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture || "/default-profile.png"} // Fallback to default image if none is set
              alt="Profile"
              id="profile-img"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.Name}</h2>
              <p className="text-gray-600">Software Developer</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Recent Activity
            </h3>
            <ul className="text-gray-600">
              <li className="mb-2">• Completed React project.</li>
              <li className="mb-2">• Joined a new team.</li>
              <li>• Started learning TypeScript.</li>
            </ul>
          </div>

          {/* Notifications Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Notifications
            </h3>
            <ul className="text-gray-600">
              <li className="mb-2">• You have 3 new messages.</li>
              <li className="mb-2">• Update available for your project.</li>
              <li>• Upcoming meeting at 3 PM.</li>
            </ul>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Project Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="text-gray-600">70% Completed</p>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Tasks</h3>
            <ul className="text-gray-600">
              <li className="mb-2">• Finish the design review.</li>
              <li className="mb-2">• Submit the weekly report.</li>
              <li>• Review code PRs.</li>
            </ul>
          </div>

          {/* Team Updates Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Team Updates
            </h3>
            <ul className="text-gray-600">
              <li className="mb-2">• Sarah completed the UI task.</li>
              <li className="mb-2">• Team meeting rescheduled to Friday.</li>
              <li>• New team member joining tomorrow.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
