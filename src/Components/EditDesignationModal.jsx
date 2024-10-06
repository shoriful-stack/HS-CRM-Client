import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EditDesignationModal = ({ editDesignationModalOpen, setEditDesignationModalOpen, department, refetch }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        if (department) {
            // Set form values with department data when modal opens
            setValue("department_name", department.department_name);
            setValue("department_status", department.department_status);
        }
    }, [department, setValue]);
    const closeModal = () => {
        setEditDesignationModalOpen(false);
    };
    const onSubmit = async (data) => {
        console.log(data);

        const updatedDesignation = {
            department_name: data.department_name,
            department_status: data.department_status
        };
        const departmentRes = await axiosSecure.patch(`/departments/${department._id}`, updatedDepartment);
        console.log(departmentRes.data);

        if (departmentRes.data.modifiedCount > 0) {
            reset();
            refetch();
            toast.success(`${data.department_name} updated successfully`);
            closeModal();
        }
        if (departmentRes.data.modifiedCount === 0) {
            refetch();
            closeModal();
        }
    };

    return (
        <>
            {/* Modal Component */}
            {editDesignationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 hover:text-gray-700 text-3xl"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Edit Designation</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    {...register("department")}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    name="department_status"
                                    {...register("department_status")}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
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
        </>
    );
}

export default EditDesignationModal;
