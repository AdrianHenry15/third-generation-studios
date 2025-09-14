import { CopyrightIcon } from "lucide-react";
import React from "react";

interface ICopyrightModalProps {
    setShowCopyright: (show: boolean) => void;
    copyright: string;
}

const CopyrightModal = ({ setShowCopyright, copyright }: ICopyrightModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full relative">
                <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setShowCopyright(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
                <div className="flex items-center mb-3">
                    <CopyrightIcon size={18} className="text-gray-700 mr-2" />
                    <span className="font-semibold text-gray-800">Copyright Information</span>
                </div>
                <div className="text-gray-700 text-sm break-words">{copyright}</div>
            </div>
        </div>
    );
};

export default CopyrightModal;
