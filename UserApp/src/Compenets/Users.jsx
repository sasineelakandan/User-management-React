import React, { useEffect, useState } from 'react';
import Sidebar from '../Compenets/Sidebar'; // Adjust the import path as needed
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const UsersTable = () => {
const[users,setUsers]=useState([]) 
const navigate=useNavigate() 
useEffect(()=>{
  axios.get('http://localhost:8000/Users', { withCredentials: true })
  .then((response) => {
    if(response.data){
    setUsers(response.data);
     
    }
  })
  .catch((err) => {
    console.log(err);
  });
  
},[])

function handleClick(userId){
  navigate(`/edit?id=${userId}`);
}

    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white h-screen fixed">
          <Sidebar /> {/* Ensure Sidebar is styled correctly */}
        </div>
        {/* Main Content */}
        <div className="flex-1 ml-64 p-5 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold p-4 border-b">Users Table</h1>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-2 px-4 text-center">No users found</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{user.Name}</td>
                      <td className="py-2 px-4">{user?.phone}</td>
                      <td className="py-2 px-4">{user?.email}</td>
                      <td className="py-2 px-4">
                    
                      <button key={user._id}
                       onClick={() => handleClick(user._id)}   className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Edit
                     </button>
                   
                      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Delete
                      </button>
                      </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default UsersTable;