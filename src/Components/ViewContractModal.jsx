import React from 'react';

const ViewContractModal = ({ isOpen, onClose, contract }) => {
    if (!isOpen || !contract) return null;

    const apiUrl = import.meta.env.VITE_APP_API_URL;

    if (!apiUrl) {
        console.error("VITE_APP_API_URL is not defined in the environment variables.");
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
                    <button onClick={onClose} className="absolute top-3 right-3 hover:text-gray-700 text-3xl">
                        ×
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Error</h2>
                    <p className="text-red-500">API URL is not defined. Please contact the administrator.</p>
                </div>
            </div>
        );
    }

    const fileUrl = `${apiUrl}/uploads/${contract.contract_file}`;
    // console.log("File URL:", fileUrl); // For debugging purposes

    const fileExtension = contract.contract_file.split('.').pop().toLowerCase();

    const renderFile = () => {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return <img src={fileUrl} alt="Contract Attachment" className="max-w-full max-h-full" />;
        } else if (['pdf'].includes(fileExtension)) {
            return <iframe src={fileUrl} className="w-full h-full" title="Contract Attachment"></iframe>;
        } else {
            return (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Download File
                </a>
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-3 hover:text-gray-700 text-3xl">
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">View Contract Attachment</h2>
                <div className="overflow-auto" style={{ maxHeight: '80vh' }}>
                    {renderFile()}
                </div>
            </div>
        </div>
    );
};

export default ViewContractModal;
