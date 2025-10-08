import { Track } from "../fetchers/track-fetchers";
import { Database } from "./supabase-types";

export type TrackCreditTableInsert = Database["public"]["Tables"]["track_credits"]["Insert"];
export type TrackTypeEnum = Database["public"]["Enums"]["track_type"];

export interface TrackWithRelations extends Track {
    albums: {
        id: string;
        name: string;
        type: "Single" | "EP" | "Album";
        album_images: {
            album_id: string;
            created_at: string;
            id: string;
            name: string;
            url: string;
        }[];
    };
    artists: {
        stage_name: string;
        profile_image_url: string | null;
    };
    // This matches the partial remix data that comes from useTrackWithRelations
    remixes?: {
        id?: string;
        track_id?: string;
        created_at?: string | null;
        updated_at?: string | null;
        url?: string | null;
        original_song: string;
        original_artists: any;
        additional_artists?: any;
    } | null;
}
