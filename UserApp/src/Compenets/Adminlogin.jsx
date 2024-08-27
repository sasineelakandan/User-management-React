import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setAdmin } from '../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

const ALoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Admin = useSelector((state) => state.isAdmin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post('http://localhost:8000/adminLogin', data, { withCredentials: true })
      .then(response => {
        if(response.data.passVer){
          Swal.fire({
            title: 'Error!',
            text: 'Admin Login failed! Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
          }).then(() => {
            navigate('/adminLogin');
          });
        }
        if(response.data.AdminVer){
            dispatch(setAdmin(response.data.AdminVer));
          Swal.fire({
            title: 'Success!',
            text: 'Admin Login successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/adminHome');
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Admin Login failed! Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
          }).then(() => {
            navigate('/adminLogin');
          });
        }
      })
      .catch(error => {
        console.error('There was an error submitting the data:', error);
      });
  };
  console.log(Admin)
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-black via-gray-900 to-gray-800">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center animate-pulse">Admin Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-field relative">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="w-full px-5 py-3 rounded-lg bg-gray-800 focus:bg-gray-700 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-400 transition duration-200"
              placeholder="Email Address"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-white" />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="input-field relative">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              id="password"
              className="w-full px-5 py-3 rounded-lg bg-gray-800 focus:bg-gray-700 focus:ring-4 focus:ring-pink-500 text-white placeholder-gray-400 transition duration-200"
              placeholder="Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute right-4 top-4 text-white" />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-pink-500 transition duration-300 transform hover:scale-110"
          >
            Log In
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </form>
       
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faFacebookF} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faTwitter} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faGoogle} className="fab text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ALoginForm;
