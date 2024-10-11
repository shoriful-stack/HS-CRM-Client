import React from 'react';
import { FaMoneyCheckAlt, FaUsers, FaShoppingCart } from 'react-icons/fa';
import useAllContract from '../Hooks/useAllContract';
import { GrUserWorker } from 'react-icons/gr';

const Dashboard = () => {
    const [allContracts] = useAllContract();
    return (
        <div className='font-lexend'>
            <h1 className='text-2xl font-bold my-2 px-1'>Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Total Tenders Card */}
                <div className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-lg p-4 text-white">
                    <h2 className="text-xl font-semibold">Total Contracts</h2>
                    <div className="flex items-center justify-between mt-1">
                        <FaMoneyCheckAlt className='text-4xl' />
                        <span className="text-2xl font-bold">{allContracts.length}</span>
                    </div>
                    {/* <p className="text-sm text-white">June 1st - July 1st</p> */}
                </div>

                {/*Total Users Card */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Customers</h2>
                    <div className="flex items-center justify-between mt-1">
                        <FaUsers className='text-3xl' />
                        <span className="text-2xl font-semibold">200</span>
                    </div>
                    {/* <p className="text-sm text-white">Active Users</p> */}
                </div>

                {/* Active Users Card */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Employees</h2>
                    <div className="flex items-center justify-between mt-1">
                        <GrUserWorker className='text-3xl' />
                        <span className="text-2xl font-semibold">150</span>
                    </div>
                    {/* <p className="text-sm text-white">Completed Orders</p> */}
                </div>
                {/* Inactive Users Card */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Inactive Users</h2>
                    <div className="flex items-center justify-between mt-1">
                        <FaShoppingCart className='text-4xl' />
                        <span className="text-2xl font-semibold">150</span>
                    </div>
                    {/* <p className="text-sm text-white">Completed Orders</p> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
