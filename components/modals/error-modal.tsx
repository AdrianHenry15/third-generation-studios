import React, { useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";

type ErrorModalProps = {
    open: boolean;
    title?: string;
    errors: string[];
    onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ open, title = "There were some errors", errors, onClose }) => {
    // Close on Escape - Hook must be called before early return
    useEffect(() => {
        if (!open) return; // Only add listener if modal is open

        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
                className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900"
                role="dialog"
                aria-modal="true"
                aria-labelledby="error-modal-title"
            >
                <div className="mb-4">
                    <h2 id="error-modal-title" className="text-lg font-semibold">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Please review and fix the following before continuing.
                    </p>
                </div>
                <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700 text-sm dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
                    <ul className="list-disc ml-5 space-y-1">
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button type="button" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
