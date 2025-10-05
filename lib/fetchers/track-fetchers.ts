import { supabase } from "../supabase/client";
import { ITrackProps, TrackType } from "../types/music-types";

type TrackFilter = {
    artistId?: string;
    trackId?: string | number;
};

/**
 * Compute track type if DB field is missing
 */
function computeTrackType(release_date: string | null, locked: boolean): TrackType {
    if (locked) return "Unreleased";
    if (!release_date) return "Work In Progress";

    const releaseDate = new Date(release_date);
    const now = new Date();

    return releaseDate <= now ? "Released" : "Unreleased";
}

/**
 * Normalize a raw track from Supabase
 */
function normalizeTrack(track: any): ITrackProps {
    return {
        ...track,
        artists: track.artists ? [track.artists] : [],
        type: track.type || computeTrackType(track.release_date, track.locked),
        is_liked: false, // placeholder for likes
    };
}

/**
 * Generalized fetcher for tracks with joins
 * Can filter by artistId or trackId
 */
export async function fetchTracksWithJoins(filter?: TrackFilter): Promise<ITrackProps[]> {
    let query = supabase
        .from("tracks")
        .select(
            `
        *,
        artists!tracks_artist_id_fkey(*),
        album:albums!tracks_album_id_fkey(
          *,
          images:album_images(*)
        ),
        credits:track_credits(*)
      `,
        )
        .order("created_at", { ascending: false });

    if (filter?.artistId) {
        query = query.eq("artist_id", filter.artistId);
    }
    if (filter?.trackId) {
        query = query.eq("id", filter.trackId);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data) return [];

    return (data || []).map(normalizeTrack);
}

/**
 * Convenience wrappers for specific use cases
 */
export async function fetchTrackByIdWithJoins(id: string | number) {
    const tracks = await fetchTracksWithJoins({ trackId: id });
    if (tracks.length === 0) throw new Error("Track not found");
    return tracks[0];
}

export async function fetchTracksByArtist(artistId: string) {
    return fetchTracksWithJoins({ artistId });
}
