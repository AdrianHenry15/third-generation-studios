import { ArtistWithRelations } from "@/lib/types/database";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IArtistSearchItemProps {
    artist: ArtistWithRelations;
}

const ArtistSearchItem = ({ artist }: IArtistSearchItemProps) => {
    return (
        <Link
            key={artist.id}
            href={`/solo-queue/profile/${artist.id}`}
            className="group rounded-xl p-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors flex flex-col items-center text-center"
        >
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
                {artist.profile_image_url ? (
                    <Image
                        src={artist.profile_image_url}
                        alt={artist.stage_name}
                        fill
                        quality={85}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                ) : (
                    <User size={28} className="text-neutral-400" />
                )}
            </div>
            <div className="mt-3">
                <h3 className="text-sm font-semibold text-white truncate max-w-[12rem]">{artist.stage_name}</h3>
                {artist.verified && <p className="text-xs text-green-500">Verified</p>}
            </div>
        </Link>
    );
};

export default ArtistSearchItem;
