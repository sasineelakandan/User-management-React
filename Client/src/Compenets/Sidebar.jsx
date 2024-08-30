import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChartPie, FaCog } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../redux/Slice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
        const Admin = useSelector((state) => state.isAdmin); 
    function handleclick(){
        
        dispatch(setAdmin(false))
        navigate('/adminlogin') 
        
    }
    return (
        
            <div className="flex">
                {/* Sidebar */}
                <div className="bg-gray-900 h-screen w-64 text-white p-5">
                    <div className="text-2xl font-bold mb-10">Hello Admin</div>
                    <nav>
                        <ul>
                            <li className="mb-6">
                                <Link 
                                    to="/adminHome" 
                                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaTachometerAlt />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className="mb-6">
                                <Link 
                                    to="/users" 
                                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaUsers />
                                    <span>Users</span>
                                </Link>
                            </li>
                            <li className="mb-6">
                                <button 
                                    onClick={handleclick} 
                                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 hover:text-red-300 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaUsers />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    };
export default Sidebar;
