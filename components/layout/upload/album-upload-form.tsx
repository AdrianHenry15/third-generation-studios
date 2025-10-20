"use client";

import React, { useState } from "react";
import { useUploadFormStore } from "@/stores/upload-form-store";
import { useUploadForm } from "@/hooks/music/upload/use-upload-form";
import UploadModeTabs from "./upload-mode-tabs";
import AlbumDetailsForm from "./album-details-form";
import TrackListEditor from "./track-list-editor";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "@/components/ui/buttons/button";
import { useCreateAlbumWithImages } from "@/hooks/music/use-albums";
import { useAuthStore } from "@/stores/auth-store";
import { useTrackCredits } from "@/hooks/music/use-track-credits";
import { fetchAlbumsByArtist } from "@/lib/fetchers/album-fetchers";
import { TrackUploadData, TrackWithRelations } from "@/lib/types/database";
import MiniTrackCard from "./mini-track-card";
import { useTrackUpload } from "@/hooks/storage/use-music-storage";

// Extended track type with file support for uploads
type TrackWithFile = TrackWithRelations & { file?: File };

export default function AlbumUploadForm() {
    // Track upload state management
    const [uploadingTracks, setUploadingTracks] = useState<TrackUploadData[]>([]);
    const [finishedTracks, setFinishedTracks] = useState<TrackUploadData[]>([]);
    const [failedTracks, setFailedTracks] = useState<TrackUploadData[]>([]);
    const [trackProgress, setTrackProgress] = useState<Record<string, number>>({});

    // Store and auth hooks
    const { user } = useAuthStore();
    const { tracks, albumData, trackCreditData } = useUploadFormStore();
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);

    // Mutation hooks for DB operations
    const createAlbumWithImages = useCreateAlbumWithImages();
    const trackUpload = useTrackUpload();
    const { createMutation: createTrackCreditMutation } = useTrackCredits();

    const userId = user?.id as string;

    // Main upload handler
    const handleUploadSubmit = async (data: any) => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Reset upload state
        setUploadingTracks([]);
        setFinishedTracks([]);
        setFailedTracks([]);
        setTrackProgress({});

        try {
            // Check for duplicate album names
            const artistAlbums = await fetchAlbumsByArtist(userId);
            const existingAlbums = artistAlbums.filter((album) => album.name.trim().toLowerCase() === albumData.name.trim().toLowerCase());
            if (existingAlbums.length > 0) {
                openModal("error", {
                    title: "Duplicate Album",
                    errors: ["An album with this name already exists for this artist."],
                });
                return;
            }

            // Handle full album upload
            if (albumData.type === "Album") {
                // Prepare album data
                const albumInsertData = {
                    name: albumData.name,
                    type: albumData.type,
                    artist_id: userId,
                    release_date: albumData.release_date ?? new Date().toISOString(),
                };

                // Prepare album images
                const albumImages = albumData.albumImageFile
                    ? [
                          {
                              name: albumData.name ?? "album-image",
                              file: albumData.albumImageFile,
                          },
                      ]
                    : [];

                // Create album with images (uploads to storage)
                const album = await createAlbumWithImages.mutateAsync({
                    albumData: albumInsertData,
                    images: albumImages,
                });

                // Upload each track
                for (let i = 0; i < tracks.length; i++) {
                    const track = tracks[i] as TrackWithFile;

                    // Set track as uploading
                    setUploadingTracks((prev) => [...prev, track]);
                    setTrackProgress((prev) => ({ ...prev, [track.id]: 0 }));

                    try {
                        // Upload audio file and create track record
                        const newTrack = await trackUpload.mutateAsync({
                            trackData: {
                                type: track.type,
                                title: track.title,
                                album_id: album.id,
                                artist_id: userId,
                                release_date: track.release_date ?? new Date().toISOString(),
                                links: track.links || [],
                            },
                            audioFile: track.file!,
                        });

                        // Mark track as finished
                        setTrackProgress((prev) => ({ ...prev, [track.id]: 100 }));
                        setFinishedTracks((prev) => [...prev, track]);
                        setUploadingTracks((prev) => prev.filter((t) => t.id !== track.id));

                        // Insert track credits
                        const credits = trackCreditData[track.id];
                        if (credits && Object.keys(credits).length > 0) {
                            await createTrackCreditMutation.mutateAsync({
                                track_id: newTrack.id,
                                artist_id: userId,
                                performed_by: credits.performed_by || [],
                                produced_by: credits.produced_by || [],
                                written_by: credits.written_by || [],
                                remixed_by: credits.remixed_by || [],
                            });
                        }
                    } catch (trackError) {
                        // Mark track as failed and stop upload
                        setUploadingTracks((prev) => prev.filter((t) => t.id !== track.id));
                        setFailedTracks((prev) => [...prev, track]);
                        throw trackError;
                    }
                }
            } else {
                // Handle single track upload
                const singleTrack = tracks[0];

                if (!singleTrack) {
                    throw new Error("No track found for single upload.");
                }

                // Create single album
                const albumInsertData = {
                    name: singleTrack.title || "Single",
                    type: "Single" as const,
                    artist_id: userId,
                    release_date: singleTrack.release_date ?? new Date().toISOString(),
                };

                const albumImages = albumData.albumImageFile
                    ? [
                          {
                              name: singleTrack.title ?? "single-image",
                              file: albumData.albumImageFile,
                          },
                      ]
                    : [];

                // Create single album with image
                const singleAlbum = await createAlbumWithImages.mutateAsync({
                    albumData: albumInsertData,
                    images: albumImages,
                });

                // Set track as uploading
                setUploadingTracks([singleTrack]);
                setTrackProgress({ [singleTrack.id]: 0 });

                try {
                    // Upload track
                    const newTrack = await trackUpload.mutateAsync({
                        trackData: {
                            type: singleTrack.type,
                            title: singleTrack.title,
                            album_id: singleAlbum.id,
                            artist_id: userId,
                            release_date: singleTrack.release_date ?? new Date().toISOString(),
                            links: singleTrack.links || [],
                        },
                        audioFile: singleTrack.audioFile!,
                    });

                    // Mark as finished
                    setTrackProgress({ [singleTrack.id]: 100 });
                    setFinishedTracks([singleTrack]);
                    setUploadingTracks([]);

                    // Insert credits
                    const credits = trackCreditData[singleTrack.id];
                    if (credits && Object.keys(credits).length > 0) {
                        await createTrackCreditMutation.mutateAsync({
                            track_id: newTrack.id,
                            artist_id: newTrack.artist_id, // <-- required
                            performed_by: credits.performed_by || [],
                            produced_by: credits.produced_by || [],
                            written_by: credits.written_by || [],
                            remixed_by: credits.remixed_by || [],
                        });
                    }
                } catch (trackError) {
                    // Mark as failed
                    setUploadingTracks([]);
                    setFailedTracks([singleTrack]);
                    throw trackError;
                }
            }

            // Show success modal
            openModal("success", {
                title: "Upload completed",
                onConfirm: () => closeModal(),
            });
        } catch (err) {
            // Clear uploading state on error
            setUploadingTracks([]);

            // Show error modal
            console.error("Upload error:", err);
            openModal("error", {
                title: "Upload failed",
                errors: [(err as Error).message || "An unknown error occurred during upload."],
            });
        }
    };

    const { errors, isUploading, handleSubmit } = useUploadForm(handleUploadSubmit);

    return (
        <>
            {/* Upload progress cards */}
            {(uploadingTracks.length > 0 || finishedTracks.length > 0 || failedTracks.length > 0) && (
                <div className="mb-4 space-y-2">
                    {uploadingTracks.map((track) => (
                        <MiniTrackCard key={track.id} track={track} status="uploading" progress={trackProgress[track.id]} />
                    ))}
                    {finishedTracks.map((track) => (
                        <MiniTrackCard key={track.id} track={track} status="finished" progress={100} />
                    ))}
                    {failedTracks.map((track) => (
                        <MiniTrackCard key={track.id} track={track} status="failed" />
                    ))}
                </div>
            )}

            {/* Upload form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto space-y-6 bg-neutral-950/50 border border-neutral-800 rounded-2xl p-6 shadow-xl"
            >
                {/* Upload mode tabs */}
                <UploadModeTabs />

                {/* Album/track details and track list */}
                <AlbumDetailsForm />
                <TrackListEditor />

                {/* Validation errors */}
                {errors.length > 0 && (
                    <div className="rounded-lg bg-red-500/10 border border-red-600/40 text-red-400 p-3 text-sm">
                        <ul className="list-disc ml-5 space-y-1">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Submit button */}
                <div className="pt-4">
                    <Button type="submit" disabled={isUploading || !tracks.length} className="w-full">
                        {isUploading ? "Uploading..." : "Continue to Upload"}
                    </Button>
                </div>
            </form>
        </>
    );
}
