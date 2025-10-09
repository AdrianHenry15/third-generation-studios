"use client";

import { Heart } from "lucide-react";
import { useCallback } from "react";
import { useToggleTrackLike } from "@/hooks/music/use-tracks";
import { useAuthStore } from "@/stores/auth-store";
import type { Database } from "@/lib/types/supabase-types";

type Track = Database["public"]["Tables"]["tracks"]["Row"];

interface LikeButtonProps {
    track: Track;
}

export function LikeButton({ track }: LikeButtonProps) {
    const { user } = useAuthStore();
    const { isLiked, toggleLike, isLoading: likeLoading } = useToggleTrackLike(track.id, user?.id || "");

    const handleLike = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!user) {
                // Could show login modal here
                console.log("Please log in to like tracks");
                return;
            }
            toggleLike();
        },
        [user, toggleLike],
    );

    return (
        <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`p-2 transition-all duration-200 hover:scale-110 ${
                isLiked
                    ? "text-red-500 hover:text-red-400 opacity-100"
                    : "text-neutral-500 hover:text-red-500 opacity-60 group-hover:opacity-100"
            } ${likeLoading ? "animate-pulse" : ""}`}
        >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
        </button>
    );
}
