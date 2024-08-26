import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChartPie, FaCog } from 'react-icons/fa';

 

const Sidebar = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-gray-900 h-screen w-64 text-white p-5">
                <div className="text-2xl font-bold mb-10">Hello Admin</div>
                <nav>
                    <ul>
                        <li className="mb-6">
                            <Link to="/adminHome" className="flex items-center space-x-2">
                                <FaTachometerAlt />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="mb-6">
                            <Link to="/users" className="flex items-center space-x-2">
                                <FaUsers />
                                <span>Users</span>
                            </Link>
                        </li>
                        <li className="mb-6">
                            <Link to="/analytics" className="flex items-center space-x-2">
                                <FaChartPie />
                                <span>Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center space-x-2">
                                <FaCog />
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            
           
        </div>
    );
};

export default Sidebar;
