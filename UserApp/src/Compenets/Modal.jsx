import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const AddUserModal = ({ isOpen, onClose }) => {
   
  const { register, handleSubmit, formState: { errors } } = useForm();

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
                window.location.reload() 
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
  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl mb-4">Add User</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          className="w-full px-3 py-2 border rounded"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded"
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Invalid phone number',
            },
          })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add User
      </button>
    </form>
    <button
      onClick={onClose}
      className="mt-4 text-red-500"
    >
      Close
    </button>
  </div>
</div>

  );
};

export default AddUserModal;