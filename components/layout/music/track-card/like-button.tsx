import { Heart } from "lucide-react";
import React from "react";

interface ILikeButtonProps {
    like: boolean;
    handlelikeToggle: () => void;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ like, handlelikeToggle }) => {
    return (
        <button
            type="button"
            aria-label={like ? "Unlike" : "Like"}
            onClick={handlelikeToggle}
            className="absolute top-3 left-3 text-2xl drop-shadow focus:outline-none"
        >
            <Heart
                size={20}
                className={`transition-colors ${like ? "text-red-500 fill-red-500" : "text-white/80"}`}
                fill={like ? "currentColor" : "none"}
                strokeWidth={2.2}
            />
        </button>
    );
};

export default LikeButton;
