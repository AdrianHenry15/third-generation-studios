import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, PlayCircle } from "lucide-react";

export interface TrackSearchCardProps {
    // Required
    id: string;
    title: string;
    // Optional
    subtitle?: string; // e.g., artist name
    coverUrl?: string | null;
    href?: string; // defaults to /solo-queue/search?play={id}
    onPlay?: (trackId: string) => void | Promise<void>;
}

const TrackSearchCard: React.FC<TrackSearchCardProps> = ({ id, title, subtitle = "Track", coverUrl, href, onPlay }) => {
    const linkHref = href ?? `/solo-queue/search?play=${encodeURIComponent(id)}`;

    const handlePlayClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onPlay) {
            await onPlay(id);
        }
    };

    return (
        <li className="group">
            <Link
                href={linkHref}
                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-900/50 rounded-md transition-colors"
                aria-label={`Open track ${title}`}
            >
                <div className="relative h-9 w-9 rounded bg-neutral-800 overflow-hidden flex items-center justify-center text-neutral-400">
                    {coverUrl ? (
                        <Image src={coverUrl} alt={`${title} cover`} fill sizes="36px" className="object-cover" />
                    ) : (
                        <Music size={16} />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{title}</p>
                    <p className="text-xs text-neutral-500 truncate">{subtitle}</p>
                </div>
                <button
                    onClick={handlePlayClick}
                    aria-label="Play track"
                    title="Play"
                    className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:bg-neutral-700 inline-flex items-center gap-1"
                >
                    <PlayCircle size={16} />
                    Play
                </button>
            </Link>
        </li>
    );
};

export default TrackSearchCard;
