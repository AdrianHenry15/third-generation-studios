import { useModalStore } from "@/stores/modal-store";
import PlaylistModal from "./playlist-modal";
import OpenLinkModal from "./open-link-modal";
import ErrorModal from "./error-modal";
import SuccessModal from "./success-modal";
import StatusModal from "./status-modal";
import RemixDisclaimerModal from "./remix-disclaimer-modal";

export default function ModalRoot() {
    const { isModalOpen, modalType, payload, closeModal } = useModalStore();

    if (!isModalOpen) return null;

    switch (modalType) {
        case "playlist":
            return <PlaylistModal {...payload} />;
        case "link":
            return <OpenLinkModal {...payload} />;
        case "error":
            return <ErrorModal {...payload} />;
        case "success":
            return <SuccessModal {...payload} />;
        case "status":
            return <StatusModal {...payload} />;
        case "remix-disclaimer":
            return <RemixDisclaimerModal {...payload} />;
        default:
            return null;
    }
}
