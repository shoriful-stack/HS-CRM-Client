import React, { useState } from "react";
import { FaEdit, FaFileImport, FaHistory, FaRegEye } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { TbDatabaseExport, TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import useProject from "../Hooks/useProject";
import Loader from "../Components/Loader";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import useAxiosSecure from "../Hooks/useAxiosSecure";
import EditProjectModal from "../Components/EditProjectModal";
import ImportProjectsModal from "../Components/ImportProjectsModal";
import AddContractModal from "../Components/AddContractModal";

const Contracts = () => {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();


  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch Projects
  const [data, loading, refetch] = useProject(currentPage, limit); // This hook contain the 1st 10 data of project collection
  const projects = data?.projects || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const openAddModal = () => {
    setIsAddContractModalOpen(true);
  };
  const openEditTenderModal = (project) => {
    setSelectedProject(project);
    setEditProjectModalOpen(true);
  };
  const openImportModal = () => {
    setImportModalOpen(true);
  };

  const handleImport = async (projectsData) => {
    try {
      const response = await axiosSecure.post("/projects/all", projectsData, {
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
      // Fetch all projects from the new API endpoint
      const response = await axiosSecure.get("/projects/all");

      if (response.status === 200) {
        const allProjects = response.data;

        // Prepare the data for export
        const data = allProjects.map((project, index) => ({
          "Sl.No.": index + 1,
          "Project Name": project.project_name,
          "Customer Name": project.customer_name,
          "Project Category": project.project_category,
          "Department": project.department,
          "HOD": project.hod,
          "Project Manager": project.pm,
          "Year": project.year,
          "Phase": project.phase,
          "Project Code": project.project_code
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Download the file
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'projects.xlsx');
      }
    } catch (error) {
      console.error("Failed to export projects:", error);
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

    const startProject = (currentPage - 1) * limit + 1;
    const endProject = Math.min(currentPage * limit, total);

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
                Showing {startProject} to {endProject} of {total} contracts
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
        <h1 className="font-bold text-xl">Contracts</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={openAddModal}
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
                <th className="px-2 py-2 border text-xs">Sl.No.</th>
                <th className="px-2 py-2 border text-xs">Project Title</th>
                <th className="px-2 py-2 border text-xs">Project Type</th>
                <th className="px-2 py-2 border text-xs">First Party</th>
                <th className="px-2 py-2 border text-xs">Customer</th>
                <th className="px-2 py-2 border text-xs text-center">Signing <br /> Date</th>
                <th className="px-2 py-2 border text-xs text-center">Effective <br /> Date</th>
                <th className="px-2 py-2 border text-xs text-center">Closing <br /> Date</th>
                <th className="px-2 py-2 border text-xs">Ref No.</th>
                <th className="px-2 py-2 border text-xs text-center">Scan Copy <br /> Status</th>
                <th className="px-2 py-2 border text-xs text-center">Hard Copy <br /> Status</th>
                <th className="px-2 py-2 border text-xs text-center">Contract <br />Status</th>
                <th className="px-2 py-2 border text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">No projects available.</td>
                </tr>
              ) : (
                projects.map((project, index) => <tr key={project._id} className="bg-gray-100">
                  <td className="px-3 py-2 border text-center">{index + 1 + (currentPage - 1) * limit}</td>
                  <td className="px-3 py-2 border text-xs">{project.project_name}</td>
                  <td className="px-3 py-2 border text-xs">{project.project_category}</td>
                  <td className="px-3 py-2 border text-xs">{project.customer_name}</td>
                  <td className="px-3 py-2 border text-xs">{project.department}</td>
                  <td className="px-3 py-2 border text-xs">{project.hod}</td>
                  <td className="px-3 py-2 border text-xs">{project.pm}</td>
                  <td className="px-3 py-2 border text-xs">
                    {project.year}
                  </td>
                  <td className="px-3 py-2 border text-xs">{project.phase}</td>
                  <td className="px-3 py-2 border text-xs">{project.project_code}</td>
                  <td className="px-3 py-2 border text-xs">{project.project_code}</td>
                  <td className="px-3 py-2 border text-xs">{project.project_code}</td>
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
                          <a onClick={() => openEditTenderModal(project)} href="#" className="flex items-center space-x-2">
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
                </tr>))
              }
            </tbody>
          </table>
          {/* Pagination control */}
          {renderPagination()}
        </>
      )}
      <AddContractModal isAddContractModalOpen={isAddContractModalOpen} setIsAddContractModalOpen={setIsAddContractModalOpen} refetch={refetch} />
      <EditProjectModal editProjectModalOpen={editProjectModalOpen} setEditProjectModalOpen={setEditProjectModalOpen} project={selectedProject} refetch={refetch} />
      <ImportProjectsModal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} onImport={handleImport} />
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Contracts;
