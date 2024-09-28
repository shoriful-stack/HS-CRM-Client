import React from 'react';
import { FaMoneyCheckAlt, FaUsers, FaShoppingCart } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Revenue Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-bold">Revenue</h2>
                    <div className="flex items-center justify-between">
                        <FaMoneyCheckAlt className='text-3xl' />
                        <span className="text-4xl font-bold">5</span>
                    </div>
                    <p className="text-sm text-gray-600">June 1st - July 1st</p>
                </div>

                {/* Users Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-bold">Users</h2>
                    <div className="flex items-center justify-between">
                        <FaUsers className='text-3xl' />
                        <span className="text-4xl font-bold">200</span>
                    </div>
                    <p className="text-sm text-gray-600">Active Users</p>
                </div>

                {/* Orders Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-bold">Orders</h2>
                    <div className="flex items-center justify-between">
                        <FaShoppingCart className='text-3xl' />
                        <span className="text-4xl font-bold">150</span>
                    </div>
                    <p className="text-sm text-gray-600">Completed Orders</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
