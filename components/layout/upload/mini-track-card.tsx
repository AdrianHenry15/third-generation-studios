import { TrackUploadData, TrackWithRelations } from "@/lib/types/database";
import React from "react";

// Props for track upload status display
type MiniTrackCardProps = {
    track: TrackUploadData;
    status: "uploading" | "finished" | "failed";
    progress?: number; // 0-100, only relevant for uploading
};

// Compact card showing track upload status with progress indicator
export default function MiniTrackCard({ track, status, progress }: MiniTrackCardProps) {
    return (
        <div
            className={`flex items-center gap-3 p-2 rounded border ${status === "uploading" ? "border-yellow-400" : status === "finished" ? "border-green-500" : "border-red-500"}`}
        >
            {/* Status icon - checkmark, error, or loading spinner */}
            <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center">
                {status === "finished" ? (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="#22c55e" />
                        <path d="M8 12.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : status === "failed" ? (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="#ef4444" />
                        <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#facc15" strokeWidth="2" fill="none" />
                        <path d="M12 6v6l4 2" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            {/* Track info and progress bar */}
            <div className="flex-1">
                <div className="font-semibold">{track.title}</div>
                {/* Status text */}
                <div className="text-xs text-neutral-400">
                    {status === "uploading" ? (
                        <>
                            Uploading...
                            {typeof progress === "number" && <span className="ml-2 text-yellow-300">{progress}%</span>}
                        </>
                    ) : status === "finished" ? (
                        "Uploaded"
                    ) : (
                        <span className="text-red-400">Failed to upload</span>
                    )}
                </div>
                {/* Progress bar for uploading state */}
                {status === "uploading" && typeof progress === "number" && (
                    <div className="mt-1 h-2 w-full bg-neutral-800 rounded">
                        <div className="h-2 rounded bg-yellow-400 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
}
