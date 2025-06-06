import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddToCartSuccessModal({ showModal, message, gifSrc, onClose }) {
    // Auto-close after 3 seconds
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showModal, onClose]);

    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative z-10 transform transition-all">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Zatvori prozor"
                >
                    <X size={20} className="text-gray-600" />
                </button>

                <div className="flex flex-col items-center">
                    <img src={gifSrc} alt="Uspješno dodano u korpu" className="w-24 h-24 mb-4" />
                    <p className="text-lg font-medium text-green-700 text-center">{message}</p>
                </div>
            </div>
        </div>
    );
}