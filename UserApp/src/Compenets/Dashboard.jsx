import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const Dashboard = () => {
    const userGrowthData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Users',
                backgroundColor: '#4c51bf',
                data: [65, 59, 80, 81, 56, 55]
            }
        ]
    };

    const revenueData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: '#48bb78',
                data: [5000, 7000, 8000, 6000, 9000, 12000]
            }
        ]
    };

    const serverStatusData = {
        labels: ['Online', 'Offline'],
        datasets: [
            {
                label: 'Server Status',
                backgroundColor: ['#38b2ac', '#e53e3e'],
                data: [90, 10]
            }
        ]
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">User Growth</h3>
                    <Bar data={userGrowthData} />
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue</h3>
                    <Line data={revenueData} />
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Server Status</h3>
                    <Doughnut data={serverStatusData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
