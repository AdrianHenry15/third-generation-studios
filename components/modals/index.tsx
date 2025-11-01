"use client";

import { ModalPayloads, useModalStore } from "@/stores/modal-store";
import OpenLinkModal from "./open-link-modal";
import ErrorModal from "./error-modal";
import SuccessModal from "./success-modal";
import StatusModal from "./status-modal";
import ConfirmModal from "./confirm-modal";
import ShareModal from "./share-modal";
import MobileNavDropdownMenu from "../layout/mobile-nav-dropdown-menu";
import { PlaylistTrackOptionsModal } from "./playlist-track-options-modal";
import TrackCreditsModal from "./track-credits-modal";
import AddToPlaylistModal from "./add-to-playlist-Modal";
import CreatePlaylistModal from "./create-playlist-modal";

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
        case "add_to_playlist":
            return <AddToPlaylistModal {...(payload as ModalPayloads["add_to_playlist"])} />;
        case "create_playlist":
            return <CreatePlaylistModal />;
        case "playlist_track_options":
            return <PlaylistTrackOptionsModal {...(payload as ModalPayloads["playlist_track_options"])} />;
        case "error":
            return <ErrorModal {...(payload as ModalPayloads["error"])} />;
        case "success":
            return <SuccessModal {...(payload as ModalPayloads["success"])} />;
        case "status":
            return <StatusModal {...(payload as ModalPayloads["status"])} />;
        case "track_credits_info":
            return <TrackCreditsModal {...(payload as ModalPayloads["track_credits_info"])} />;
        case "confirm":
            return <ConfirmModal {...(payload as ModalPayloads["confirm"])} />;
        case "share":
            return <ShareModal {...(payload as ModalPayloads["share"])} />;
        case "track_credits":
            return <TrackCreditsModal {...(payload as ModalPayloads["track_credits"])} />;
        default:
            return null;
    }
}
