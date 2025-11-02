export const QUERY_KEYS = {
    // Profile queries
    profiles: {
        all: ["profiles"] as const,
        byId: (id: string) => ["profiles", id] as const,
        byUsername: (username: string) => ["profiles", "username", username] as const,
    },

    // Track queries
    tracks: {
        all: ["tracks"] as const,
        byId: (id: string) => ["tracks", id] as const,
        byArtist: (artistId: string) => ["tracks", "artist", artistId] as const,
        byAlbum: (albumId: string) => ["tracks", "album", albumId] as const,
        withJoins: () => ["tracks", "with-joins"] as const,
        liked: (userId: string) => ["tracks", "liked", userId] as const,
    },

    // Album queries
    albums: {
        all: ["albums"] as const,
        byId: (id: string) => ["albums", id] as const,
        byArtist: (artistId: string) => ["albums", "artist", artistId] as const,
        withJoins: () => ["albums", "with-joins"] as const,
    },

    // Artist queries
    artists: {
        all: ["artists"] as const,
        byId: (id: string) => ["artists", id] as const,
        verified: () => ["artists", "verified"] as const,
        active: () => ["artists", "active"] as const,
    },

    // Playlist queries
    playlists: {
        all: ["playlists"] as const,
        byId: (id: string) => ["playlists", id] as const,
        byUser: (userId: string) => ["playlists", "user", userId] as const,
        public: () => ["playlists", "public"] as const,
        withJoins: () => ["playlists", "with-joins"] as const,
        liked: (userId: string) => ["playlists", "liked", userId] as const,
    },

    // Simple table keys for basic CRUD operations
    album_images: ["album_images"] as const,
    download_links: ["download_links"] as const,
    invites: ["invites"] as const,
    track_credits: ["track_credits"] as const,
    track_likes: ["track_likes"] as const,
    playlist_tracks: ["playlist_tracks"] as const,
    playlist_likes: ["playlist_likes"] as const,
    remixes: ["remixes"] as const,
} as const;

// Helper type for query key inference
export type QueryKey = typeof QUERY_KEYS;
