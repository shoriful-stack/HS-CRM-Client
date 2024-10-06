import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import EditDesignationModal from "../Components/EditDesignationModal";
import AddDesignationModal from "../Components/AddDesignationModal";
import useDesignation from "../Hooks/useDesignation";

const Designation = () => {
    const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
    const [editDesignationModalOpen, setEditDesignationModalOpen] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    // Fetch Designation
    const [data, loading, refetch] = useDesignation(currentPage, limit); // This hook contain the 1st 10 data of designation collection cause of pagination
    const designations = data?.designations || [];
    const total = data?.total || 0;
    const totalPages = data?.totalPages || 1;

    const openDesignationModal = () => {
        setIsDesignationModalOpen(true);
    };

    const openEditModal = (designation) => {
        setSelectedDesignation(designation);
        setEditDesignationModalOpen(true);
    }

    // Pagination Handlers
    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        const startDesignation = (currentPage - 1) * limit + 1;
        const endDesignation = Math.min(currentPage * limit, total);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageSelect(i)}
                    className={`px-2 py-[2px] rounded-md mx-[2px] ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex justify-between items-center mt-4">
                {/* Show customer range information */}
                <span className="text-sm text-gray-600">
                    Showing {startDesignation} to {endDesignation} of {total} Designation
                </span>

                <div className="flex items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded-md mx-1 bg-gray-200 disabled:opacity-50"
                    >
                        <TbPlayerTrackPrevFilled />
                    </button>
                    {pages}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded-md mx-1 bg-gray-200 disabled:opacity-50"
                    >
                        <TbPlayerTrackNextFilled />
                    </button>
                </div>
            </div>
        );
    };
    return (
        <div className="font-lexend">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl">Designations</h1>
                <div className="flex items-center gap-1">
                    <button
                        onClick={openDesignationModal}
                        className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <IoAddCircleSharp className="w-5 h-4" />
                        <span className="text-xs">Add New</span>
                    </button>
                </div>
            </div>

            {/* Show Loader when loading */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    <table className="table table-xs w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-1 py-2 border text-sm">Sl.No.</th>
                                <th className="px-2 py-2 border text-sm">Designation</th>
                                <th className="px-2 py-2 border text-sm">Status</th>
                                <th className="px-2 py-2 border text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">No Designation available.</td>
                                </tr>
                            ) : (designations?.map((designation, index) =>
                                <tr key={designation._id} className="bg-gray-100">
                                    <td className="px-1 py-1 border text-center">{index + 1 + (currentPage - 1) * limit}</td>
                                    <td className="px-3 py-1 border text-xs">
                                        {designation.designation}
                                    </td>
                                    <td className="px-2 py-1 border text-xs text-center">
                                        <p
                                            className={`px-1 py-1 text-xs font-semibold rounded-md ${designation.designation_status === 'Active' ? 'bg-green-500 text-white' :
                                                designation.designation_status === 'Inactive' ? 'bg-red-500 text-white' :
                                                    ''
                                                }`}
                                        >
                                            {designation.designation_status === 'Active' ? 'Active' :
                                                designation.designation_status === 'Inactive' ? 'Inactive' :
                                                    ''}
                                        </p>
                                    </td>
                                    <td className="px-2 py-1 border text-center">
                                        <button onClick={() => openEditModal(designation)} className="bg-blue-500 rounded-md px-2 py-2 w-8">
                                            <FaEdit className="bg-blue-500 text-white" />
                                        </button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                    {/* Pagination control */}
                    {renderPagination()}
                </>

            )}

            <AddDesignationModal isDesignationModalOpen={isDesignationModalOpen} setIsDesignationModalOpen={setIsDesignationModalOpen} refetch={refetch} />
            <EditDesignationModal editDesignationModalOpen={editDesignationModalOpen} setEditDesignationModalOpen={setEditDesignationModalOpen} designation={selectedDesignation} refetch={refetch}></EditDesignationModal>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Designation;