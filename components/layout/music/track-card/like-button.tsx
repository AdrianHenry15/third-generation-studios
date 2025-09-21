import { useTrackLikeState } from "@/hooks/music/use-track-likes";
import { Heart } from "lucide-react";
import React from "react";

type Props = {
    trackId: string;
};

const LikeButton: React.FC<Props> = ({ trackId }) => {
    const { liked, toggleLike, isLoading } = useTrackLikeState(trackId);

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
