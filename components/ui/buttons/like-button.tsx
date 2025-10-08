"use client";

import { Heart } from "lucide-react";
import React from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useToggleTrackLike } from "@/hooks/music/use-tracks";
import { useLikedTrackIds } from "@/hooks/music/use-tracks";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/supabase-types";

// Use proper Supabase types
type TrackLike = Database["public"]["Tables"]["track_likes"]["Row"];

interface Props {
    trackId: string;
}

export default function LikeButton({ trackId }: Props) {
    const { user } = useAuthStore();
    const userId = user?.id;

    // Get user's liked track IDs
    const { data: likedTrackIds = new Set<string>() } = useLikedTrackIds(userId || "", !!userId);

    // Get like count for this track
    const { data: likeCount = 0 } = useQuery({
        queryKey: ["trackLikeCount", trackId],
        queryFn: async () => {
            const { data, error } = await supabase.from("track_likes").select("id", { count: "exact" }).eq("track_id", trackId);

            if (error) throw error;
            return data?.length || 0;
        },
        enabled: !!trackId,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });

    // Toggle like functionality
    const { isLiked, toggleLike, isLoading } = useToggleTrackLike(trackId, userId || "");

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!userId || isLoading) return;
        toggleLike();
    };

    // Don't render if user is not authenticated
    if (!userId) return null;

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            aria-label={isLiked ? "Unlike track" : "Like track"}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 z-[1] ${
                isLiked ? "bg-red-500/20 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <Heart
                className={`w-5 h-5 transition-all duration-200 ${
                    isLiked ? "text-red-400 fill-red-400 scale-110" : "text-white fill-transparent hover:text-red-300"
                }`}
            />
            <span className="text-xs font-bold text-white">{likeCount}</span>
        </button>
    );
}
