import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useModalStore } from "@/stores/modal-store";

interface StatusModalProps {
    title: string;
    description: string;
    status: "success" | "error";
    buttonText?: string;
    onButtonClick?: () => void;
}

const StatusModal = ({ title, description, status = "success", buttonText, onButtonClick }: StatusModalProps) => {
    // Stores
    const { isModalOpen: isOpen, closeModal } = useModalStore();
    // Determine if the status is success or error
    const isSuccess = status === "success";

    // Default button text based on status
    const defaultButtonText = isSuccess ? "Got it, thanks!" : "Try Again";

    // Handle button click with custom action or default close
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        } else {
            closeModal();
        }
    };

    // Color scheme based on status
    const colorScheme = {
        icon: {
            bg: isSuccess ? "bg-green-100" : "bg-red-100",
            text: isSuccess ? "text-green-600" : "text-red-600",
        },
        button: {
            bg: isSuccess ? "bg-green-600" : "bg-red-600",
            hover: isSuccess ? "hover:bg-green-700" : "hover:bg-red-700",
            ring: isSuccess ? "focus:ring-green-500" : "focus:ring-red-500",
        },
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                {/* Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-xl transition-all relative">
                                {/* Close button */}
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1"
                                    onClick={closeModal}
                                    aria-label="Close modal"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                {/* Status icon */}
                                <div
                                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${colorScheme.icon.bg} mb-6`}
                                >
                                    {isSuccess ? (
                                        <CheckCircle className={`h-10 w-10 ${colorScheme.icon.text}`} aria-hidden="true" />
                                    ) : (
                                        <XCircle className={`h-10 w-10 ${colorScheme.icon.text}`} aria-hidden="true" />
                                    )}
                                </div>

                                <DialogTitle as="h3" className="text-center text-xl font-bold leading-6 text-gray-900 mb-2">
                                    {title}
                                </DialogTitle>

                                <div className="mt-3 mb-6">
                                    <p className="text-center text-base text-gray-600">{description}</p>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className={`inline-flex justify-center items-center rounded-lg px-6 py-3 text-base font-medium text-white shadow-md ${colorScheme.button.bg} ${colorScheme.button.hover} focus:outline-none focus:ring-2 ${colorScheme.button.ring} focus:ring-offset-2 transition-all duration-200 min-w-[120px]`}
                                        onClick={handleButtonClick}
                                    >
                                        {buttonText || defaultButtonText}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default StatusModal;
