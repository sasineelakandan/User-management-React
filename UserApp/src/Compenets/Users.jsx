import React, { useEffect, useState } from 'react';
import Sidebar from '../Compenets/Sidebar'; // Adjust the import path as needed
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AddUserModal from './Modal';

const UsersTable = () => {
const[users,setUsers]=useState([]) 
const [isModalOpen, setModalOpen] = useState(false);
const openModal = () => setModalOpen(true);
const closeModal = () => setModalOpen(false);
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
console.log(users)
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
          <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-3xl font-bold">Users Table</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search Users..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
             </button>
              <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Add User
              </button>
              <AddUserModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
          </div>
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
                  <td colSpan="4" className="py-2 px-4 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user?._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user?.Name}</td>
                    <td className="py-2 px-4">{user?.phone}</td>
                    <td className="py-2 px-4">{user?.email}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleClick(user?._id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2">
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