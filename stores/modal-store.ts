import { create } from "zustand";

export type ModalType = "playlist" | "link" | "success" | "error" | "status" | "remix-disclaimer" | "nav" | "share" | "confirm";

export type ModalPayloads = {
    playlist: {};
    link: { title: string; link: string };
    success: { title?: string; confirmText?: string; cancelText?: string; onConfirm: () => void; onCancel: () => void };
    error: { open: boolean; title?: string; errors: string[]; onClose: () => void };
    status: { title: string; description: string; status: "success" | "error"; buttonText?: string; onButtonClick?: () => void };
    "remix-disclaimer": { setShowRemixDisclaimer: (show: boolean) => void };
    nav: { menuRef: React.RefObject<HTMLDivElement | null>; navItems: { name: string; href: string }[]; isUserIcon: boolean };
    share: { imageUrl: string; setShowShareModal: (show: boolean) => void; copied: boolean; setCopied: (copied: boolean) => void };
    confirm: { title?: string; confirmText?: string; cancelText?: string; onConfirm: () => void; onCancel: () => void };
};
interface ModalState {
    isModalOpen: boolean;
    modalType: ModalType | null;
    payload?: ModalPayloads[ModalType];
    openModal: <T extends ModalType>(type: T, payload: ModalPayloads[T]) => void;
    closeModal: () => void;
    reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalType: null,
    payload: undefined,
    openModal: (modalType, payload) => {
        set({
            isModalOpen: true,
            modalType,
            payload,
        });
    },
    closeModal: () => set({ isModalOpen: false, modalType: null, payload: undefined }),
    reset: () => set({ isModalOpen: false, modalType: null, payload: undefined }),
}));
