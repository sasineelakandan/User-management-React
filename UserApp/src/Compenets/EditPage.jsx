import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditPage = () => {
    const navigate=useNavigate()
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const userId = params.get('id');
    const [user, setUser] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get(`http://localhost:8000/edit?id=${userId}`, { withCredentials: true })
            .then((response) => {
                if (response.data) {
                    setUser(response.data);
                    
                    reset({
                        name: response.data.Name,
                        email: response.data.email,
                        phone: response.data.phone,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId, reset]);

    const onSubmit = (data) => {
        axios.put(`http://localhost:8000/updateuser?id=${userId}`,data, { withCredentials: true })
        .then((response)=>{
        if(response.data.sucess){
            Swal.fire({
                title: 'Success!',
                text: 'Update successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                navigate('/users'); 
              });
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'this email and phone  alredy create.',
                icon: 'error',
                confirmButtonText: 'Retry'
              }).then(() => {
                navigate('/users'); 
              });
        }
        })
        .catch((err)=>{
            console.log(err)
        })
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white fixed h-full">
                <Sidebar />
            </div>

            {/* Edit Form */}
            <div className="flex-grow ml-64 p-8 bg-gray-100">
                <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Invalid phone number',
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPage;
