import { supabase } from "../supabase/client";
import { IPlaylistProps, IPlaylistTrackProps, ITrackProps } from "../types/music-types";

// Helper to shape playlist data
function shapePlaylist(data: any): IPlaylistProps {
    return {
        ...data,
        creator: data.creator || null,
        tracks: (data.tracks || []).map((t: any) => ({
            ...t,
            track: {
                ...t.track,
                artists: t.track?.artists ? [t.track.artists] : [],
                type: "Released", // could compute like in track fetchers
                is_liked: false,
            } as ITrackProps,
        })) as IPlaylistTrackProps[],
        is_liked: false, // placeholder, populate separately if needed
        likes_count: data.likes?.length || 0,
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
