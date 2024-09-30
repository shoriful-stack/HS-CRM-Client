import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import AddModal from "../Components/AddModal";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EditCustomerModal from "../Components/EditCustomerModal";


const Customers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setEditModalOpen(true);
    }
    const axiosSecure = useAxiosSecure();
    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await axiosSecure.get("/customers");
            return res.data;
        }
    })
    return (
        <div className="font-lexend">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl">Customers</h1>
                <div className="flex items-center">
                    <button
                        onClick={openModal}
                        className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <IoAddCircleSharp className="w-5 h-5" />
                        <span className="text-sm">Add New</span>
                    </button>
                </div>
            </div>

            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="px-1 py-2 border text-sm">SL.NO.</th>
                        <th className="px-2 py-2 border text-sm">Name</th>
                        <th className="px-2 py-2 border text-sm">Phone</th>
                        <th className="px-2 py-2 border text-sm">Email</th>
                        <th className="px-2 py-2 border text-sm">Address</th>
                        <th className="px-2 py-2 border text-sm">Status</th>
                        <th className="px-2 py-2 border text-sm">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers?.map((customer, index) => 
                        <tr key={customer._id} className="bg-gray-100">
                            <td className="px-1 py-2 border text-center">{index + 1}</td>
                            <td className="px-3 py-2 border text-xs">
                                {customer.name}
                            </td>
                            <td className="px-3 py-2 border text-xs">{customer.phone}</td>
                            <td className="px-3 py-2 border text-xs">{customer.email}</td>
                            <td className="px-3 py-2 border text-xs">{customer.address}</td>
                            <td className="px-3 py-2 border text-green-500 text-xs text-center">
                                {customer.status}
                            </td>
                            <td className="px-3 py-2 border text-center">
                                <button onClick={()=>openEditModal(customer)} className="bg-blue-500 rounded-md px-2 py-2 w-8">
                                    <FaEdit className="bg-blue-500 text-white" />
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <EditCustomerModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} customer={selectedCustomer}></EditCustomerModal>
            <ToastContainer></ToastContainer>
        </div>
    );
}
export default Customers;