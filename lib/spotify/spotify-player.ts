import { fetchSpotifyTrackById } from "./spotify-access";

// Spotify Web Playback SDK types
interface SpotifyPlayer {
    connect(): Promise<boolean>;
    disconnect(): void;
    getCurrentState(): Promise<any>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    setName(name: string): Promise<void>;
    setVolume(volume: number): Promise<void>;
    addListener(event: string, callback: Function): void;
    removeListener(event: string, callback?: Function): void;
}

// Add global Spotify types
declare global {
    interface Window {
        Spotify: {
            Player: new (options: { name: string; getOAuthToken: (cb: (token: string) => void) => void; volume?: number }) => SpotifyPlayer;
        };
        onSpotifyWebPlaybackSDKReady: () => void;
    }
}

// Global Spotify Web Playback SDK state
let spotifyPlayer: SpotifyPlayer | null = null;
let spotifyDeviceId: string | null = null;
let isSpotifySDKReady: boolean = false;
let sdkLoadPromise: Promise<boolean> | null = null;
let readyCallbacks: (() => void)[] = [];

// Set up the callback immediately when this module loads
if (typeof window !== "undefined") {
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("Spotify Web Playback SDK is ready");
        readyCallbacks.forEach((callback) => callback());
        readyCallbacks = [];
    };
}

// Load Spotify Web Playback SDK
export function loadSpotifySDK(): Promise<boolean> {
    if (sdkLoadPromise) {
        return sdkLoadPromise;
    }

    sdkLoadPromise = new Promise((resolve) => {
        // Check if SDK is already loaded
        if (typeof window !== "undefined" && window.Spotify && window.Spotify.Player) {
            resolve(true);
            return;
        }

        // Add callback to the list
        readyCallbacks.push(() => {
            resolve(true);
        });

        // Load the script dynamically
        if (typeof window !== "undefined") {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            script.onerror = () => {
                console.error("Failed to load Spotify Web Playback SDK");
                resolve(false);
            };
            document.head.appendChild(script);
        }

        // Fallback timeout
        setTimeout(() => {
            if (typeof window !== "undefined" && !window.Spotify) {
                console.warn("Spotify SDK load timeout");
                resolve(false);
            }
        }, 10000);
    });

    return sdkLoadPromise;
}

// Initialize Spotify Web Playback SDK
export async function initializeSpotifyPlayer(accessToken: string): Promise<boolean> {
    try {
        // Load SDK first
        const sdkLoaded = await loadSpotifySDK();
        if (!sdkLoaded) {
            console.warn("Spotify Web Playback SDK could not be loaded");
            return false;
        }

        return new Promise((resolve) => {
            if (!window.Spotify || !window.Spotify.Player) {
                console.warn("Spotify Web Playback SDK not loaded");
                resolve(false);
                return;
            }

            spotifyPlayer = new window.Spotify.Player({
                name: "Third Generation Studios Player",
                getOAuthToken: (cb: (token: string) => void) => {
                    cb(accessToken);
                },
                volume: 0.5,
            });

            // Ready
            spotifyPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
                console.log("Ready with Device ID", device_id);
                spotifyDeviceId = device_id;
                isSpotifySDKReady = true;
                resolve(true);
            });

            // Not Ready
            spotifyPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
                console.log("Device ID has gone offline", device_id);
                isSpotifySDKReady = false;
            });

            // Connect to the player
            spotifyPlayer.connect().then((success: boolean) => {
                if (!success) {
                    console.error("Failed to connect to Spotify player");
                    resolve(false);
                }
            });
        });
    } catch (error) {
        console.error("Error initializing Spotify player:", error);
        return false;
    }
}

// Play track using Spotify Web API
async function playSpotifyTrackWithSDK(trackId: string, accessToken: string): Promise<void> {
    if (!spotifyDeviceId) {
        throw new Error("Spotify device not ready");
    }

    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${spotifyDeviceId}`, {
        method: "PUT",
        body: JSON.stringify({
            uris: [`spotify:track:${trackId}`],
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to play track: ${response.statusText}`);
    }
}

export async function playSpotifyTrack(trackId: string, previewUrl?: string, accessToken?: string) {
    try {
        // Try to use Spotify Web Playback SDK if available and user is authenticated
        if (accessToken && isSpotifySDKReady && spotifyPlayer) {
            try {
                await playSpotifyTrackWithSDK(trackId, accessToken);
                return {
                    url: null,
                    type: "spotify-sdk" as const,
                    player: "spotify-web-playback",
                };
            } catch (sdkError) {
                console.warn("Spotify SDK playback failed, falling back to preview:", sdkError);
            }
        }

        // Fallback to preview URL (30-second clips)
        if (!previewUrl) {
            const trackData = await fetchSpotifyTrackById(trackId);
            previewUrl = trackData.previewUrl;
        }

        if (!previewUrl) {
            return {
                url: null,
                type: "no-preview" as const,
                message: "No preview available for this track",
            };
        }

        return {
            url: previewUrl,
            type: "preview" as const,
        };
    } catch (error) {
        console.error("Error playing Spotify track:", error);
        throw error;
    }
}

export async function pauseSpotifyTrack() {
    try {
        if (spotifyPlayer && isSpotifySDKReady) {
            await spotifyPlayer.pause();
            return { status: "paused", player: "spotify-sdk" };
        }
        // Fallback handled by audio context
        return { status: "paused", player: "audio-element" };
    } catch (error) {
        console.error("Error pausing Spotify track:", error);
        return { status: "error", error: error instanceof Error ? error.message : String(error) };
    }
}

