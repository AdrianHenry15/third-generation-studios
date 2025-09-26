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
    const insertImage = useMusicInsert<IAlbumImageProps>("album_images", "album_images");

    return useMutation({
        mutationFn: async ({ albumData, coverFile }: { albumData: Partial<IAlbumProps>; coverFile?: File }) => {
            const album = await insertAlbum.mutateAsync(albumData);

            if (coverFile) {
                const url = await uploadFile({
                    bucket: "album-covers",
                    file: coverFile,
                    userId: album.artist_id,
                });

                if (!url) throw new Error("Failed to upload album cover");

                await insertImage.mutateAsync({
                    album_id: album.id,
                    url,
                    name: coverFile.name,
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
export function useTrackUpload() {
    const qc = useQueryClient();
    const insertTrack = useMusicInsert<ITrackProps>("tracks", "tracks");
    const insertImage = useMusicInsert<IAlbumImageProps>("album_images", "album_images");

    return useMutation({
        mutationFn: async ({ trackData, audioFile, coverFile }: { trackData: Partial<ITrackProps>; audioFile: File; coverFile?: File }) => {
            // Upload audio file
            const audioUrl = await uploadFile({
                bucket: "track-urls",
                file: audioFile,
                userId: trackData.artist_id,
            });

            if (!audioUrl) throw new Error("Failed to upload track file");

            // Create track record
            const track = await insertTrack.mutateAsync({
                ...trackData,
                url: audioUrl,
            });

            // Upload cover image if provided
            if (coverFile) {
                const coverUrl = await uploadFile({
                    bucket: "album-covers",
                    file: coverFile,
                    userId: trackData.artist_id,
                });

                if (coverUrl) {
                    // Add cover image to album_images table
                    await insertImage.mutateAsync({
                        album_id: track.album_id,
                        url: coverUrl,
                        name: coverFile.name,
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
