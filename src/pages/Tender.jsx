import React, { useState } from "react";
import { FaEdit, FaHistory, FaRegEye } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";

const Tender = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: "",
    reference: "",
    customer: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      projectTitle: "",
      reference: "",
      customer: "",
      startDate: "",
      endDate: "",
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
        <h1 className="font-bold text-xl">Tenders</h1>
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
            <h2 className="text-xl font-semibold mb-4">Add New Tender</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-[6px] px-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm"
                  >
                    <option value="">Select Customer</option>
                    <option value="Customer 1">Customer 1</option>
                    <option value="Customer 2">Customer 2</option>
                    <option value="Customer 3">Customer 3</option>
                    <option value="Customer 4">Customer 4</option>
                  </select>
                </div>
              </div>
              {/* Reference and customer row */}
              <div className="flex justify-between items-center gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reference
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
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
            <th className="px-2 py-2 border text-sm">Title</th>
            <th className="px-2 py-2 border text-sm">Reference</th>
            <th className="px-2 py-2 border text-sm">Customer</th>
            <th className="px-2 py-2 border text-sm">Start Date</th>
            <th className="px-2 py-2 border text-sm">End Date</th>
            <th className="px-2 py-2 border text-sm">Status</th>
            <th className="px-2 py-2 border text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-3 py-2 border text-center">1</td>
            <td className="px-3 py-2 border text-xs">
              Three more die for dengue
            </td>
            <td className="px-3 py-2 border text-xs">Tender 1.2.3</td>
            <td className="px-3 py-2 border text-xs">Anil Kumar</td>
            <td className="px-3 py-2 border text-xs">23 Sep, 2022</td>
            <td className="px-3 py-2 border text-xs">30 Sep, 2022</td>
            <td className="px-3 py-2 border text-red-500 text-xs text-center">
              Closed
            </td>
            <td className="px-3 py-1 border text-center text-sm relative">
              <div className="dropdown dropdown-bottom dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="px-[6px] py-[5px] rounded-md text-white bg-blue-600"
                >
                  <IoMdArrowDropdownCircle className="text-2xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content bg-base-100 text-start w-36 pl-3 py-2 rounded-md shadow text-sm z-50"
                >
                  <li>
                    <a href="#" className="flex items-center space-x-2">
                      <FaRegEye />
                      <span>View</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-2">
                      <FaEdit />
                      <span>Edit</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-2">
                      <FaHistory />
                      <span>Project History</span>
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tender;
