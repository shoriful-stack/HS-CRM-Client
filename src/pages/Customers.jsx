import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import AddModal from "../Components/AddModal";
import { ToastContainer } from "react-toastify";



const Customers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
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
                        <th className="px-2 py-2 border text-sm">SL.NO.</th>
                        <th className="px-2 py-2 border text-sm">Name</th>
                        <th className="px-2 py-2 border text-sm">Phone</th>
                        <th className="px-2 py-2 border text-sm">Email</th>
                        <th className="px-2 py-2 border text-sm">Address</th>
                        <th className="px-2 py-2 border text-sm">Status</th>
                        <th className="px-2 py-2 border text-sm">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-100">
                        <td className="px-3 py-2 border text-center">1</td>
                        <td className="px-3 py-2 border text-xs">
                            Summit Towers Ltd.
                        </td>
                        <td className="px-3 py-2 border text-xs">+8801810313991</td>
                        <td className="px-3 py-2 border text-xs">hanif@gmail.com</td>
                        <td className="px-3 py-2 border text-xs">Plot No.31, , Sec-5, IMT Manesar, , Gurgaon - 122050, India</td>
                        <td className="px-3 py-2 border text-green-500 text-xs text-center">
                            Active
                        </td>
                        <td className="px-3 py-2 border text-center">
                            <div className="bg-blue-500 rounded-md pl-2 py-2">
                                <FaEdit className="bg-blue-500 text-white" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <ToastContainer></ToastContainer>
        </div>
    );
}
export default Customers;