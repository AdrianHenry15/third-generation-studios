import { Heart } from "lucide-react";
import React from "react";
import { useMusicQueryById, useMusicUpdate } from "@/hooks/music/use-music";

interface ILikeButtonProps {
    trackId: string;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ trackId }) => {
    // fetch current liked state for the track
    const { data: track, isLoading: isFetching } = useMusicQueryById<{ liked?: boolean }>("tracks", "tracks", trackId);

    // mutation to update the track (toggle liked)
    const { mutateAsync: updateLike, isPending: isMutating } = useMusicUpdate<{ liked?: boolean }>("tracks", "tracks");

    const liked = !!track?.liked;
    const isLoading = isFetching || isMutating;

    const toggleLike = React.useCallback(async () => {
        await updateLike({ id: trackId, values: { liked: !liked } });
    }, [trackId, liked, updateLike]);

    return (
        <button
            type="button"
            aria-label={liked ? "Unlike" : "Like"}
            onClick={() => {
                if (isLoading) return;
                void toggleLike();
            }}
            className="absolute top-3 left-3 text-2xl drop-shadow focus:outline-none disabled:opacity-60"
            title={liked ? "Unlike" : "Like"}
            disabled={isLoading}
        >
            <Heart
                size={20}
                className={`transition-colors ${liked ? "text-red-500 fill-red-500" : "text-white/80"}`}
                fill={liked ? "currentColor" : "none"}
                strokeWidth={2.2}
            />
        </button>
    );
};

export default LikeButton;
