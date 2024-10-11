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
        <div className='font-lexend px-2'>
            <h1 className='text-2xl font-bold mt-1 mb-2'>Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/*Total Projects Card */}
                <div className="bg-gradient-to-r from-[#000428] to-[#004e92] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Projects</h2>
                    <div className="flex items-center justify-between mt-2">
                        <RiProjectorFill className='text-3xl' />
                        <span className="text-xl font-semibold">{allProjects.length}</span>
                    </div>
                </div>
                {/* Total Tenders Card */}
                <div className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] shadow-lg rounded-lg px-5 py-4 text-white">
                    <h2 className="text-lg font-semibold">Total Contracts</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaMoneyCheckAlt className='text-[32px]' />
                        <span className="text-xl font-semibold">{allContracts.length}</span>
                    </div>
                </div>
                {/* Employee Card */}
                <div className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Customers</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaUsers className='text-3xl' />
                        <span className="text-xl font-semibold">{allCustomers.length}</span>
                    </div>
                </div>
                {/* Inactive Users Card */}
                <div className="bg-gradient-to-r from-[#000428] to-[#004e92] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Total Employees</h2>
                    <div className="flex items-center justify-between mt-2">
                        <GrUserWorker className='text-[26px] font-extrabold' />
                        <span className="text-xl font-semibold">{allEmployees.length}</span>
                    </div>
                </div>
                {/*Total Users Card */}
                <div className="bg-gradient-to-r from-[#000428] to-[#004e92] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Assigned Projects</h2>
                    <div className="flex items-center justify-between mt-2">
                        <RiProjectorFill className='text-3xl' />
                        <span className="text-xl font-semibold">{allContracts.length}</span>
                    </div>
                </div>
                {/* Total Tenders Card */}
                <div className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] shadow-lg rounded-lg px-5 py-4 text-white">
                    <h2 className="text-lg font-semibold">Expired Contracts</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaMoneyCheckAlt className='text-[32px]' />
                        <span className="text-xl font-semibold">{allContracts.filter(contract => (contract.contract_status) === "0" ).length}</span>
                    </div>
                    {/* <p className="text-sm text-white">June 1st - July 1st</p> */}
                </div>
                {/* Employee Card */}
                <div className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Active Customers</h2>
                    <div className="flex items-center justify-between mt-2">
                        <FaUsers className='text-3xl' />
                        <span className="text-xl font-semibold">{allCustomers.filter(customer => (customer.status) === "1" ).length}</span>
                    </div>
                </div>
                {/* Inactive Users Card */}
                <div className="bg-gradient-to-r from-[#000428] to-[#004e92]  text-white shadow-lg rounded-lg px-5 py-4">
                    <h2 className="text-lg font-semibold">Active Employees</h2>
                    <div className="flex items-center justify-between mt-2">
                        <GrUserWorker className='text-[26px] font-extrabold' />
                        <span className="text-xl font-semibold">3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
