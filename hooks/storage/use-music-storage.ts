"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile, deleteFile } from "@/lib/supabase/storage";
import { useMusicInsert, useMusicUpdate } from "@/hooks/music/use-music";
import { QUERY_KEYS } from "@/lib/queries/query-keys";

import type { IArtistProps, IAlbumProps, IAlbumImageProps, ITrackProps } from "@/lib/solo-q-types/music-types";

// -------------------------
// ARTISTS
// -------------------------
export function useArtistAvatarUpload() {
    const qc = useQueryClient();
    const updateArtist = useMusicUpdate<IArtistProps>("artists", "artists");

    return useMutation({
        mutationFn: async ({ artistId, file }: { artistId: string; file: File }) => {
            const url = await uploadFile({
                bucket: "avatars",
                file,
                userId: artistId,
            });

            if (!url) throw new Error("Failed to upload avatar");

            await updateArtist.mutateAsync({
                id: artistId,
                values: { profile_image_url: url },
            });

            return url;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS["artists"] }),
    });
}

// -------------------------
// ALBUMS
// -------------------------
export function useAlbumInsertWithCover() {
    const qc = useQueryClient();
    const insertAlbum = useMusicInsert<IAlbumProps>("albums", "albums");
    const insertAlbumImage = useMusicInsert<IAlbumImageProps>("album_images", "album_images");

    return useMutation({
        mutationFn: async ({ albumData, albumImageFile }: { albumData: Partial<IAlbumProps>; albumImageFile?: File }) => {
            const album = await insertAlbum.mutateAsync(albumData);

            if (albumImageFile) {
                const url = await uploadFile({
                    bucket: "album-covers",
                    file: albumImageFile,
                    userId: album.artist_id,
                });

                if (!url) throw new Error("Failed to upload album cover");

                await insertAlbumImage.mutateAsync({
                    album_id: album.id,
                    url,
                    name: albumImageFile.name,
                });
            }

            return album;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS["albums"] }),
    });
}

// -------------------------
// TRACKS
// -------------------------

// Helper function to get audio duration
async function getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        const url = URL.createObjectURL(file);

        audio.addEventListener("loadedmetadata", () => {
            URL.revokeObjectURL(url);
            resolve(Math.floor(audio.duration)); // Duration in seconds
        });

        audio.addEventListener("error", () => {
            URL.revokeObjectURL(url);
            reject(new Error("Could not load audio file"));
        });

        audio.src = url;
    });
}

export function useTrackUpload() {
    const qc = useQueryClient();
    const insertTrack = useMusicInsert<ITrackProps>("tracks", "tracks");
    const insertTrackImage = useMusicInsert<IAlbumImageProps>("album_images", "album_images");

    return useMutation({
        mutationFn: async ({
            trackData,
            audioFile,
            trackImageFile,
        }: {
            trackData: Partial<ITrackProps>;
            audioFile: File;
            trackImageFile?: File;
        }) => {
            // Validate required fields
            if (!trackData.album_id || !trackData.artist_id || !trackData.title) {
                throw new Error("Missing required fields: album_id, artist_id, and title are required");
            }

            // Get audio duration (you'll need to implement this helper)
            const duration = await getAudioDuration(audioFile);

            // Upload audio file
            const audioUrl = await uploadFile({
                bucket: "track-urls",
                file: audioFile,
                userId: trackData.artist_id,
            });

            if (!audioUrl) throw new Error("Failed to upload track file");

            // Create track record with all required fields
            const track = await insertTrack.mutateAsync({
                ...trackData,
                url: audioUrl,
                duration, // Now included
                plays: 0, // Initialize plays counter
                locked: trackData.locked ?? false, // Default to unlocked
            });

            // Upload track image if provided (for singles)
            if (trackImageFile) {
                const imageUrl = await uploadFile({
                    bucket: "album-covers",
                    file: trackImageFile,
                    userId: trackData.artist_id,
                });

                if (imageUrl) {
                    // Add track image to album_images table
                    await insertTrackImage.mutateAsync({
                        album_id: track.album_id,
                        url: imageUrl,
                        name: trackImageFile.name,
                    });
                }
            }

            return track;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS["tracks"] });
            qc.invalidateQueries({ queryKey: QUERY_KEYS["albums"] });
        },
    });
}

