import { PlaylistWithRelations } from "@/lib/types/database";
import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPlaylistSearchItemProps {
    playlist: PlaylistWithRelations;
    coverImage?: string;
}

const PlaylistSearchItem = ({ playlist, coverImage }: IPlaylistSearchItemProps) => {
    return (
        <Link
            key={playlist.id}
            href={`/solo-queue/playlists/${playlist.id}`}
            className="group flex flex-col w-min items-center rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors p-3 sm:p-4"
        >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center p-1 sm:p-2">
                {playlist.cover_image_url ? (
                    <Image
                        src={coverImage || playlist.cover_image_url}
                        alt={`${playlist.name}-cover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                        priority
                    />
                ) : (
                    <Music size={40} className="text-neutral-400" />
                )}
            </div>
            <div className="mt-2 w-full flex flex-col items-center">
                <h3 className="text-sm sm:text-base font-semibold text-white truncate w-full text-center">{playlist.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 truncate w-full text-center">
                    {playlist.track_count ? `${playlist.track_count} tracks` : "Playlist"}
                </p>
            </div>
        </Link>
    );
};

export default PlaylistSearchItem;
