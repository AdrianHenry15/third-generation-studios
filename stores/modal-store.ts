import { create } from "zustand";

type ModalType = "playlist" | "link" | "success" | "error" | "status" | "remix-disclaimer" | "nav" | "share" | "confirm";

interface ModalState {
    isModalOpen: boolean;
    modalType: ModalType | null;
    payload?: any;
    openModal: (type: ModalType, payload?: any) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
    isModalOpen: false,
    modalType: null,
    payload: undefined,
    openModal: (modalType, payload) => {
        set({ isModalOpen: true, modalType, payload });
        console.log("[ModalStore] openModal:", { modalType, isModalOpen: get().isModalOpen });
    },
    closeModal: () => {
        set({ isModalOpen: false, modalType: null, payload: undefined });
        console.log("[ModalStore] closeModal:", { isModalOpen: get().isModalOpen });
    },
}));
