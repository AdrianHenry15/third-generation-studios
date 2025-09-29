import React from "react";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

const SuccessModal: React.FC<ConfirmModalProps> = ({
    title = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    const modalContent = (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
                <p className="mb-4 text-center text-sm text-neutral-800 dark:text-neutral-200">{title}</p>
                <div className="flex gap-4 mt-2">
                    <button
                        className="px-4 py-2 cursor-pointer rounded bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className="px-4 py-2 cursor-pointer rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );

    // Use portal to render at document body level
    return typeof document !== "undefined" ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default SuccessModal;
