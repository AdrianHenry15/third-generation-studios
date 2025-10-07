import { supabase } from "../supabase/client";
import type { Database } from "../types/supabase-types";
import { IPlaylistProps, IPlaylistTrackProps, ITrackProps } from "../types/music-types";

type PlaylistRow = Database["public"]["Tables"]["playlists"]["Row"];
type PlaylistTrackRow = Database["public"]["Tables"]["playlist_tracks"]["Row"];
type TrackRow = Database["public"]["Tables"]["tracks"]["Row"];
type ArtistRow = Database["public"]["Tables"]["artists"]["Row"];
type AlbumRow = Database["public"]["Tables"]["albums"]["Row"];
type AlbumImageRow = Database["public"]["Tables"]["album_images"]["Row"];
type TrackCreditRow = Database["public"]["Tables"]["track_credits"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type PlaylistLikeRow = Database["public"]["Tables"]["playlist_likes"]["Row"];

// Raw data types from Supabase (what comes back from the query)
interface RawPlaylistData extends PlaylistRow {
    creator: ProfileRow | null;
    tracks: RawPlaylistTrack[];
    likes: PlaylistLikeRow[];
}

interface RawPlaylistTrack extends PlaylistTrackRow {
    track: RawTrack;
}

interface RawTrack extends TrackRow {
    artists: ArtistRow;
    album: AlbumRow & {
        images: AlbumImageRow[];
    };
    credits: TrackCreditRow[];
}

// Helper to shape playlist data with proper types
function shapePlaylist(data: RawPlaylistData): IPlaylistProps {
    return {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        created_by: data.created_by,
        is_public: data.is_public || false,
        cover_image_url: data.cover_image_url || undefined,
        track_count: data.track_count || 0,
        total_duration: data.total_duration || 0,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
        creator: data.creator
            ? {
                  id: data.creator.id,
                  stage_name: data.creator.username || "",
                  profile_image_url: data.creator.avatar_url || "",
                  verified: false,
                  created_at: data.creator.created_at,
                  updated_at: data.creator.updated_at,
              }
            : undefined,
        tracks: data.tracks.map(
            (t: RawPlaylistTrack): IPlaylistTrackProps => ({
                id: t.id,
                playlist_id: t.playlist_id,
                track_id: t.track_id,
                position: t.position,
                added_by: t.added_by,
                added_at: t.added_at || new Date().toISOString(),
                track: {
                    id: t.track.id,
                    album_id: t.track.album_id,
                    artist_id: t.track.artist_id,
                    title: t.track.title,
                    url: t.track.url,
                    duration: t.track.duration * 1000, // Convert seconds to milliseconds
                    release_date: t.track.release_date || undefined,
                    genre: t.track.genre || undefined,
                    locked: t.track.locked,
                    plays: t.track.plays,
                    lyrics: t.track.lyrics || undefined,
                    links: t.track.links,
                    is_public: t.track.is_public || false,
                    created_at: t.track.created_at,
                    updated_at: t.track.updated_at,
                    type: t.track.type || "Released",
                    artists: [t.track.artists],
                    album: {
                        id: t.track.album.id,
                        artist_id: t.track.album.artist_id,
                        name: t.track.album.name,
                        type: t.track.album.type,
                        release_date: t.track.album.release_date,
                        created_at: t.track.album.created_at,
                        updated_at: t.track.album.updated_at,
                        images: t.track.album.images,
                    },
                    credits: t.track.credits,
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

    return ((data as RawPlaylistData[]) || []).map(shapePlaylist);
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

    return shapePlaylist(data as RawPlaylistData);
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

    return ((data as RawPlaylistData[]) || []).map(shapePlaylist);
}
