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
                            <button onClick={handleclick} className="flex items-center space-x-2">
                                <FaUsers />
                                <span>logout</span>
                            </button>
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
