export async function getSpotifyAccessToken() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basic}`,
        },
        body: "grant_type=client_credentials",
    });
    const data = await response.json();
    return data.access_token;
}

export async function fetchSpotifyTracks(query = "Anjin Iso") {
    const token = await getSpotifyAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.tracks?.items || [];
}

export async function fetchSpotifyGenre(artistId: string): Promise<string[]> {
    const token = await getSpotifyAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.genres || [];
}

export async function fetchSpotifyTrackById(trackId: string) {
    if (!trackId || typeof trackId !== "string" || trackId.length < 10) {
        throw new Error("Invalid Spotify track ID");
    }
    const token = await getSpotifyAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch Spotify track");
    const data = await res.json();
    // Returns preview_url (30s mp3), name, artists, album, etc.
    return {
        id: data.id,
        title: data.name,
        artists: data.artists.map((a: any) => a.name),
        album: data.album.name,
        albumArt: data.album.images[0]?.url,
        source: "Spotify",
        duration: Math.floor(data.duration_ms / 1000),
        previewUrl: data.preview_url,
        year: data.album.release_date?.split("-")[0] || "",
        genre: "", // Spotify API does not provide genre on track object
    };
}

export async function playSpotifyTrack(trackId: string, previewUrl?: string) {
    try {
        // For now, use preview URL (30-second clips)
        // Later can be extended to use Spotify Web Playback SDK for full tracks
        if (!previewUrl) {
            const trackData = await fetchSpotifyTrackById(trackId);
            previewUrl = trackData.previewUrl;
        }

        if (!previewUrl) {
            throw new Error("No preview available for this Spotify track");
        }

        // Return the preview URL to be handled by audio context
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
    // Handle Spotify pause logic
    // This will be managed by the audio context
    return { status: "paused" };
}

export async function resumeSpotifyTrack() {
    // Handle Spotify resume logic
    // This will be managed by the audio context
    return { status: "resumed" };
}

// Global audio state management
let currentAudio: HTMLAudioElement | null = null;
let currentTrackId: string | null = null;
let isCurrentlyPlaying: boolean = false;

export function getCurrentPlayingTrack() {
    return {
        trackId: currentTrackId,
        isPlaying: isCurrentlyPlaying,
        audio: currentAudio,
    };
}

export async function playTrack(track: any) {
    try {
        // Check if track is Spotify and user needs authentication
        if (track.type === "Spotify") {
            const isAuthenticated = await isSpotifyUserAuthenticated();
            if (!isAuthenticated) {
                // Show modal instead of confirm dialog
                if (showSpotifyAuthModal) {
                    showSpotifyAuthModal(true, track.title);
                    return { success: false, reason: "authentication_required" };
                } else {
                    // Fallback to confirm dialog if modal handler not set
                    const userConfirmed = confirm(
                        "You need to sign in to your Spotify account to play Spotify tracks. Would you like to sign in now?",
                    );

                    if (userConfirmed) {
                        redirectToSpotifyLogin();
                        return { success: false, reason: "authentication_required" };
                    } else {
                        throw new Error("Spotify authentication required to play this track");
                    }
                }
            }
        }

        // Stop current track if playing
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        let audioUrl: string;

        if (track.type === "Spotify") {
            if (!track.spotify_id) {
                throw new Error("Spotify track ID missing");
            }
            const spotifyData = await playSpotifyTrack(track.spotify_id, track.url);
            audioUrl = spotifyData.url;
        } else {
            // For non-Spotify tracks, use the URL directly (Supabase)
            audioUrl = track.url;
            if (!audioUrl) {
                throw new Error("No audio URL available for this track");
            }
        }

        // Create and play new audio
        currentAudio = new Audio(audioUrl);
        currentTrackId = track.id;

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

        return { success: true, trackId: track.id };
    } catch (error) {
        console.error("Error playing track:", error);
        isCurrentlyPlaying = false;
        currentTrackId = null;
        throw error;
    }
}

export function pauseTrack() {
    if (currentAudio && isCurrentlyPlaying) {
        currentAudio.pause();
        isCurrentlyPlaying = false;
        return { success: true, status: "paused" };
    }
    return { success: false, status: "no-track-playing" };
}

export function resumeTrack() {
    if (currentAudio && !isCurrentlyPlaying) {
        currentAudio.play();
        isCurrentlyPlaying = true;
        return { success: true, status: "resumed" };
    }
    return { success: false, status: "no-track-to-resume" };
}

export function stopTrack() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        isCurrentlyPlaying = false;
        currentTrackId = null;
        return { success: true, status: "stopped" };
    }
    return { success: false, status: "no-track-playing" };
}

// Spotify Web API Authentication (for user login)
export function getSpotifyAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/spotify/callback`);
    const scopes = encodeURIComponent("streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state");

    if (!clientId) {
        console.error("NEXT_PUBLIC_SPOTIFY_CLIENT_ID not found in environment variables");
        throw new Error("Spotify client ID not configured");
    }

    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
}

export function getSpotifyUserToken() {
    // Check if user has a valid Spotify token stored
    return localStorage.getItem("spotify_user_token");
}

export function setSpotifyUserToken(token: string) {
    localStorage.setItem("spotify_user_token", token);
}

export function clearSpotifyUserToken() {
    localStorage.removeItem("spotify_user_token");
}

export async function isSpotifyUserAuthenticated(): Promise<boolean> {
    const token = getSpotifyUserToken();
    if (!token) return false;

    try {
        // Verify token is still valid by making a test request
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return true;
        } else {
            // Token is invalid, clear it
            clearSpotifyUserToken();
            return false;
        }
    } catch (error) {
        console.error("Error checking Spotify authentication:", error);
        clearSpotifyUserToken();
        return false;
    }
}

export function redirectToSpotifyLogin() {
    try {
        const authUrl = getSpotifyAuthUrl();
        // Open in new tab instead of current window
        const newTab = window.open(authUrl, "_blank", "width=600,height=700,scrollbars=yes,resizable=yes");

        if (!newTab) {
            // Fallback if popup is blocked
            window.location.href = authUrl;
        } else {
            // Listen for the tab to close or for a successful auth
            const checkClosed = setInterval(() => {
                if (newTab.closed) {
                    clearInterval(checkClosed);
                    // Check if user is now authenticated
                    setTimeout(() => {
                        isSpotifyUserAuthenticated().then((authenticated) => {
                            if (authenticated) {
                                console.log("Spotify authentication successful");
                                // You could trigger a refresh of the current page state here
                            }
                        });
                    }, 1000);
                }
            }, 1000);
        }
    } catch (error) {
        console.error("Error opening Spotify auth:", error);
        alert("Error opening Spotify authentication. Please check your configuration.");
    }
}

// Global state for modal management
let showSpotifyAuthModal: ((show: boolean, trackTitle?: string) => void) | null = null;

export function setSpotifyAuthModalHandler(handler: (show: boolean, trackTitle?: string) => void) {
    showSpotifyAuthModal = handler;
}
