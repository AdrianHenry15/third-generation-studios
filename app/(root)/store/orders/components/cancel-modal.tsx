import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ICancelModalProps {
    toggleModal: () => void;
    isOpen: boolean;
    cancelOrder: () => void;
}

export default function CancelModal(props: ICancelModalProps) {
    const { toggleModal, cancelOrder, isOpen } = props;
    // const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    return (
        <>
            <button onClick={toggleModal} className="absolute left-2 top-2 z-50">
                <IoMdClose size={15} />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={toggleModal}>
                    {/* Backdrop */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Confirm Order Cancellation
                                </Dialog.Title>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to cancel this order? This action cannot be undone.
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                        onClick={cancelOrder}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
