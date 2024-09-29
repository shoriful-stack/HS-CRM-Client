import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";

const Customers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        status: "",
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            status: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        closeModal();
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

            {/* Modal Open */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 hover:text-gray-700 text-3xl"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                            {/* Reference and customer row */}
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            {/* Project start date and end date row */}
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            {/* Modal Close  */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-teal-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* End of Modal */}

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
                        <td className="px-3 py-2 border text-sm">
                            Summit Towers Ltd.
                        </td>
                        <td className="px-3 py-2 border text-sm">+8801810313991</td>
                        <td className="px-3 py-2 border text-sm">hanif@gmail.com</td>
                        <td className="px-3 py-2 border text-sm">Plot No.31, , Sec-5, IMT Manesar, , Gurgaon - 122050, India</td>
                        <td className="px-3 py-2 border text-green-500 text-sm text-center">
                            Active
                        </td>
                        <td className="px-3 py-1 border text-center">
                            <div className="bg-blue-500 rounded-md pl-2 py-2">
                               <FaEdit className="bg-blue-500 text-white"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Customers;