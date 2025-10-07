"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

import StudioUploadForm, {
    UploadMode,
    TrackUploadData,
    AlbumUploadData,
    RemixUploadData,
} from "@/components/layout/solo-queue/studio/studio-upload-form";
import SuccessModal from "@/components/modals/success-modal";

import { useAlbumInsertWithCover, useTrackUpload } from "@/hooks/storage/use-music-storage";
import { useTrackCreditInsert } from "@/hooks/music/use-tracks";
import { useRemixInsert } from "@/hooks/music/use-remixes";
import { useArtistById } from "@/hooks/music/use-artists";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileByIdQuery } from "@/hooks/public/use-profiles";

import { CreditRoleType, IArtistProps } from "@/lib/types/music-types";

export default function StudioUploadPage() {
    // -------------------- STATE & STORE --------------------
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuthStore();
    const { data: profile } = useProfileByIdQuery(user?.id || "");
    const { data: artist } = useArtistById(user?.id || "") as { data: IArtistProps | null };
    const router = useRouter();

    // -------------------- HOOKS --------------------
    const useAlbumInsert = useAlbumInsertWithCover();
    const useTrackUploadHook = useTrackUpload();
    const useTrackCreditInsertHook = useTrackCreditInsert();
    const useRemixInsertHook = useRemixInsert();

    // -------------------- VALIDATION --------------------
    const validateUpload = (data: { mode: UploadMode; tracks: TrackUploadData[]; albumData: AlbumUploadData }): boolean => {
        if (!user || !profile) {
            setError("Please log in to upload tracks.");
            return false;
        }

        if (profile.role !== "artist") {
            setError("You must be an artist to upload tracks.");
            return false;
        }

        if (!data.tracks.length) {
            setError("At least one track is required.");
            return false;
        }

        // Validate tracks
        for (let i = 0; i < data.tracks.length; i++) {
            const t = data.tracks[i];
            if (!t.title.trim()) return (setError(`Track ${i + 1} title is required.`), false);
            if (!t.audioFile) return (setError(`Audio file is required for track ${i + 1}.`), false);
            if (!t.genre.trim()) return (setError(`Genre is required for track ${i + 1}.`), false);
        }

        // Validate album
        if (!data.albumData.name.trim()) return (setError("Album name is required."), false);

        // Image validation based on mode/type
        if (data.mode === "single" && !data.tracks[0].trackImageFile)
            return (setError("Cover image is required for single tracks."), false);

        if (data.mode === "album" && data.albumData.type === "Single" && data.tracks.some((t) => !t.trackImageFile))
            return (setError("Cover image is required for all tracks in Single releases."), false);

        if (data.mode === "album" && data.albumData.type !== "Single" && !data.albumData.albumImageFile)
            return (setError("Album cover image is required for EP/Album releases."), false);

        return true;
    };

    // -------------------- UPLOAD HANDLER --------------------
    const handleUpload = async (data: {
        mode: UploadMode;
        tracks: TrackUploadData[];
        albumData: AlbumUploadData;
        remixData: Record<string, RemixUploadData>;
    }) => {
        if (!validateUpload(data)) return;

        setIsUploading(true);
        setError(null);

        try {
            // ---------- 1️⃣ Insert Album ----------
            const album = await useAlbumInsert.mutateAsync({
                albumData: {
                    name: data.albumData.name,
                    type: data.albumData.type,
                    release_date: data.albumData.release_date,
                    artist_id: user?.id!,
                },
                albumImageFile: data.albumData.type !== "Single" ? data.albumData.albumImageFile : undefined,
            });

            // ---------- 2️⃣ Upload Tracks ----------
            interface UploadedTrack {
                id: string;
                title: string;
                album_id: string;
                artist_id: string;
                // Add other fields if needed
            }

            const uploadedTracks: UploadedTrack[] = await Promise.all(
                data.tracks.map((track) =>
                    useTrackUploadHook.mutateAsync({
                        trackData: {
                            title: track.title,
                            genre: track.genre,
                            duration: track.duration,
                            release_date: track.release_date,
                            lyrics: track.lyrics || "",
                            locked: track.locked || false,
                            is_public: track.is_public || false,
                            plays: 0,
                            links: { spotify: track.links?.spotify || "" },
                            artist_id: user?.id!,
                            album_id: album.id,
                        },
                        audioFile: track.audioFile!,
                        trackImageFile: data.mode === "single" || data.albumData.type === "Single" ? track.trackImageFile : undefined,
                    }),
                ),
            );

            // ---------- 3️⃣ Insert Track Credits ----------
            await Promise.all(
                uploadedTracks.map((uploadedTrack) =>
                    useTrackCreditInsertHook.mutateAsync({
                        track_id: uploadedTrack.id,
                        name: artist?.stage_name || "Unknown Artist",
                        role: "main-artist" as CreditRoleType,
                    }),
                ),
            );

            // ---------- 4️⃣ Insert Remix Data ----------
            interface RemixData {
                original_song: string;
                url?: string | null;
                original_artists: string[];
                additional_artists?: string[] | null;
            }

            await Promise.all(
                uploadedTracks
                    .map((uploadedTrack, idx) => {
                        const trackData = data.tracks[idx];
                        const remixInfo = data.remixData[trackData.id] as RemixData | undefined;

                        if (trackData.type === "Remix" && remixInfo?.original_artists?.length) {
                            return useRemixInsertHook.mutateAsync({
                                track_id: uploadedTrack.id,
                                original_song: remixInfo.original_song,
                                url: remixInfo.url || null,
                                original_artists: remixInfo.original_artists,
                                additional_artists: remixInfo.additional_artists?.length ? remixInfo.additional_artists : null,
                            });
                        }
                        return null;
                    })
                    .filter(Boolean) as Promise<unknown>[],
            );

            // ---------- 5️⃣ Success ----------
            setUploadSuccess(true);
        } catch (err) {
            console.error("Upload error:", err);
            setError(err instanceof Error ? err.message : "Failed to upload. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    // -------------------- RENDER --------------------
    return (
        <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Upload Music</h1>
                <p className="text-muted-foreground">Share your music with the Solo-Queue community</p>
            </header>

            {uploadSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                        Music uploaded successfully! It will be reviewed before going live.
                    </AlertDescription>
                </Alert>
            )}

            {uploadSuccess && (
                <SuccessModal
                    title="Upload Successful"
                    confirmText="Go to My Tracks"
                    onCancel={() => setUploadSuccess(false)}
                    onConfirm={() => router.push("/solo-queue/studio/my-tracks")}
                />
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
