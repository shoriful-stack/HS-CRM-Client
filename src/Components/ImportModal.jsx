import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ImportModal = ({ isOpen, onClose, onImport }) => {
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleImport = async () => {
        if (!file) {
            toast.error("Please upload a file!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            console.log(data);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const customers = XLSX.utils.sheet_to_json(worksheet);

            try {
                const response = await axiosSecure.post("/customers", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(customers),
                });

                if (!response.ok) throw new Error("Failed to import customers");

                const result = await response.json();
                toast.success(`${result.insertedCount} customers imported successfully!`);
                setIsModalOpen(false); // Close the modal
            } catch (error) {
                toast.error("Import failed: " + error.message);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-md">
                    <h2 className="font-bold mb-2">Import Customers</h2>
                    <form onSubmit={handleImport}>
                        <input type="file" onChange={handleFileChange} />
                        <div className="mt-2 flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-2 py-2 rounded-md text-sm">
                                Import
                            </button>
                            <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-2 py-2 rounded-md text-sm">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ImportModal;
