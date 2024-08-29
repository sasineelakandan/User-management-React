import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddUserModal = ({ isOpen, onClose }) => {
    
  
  const { register, handleSubmit, formState: { errors } } = useForm();
 const navigate=useNavigate()
  const onSubmit = (data) => {
    
        axios.put(`http://localhost:8000/addUser`, data,{ withCredentials: true })
    .then((response)=>{
        if(response.data.success){
            
            Swal.fire({
                title: 'Success!',
                text: 'Add user successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.reload()
              });
        }
        if(response.data.userExists){
            Swal.fire({
                title: 'Error!',
                text: 'User Alredy Exits.',
                icon: 'error',
                confirmButtonText: 'Retry'
              }).then(() => {
                navigate('/users') 
              });
        }
    })
    .catch((err)=>{
        console.log(err)
    })

   
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number',
              },
            })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Add User
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 text-red-500 underline hover:text-red-600 focus:outline-none"
      >
        Close
      </button>
    </div>
  </div>
  

  );
};

export default AddUserModal;