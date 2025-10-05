import { supabase } from "../supabase/client";
import { IAlbumImageProps, IArtistProps, IPlaylistProps, IPlaylistTrackProps, ITrackCreditProps, ITrackProps } from "../types/music-types";

// Raw data types from Supabase (what comes back from the query)
interface RawPlaylistData {
    id: string;
    name: string;
    description?: string;
    created_by: string;
    is_public: boolean;
    cover_image_url?: string;
    track_count: number;
    total_duration: number;
    created_at: string;
    updated_at: string;
    creator: IArtistProps | null;
    tracks: RawPlaylistTrack[];
    likes: { id: string }[]; // Just need the count
}

interface RawPlaylistTrack {
    id: string;
    playlist_id: string;
    track_id: string;
    position: number;
    added_by: string;
    added_at: string;
    track: RawTrack;
}

interface RawTrack {
    id: string;
    album_id: string;
    artist_id: string;
    title: string;
    url: string;
    duration: number; // seconds from DB
    release_date: string;
    genre: string;
    locked: boolean;
    plays: number;
    lyrics?: string;
    links?: any; // JSONB
    is_public: boolean;
    created_at: string;
    updated_at: string;
    artists: IArtistProps;
    album: {
        id: string;
        artist_id: string;
        name: string;
        type: string;
        release_date: string;
        created_at: string;
        updated_at: string;
        images: IAlbumImageProps[];
    };
    credits: ITrackCreditProps[];
}

// Helper to shape playlist data with proper types
function shapePlaylist(data: RawPlaylistData): IPlaylistProps {
    return {
        ...data,
        creator: data.creator || undefined,
        tracks: data.tracks.map(
            (t: RawPlaylistTrack): IPlaylistTrackProps => ({
                ...t,
                track: {
                    ...t.track,
                    artists: [t.track.artists], // Convert single artist to array
                    duration: t.track.duration * 1000, // Convert seconds to milliseconds
                    type: "Released", // Use actual type logic here if needed
                    is_liked: false,
                } as ITrackProps,
            }),
        ),
        is_liked: false,
        likes_count: data.likes.length,
    };
}

// Fetch all playlists with creator, tracks, and likes
export async function fetchPlaylistsWithJoins(): Promise<IPlaylistProps[]> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      creator:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artists:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          ),
          credits:track_credits(*)
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map(shapePlaylist);
}

// Fetch single playlist by id
export async function fetchPlaylistByIdWithJoins(id: string): Promise<IPlaylistProps> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      creator:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artists:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          ),
          credits:track_credits(*)
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .eq("id", id)
        .single();

    if (error) throw error;
    if (!data) throw new Error("Playlist not found");

    return shapePlaylist(data);
}

// Fetch playlists by a specific user
export async function fetchPlaylistsByUser(userId: string): Promise<IPlaylistProps[]> {
    const { data, error } = await supabase
        .from("playlists")
        .select(
            `
      *,
      creator:profiles!playlists_created_by_fkey(*),
      tracks:playlist_tracks(
        *,
        track:tracks(
          *,
          artists:artists!tracks_artist_id_fkey(*),
          album:albums!tracks_album_id_fkey(
            *,
            images:album_images(*)
          ),
          credits:track_credits(*)
        )
      ),
      likes:playlist_likes(*)
    `,
        )
        .eq("created_by", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map(shapePlaylist);
}
