import React, { useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { useModalStore } from "@/stores/modal-store";
import { AlertTriangle } from "lucide-react";

type ErrorModalProps = {
    title?: string;
    errors: string[];
};

const ErrorModal: React.FC<ErrorModalProps> = ({ title = "There were some errors", errors }) => {
    const closeModal = useModalStore((state) => state.closeModal);
    const open = true; // Always open when rendered

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [closeModal]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-black/60 via-neutral-900/80 to-black/70 backdrop-blur-sm">
            <div
                className="relative bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-red-600/40 animate-fade-in"
                role="dialog"
                aria-modal="true"
                aria-labelledby="error-modal-title"
            >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-red-500 rounded-full p-2 shadow-lg border-4 border-white dark:border-neutral-900 animate-pop">
                        <AlertTriangle size={40} className="text-white" />
                    </div>
                </div>
                <div className="mt-8 mb-4 text-center">
                    <h2 id="error-modal-title" className="text-xl font-bold text-red-700 dark:text-red-400">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Please review and fix the following before continuing.
                    </p>
                </div>
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 text-sm dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 w-full mb-4">
                    <ul className="list-disc ml-5 space-y-1">
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-2 w-full flex justify-end">
                    <Button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Close
                    </Button>
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
};

export default ErrorModal;
