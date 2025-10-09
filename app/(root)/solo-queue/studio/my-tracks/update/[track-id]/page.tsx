"use client";

import { useAlbumCoverUpdate } from "@/hooks/storage/use-music-storage";
import TrackUpdateForm from "@/components/layout/music/track-update-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { useTrack, useTrackWithRelations } from "@/hooks/music/use-tracks";

export default function TrackUpdatePage() {
    const params = useParams();
    const trackId = params["track-id"] as string;
    const [newAlbumCover, setNewAlbumCover] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadError, setUploadError] = useState<string>("");

    const { data: track, isLoading, error } = useTrackWithRelations(trackId);
    const albumCoverUpload = useAlbumCoverUpdate();

    // Handle album cover file selection
    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewAlbumCover(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Remove selected cover
    const removeCover = () => {
        setNewAlbumCover(null);
        setPreviewUrl("");
    };

    // Get current album cover
    const getCurrentCover = () => {
        return track?.albums?.album_images?.[0]?.url || "/placeholder-albums.png";
    };

    // Handle album cover upload
    const handleUploadCover = async () => {
        if (!newAlbumCover || !track?.albums?.id || !track?.artist_id) {
            setUploadStatus("error");
            setUploadError("Missing required data: album ID or artist ID");
            return;
        }

        setUploadStatus("idle");
        setUploadError("");

        try {
            console.log("Starting upload with:", {
                albumId: track.albums.id,
                artistId: track.artist_id,
                fileName: newAlbumCover.name,
            });

            const result = await albumCoverUpload.mutateAsync({
                albumId: track.albums.id,
                artistId: track.artist_id,
                albumImageFile: newAlbumCover,
            });

            console.log("Upload successful, result:", result);

            // Reset state after successful upload
            setNewAlbumCover(null);
            setPreviewUrl("");
            setUploadStatus("success");

            // Clear success message after 5 seconds
            setTimeout(() => setUploadStatus("idle"), 5000);
        } catch (error) {
            console.error("Failed to upload album cover:", error);
            setUploadStatus("error");
            setUploadError(error as string);
        }
    };

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
        console.error("Track fetch error:", error);
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Track Not Found</h1>
                        <p className="text-gray-300">The track you're looking for doesn't exist or you don't have permission to edit it.</p>
                        {error && (
                            <div className="mt-4 p-4 bg-red-900/20 rounded-lg">
                                <p className="text-red-400 text-sm">Error: {error.message}</p>
                            </div>
                        )}
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
                    {/* Debug info */}
                    {track && (
                        <div className="mt-2 text-sm text-gray-400">
                            Track: {track.title} | Album: {track.albums?.name || "No album"} | Artist:{" "}
                            {track.artists?.stage_name || "No artist"}
                        </div>
                    )}
                </div>

                {/* Debug Panel */}
                {/* {process.env.NODE_ENV === "development" && track && (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-xs">
                        <h3 className="text-white font-bold mb-2">Debug Info:</h3>
                        <div className="text-gray-300 space-y-1">
                            <p>Track ID: {track.id}</p>
                            <p>Album ID: {track.album?.id || "None"}</p>
                            <p>Artist ID: {track.artist_id || "None"}</p>
                            <p>Current Cover: {getCurrentCover()}</p>
                            <p>Upload Status: {uploadStatus}</p>
                            <p>Mutation Status: {albumCoverUpload.status}</p>
                        </div>
                    </div>
                )} */}

                {/* Album Cover Update Section */}
                <div className="bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden mb-6">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Album Cover</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Current Cover */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Current Cover</h3>
                                <div className="relative w-64 h-64 mx-auto bg-neutral-800 rounded-lg overflow-hidden">
                                    <Image src={getCurrentCover()} alt={`${track?.title} album cover`} className="object-cover" fill />
                                </div>
                                <p className="text-neutral-400 text-sm text-center">{track?.albums?.name || "No album assigned"}</p>
                            </div>

                            {/* New Cover Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Update Cover</h3>

                                {previewUrl ? (
                                    <div className="relative w-64 h-64 mx-auto bg-neutral-800 rounded-lg overflow-hidden">
                                        <Image src={previewUrl} alt="New album cover preview" fill className="object-cover" sizes="256px" />
                                        <button
                                            onClick={removeCover}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative w-64 h-64 mx-auto border-2 border-dashed border-neutral-600 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="flex flex-col items-center justify-center pointer-events-none">
                                            <Upload size={48} className="text-neutral-400 mb-4" />
                                            <p className="text-neutral-400 text-center">Click to upload new cover</p>
                                            <p className="text-neutral-500 text-sm text-center mt-2">PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                )}

                                {newAlbumCover && (
                                    <div className="space-y-4">
                                        <p className="text-green-400 text-sm text-center">New cover selected: {newAlbumCover.name}</p>
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={handleUploadCover}
                                                disabled={albumCoverUpload.isPending}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                {albumCoverUpload.isPending ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    "Upload Cover"
                                                )}
                                            </button>
                                            <button
                                                onClick={removeCover}
                                                disabled={albumCoverUpload.isPending}
                                                className="px-4 py-2 border border-neutral-600 hover:border-neutral-500 disabled:border-neutral-700 text-white rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                        {/* Enhanced status messages */}
                                        {(albumCoverUpload.isError || uploadStatus === "error") && (
                                            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                                <p className="text-red-400 text-sm text-center font-medium">❌ Failed to upload cover</p>
                                                <p className="text-red-300 text-xs text-center mt-1">
                                                    {uploadError || albumCoverUpload.error?.message || "Please try again"}
                                                </p>
                                                {process.env.NODE_ENV === "development" && (
                                                    <details className="mt-2">
                                                        <summary className="text-red-400 text-xs cursor-pointer">Debug Details</summary>
                                                        <pre className="text-red-300 text-xs mt-1 whitespace-pre-wrap">
                                                            {JSON.stringify(albumCoverUpload.error, null, 2)}
                                                        </pre>
                                                    </details>
                                                )}
                                            </div>
                                        )}

                                        {(albumCoverUpload.isSuccess || uploadStatus === "success") && (
                                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                                <p className="text-green-400 text-sm text-center font-medium">
                                                    ✅ Cover uploaded successfully!
                                                </p>
                                                <p className="text-green-300 text-xs text-center mt-1">
                                                    Your album cover has been updated. Refresh the page to see changes.
                                                </p>
                                            </div>
                                        )}

                                        {albumCoverUpload.isPending && (
                                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                                                <p className="text-blue-400 text-sm text-center font-medium">⏳ Uploading cover...</p>
                                                <p className="text-blue-300 text-xs text-center mt-1">
                                                    Please wait while we process your image
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Track Update Form */}
                <div className="bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 space-y-6">
                        <TrackUpdateForm track={track as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
