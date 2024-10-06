import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAllDepartment from "../Hooks/useAllDepartments";

const AddEmployeeModal = ({ isEmployeeModalOpen, setIsEmployeeModalOpen, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [allDepartments] = useAllDepartment();

    const closeModal = () => {
        setIsEmployeeModalOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        console.log(data);

        const addEmployee = {
            name: data.name.trim(),
            phone: data.phone,
            email: data.email,
            status: data.status || "Active",
            address: data.address
        }

        try {
            const customerRes = await axiosSecure.post('/employees', addEmployee);
            console.log(customerRes.data);

            if (customerRes.data.insertedId) {
                reset();
                refetch();
                toast.success(`${data.name} added successfully`);
                closeModal();
            }
        } catch (error) {
            toast.error(`${data.name} already exists.`);
        }
    }


    return (
        <>
            {/* Modal Component */}
            {isEmployeeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 hover:text-gray-700 text-3xl"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Employee Name*
                                </label>
                                <input
                                    type="text"
                                    name="employee_name"
                                    {...register("employee_name", { required: true })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Department*
                                    </label>
                                    <select
                                        name="department_name"
                                        {...register("department_name", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Department</option>
                                        {allDepartments.map((department) => (
                                            <option key={department._id} value={department.department_name}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Designation*
                                    </label>
                                    <select
                                        name="designation"
                                        {...register("designation", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Customer</option>
                                        {allDepartments.map((customer) => (
                                            <option key={customer._id} value={customer.name}>
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        {...register("phone")}
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
                                        {...register("email")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
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

export default AddEmployeeModal;
