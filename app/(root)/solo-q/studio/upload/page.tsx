"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// 🪝 Import the music storage hooks
import { useAlbumInsertWithCover, useTrackUpload } from "@/hooks/storage/use-music-storage";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileByIdQuery } from "@/hooks/public/use-profiles";
import StudioUploadForm, { UploadMode, TrackUploadData } from "@/components/layout/solo-q/studio/studio-upload-form";

export default function StudioUploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthStore();
    const { data: profile } = useProfileByIdQuery(user?.id || "");

    // 🎯 Use the music storage hooks
    const albumInsert = useAlbumInsertWithCover();
    const trackUpload = useTrackUpload();

    const validateUpload = (data: {
        mode: UploadMode;
        tracks: TrackUploadData[];
        albumData?: any;
    }): boolean => {
        // Check if user is artist
        if (!profile || profile.role !== "artist") {
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

        // Validate album data for album mode
        if (data.mode === "album" && data.albumData && !data.albumData.album_name.trim()) {
            setError("Album name is required.");
            return false;
        }

        // For single mode, require track cover
        if (data.mode === "single") {
            const track = data.tracks[0];
            if (!track.coverFile) {
                setError("Cover image is required for single tracks.");
                return false;
            }
        }

        // For album mode with Single type, require track covers
        if (data.mode === "album" && data.albumData?.album_type === "Single") {
            for (let i = 0; i < data.tracks.length; i++) {
                const track = data.tracks[i];
                if (!track.coverFile) {
                    setError(`Cover image is required for track ${i + 1} in Single releases.`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleUpload = async (data: {
        mode: UploadMode;
        tracks: TrackUploadData[];
        albumData?: any;
    }) => {
        if (!validateUpload(data)) return;

        setIsUploading(true);
        setError(null);

        try {
            // 1️⃣ Insert album using the useAlbumInsertWithCover hook
            const album = await albumInsert.mutateAsync({
                albumData: {
                    name: data.albumData!.album_name,
                    type: data.albumData!.album_type,
                    release_date: data.albumData!.album_release_date,
                    artist_id: profile!.id,
                },
                // Only pass album cover for EP/Album types, not Singles
                coverFile: data.albumData?.album_type !== "Single" ? data.albumData?.coverFile : undefined,
            });

            // 2️⃣ Upload all tracks using the useTrackUpload hook
            for (const track of data.tracks) {
                await trackUpload.mutateAsync({
                    trackData: {
                        title: track.title,
                        type: track.type,
                        genre: track.genre,
                        duration: track.duration,
                        release_date: track.release_date,
                        copyright: track.copyright || "",
                        lyrics: track.lyrics || "",
                        spotify_id: track.spotify_id || "",
                        artist_id: album.artist_id,
                        album_id: album.id,
                    },
                    audioFile: track.audioFile!,
                    // Only pass track cover for Single releases or single mode
                    coverFile: (data.mode === "single" || data.albumData?.album_type === "Single") ? track.coverFile : undefined,
                });
            }

            setUploadSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Failed to upload. Please try again.");
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
