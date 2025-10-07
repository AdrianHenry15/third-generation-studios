import { supabase } from "../supabase/client";
import type { Database } from "../types/supabase-types";
import { IRemixProps, ITrackProps } from "../types/music-types";

type RemixRow = Database["public"]["Tables"]["remixes"]["Row"];
type TrackRow = Database["public"]["Tables"]["tracks"]["Row"];
type AlbumRow = Database["public"]["Tables"]["albums"]["Row"];
type ArtistRow = Database["public"]["Tables"]["artists"]["Row"];
type AlbumImageRow = Database["public"]["Tables"]["album_images"]["Row"];

// Raw data type from Supabase query with joins
interface RawRemixWithJoins extends RemixRow {
    track: TrackRow & {
        album: AlbumRow & { images: AlbumImageRow[] };
        artists: ArtistRow;
        credits?: any[]; // add credits if needed
    };
}

// Shape remix without joins
function shapeRemix(data: RemixRow): IRemixProps {
    return {
        id: data.id,
        track_id: data.track_id,
        original_song: data.original_song,
        original_artists: (data.original_artists as string[]) || [],
        additional_artists: (data.additional_artists as string[]) || undefined,
        url: data.url || undefined,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
    };
}

// Shape remix with joins
function shapeRemixWithJoins(data: RawRemixWithJoins): IRemixProps {
    return {
        ...shapeRemix(data),
        track: {
            id: data.track.id,
            title: data.track.title,
            duration: (data.track.duration ?? 0) * 1000, // milliseconds
            plays: data.track.plays ?? 0,
            album_id: data.track.album_id,
            artist_id: data.track.artist_id,
            url: data.track.url ?? "",
            release_date: data.track.release_date ?? "",
            created_at: data.track.created_at ?? new Date().toISOString(),
            updated_at: data.track.updated_at ?? new Date().toISOString(),
            genre: data.track.genre ?? "",
            locked: data.track.locked ?? false,
            is_public: data.track.is_public ?? false,
            credits: data.track.credits ?? [],
            type: data.track.type ?? "single",
            is_liked: false, // default value, adjust if you have like info
            album: {
                id: data.track.album.id,
                name: data.track.album.name,
                type: data.track.album.type,
                images: data.track.album.images ?? [],
                artist_id: data.track.album.artist_id,
                release_date: data.track.album.release_date,
                created_at: data.track.album.created_at,
                updated_at: data.track.album.updated_at,
            },
            artists: [
                {
                    ...data.track.artists,
                    profile_image_url: data.track.artists.profile_image_url ?? "",
                    apple_music_url: data.track.artists.apple_music_url ?? "",
                    facebook_url: data.track.artists.facebook_url ?? "",
                    instagram_url: data.track.artists.instagram_url ?? "",
                    spotify_url: data.track.artists.spotify_url ?? "",
                    twitter_url: data.track.artists.twitter_url ?? "",
                    website_url: data.track.artists.website_url ?? "",
                    youtube_url: data.track.artists.youtube_url ?? "",
                    soundcloud_url: data.track.artists.soundcloud_url ?? "",
                    tiktok_url: data.track.artists.tiktok_url ?? "",
                },
            ],
        } as ITrackProps,
    };
}

// Remix fetchers
export async function fetchRemixes(): Promise<IRemixProps[]> {
    const { data, error } = await supabase.from("remixes").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return ((data as RemixRow[]) || []).map(shapeRemix);
}

export async function fetchRemixByTrackId(trackId: string): Promise<IRemixProps | null> {
    const { data, error } = await supabase.from("remixes").select("*").eq("track_id", trackId).maybeSingle();
    if (error) throw error;
    return data ? shapeRemix(data as RemixRow) : null;
}

export async function fetchRemixesWithJoins(): Promise<IRemixProps[]> {
    const { data, error } = await supabase
        .from("remixes")
        .select(
            `
      *,
      track:tracks(
        *,
        credits:track_credits(*),
        album:albums!tracks_album_id_fkey(
          *,
          images:album_images(*)
        ),
        artists:artists!tracks_artist_id_fkey(*)
      )
    `,
        )
        .order("created_at", { ascending: false });

    if (error) throw error;
    return ((data as RawRemixWithJoins[]) || []).map(shapeRemixWithJoins);
}
