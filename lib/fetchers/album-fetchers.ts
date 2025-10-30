import { supabase } from "../supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "../types/supabase-types";
import { fetchTable, fetchRowById, insertRow, updateRow, deleteRow } from "./generic-fetchers";

export type Album = Tables<"albums">;
export type AlbumInsert = TablesInsert<"albums">;
export type AlbumUpdate = TablesUpdate<"albums">;
export type AlbumImage = Tables<"album_images">;
export type AlbumImageInsert = TablesInsert<"album_images">;

// Basic CRUD operations
export const fetchAllAlbums = () => fetchTable("albums");
export const fetchAlbumById = (id: string) => fetchRowById("albums", id);
export const createAlbum = (album: AlbumInsert) => insertRow("albums", album);
export const updateAlbum = (id: string, updates: AlbumUpdate) => updateRow("albums", id, updates);
export const deleteAlbum = (id: string) => deleteRow("albums", id);

// Album with images
export async function fetchAlbumWithImages(id: string) {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*)
        `,
        )
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

// Album with full relations (artist, images, tracks)
export async function fetchAlbumWithRelations(id: string) {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            artists(stage_name, profile_image_url, verified),
            album_images(*),
            tracks(
                id,
                title,
                duration,
                track_number,
                url,
                plays,
                type,
                is_public,
                locked
            )
        `,
        )
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}

// Albums by artist (with images)
export async function fetchAlbumsByArtist(artistId: string): Promise<(Album & { album_images: AlbumImage[] })[]> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*)
        `,
        )
        .eq("artist_id", artistId)
        .order("release_date", { ascending: false });
    if (error) throw error;
    return data || [];
}

// All albums with images and artist info
export async function fetchAlbumsWithImages(): Promise<
    (Album & {
        album_images: AlbumImage[];
        artists: { stage_name: string; profile_image_url: string | null; verified: boolean };
    })[]
> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*),
            artists(stage_name, profile_image_url, verified)
        `,
        )
        .order("release_date", { ascending: false });
    if (error) throw error;
    return data || [];
}

// Albums by type (Single, EP, Album)
export async function fetchAlbumsByType(type: Album["type"]): Promise<(Album & { album_images: AlbumImage[] })[]> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*)
        `,
        )
        .eq("type", type)
        .order("release_date", { ascending: false });
    if (error) throw error;
    return data || [];
}

// Recent albums (with images)
export async function fetchRecentAlbums(limit = 10): Promise<
    (Album & {
        album_images: AlbumImage[];
        artists: { stage_name: string; profile_image_url: string | null };
    })[]
> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*),
            artists(stage_name, profile_image_url)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data || [];
}

// Search albums
export async function searchAlbums(
    query: string,
    limit = 20,
): Promise<
    (Album & {
        album_images: AlbumImage[];
        artists: { stage_name: string; profile_image_url: string | null };
    })[]
> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*),
            artists(stage_name, profile_image_url)
        `,
        )
        .ilike("name", `%${query}%`)
        .order("release_date", { ascending: false })
        .limit(limit);
    if (error) throw error;
    return data || [];
}

// Albums released in a specific year
export async function fetchAlbumsByYear(year: number): Promise<
    (Album & {
        album_images: AlbumImage[];
        artists: { stage_name: string; profile_image_url: string | null };
    })[]
> {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*),
            artists(stage_name, profile_image_url)
        `,
        )
        .gte("release_date", startDate)
        .lte("release_date", endDate)
        .order("release_date", { ascending: false });
    if (error) throw error;
    return data || [];
}

// Featured/Popular albums (albums with tracks that have high play counts)
export async function fetchPopularAlbums(limit = 10): Promise<
    (Album & {
        album_images: AlbumImage[];
        artists: { stage_name: string; profile_image_url: string | null };
        total_plays: number;
    })[]
> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(*),
            artists(stage_name, profile_image_url),
            tracks!inner(plays)
        `,
        )
        .order("tracks.plays.sum", { ascending: false })
        .limit(limit);
    if (error) throw error;

    // Calculate total plays for each album
    return (data || []).map((album) => ({
        ...album,
        total_plays: album.tracks?.reduce((sum: number, track: any) => sum + (track.plays || 0), 0) || 0,
    }));
}

// Album image management
export async function addAlbumImage(albumId: string, imageData: Omit<AlbumImageInsert, "album_id">): Promise<AlbumImage> {
    return insertRow("album_images", { ...imageData, album_id: albumId });
}

export async function updateAlbumImage(imageId: string, updates: Partial<Omit<AlbumImageInsert, "album_id">>): Promise<AlbumImage> {
    return updateRow("album_images", imageId, updates);
}

export async function deleteAlbumImage(imageId: string): Promise<boolean> {
    return deleteRow("album_images", imageId);
}

export async function fetchAlbumImages(albumId: string): Promise<AlbumImage[]> {
    const { data, error } = await supabase
        .from("album_images")
        .select("*")
        .eq("album_id", albumId)
        .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
}

// Album statistics
export async function fetchAlbumStats(albumId: string) {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            id,
            name,
            type,
            release_date,
            tracks(
                id,
                title,
                duration,
                plays,
                type
            )
        `,
        )
        .eq("id", albumId)
        .single();
    if (error) throw error;

    if (!data?.tracks) return null;

    const tracks = Array.isArray(data.tracks) ? data.tracks : [];
    const totalDuration = tracks.reduce((sum, track) => sum + (track.duration || 0), 0);
    const totalPlays = tracks.reduce((sum, track) => sum + (track.plays || 0), 0);
    const trackCount = tracks.length;
    const releasedTracks = tracks.filter((track) => track.type === "Released").length;

    return {
        ...data,
        stats: {
            trackCount,
            totalDuration,
            totalPlays,
            releasedTracks,
            averagePlays: trackCount > 0 ? Math.round(totalPlays / trackCount) : 0,
            averageDuration: trackCount > 0 ? Math.round(totalDuration / trackCount) : 0,
        },
    };
}

// Get albums that need artwork (no images)
export async function fetchAlbumsWithoutImages(): Promise<Album[]> {
    const { data, error } = await supabase
        .from("albums")
        .select(
            `
            *,
            album_images(id)
        `,
        )
        .is("album_images.id", null);
    if (error) throw error;
    return data || [];
}

// Bulk operations
export async function createAlbumWithImages(
    albumData: AlbumInsert,
    images: Omit<AlbumImageInsert, "album_id">[],
): Promise<Album & { album_images: AlbumImage[] }> {
    // Create album first
    const album = await createAlbum(albumData);

    // Then add images
    const albumImages = await Promise.all(images.map((imageData) => addAlbumImage(album.id, imageData)));

    return {
        ...album,
        album_images: albumImages,
    };
}
