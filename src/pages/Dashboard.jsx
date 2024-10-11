import React from 'react';
import { FaMoneyCheckAlt, FaUsers, FaShoppingCart } from 'react-icons/fa';
import useAllContract from '../Hooks/useAllContract';
import { GrUserWorker } from 'react-icons/gr';
import useAllCustomer from '../Hooks/useAllCustomers';
import { RiProjectorFill } from 'react-icons/ri';
import useAllEmployee from '../Hooks/useAllEmployees';
import useAllProject from '../Hooks/useAllProject';

const Dashboard = () => {
    const [allContracts] = useAllContract();
    const [allCustomers] = useAllCustomer();
    const [allProjects] = useAllProject();
    const [allEmployees] = useAllEmployee();
    return (
        <div className='font-lexend'>
            <h1 className='text-xl font-bold my-2'>Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Total Tenders Card */}
                <div className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] shadow-lg rounded-lg px-5 py-4 text-white">
                    <h2 className="text-lg font-semibold">Total Contracts</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaMoneyCheckAlt className='text-[32px]' />
                        <span className="text-xl font-semibold">{allContracts.length}</span>
                    </div>
                    {/* <p className="text-sm text-white">June 1st - July 1st</p> */}
                </div>
                {/*Total Users Card */}
                <div className="bg-gradient-to-r from-indigo-900 to-[#4286f4] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Projects</h2>
                    <div className="flex items-center justify-between mt-2">
                        <RiProjectorFill className='text-3xl' />
                        <span className="text-xl font-semibold">{allProjects.length}</span>
                    </div>
                </div>
                {/* Employee Card */}
                <div className="bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Customers</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaUsers className='text-3xl' />
                        <span className="text-xl font-semibold">{allCustomers.length}</span>
                    </div>
                </div>
                {/* Inactive Users Card */}
                <div className="bg-gradient-to-r from-[#FF0099] to-[#493240]  text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Employees</h2>
                    <div className="flex items-center justify-between mt-2">
                        <GrUserWorker className='text-[26px] font-extrabold' />
                        <span className="text-xl font-semibold">{allEmployees.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
