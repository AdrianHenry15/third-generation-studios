import React, { useState } from "react";
import { PlaylistTrackWithRelations } from "@/lib/fetchers/playlist-fetchers";
import { useModalStore } from "@/stores/modal-store";
import { useRemoveTrackFromPlaylist } from "@/hooks/music/use-playlists";
import { PlusCircle, Trash2, Info, Album, User, Share2 } from "lucide-react";

type PlaylistTrackOption = "share" | "addToPlaylist" | "remove" | "viewCredits" | "goToAlbum" | "goToArtist";

const optionLabels: Record<PlaylistTrackOption, string> = {
    share: "Share",
    addToPlaylist: "Add to another playlist",
    remove: "Remove from this playlist",
    viewCredits: "View song credits",
    goToAlbum: "Go to album",
    goToArtist: "Go to artist",
};

const optionIcons: Record<PlaylistTrackOption, React.ReactNode> = {
    share: <Share2 size={18} />,
    addToPlaylist: <PlusCircle size={18} />,
    remove: <Trash2 size={18} />,
    viewCredits: <Info size={18} />,
    goToAlbum: <Album size={18} />,
    goToArtist: <User size={18} />,
};

interface PlaylistTrackOptionsModalProps {
    playlistTrack: PlaylistTrackWithRelations;
}

export const PlaylistTrackOptionsModal: React.FC<PlaylistTrackOptionsModalProps> = ({ playlistTrack }) => {
    // Props
    const track = playlistTrack.track;
    // State Store
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    // Hooks
    const { mutate: removeTrack, isPending: removing } = useRemoveTrackFromPlaylist();
    // State
    const [copied, setCopied] = useState(false);

    // Functions
    const handleOption = async (option: PlaylistTrackOption) => {
        switch (option) {
            case "share": {
                const url = `${window.location.origin}/track/${track?.id}`;
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
                break;
            }
            case "addToPlaylist":
                openModal("add_to_playlist", { trackId: track?.id });
                break;
            case "remove":
                if (playlistTrack.id) {
                    removeTrack({ playlistTrackId: playlistTrack.id }, { onSuccess: closeModal });
                }
                break;
            case "viewCredits":
                openModal("track_credits", { trackId: track?.id });
                break;
            case "goToAlbum":
                if (track?.album_id) {
                    window.location.href = `/album/${track.album_id}`;
                }
                break;
            case "goToArtist":
                if (track?.artist_id) {
                    window.location.href = `/artist/${track.artist_id}`;
                }
                break;
            default:
                break;
        }
        if (option !== "remove") close();
    };

    const options: PlaylistTrackOption[] = ["share", "addToPlaylist", "remove", "viewCredits", "goToAlbum", "goToArtist"];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-neutral-900 rounded-lg shadow-lg w-full max-w-xs p-4">
                <h2 className="text-lg font-bold mb-4 text-white truncate">{track?.title ?? "Track Options"}</h2>
                <ul className="space-y-1">
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-neutral-800 transition-colors
                                    ${option === "remove" ? "text-red-400" : "text-white"}
                                    ${option === "remove" && removing ? "opacity-60 cursor-not-allowed" : ""}
                                `}
                                onClick={() => handleOption(option)}
                                disabled={option === "remove" && removing}
                            >
                                {optionIcons[option]}
                                <span>{option === "share" && copied ? "Copied!" : optionLabels[option]}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 w-full px-3 py-2 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};
