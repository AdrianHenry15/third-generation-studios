"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import the music storage hooks
import { useAlbumInsertWithCover, useTrackUpload } from "@/hooks/storage/use-music-storage";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileByIdQuery } from "@/hooks/public/use-profiles";
import StudioUploadForm, { UploadMode, TrackUploadData, AlbumUploadData } from "@/components/layout/solo-q/studio/studio-upload-form";

export default function StudioUploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthStore();
    const { data: profile } = useProfileByIdQuery(user?.id || "");

    // Use the music storage hooks
    const albumInsert = useAlbumInsertWithCover();
    const trackUpload = useTrackUpload();

    const validateUpload = (data: { mode: UploadMode; tracks: TrackUploadData[]; albumData: AlbumUploadData }): boolean => {
        // Check if user exists and has profile
        if (!user || !profile) {
            setError("Please log in to upload tracks.");
            return false;
        }

        // Check if user is artist
        if (profile.role !== "artist") {
            setError("You must be an artist to upload tracks.");
            return false;
        }

        // Check if tracks exist
        if (!data.tracks.length) {
            setError("At least one track is required.");
            return false;
        }

        // Validate each track
        for (let i = 0; i < data.tracks.length; i++) {
            const track = data.tracks[i];
            if (!track.title.trim()) {
                setError(`Track ${i + 1} title is required.`);
                return false;
            }
            if (!track.audioFile) {
                setError(`Please select an audio file for track ${i + 1}.`);
                return false;
            }
            if (!track.genre.trim()) {
                setError(`Genre is required for track ${i + 1}.`);
                return false;
            }
        }

        // Validate album data
        if (!data.albumData.name.trim()) {
            setError("Album name is required.");
            return false;
        }

        // For single mode, require track cover
        if (data.mode === "single") {
            const track = data.tracks[0];
            if (!track.trackImageFile) {
                setError("Cover image is required for single tracks.");
                return false;
            }
        }

        // For album mode with Single type, require track covers
        if (data.mode === "album" && data.albumData.type === "Single") {
            for (let i = 0; i < data.tracks.length; i++) {
                const track = data.tracks[i];
                if (!track.trackImageFile) {
                    setError(`Cover image is required for track ${i + 1} in Single releases.`);
                    return false;
                }
            }
        }

        // For album mode with EP/Album types, require album cover
        if (data.mode === "album" && data.albumData.type !== "Single" && !data.albumData.albumImageFile) {
            setError("Album cover image is required for EP/Album releases.");
            return false;
        }

        return true;
    };

    const handleUpload = async (data: { mode: UploadMode; tracks: TrackUploadData[]; albumData: AlbumUploadData }) => {
        if (!validateUpload(data)) return;

        setIsUploading(true);
        setError(null);

        try {
            // 1️⃣ Insert album first
            const album = await albumInsert.mutateAsync({
                albumData: {
                    name: data.albumData.name,
                    type: data.albumData.type,
                    release_date: data.albumData.release_date,
                    artist_id: profile!.id, // Use profile.id as artist_id
                },
                // Only pass album image for EP/Album types, not Singles
                albumImageFile: data.albumData.type !== "Single" ? data.albumData.albumImageFile : undefined,
            });

            // 2️⃣ Upload all tracks and associate them with the created album
            const trackUploadPromises = data.tracks.map(async (track) => {
                return trackUpload.mutateAsync({
                    trackData: {
                        title: track.title,
                        type: track.type,
                        genre: track.genre,
                        duration: track.duration,
                        release_date: track.release_date,
                        copyright: track.copyright || "",
                        lyrics: track.lyrics || "",
                        links: {
                            spotify: track.links?.spotify || "",
                        },
                        artist_id: profile!.id, // Use profile.id as artist_id
                        album_id: album.id, // Associate with the created album
                    },
                    audioFile: track.audioFile!,
                    // Pass track image for Single releases or single mode
                    trackImageFile: data.mode === "single" || data.albumData.type === "Single" ? track.trackImageFile : undefined,
                });
            });

            // Wait for all tracks to upload
            await Promise.all(trackUploadPromises);

            setUploadSuccess(true);
        } catch (err) {
            console.error("Upload error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to upload. Please try again.";
            setError(errorMessage);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Upload Music</h1>
                <p className="text-muted-foreground">Share your music with the Solo-Q community</p>
            </div>

            {uploadSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        Music uploaded successfully! It will be reviewed before going live.
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <StudioUploadForm onSubmit={handleUpload} isUploading={isUploading} />
        </div>
    );
}
