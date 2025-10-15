"use client";

import { ModalPayloads, useModalStore } from "@/stores/modal-store";
import OpenLinkModal from "./open-link-modal";
import ErrorModal from "./error-modal";
import SuccessModal from "./success-modal";
import StatusModal from "./status-modal";
import RemixDisclaimerModal from "./remix-disclaimer-modal";
import ConfirmModal from "./confirm-modal";
import ShareModal from "./share-modal";
import PlaylistModal from "./playlist-modal";
import MobileNavDropdownMenu from "../layout/mobile-nav-dropdown-menu";

export default function ModalRoot() {
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const modalType = useModalStore((state) => state.modalType);
    const payload = useModalStore((state) => state.payload);

    if (!isModalOpen || !modalType) return null;

    switch (modalType) {
        case "link":
            return <OpenLinkModal {...(payload as ModalPayloads["link"])} />;
        case "nav":
            return <MobileNavDropdownMenu {...(payload as ModalPayloads["nav"])} />;
        case "playlist":
            return <PlaylistModal {...(payload as ModalPayloads["playlist"])} />;
        case "error":
            return <ErrorModal {...(payload as ModalPayloads["error"])} />;
        case "success":
            return <SuccessModal {...(payload as ModalPayloads["success"])} />;
        case "status":
            return <StatusModal {...(payload as ModalPayloads["status"])} />;
        case "remix-disclaimer":
            return <RemixDisclaimerModal {...(payload as ModalPayloads["remix-disclaimer"])} />;
        case "confirm":
            return <ConfirmModal {...(payload as ModalPayloads["confirm"])} />;
        case "share":
            return <ShareModal {...(payload as ModalPayloads["share"])} />;
        default:
            return null;
    }
}
