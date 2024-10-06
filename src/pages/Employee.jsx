import { useState } from "react";
import { FaEdit, FaFileImport, FaRegEye } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import EditCustomerModal from "../Components/EditCustomerModal";
import Loader from "../Components/Loader";
import { TbDatabaseExport, TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ImportModal from "../Components/ImportModal";
import AddEmployeeModal from "../Components/AddEmployeeModal";
import useEmployee from "../Hooks/useEmployee";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import EditEmployeeModal from "../Components/EditEmployeeModal";

const Employees = () => {
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    // Fetch Employees
    const [data, loading, refetch] = useEmployee(currentPage, limit); // This hook contain the 1st 10 data of customer collection cause of pagination
    const employees = data?.employees || [];
    const total = data?.total || 0;
    const totalPages = data?.totalPages || 1;

    const openModal = () => {
        setIsEmployeeModalOpen(true);
    };
    const openEditEmployeeModal = (employee) => {
        setSelectedEmployee(employee);
        setEditEmployeeModalOpen(true);
    }

    const openImportModal = () => {
        setImportModalOpen(true);
    };

    const handleImport = async (employeesData) => {
        try {
            const response = await axiosSecure.post("/employees/all", employeesData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                refetch();
            } else {
                toast.error("Import failed!");
            }
        } catch (error) {
            console.error("Import failed:", error);
            toast.error("Import failed: " + (error.response?.data?.message || error.message));
        }
    };


    const handleExport = async () => {
        try {
            // Fetch all Employees from the new API endpoint
            const response = await axiosSecure.get("/employees/all");

            if (response.status === 200) {
                const allEmployees = response.data;

                // Prepare the data for export
                const data = allEmployees.map((customer, index) => ({
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
                XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                // Download the file
                const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
                saveAs(dataBlob, 'employees.xlsx');
            }
        } catch (error) {
            console.error("Failed to export Employees:", error);
            // Show an error message if needed
        }
    };

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

        const startCustomer = (currentPage - 1) * limit + 1;
        const endCustomer = Math.min(currentPage * limit, total);

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
                    Showing {startCustomer} to {endCustomer} of {total} Employees
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
                <h1 className="font-bold text-xl">Employees</h1>
                <div className="flex items-center gap-1">
                    <button
                        onClick={openModal}
                        className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <IoAddCircleSharp className="w-5 h-4" />
                        <span className="text-xs">Add New</span>
                    </button>
                    <button
                        onClick={openImportModal}
                        className="bg-blue-700 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <FaFileImport className="w-5 h-4" />
                        <span className="text-xs">Import</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-black flex items-center gap-1"
                    >
                        <TbDatabaseExport className="w-5 h-4" />
                        <span className="text-xs">Export</span>
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
                                <th className="px-1 py-2 border text-sm">UID</th>
                                <th className="px-2 py-2 border text-sm">Name</th>
                                <th className="px-2 py-2 border text-sm">Phone</th>
                                <th className="px-2 py-2 border text-sm">Email</th>
                                <th className="px-2 py-2 border text-sm">Department</th>
                                <th className="px-2 py-2 border text-sm">Designation</th>
                                <th className="px-2 py-2 border text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">No Employees available.</td>
                                </tr>
                            ) : (employees?.map((employee, index) =>
                                <tr key={employee._id} className="bg-gray-100">
                                    <td className="px-1 py-1 border text-center">{index + 1 + (currentPage - 1) * limit}</td>
                                    <td className="px-3 py-1 border text-xs">
                                        {employee.employee_uid}
                                    </td>
                                    <td className="px-3 py-1 border text-xs">
                                        {employee.employee_name}
                                    </td>
                                    <td className="px-3 py-1 border text-xs">{employee.employee_phone}</td>
                                    <td className="px-3 py-1 border text-xs">{employee.employee_email}</td>
                                    <td className="px-3 py-1 border text-xs">{employee.department_name}</td>
                                    <td className="px-3 py-1 border text-xs">{employee.designation}</td>
                                    <td className="px-1 py-[1px] border text-center text-sm relative">
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
                                                    <a onClick={() => openEditEmployeeModal(employee)} href="#" className="flex items-center space-x-2">
                                                        <FaEdit />
                                                        <span>Edit</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                    {/* Pagination control */}
                    {renderPagination()}
                </>

            )}

            <AddEmployeeModal isEmployeeModalOpen={isEmployeeModalOpen} setIsEmployeeModalOpen={setIsEmployeeModalOpen} refetch={refetch} />
            <EditEmployeeModal editEmployeeModalOpen={editEmployeeModalOpen} setEditEmployeeModalOpen={setEditEmployeeModalOpen} employee={selectedEmployee} refetch={refetch}></EditEmployeeModal>
            <ImportModal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} onImport={handleImport} />
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Employees;