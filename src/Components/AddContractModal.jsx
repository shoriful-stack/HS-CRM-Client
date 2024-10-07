import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAllCustomer from "../Hooks/useAllCustomers";

const AddContractModal = ({ isAddContractModalOpen, setIsAddContractModalOpen, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [allCustomers] = useAllCustomer();

    const onSubmit = async (data) => {
        console.log(data);

        const addProject = {
            project_name: data.project_name,
            customer_name: data.customer_name,
            project_category: data.project_category,
            department: data.department,
            hod: data.hod,
            pm: data.pm,
            year: data.year,
            phase: data.phase,
            project_code: data.project_code
        }
        const projectRes = await axiosSecure.post('/projects', addProject);
        console.log(projectRes.data);

        if (projectRes.data.insertedId) {
            reset();
            refetch();
            toast.success(`${data.project_name} added successfully`);
            closeAddModal();
        }
    }

    const closeAddModal = () => {
        setIsAddContractModalOpen(false);
    };

    return (
        <>
            {/* Modal Component */}
            {isAddContractModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={closeAddModal}
                            className="absolute top-3 right-3 hover:text-gray-700 text-3xl"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Contract</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title*
                                    </label>
                                    <input
                                        type="text"
                                        name="contract_title"
                                        {...register("contract_title", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Customer Name*
                                    </label>
                                    <select
                                        name="customer_name"
                                        {...register("customer_name", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Customer</option>
                                        {allCustomers.map((customer) => (
                                            <option key={customer._id} value={customer.name}>
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Project Type*
                                    </label>
                                    <select
                                        name="project_type"
                                        {...register("project_type", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Type</option>
                                        <option value="Service">Service</option>
                                        <option value="Product">Product</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ref No.*
                                    </label>
                                    <input
                                        type="text"
                                        name="refNo"
                                        {...register("refNo", { required: true })}
                                        className="mt-1 block text-sm w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Party*
                                    </label>
                                    <input
                                        type="text"
                                        name="first_party"
                                        {...register("first_party", { required: true })}
                                        className="mt-1 block text-sm w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Signing Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="signing_date"
                                        {...register("signing_date", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Effective Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="effective_date"
                                        {...register("effective_date", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Closing Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="closing_date"
                                        {...register("closing_date", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Scan Copy Status*
                                    </label>
                                    <select
                                        name="scan_copy_status"
                                        {...register("scan_copy_status", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Status</option>
                                        <option value="1">Done</option>
                                        <option value="0">Undone</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hard Copy Status*
                                    </label>
                                    <select
                                        name="hard_copy_status"
                                        {...register("hard_copy_status", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Status</option>
                                        <option value="1">Done</option>
                                        <option value="0">Undone</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contract Status*
                                    </label>
                                    <select
                                        name="contract_status"
                                        {...register("contract_status", { required: true })}
                                        className="mt-1 text-sm block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    >
                                        <option className="hidden" value="">Select Status</option>
                                        <option value="0">Expired</option>
                                        <option value="1">Not Expired</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
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

export default AddContractModal;
