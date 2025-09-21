// lib/spotify/sync-spotify.ts
import { supabase } from "@/lib/supabase/client";
import { ISpotifyTrackProps, AlbumType } from "../types";

export async function syncSpotifyTracks(spotifyTracks: ISpotifyTrackProps[]) {
    if (!spotifyTracks.length) return;

    const artistMap = new Map<string, any>();
    const albumMap = new Map<string, any>();
    const trackMap = new Map<string, any>();
    const credits: any[] = [];

    for (const t of spotifyTracks) {
        // Skip tracks without artists or album
        if (!t.artists?.length || !t.album) continue;

        // --- Artists ---
        for (const a of t.artists) {
            if (!a?.id) continue;
            if (!artistMap.has(a.id)) {
                artistMap.set(a.id, {
                    spotify_id: a.id,
                    stage_name: a.name,
                    bio: "",
                    profile_image_url: "",
                    verified: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });
            }
            credits.push({
                track_spotify_id: t.id,
                artist_spotify_id: a.id,
                role: "main-artist",
            });
        }

        // --- Albums ---
        const alb = t.album;
        if (!albumMap.has(alb.id)) {
            albumMap.set(alb.id, {
                spotify_id: alb.id,
                name: alb.name,
                album_type:
                    alb.album_type === "Single"
                        ? ("Single" as AlbumType)
                        : alb.album_type === "Album"
                          ? ("Album" as AlbumType)
                          : ("EP" as AlbumType),
                release_date: alb.release_date,
                cover_url: alb.images?.[0]?.url || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
        }

        // --- Tracks ---
        if (!trackMap.has(t.id)) {
            trackMap.set(t.id, {
                spotify_id: t.id,
                title: t.name,
                duration_ms: t.duration_ms,
                preview_url: t.preview_url || null,
                album_spotify_id: alb.id,
                primary_artist_spotify_id: t.artists?.[0]?.id || null,
                track_number: t.track_number ?? null,
                release_year: alb.release_date?.slice(0, 4) || null,
                genre: "Unknown",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
        }
    }

    try {
        // --- Batch upserts ---
        if (artistMap.size) {
            await supabase.from("music.artists").upsert(Array.from(artistMap.values()), { onConflict: "spotify_id" });
        }

        if (albumMap.size) {
            await supabase.from("music.albums").upsert(Array.from(albumMap.values()), { onConflict: "spotify_id" });
        }

        if (trackMap.size) {
            await supabase.from("music.tracks").upsert(Array.from(trackMap.values()), { onConflict: "spotify_id" });
        }

        if (credits.length) {
            await supabase.from("music.credits").upsert(credits, { onConflict: "track_spotify_id,artist_spotify_id,role" });
        }

        console.log(`Synced ${artistMap.size} artists, ${albumMap.size} albums, ${trackMap.size} tracks`);
    } catch (err) {
        console.error("Spotify sync failed:", err);
        throw err;
    }
}
