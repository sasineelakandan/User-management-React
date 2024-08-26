import React from 'react'
import Sidebar from '../Compenets/Sidebar'
import Dashboard from '../Compenets/Dashboard'

const AdminHome = () => {
    return (
      <div className="flex">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div className="flex-2 p-6">
          <Dashboard />
        </div>
      </div>
    );
  }
  
  export default AdminHome;
  