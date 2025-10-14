"use client";

import { useModalStore } from "@/stores/modal-store";
import OpenLinkModal from "./open-link-modal";
import ErrorModal from "./error-modal";
import SuccessModal from "./success-modal";
import StatusModal from "./status-modal";
import RemixDisclaimerModal from "./remix-disclaimer-modal";
import ConfirmModal from "./confirm-modal";
import ShareModal from "./share-modal";
import PlaylistModal from "./playlist-modal";

export default function ModalRoot() {
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const modalType = useModalStore((state) => state.modalType);
    const payload = useModalStore((state) => state.payload);
    const closeModal = useModalStore((state) => state.closeModal);

    if (!isModalOpen || !modalType) return null;

    switch (modalType) {
        case "link":
            return <OpenLinkModal {...payload} />;
        case "playlist":
            return <PlaylistModal {...payload} />;
        case "error":
            return <ErrorModal {...payload} />;
        case "success":
            return <SuccessModal {...payload} />;
        case "status":
            return <StatusModal {...payload} />;
        case "remix-disclaimer":
            return <RemixDisclaimerModal {...payload} />;
        case "confirm":
            return <ConfirmModal {...payload} onCancel={closeModal} />;
        case "share":
            return <ShareModal {...payload} />;
        default:
            return null;
    }
}