// -------------------------
// GENERIC STORAGE HELPERS
// -------------------------
export function useDeleteStorageFile(bucket: "avatars" | "album-covers" | "track-urls") {
    return useMutation({
        mutationFn: async (path: string) => {
            const ok = await deleteFile(bucket, path);
            if (!ok) throw new Error("Failed to delete file");
            return path;
        },
    });
}

// -------------------------
// COMPOSITE OPERATIONS
// -------------------------

// If you want a combined operation for creating album + track
export function useAlbumWithTrackUpload() {
    const qc = useQueryClient();
    const insertAlbum = useMusicInsert<IAlbumProps>("albums", "albums");
    const insertTrack = useMusicInsert<ITrackProps>("tracks", "tracks");
    const insertAlbumImage = useMusicInsert<IAlbumImageProps>("album_images", "album_images");

    return useMutation({
        mutationFn: async ({
            albumData,
            trackData,
            audioFile,
            coverImageFile,
        }: {
            albumData: Partial<IAlbumProps>;
            trackData: Partial<ITrackProps>;
            audioFile: File;
            coverImageFile?: File;
        }) => {
            // Create album first
            const album = await insertAlbum.mutateAsync(albumData);

            // Get audio duration
            const duration = await getAudioDuration(audioFile);

            // Upload audio file
            const audioUrl = await uploadFile({
                bucket: "track-urls",
                file: audioFile,
                userId: albumData.artist_id!,
            });

            if (!audioUrl) throw new Error("Failed to upload track file");

            // Create track with album reference
            const track = await insertTrack.mutateAsync({
                ...trackData,
                album_id: album.id,
                artist_id: album.artist_id,
                url: audioUrl,
                duration,
                plays: 0,
                locked: trackData.locked ?? false,
            });

            // Upload cover image if provided
            if (coverImageFile) {
                const imageUrl = await uploadFile({
                    bucket: "album-covers",
                    file: coverImageFile,
                    userId: album.artist_id,
                });

                if (imageUrl) {
                    await insertAlbumImage.mutateAsync({
                        album_id: album.id,
                        url: imageUrl,
                        name: coverImageFile.name,
                    });
                }
            }

            return { album, track };
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS["albums"] });
            qc.invalidateQueries({ queryKey: QUERY_KEYS["tracks"] });
        },
    });
}

// Track file replacement hook
export function useTrackFileReplace() {
    const qc = useQueryClient();
    const updateTrack = useMusicUpdate<ITrackProps>("tracks", "tracks");
    const updateAlbum = useMusicUpdate<IAlbumProps>("albums", "albums");

    return useMutation({
        mutationFn: async ({
            trackId,
            albumId,
            albumType,
            artistId,
            newFile,
            newTitle,
        }: {
            trackId: string;
            albumId: string;
            albumType: string;
            artistId: string;
            newFile: File;
            newTitle?: string;
        }) => {
            // Get new audio duration
            const duration = await getAudioDuration(newFile);

            // Upload new audio file
            const newAudioUrl = await uploadFile({
                bucket: "track-urls",
                file: newFile,
                userId: artistId,
            });

            if (!newAudioUrl) throw new Error("Failed to upload new track file");

            // Update track with new URL and duration
            const updatedTrack = await updateTrack.mutateAsync({
                id: trackId,
                values: {
                    url: newAudioUrl,
                    duration,
                    ...(newTitle && { title: newTitle }),
                },
            });

            // If album is a Single and we have a new title, update album name too
            if (albumType === "Single" && newTitle) {
                await updateAlbum.mutateAsync({
                    id: albumId,
                    values: { name: newTitle },
                });
            }

            return updatedTrack;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS["tracks"] });
            qc.invalidateQueries({ queryKey: QUERY_KEYS["albums"] });
        },
    });
}
