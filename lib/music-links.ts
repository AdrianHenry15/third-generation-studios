import { IMusicLinkProps } from "./types";

export async function getMusicLinks(spotifyUrl: string): Promise<IMusicLinkProps> {
    try {
        const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(spotifyUrl)}`);
        const data = await response.json();

        return {
            spotify: data.linksByPlatform?.spotify?.url,
            apple: data.linksByPlatform?.appleMusic?.url,
            youtube: data.linksByPlatform?.youtube?.url,
            soundcloud: data.linksByPlatform?.soundcloud?.url,
            amazon: data.linksByPlatform?.amazon?.url,
            tidal: data.linksByPlatform?.tidal?.url,
            deezer: data.linksByPlatform?.deezer?.url,
        };
    } catch (error) {
        console.error("Error fetching music links:", error);
        return {};
    }
}
