import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import AddModal from "../Components/AddModal";
import { ToastContainer } from "react-toastify";
import EditCustomerModal from "../Components/EditCustomerModal";
import useCustomer from "../Hooks/useCustomer";
import Loader from "../Components/Loader";
import { TbDatabaseExport } from "react-icons/tb";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    const [customers, loading,] = useCustomer();
    const handleExport = () => {
        const data = customers.map((customer, index) => ({
            "SL.NO.": index + 1,
            "Name": customer.name,
            "Phone": customer.phone,
            "Email": customer.email,
            "Address": customer.address,
            "Status": customer.status,
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'customers.xlsx');
    };

    return (
        <div className="font-lexend">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl">Customers</h1>
                <div className="flex items-center gap-1">
                    <button
                        onClick={openModal}
                        className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <IoAddCircleSharp className="w-5 h-5" />
                        <span className="text-sm">Add New</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <TbDatabaseExport className="w-5 h-4" />
                        <span className="text-sm">Export</span>
                    </button>
                </div>
            </div>

            {/* Show Loader when loading */}
            {loading ? (
                <Loader />
            ) : (
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
                        {customers?.map((customer, index) =>
                            <tr key={customer._id} className="bg-gray-100">
                                <td className="px-1 py-1 border text-center">{index + 1}</td>
                                <td className="px-3 py-1 border text-xs">
                                    {customer.name}
                                </td>
                                <td className="px-3 py-1 border text-xs">{customer.phone}</td>
                                <td className="px-3 py-1 border text-xs">{customer.email}</td>
                                <td className="px-3 py-1 border text-xs">{customer.address}</td>
                                <td className="px-2 py-1 border text-xs text-center">
                                    <p
                                        className={`px-1 py-1 text-xs font-semibold rounded-md ${customer.status === 'Active' ? 'bg-green-500 text-white' :
                                                customer.status === 'Inactive' ? 'bg-red-500 text-white' :
                                                    ''
                                            }`}
                                    >
                                        {customer.status === 'Active' ? 'Active' :
                                            customer.status === 'Inactive' ? 'Inactive' :
                                                ''}
                                    </p>
                                </td>
                                <td className="px-2 py-1 border text-center">
                                    <button onClick={() => openEditModal(customer)} className="bg-blue-500 rounded-md px-2 py-2 w-8">
                                        <FaEdit className="bg-blue-500 text-white" />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            )}

            <AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <EditCustomerModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} customer={selectedCustomer}></EditCustomerModal>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Customers;