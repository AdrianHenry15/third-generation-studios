import React from "react";

interface ILockButtonProps {
    onUnlock?: (trackId: string) => void;
    trackId: string;
}

const LockButton: React.FC<ILockButtonProps> = ({ onUnlock, trackId }) => {
    return (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center rounded-2xl">
            <p className="text-white font-semibold mb-2">Locked</p>
            <button
                onClick={() => onUnlock && onUnlock(trackId)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-400 hover:to-pink-400 transition"
            >
                Unlock
            </button>
        </div>
    );
};

export default LockButton;
