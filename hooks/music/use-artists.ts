import { IArtistProps } from "@/lib/types";
import { useMusicQueryById } from "./use-music";
import { QUERY_KEYS } from "@/lib/queries/query-keys";

// Specific hook for getting artist by ID
export function useArtistById(artistId: string) {
    return useMusicQueryById<IArtistProps>("artists", "artists" as keyof typeof QUERY_KEYS, artistId);
}
