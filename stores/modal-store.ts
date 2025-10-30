import { PlaylistTrackWithRelations } from "@/lib/fetchers/playlist-fetchers";
import { create } from "zustand";

export type ModalType =
    | "add_to_playlist"
    | "playlist_track_options"
    | "link"
    | "success"
    | "error"
    | "status"
    | "remix_disclaimer"
    | "nav"
    | "share"
    | "confirm"
    | "track_credits";

export type ModalPayloads = {
    add_to_playlist: {};
    playlist_track_options: { playlistTrack: PlaylistTrackWithRelations };
    link: { title: string; link: string };
    success: { title?: string; confirmText?: string; cancelText?: string; onConfirm: () => void };
    error: { title?: string; errors: string[] };
    status: { title: string; description: string; status: "success" | "error"; buttonText?: string; onButtonClick?: () => void };
    remix_disclaimer: { setShowRemixDisclaimer: (show: boolean) => void };
    nav: { menuRef: React.RefObject<HTMLDivElement | null>; navItems: { name: string; href: string }[]; isUserIcon: boolean };
    share: { imageUrl: string; setShowShareModal: (show: boolean) => void; copied: boolean; setCopied: (copied: boolean) => void };
    confirm: { title?: string; confirmText?: string; cancelText?: string; onConfirm: () => void };
    track_credits: { trackId: string };
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
