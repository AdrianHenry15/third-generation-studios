import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ArtistWithRelations, PlaylistWithRelations, TrackWithRelations } from "@/lib/types/database";

/* ============================================================
   Helpers
============================================================ */
function sanitizeForFilter(value: string) {
    return value.replace(/[^\w\s-]/g, "").trim();
}

function toPattern(value: string) {
    return `%${value}%`;
}

/* ============================================================
   Track select fields for reusability
============================================================ */
const trackSelectFields = `
  id,
  album_id,
  artist_id,
  created_at,
  duration,
  genre,
  is_public,
  links,
  locked,
  lyrics,
  plays,
  title,
  updated_at,
  url,
  album:albums (
    id,
    name,
    images:album_images(url)
  ),
  artist:artists (
    id,
    stage_name,
    profile_image_url
  )
`;

/* ============================================================
   Track mapping helper
============================================================ */
function mapTrackDefaults(track: any): TrackWithRelations {
    return {
        ...track,
        release_date: track.release_date ?? null,
        type: track.type ?? null,
    };
}

/* ============================================================
   Playlist search
============================================================ */
export function useSearchPlaylistsQuery(q: string, enabled: boolean) {
    return useQuery<PlaylistWithRelations[]>({
        queryKey: ["search", "playlists", q],
        enabled,
        queryFn: async (): Promise<PlaylistWithRelations[]> => {
            const query = sanitizeForFilter(q);
            if (!query) return [];

            const pattern = toPattern(query);
            const { data, error } = await supabase
                .from("playlists")
                .select(
                    `
          id,
          name,
          cover_image_url,
          track_count,
          total_duration,
          description,
          created_at,
          created_by,
          is_public,
          updated_at,
          tracks:playlist_tracks (
            id,
            added_at,
            added_by,
            playlist_id,
            track_id,
            position,
            track:tracks (${trackSelectFields})
          )
        `,
                )
                .ilike("name", pattern)
                .order("updated_at", { ascending: false })
                .limit(12);

            if (error) throw error;

            const playlists = (data ?? []).map((playlist: any) => ({
                ...playlist,
                tracks: (playlist.tracks ?? []).map((pt: any) => ({
                    ...pt,
                    track: pt.track ? mapTrackDefaults(pt.track) : null,
                })),
            }));

            return playlists;
        },
        staleTime: 30_000,
        retry: 1,
    });
}

/* ============================================================
   Tracks search
============================================================ */
export function useSearchTracksQuery(q: string, enabled: boolean) {
    return useQuery<TrackWithRelations[]>({
        queryKey: ["search", "tracks", q],
        enabled,
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) return [];

            const pattern = toPattern(query);
            const orExpr = `title.ilike.${pattern},genre.ilike.${pattern}`;
            const { data, error } = await supabase
                .from("tracks")
                .select(trackSelectFields)
                .or(orExpr)
                .order("plays", { ascending: false })
                .limit(12);

            if (error) throw error;
            return (data ?? []).map(mapTrackDefaults);
        },
        staleTime: 30_000,
        retry: 1,
    });
}

/* ============================================================
   Artists search
============================================================ */
export function useSearchArtistsQuery(q: string, enabled: boolean) {
    return useQuery<ArtistWithRelations[]>({
        queryKey: ["search", "artists", q],
        enabled,
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) return [];

            const pattern = toPattern(query);
            const { data, error } = await supabase
                .from("artists")
                .select(
                    `
          id,
          stage_name,
          profile_image_url,
          verified,
          active,
          apple_music_url,
          created_at,
          facebook_url,
          instagram_url,
          links,
          soundcloud_url,
          spotify_url,
          tiktok_url,
          twitter_url,
          updated_at,
          youtube_url
        `,
                )
                .ilike("stage_name", pattern)
                .order("verified", { ascending: false })
                .limit(12);

            if (error) throw error;

            return (data ?? []).map((artist: any) => ({
                ...artist,
                profile_image_url: artist.profile_image_url ?? null,
                verified: artist.verified ?? false,
                active: artist.active ?? false,
                apple_music_url: artist.apple_music_url ?? null,
                created_at: artist.created_at ?? "",
                facebook_url: artist.facebook_url ?? null,
                instagram_url: artist.instagram_url ?? null,
                links: artist.links ?? {},
                soundcloud_url: artist.soundcloud_url ?? null,
                spotify_url: artist.spotify_url ?? null,
                tiktok_url: artist.tiktok_url ?? null,
                twitter_url: artist.twitter_url ?? null,
                updated_at: artist.updated_at ?? "",
                youtube_url: artist.youtube_url ?? null,
            }));
        },
        staleTime: 30_000,
        retry: 1,
    });
}

/* ============================================================
   Tracks by matching artists
============================================================ */
export function useSearchTracksByArtistsQuery(q: string, enabled: boolean) {
    return useQuery<TrackWithRelations[]>({
        queryKey: ["search", "tracks-by-artists", q],
        enabled,
        queryFn: async () => {
            const query = sanitizeForFilter(q);
            if (!query) return [];

            const pattern = toPattern(query);

            // 1️⃣ Find matching artists
            const { data: artists, error: artistErr } = await supabase.from("artists").select("id").ilike("stage_name", pattern).limit(24);

            if (artistErr) throw artistErr;

            const artistIds = (artists ?? []).map((a) => a.id).filter(Boolean);
            if (artistIds.length === 0) return [];

            // 2️⃣ Fetch tracks by those artist IDs
            const { data: tracks, error: tracksErr } = await supabase
                .from("tracks")
                .select(trackSelectFields)
                .in("artist_id", artistIds)
                .order("plays", { ascending: false })
                .limit(24);

            if (tracksErr) throw tracksErr;
            return (tracks ?? []).map(mapTrackDefaults);
        },
        staleTime: 30_000,
        retry: 1,
    });
}
