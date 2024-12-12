import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ICartItem } from "@/stores/cart-store";
import Image from "next/image";

interface ISelectedProductModalProps {
    isOpen: boolean;
    closeModal: () => void;
    item: ICartItem;
}

const SelectProductModal = (props: ISelectedProductModalProps) => {
    const { isOpen, closeModal, item } = props;

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                    {/* <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Blank Modal
                                    </Dialog.Title> */}
                                    <Image
                                        src={item.product.product.image}
                                        alt={item.product.name}
                                        width={400}
                                        height={800}
                                        className="w-24"
                                    />
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">This is a blank modal. Add your content here.</p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default SelectProductModal;
