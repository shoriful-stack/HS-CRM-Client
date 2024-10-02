import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ImportModal = ({ isOpen, onClose, onImport }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async (e) => {
        e.preventDefault();
        if (!file) return;

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Send the JSON data to the server
        onImport(jsonData);
        onClose(); // Close the modal after importing
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-md">
                    <h2 className="font-bold mb-2">Import Customers</h2>
                    <form onSubmit={handleImport}>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
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
