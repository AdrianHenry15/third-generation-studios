"use client";

import { useTrackByIdWithJoinsQuery } from "@/hooks/music/use-music";
import TrackUpdateForm from "@/components/layout/music/track-update-form";
import { useParams } from "next/navigation";

interface PageProps {
    params: {
        "track-id": string;
    };
}

export default function TrackUpdatePage() {
    const params = useParams();
    const trackId = params["track-id"] as string;

    const { data: track, isLoading, error } = useTrackByIdWithJoinsQuery(trackId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !track) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Track Not Found</h1>
                        <p className="text-gray-300">The track you're looking for doesn't exist or you don't have permission to edit it.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6 pt-24">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Update Track</h1>
                    <p className="text-gray-300">Modify track information, settings, and metadata</p>
                </div>

                {/* Track Update Form */}
                <div className="bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <TrackUpdateForm track={track} />
                    </div>
                </div>
            </div>
        </div>
    );
}
