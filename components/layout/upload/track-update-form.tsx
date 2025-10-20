"use client";

import React, { useEffect, useState } from "react";
import { useTrackWithRelations } from "@/hooks/music/use-tracks";
import { useAlbumWithRelations } from "@/hooks/music/use-albums";
import { useTrackCreditByTrackId } from "@/hooks/music/use-track-credits";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpdateTrack } from "@/hooks/music/use-tracks";
import { useUpdateAlbum } from "@/hooks/music/use-albums";
import { useCreateTrackCredit, useUpdateTrackCredit } from "@/hooks/music/use-track-credits";
import { useModalStore } from "@/stores/modal-store";
import GenreAutocomplete from "./genre-autocomplete";
import TrackTypeDropdown from "./track-type-dropdown";
import { TrackUpdate } from "@/lib/types/database";

interface TrackUpdateFormProps {
    trackId: string;
    userId: string;
}

export default function TrackUpdateForm({ trackId, userId }: TrackUpdateFormProps) {
    const router = useRouter();
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);

    // Fetch track, album & credits
    const { data: track, isLoading: trackLoading, error: trackError } = useTrackWithRelations(trackId);
    const { data: album, isLoading: albumLoading } = useAlbumWithRelations(track?.album_id || "", !!track?.album_id);
    const { data: trackCredits, isLoading: creditsLoading } = useTrackCreditByTrackId(trackId, !!trackId);

    // Mutations
    const updateTrackMutation = useUpdateTrack();
    const updateAlbumMutation = useUpdateAlbum();
    const createTrackCreditMutation = useCreateTrackCredit();
    const updateTrackCreditMutation = useUpdateTrackCredit();

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        type: "Unreleased" as "Released" | "Unreleased" | "Work In Progress" | "Demo" | "Remix",
        lyrics: "",
        is_public: false,
        locked: false,
        release_date: "",
        spotify_url: "",
    });

    const [credits, setCredits] = useState({
        performed_by: "",
        produced_by: "",
        written_by: "",
        remixed_by: "",
    });

    // Populate form when data loads
    useEffect(() => {
        if (!track) return;

        console.log("📝 Populating form with track:", track);

        // Verify ownership
        if (track.artist_id !== userId) {
            console.error("❌ User doesn't own this track");
            router.push("/solo-queue/studio/my-tracks");
            return;
        }

        setFormData({
            title: track.title || "",
            genre: track.genre || "",
            type: track.type || "Unreleased",
            lyrics: track.lyrics || "",
            is_public: track.is_public ?? false,
            locked: track.locked || false,
            release_date: track.release_date || "",
            spotify_url:
                Array.isArray(track.links) && track.links.length > 0
                    ? (track.links.find((link: any) => link.platform === "Spotify") as any)?.url || ""
                    : "",
        });

        // Populate credits
        if (trackCredits && trackCredits.length > 0) {
            const credit = trackCredits[0];
            setCredits({
                performed_by: credit.performed_by?.[0] || "",
                produced_by: credit.produced_by?.[0] || "",
                written_by: credit.written_by?.[0] || "",
                remixed_by: credit.remixed_by?.[0] || "",
            });
        }

        console.log("✅ Form populated successfully");
    }, [track, trackCredits, userId, router]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!track || !album) return;

        try {
            // Update album (for singles, album name = track title)
            if (album.type === "Single") {
                await updateAlbumMutation.mutateAsync({
                    id: album.id,
                    updates: {
                        name: formData.title,
                        release_date: formData.release_date || undefined,
                    },
                });
            }

            // Prepare links
            const links: any[] = [];
            if (formData.spotify_url) {
                links.push({ platform: "Spotify", url: formData.spotify_url });
            }

            // Update track
            const trackUpdates: TrackUpdate = {
                title: formData.title,
                type: formData.type,
                genre: formData.genre || null,
                release_date: formData.release_date || null,
                lyrics: formData.lyrics || null,
                is_public: formData.is_public,
                locked: formData.locked,
                links: links.length > 0 ? links : null,
            };

            await updateTrackMutation.mutateAsync({
                id: track.id,
                updates: trackUpdates,
            });

            // Update or create credits
            const creditData = {
                performed_by: credits.performed_by ? [credits.performed_by] : [],
                produced_by: credits.produced_by ? [credits.produced_by] : [],
                written_by: credits.written_by ? [credits.written_by] : [],
                remixed_by: credits.remixed_by ? [credits.remixed_by] : [],
            };

            if (trackCredits && trackCredits.length > 0) {
                // Update existing credit
                await updateTrackCreditMutation.mutateAsync({
                    id: trackCredits[0].id,
                    updates: creditData,
                });
            } else {
                // Create new credit
                await createTrackCreditMutation.mutateAsync({
                    track_id: track.id,
                    artist_id: track.artist_id,
                    ...creditData,
                });
            }

            openModal("success", {
                title: "Track updated successfully",
                onConfirm: () => {
                    closeModal();
                    router.push("/solo-queue/studio/my-tracks");
                },
            });
        } catch (error) {
            console.error("Update error:", error);
            openModal("error", {
                title: "Update failed",
                errors: [(error as Error).message || "An unknown error occurred"],
            });
        }
    };

    // Loading & error states
    const isLoading = trackLoading || albumLoading || creditsLoading;
    const isUpdating = updateTrackMutation.isPending || updateAlbumMutation.isPending;

    if (trackError) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center py-12">
                    <p className="text-red-400">Failed to load track. Please try again.</p>
                    <Button onClick={() => router.push("/solo-queue/studio/my-tracks")} className="mt-4">
                        Back to My Tracks
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading track data...</p>
                </div>
            </div>
        );
    }

    if (!track) return null;

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-950/50 border border-neutral-800 rounded-2xl p-6 shadow-xl">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Update Track</h2>
                    <p className="text-sm text-muted-foreground">
                        Album: {album?.name} ({album?.type})
                    </p>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Track title"
                        required
                    />
                </div>

                {/* Genre */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Genre *</label>
                    <GenreAutocomplete
                        id="genre-input"
                        value={formData.genre}
                        onChange={(val) => setFormData({ ...formData, genre: val })}
                    />
                </div>

                {/* Track Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Track Type *</label>
                    <TrackTypeDropdown
                        trackId={trackId}
                        value={formData.type}
                        onChange={(val) => setFormData({ ...formData, type: val as any })}
                    />
                </div>

                {/* Release Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Release Date</label>
                    <Input
                        type="date"
                        value={formData.release_date}
                        onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                    />
                </div>

                {/* Track Credits */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Track Credits</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Performed By</label>
                        <Input
                            value={credits.performed_by}
                            onChange={(e) => setCredits({ ...credits, performed_by: e.target.value })}
                            placeholder="Artist name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Produced By</label>
                        <Input
                            value={credits.produced_by}
                            onChange={(e) => setCredits({ ...credits, produced_by: e.target.value })}
                            placeholder="Producer name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Written By</label>
                        <Input
                            value={credits.written_by}
                            onChange={(e) => setCredits({ ...credits, written_by: e.target.value })}
                            placeholder="Writer name"
                        />
                    </div>

                    {formData.type === "Remix" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Remixed By</label>
                            <Input
                                value={credits.remixed_by}
                                onChange={(e) => setCredits({ ...credits, remixed_by: e.target.value })}
                                placeholder="Remixer name"
                            />
                        </div>
                    )}
                </div>

                {/* Spotify URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Spotify URL</label>
                    <Input
                        value={formData.spotify_url}
                        onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                        placeholder="https://open.spotify.com/track/..."
                    />
                </div>

                {/* Lyrics */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Lyrics</label>
                    <Textarea
                        value={formData.lyrics}
                        onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                        placeholder="Enter track lyrics..."
                        rows={6}
                    />
                </div>

                {/* Switches */}
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <Switch checked={formData.is_public} onCheckedChange={(val) => setFormData({ ...formData, is_public: val })} />
                        <span className="text-sm font-medium">Public</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch checked={formData.locked} onCheckedChange={(val) => setFormData({ ...formData, locked: val })} />
                        <span className="text-sm font-medium">Locked</span>
                    </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-4 flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/solo-queue/studio/my-tracks")}
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating} className="flex-1">
                        {isUpdating ? "Updating..." : "Update Track"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
