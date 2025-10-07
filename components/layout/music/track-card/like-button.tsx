import { Heart } from "lucide-react";
import React from "react";
import { useToggleTrackLike, useUserTrackLike } from "@/hooks/music/use-tracks";
import { useAuthStore } from "@/stores/auth-store";
import { useCurrentUserProfile } from "@/hooks/public/use-profiles";

interface ILikeButtonProps {
    trackId: string;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ trackId }) => {
    const { user } = useAuthStore(); // Get current user from auth store
    const userId = user?.id;

    // Get user profile (optional - if you need profile data)
    const { data: userProfile } = useCurrentUserProfile(userId);

    // Fetch current liked state for the track
    const { data: userLike, isLoading: isFetching } = useUserTrackLike(
        trackId,
        userId || "",
        !!userId, // Only enabled if user is authenticated
    );

    // Use the toggle like hook for mutations
    const { isLiked, toggleLike, isLoading: isMutating } = useToggleTrackLike(trackId, userId || "");

    const isLoading = isFetching || isMutating;
    const liked = isLiked || !!userLike;

    const handleToggleLike = React.useCallback(async () => {
        if (!userId) {
            // Optional: Show login prompt or redirect to login
            console.warn("User must be logged in to like tracks");
            return;
        }

        if (isLoading) return;

        try {
            await toggleLike();
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Optional: Show error toast/notification
        }
    }, [userId, isLoading, toggleLike]);

    // Show disabled state for unauthenticated users
    if (!userId) {
        return (
            <button
                type="button"
                aria-label="Login to like"
                className="absolute top-3 left-3 text-2xl drop-shadow focus:outline-none opacity-60"
                title="Login to like tracks"
                disabled
            >
                <Heart size={20} className="text-white/60" fill="none" strokeWidth={2.2} />
            </button>
        );
    }

    return (
        <button
            type="button"
            aria-label={liked ? "Unlike track" : "Like track"}
            onClick={handleToggleLike}
            className="absolute top-3 left-3 text-2xl drop-shadow focus:outline-none disabled:opacity-60 transition-transform hover:scale-110 active:scale-95"
            title={liked ? "Unlike track" : "Like track"}
            disabled={isLoading}
        >
            <Heart
                size={20}
                className={`transition-colors duration-200 ${liked ? "text-red-500 fill-red-500" : "text-white/80 hover:text-red-400"}`}
                fill={liked ? "currentColor" : "none"}
                strokeWidth={2.2}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </button>
    );
};

export default LikeButton;
