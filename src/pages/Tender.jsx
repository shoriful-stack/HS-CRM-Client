import React, { useState } from "react";
import { FaEdit, FaFileImport, FaHistory, FaRegEye } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import AddTenderModal from "../Components/AddTenderModal";
import { TbDatabaseExport } from "react-icons/tb";
import { ToastContainer } from "react-toastify";

const Tender = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };


  return (
    <div className="font-lexend">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-xl">Tenders</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
          >
            <IoAddCircleSharp className="w-5 h-4" />
            <span className="text-xs">Add New</span>
          </button>
          <button
            className="bg-blue-700 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
          >
            <FaFileImport className="w-5 h-4" />
            <span className="text-xs">Import</span>
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
          >
            <TbDatabaseExport className="w-5 h-4" />
            <span className="text-xs">Export</span>
          </button>
        </div>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-2 py-2 border text-sm">Sl.No.</th>
            <th className="px-2 py-2 border text-sm">Project Name</th>
            <th className="px-2 py-2 border text-sm">Customer Name</th>
            <th className="px-2 py-2 border text-sm">Project Category</th>
            <th className="px-2 py-2 border text-sm">Department</th>
            <th className="px-2 py-2 border text-sm">HOD</th>
            <th className="px-2 py-2 border text-sm">PM</th>
            <th className="px-2 py-2 border text-sm">Year</th>
            <th className="px-2 py-2 border text-sm">Phase</th>
            <th className="px-2 py-2 border text-sm">Project Code</th>
            <th className="px-2 py-2 border text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-3 py-2 border text-center">1</td>
            <td className="px-3 py-2 border text-xs">Rollout</td>
            <td className="px-3 py-2 border text-xs">Summit Towers Ltd.</td>
            <td className="px-3 py-2 border text-xs">Service</td>
            <td className="px-3 py-2 border text-xs">DCPS</td>
            <td className="px-3 py-2 border text-xs">Anil Kumar</td>
            <td className="px-3 py-2 border text-xs">Helal Uddin</td>
            <td className="px-3 py-2 border text-xs">
              2024
            </td>
            <td className="px-3 py-2 border text-xs">Step 1</td>
            <td className="px-3 py-2 border text-xs">DCPS_BTS</td>
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
      <AddTenderModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Tender;
