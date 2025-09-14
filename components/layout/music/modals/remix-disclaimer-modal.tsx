import { Info } from "lucide-react";
import React from "react";

interface IRemixDisclaimerModalProps {
    setShowRemixDisclaimer: (show: boolean) => void;
}

const RemixDisclaimerModal = ({ setShowRemixDisclaimer }: IRemixDisclaimerModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 relative">
                <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setShowRemixDisclaimer(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                >
                    ×
                </button>
                <div className="flex items-center mb-4">
                    <Info size={20} className="text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-800">Remix Disclaimer</span>
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                    <p className="mb-2">This remix has not been officially cleared for commercial use.</p>
                    <p>This is a preview version only and is shared for promotional and educational purposes.</p>
                </div>
            </div>
        </div>
    );
};

export default RemixDisclaimerModal;