export async function resumeSpotifyTrack() {
    try {
        if (spotifyPlayer && isSpotifySDKReady) {
            await spotifyPlayer.resume();
            return { status: "resumed", player: "spotify-sdk" };
        }
        // Fallback handled by audio context
        return { status: "resumed", player: "audio-element" };
    } catch (error) {
        console.error("Error resuming Spotify track:", error);
        return { status: "error", error: error instanceof Error ? error.message : String(error) };
    }
}

// Global audio state management
let currentAudio: HTMLAudioElement | null = null;
let currentTrackId: string | null = null;
let isCurrentlyPlaying: boolean = false;
let currentPlayerType: "audio-element" | "spotify-sdk" | null = null;

export function getCurrentPlayingTrack() {
    return {
        trackId: currentTrackId,
        isPlaying: isCurrentlyPlaying,
        audio: currentAudio,
        playerType: currentPlayerType,
    };
}

export async function playTrack(track: any, accessToken?: string) {
    try {
        // Stop current track if playing
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if (currentPlayerType === "spotify-sdk" && spotifyPlayer) {
            await spotifyPlayer.pause();
        }

        let audioUrl: string | null = null;
        let playerType: "audio-element" | "spotify-sdk" = "audio-element";

        if (track.type === "Spotify") {
            if (!track.spotify_id) {
                throw new Error("Spotify track ID missing");
            }
            const spotifyData = await playSpotifyTrack(track.spotify_id, track.url, accessToken);

            if (spotifyData.type === "no-preview") {
                return {
                    success: false,
                    reason: "no-preview",
                    message: "This Spotify track doesn't have a preview available",
                };
            }

            if (spotifyData.type === "spotify-sdk") {
                playerType = "spotify-sdk";
                currentPlayerType = "spotify-sdk";
                currentTrackId = track.id;
                isCurrentlyPlaying = true;
                return { success: true, trackId: track.id, playerType: "spotify-sdk" };
            } else {
                audioUrl = spotifyData.url!;
            }
        } else {
            // For non-Spotify tracks, use the URL directly (Supabase)
            audioUrl = track.url;
            if (!audioUrl) {
                throw new Error("No audio URL available for this track");
            }
        }

        // Create and play new audio element (for previews or non-Spotify tracks)
        if (audioUrl) {
            currentAudio = new Audio(audioUrl);
            currentTrackId = track.id;
            currentPlayerType = "audio-element";

            currentAudio.addEventListener("ended", () => {
                isCurrentlyPlaying = false;
                currentTrackId = null;
            });

            currentAudio.addEventListener("error", (e) => {
                console.error("Audio playback error:", e);
                isCurrentlyPlaying = false;
                currentTrackId = null;
            });

            await currentAudio.play();
            isCurrentlyPlaying = true;
        }

        return { success: true, trackId: track.id, playerType };
    } catch (error) {
        console.error("Error playing track:", error);
        isCurrentlyPlaying = false;
        currentTrackId = null;
        throw error;
    }
}

export async function pauseTrack() {
    try {
        if (currentPlayerType === "spotify-sdk" && spotifyPlayer && isCurrentlyPlaying) {
            const result = await pauseSpotifyTrack();
            if (result.status === "paused") {
                isCurrentlyPlaying = false;
                return { success: true, status: "paused", playerType: "spotify-sdk" };
            }
        } else if (currentAudio && isCurrentlyPlaying) {
            currentAudio.pause();
            isCurrentlyPlaying = false;
            return { success: true, status: "paused", playerType: "audio-element" };
        }
        return { success: false, status: "no-track-playing" };
    } catch (error) {
        console.error("Error pausing track:", error);
        return { success: false, status: "error", error: error instanceof Error ? error.message : String(error) };
    }
}

export async function resumeTrack() {
    try {
        if (currentPlayerType === "spotify-sdk" && spotifyPlayer && !isCurrentlyPlaying) {
            const result = await resumeSpotifyTrack();
            if (result.status === "resumed") {
                isCurrentlyPlaying = true;
                return { success: true, status: "resumed", playerType: "spotify-sdk" };
            }
        } else if (currentAudio && !isCurrentlyPlaying) {
            await currentAudio.play();
            isCurrentlyPlaying = true;
            return { success: true, status: "resumed", playerType: "audio-element" };
        }
        return { success: false, status: "no-track-to-resume" };
    } catch (error) {
        console.error("Error resuming track:", error);
        return { success: false, status: "error", error: error instanceof Error ? error.message : String(error) };
    }
}

export async function stopTrack() {
    try {
        if (currentPlayerType === "spotify-sdk" && spotifyPlayer) {
            await spotifyPlayer.pause();
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        isCurrentlyPlaying = false;
        currentTrackId = null;
        currentPlayerType = null;
        return { success: true, status: "stopped" };
    } catch (error) {
        console.error("Error stopping track:", error);
        return { success: false, status: "error", error: error instanceof Error ? error.message : String(error) };
    }
}

// Cleanup function
export function disconnectSpotifyPlayer() {
    if (spotifyPlayer) {
        spotifyPlayer.disconnect();
        spotifyPlayer = null;
        spotifyDeviceId = null;
        isSpotifySDKReady = false;
    }
}
