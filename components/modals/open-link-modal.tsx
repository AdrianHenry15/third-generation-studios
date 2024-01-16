import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../button";

interface IOpenLinkModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    link: string;
}

const OpenLinkModal = (props: IOpenLinkModalProps) => {
    const openLink = () => {
        window.open(props.link, "_blank");
        props.closeModal();
    };
    return (
        <div>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
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
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        {`Open ${props.title}`}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">This will open a new tab and take you to the website.</p>
                                    </div>

                                    <div className="mt-4 flex justify-evenly">
                                        <Button name="Go To Website" onClick={openLink} />
                                        <Button name="Go Back" onClick={props.closeModal} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default OpenLinkModal;
