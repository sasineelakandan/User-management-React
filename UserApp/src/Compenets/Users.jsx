import React from 'react';
import Sidebar from '../Compenets/Sidebar'; // Adjust the import path as needed



const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

const UsersTable = () => {
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
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
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
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{user.id}</td>
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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