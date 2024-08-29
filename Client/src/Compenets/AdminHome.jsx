import React from 'react'
import Sidebar from '../Compenets/Sidebar'
import Dashboard from '../Compenets/Dashboard'

const AdminHome = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
     
        <div className="h-full w-full" >
          <Dashboard />
        </div>
      </div>
    
  );
}

export default AdminHome;
