import { PlaylistTrackWithRelations } from "@/lib/fetchers/playlist-fetchers";
import { formatDuration } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Ellipsis, Loader2, Trash2 } from "lucide-react";

interface ITrackRowProps {
    playlistTrack: PlaylistTrackWithRelations;
    index: number;
    onRemove: () => void;
    isRemoving: boolean;
    isPlaying: boolean;
    isCurrent: boolean;
    onPlayPause: () => void;
}

export const TrackRow = (props: ITrackRowProps) => {
    const { playlistTrack, index, onRemove, isRemoving, isPlaying, isCurrent, onPlayPause } = props;
    const track = playlistTrack.track;
    const title = track?.title ?? "Untitled";
    const duration = track?.duration;

    // Pull artist directly from track relations
    const artistName = track?.artist?.stage_name ?? "Unknown artist";

    const openModal = useModalStore((state) => state.openModal);

    return (
        <li className="flex justify-between items-center px-4 py-3 hover:bg-neutral-900/50">
            {/* Left Side: Play button, track number, title, artist */}
            <button
                className="text-neutral-400 hover:text-white transition-colors flex flex-1"
                onClick={onPlayPause}
                aria-label={isPlaying && isCurrent ? "Pause" : "Play"}
            >
                <div className="flex items-center text-left gap-3 min-w-0">
                    <div className="w-6 text-right text-neutral-400">{index + 1}</div>
                    <div className="min-w-0">
                        <div className={`${isPlaying && isCurrent ? "text-green-500" : "text-white"} text-sm truncate`}>{title}</div>
                        <div className="text-xs text-neutral-400 truncate">{artistName}</div>
                    </div>
                </div>
            </button>

            {/* Right Side: Duration, Trash, Ellipsis */}
            <div className="flex items-center gap-3">
                <button
                    aria-label="Remove from playlist"
                    onClick={onRemove}
                    disabled={isRemoving}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    {isRemoving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
                <button
                    onClick={() => openModal("playlist_track_options", { playlistTrack })}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded hover:bg-neutral-800"
                >
                    <Ellipsis size={16} />
                </button>
                <span className="text-xs text-neutral-400">{formatDuration(duration)}</span>
            </div>
        </li>
    );
};
