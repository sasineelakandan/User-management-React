import React, { useEffect, useState } from 'react';
import Sidebar from '../Compenets/Sidebar'; // Adjust the import path as needed
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AddUserModal from './Modal';
import Swal from 'sweetalert2';
import { setAdmin } from '../redux/Slice';
import { useDispatch} from 'react-redux';
const UsersTable = () => {



const dispatch = useDispatch();
const[users,setUsers]=useState([]) 
const [searchQuery, setSearchQuery] = useState('');
const [isModalOpen, setModalOpen] = useState(false);
const openModal = () => setModalOpen(true);
const closeModal = () => setModalOpen(false);
const navigate=useNavigate() 

useEffect(()=>{
  axios.get('http://localhost:8000/users', { withCredentials: true })
  .then((response) => {
    if (response?.data?.failToken) {
      dispatch(setAdmin(false));
    }
    if (response?.data) {
      console.log(response.data);
      setUsers(response.data);
    }
  })
  .catch((err) => {
    console.log(err);
  })
  
},[])
console.log(users)
function handleClick(userId){
  navigate(`/edit?id=${userId}`);
}
function handleDelete(userId) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out of your account.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/Delete?id=${userId}`, {
       
        withCredentials: true
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'User deleted successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload()
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting the user.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem with the request.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }
  });
}

      
   
const handleSearch = () => {
  // Make a request to your backend with the search query
  axios.post(`http://localhost:8000/search?query=${encodeURIComponent(searchQuery)}`)
    .then((response)=>{
      setUsers(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
};

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Users..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button  onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              {users?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
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
                      <button onClick={() => handleDelete(user?._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2">
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