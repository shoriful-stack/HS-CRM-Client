import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
// import useCustomer from "../Hooks/useCustomer";

const AddTenderModal = ({ isAddModalOpen, setIsAddModalOpen }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    // const [ , , refetch] = useCustomer();

    const onSubmit = async (data) => {
        console.log(data);

        const addCustomer = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            status: data.status,
            address: data.address
        }
        const customerRes = await axiosSecure.post('/customers', addCustomer);
        console.log(customerRes.data);

        if (customerRes.data.insertedId) {
            reset();
            refetch();
            toast.success(`${data.name} added successfully`);
            closeAddModal();
        }
    }

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <>
            {/* Modal Component */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeAddModal}
                            className="absolute top-3 right-3 hover:text-gray-700 text-3xl"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Project Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        {...register("project_name", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Customer Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        {...register("name", { required: true })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Project Category
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
                                        Department
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        {...register("email")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        HOD
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        {...register("address")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        PM
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        {...register("address")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Year
                                    </label>
                                    <input
                                        type="year"
                                        name="email"
                                        {...register("email")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phase
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        {...register("email")}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Project Code
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

export default AddTenderModal;
