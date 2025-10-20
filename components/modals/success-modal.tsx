import { useModalStore } from "@/stores/modal-store";
import React from "react";
import ReactDOM from "react-dom";
import { CheckCircle2 } from "lucide-react"; // You can swap for another icon if you prefer

interface ConfirmModalProps {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
}

const SuccessModal: React.FC<ConfirmModalProps> = ({ title = "Success!", confirmText = "Continue", cancelText = "Close", onConfirm }) => {
    const closeModal = useModalStore((state) => state.closeModal);

    const modalContent = (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-black/60 via-neutral-900/80 to-black/70 backdrop-blur-sm">
            <div className="relative bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center border border-neutral-800/40 animate-fade-in">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg border-4 border-white dark:border-neutral-900 animate-pop">
                        <CheckCircle2 size={40} className="text-white" />
                    </div>
                </div>
                <div className="mt-8 mb-4 text-center">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h2>
                </div>
                <div className="flex gap-3 w-full mt-4">
                    <button
                        className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={onConfirm}
                        autoFocus
                    >
                        {confirmText}
                    </button>
                    <button
                        className="flex-1 px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-semibold transition focus:outline-none focus:ring-2 focus:ring-neutral-400"
                        onClick={closeModal}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
            <style jsx global>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes pop {
                    0% {
                        transform: scale(0.7);
                    }
                    80% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                .animate-pop {
                    animation: pop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </div>
    );

    // Use portal to render at document body level
    return typeof document !== "undefined" ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default SuccessModal;
