"use client";
import { create } from "zustand";
import { ITrackProps } from "@/lib/types";
import { supabase } from "@/lib/supabase/client";

type AudioPlayerState = {
    // state
    currentTrack: ITrackProps | null;
    currentTrackId: string | null;
    isPlaying: boolean;
    showPlayer: boolean;

    currentTime: number;
    duration: number;

    volume: number;
    muted: boolean;

    isLoading: boolean;
    canPlay: boolean;

    playlist: ITrackProps[];
    currentTrackIndex: number;
    hasNextTrack: boolean;
    hasPreviousTrack: boolean;

    // actions
    playTrack: (track: ITrackProps, newPlaylist?: ITrackProps[]) => Promise<void>;
    pauseTrack: () => void;
    resume: () => void;
    closePlayer: () => void;
    playNextTrack: () => void;
    playPreviousTrack: () => void;

    seekTo: (time: number) => void;
    setVolume: (v: number) => void;
    toggleMute: () => void;
};

export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => {
    // --- changed: lazy client-only audio initialization ---
    let audio: HTMLAudioElement | null = null;
    const initAudio = () => {
        if (audio || typeof window === "undefined") return;
        audio = new Audio();
        audio.preload = "metadata";

        audio.addEventListener("timeupdate", () => {
            set({ currentTime: audio?.currentTime || 0 });
        });

        audio.addEventListener("ended", () => {
            set({ isPlaying: false });
        });

        audio.addEventListener("loadedmetadata", () => {
            set({ duration: typeof audio?.duration === "number" && !isNaN(audio.duration) ? audio.duration : 0 });
        });

        audio.addEventListener("canplay", () => {
            set({ canPlay: true, isLoading: false });
        });

        audio.addEventListener("waiting", () => {
            set({ isLoading: true });
        });

        audio.addEventListener("playing", () => {
            set({ isLoading: false });
        });

        audio.addEventListener("error", () => {
            set({
                isLoading: false,
                canPlay: false,
                isPlaying: false,
            });
        });
    };
    // --- end changed ---

    // helper to update navigation flags
    const updateNavFlags = () => {
        const { playlist, currentTrackIndex } = get();
        const hasNext = currentTrackIndex >= 0 && currentTrackIndex < playlist.length - 1;
        const hasPrev = currentTrackIndex > 0 && playlist.length > 0;
        set({ hasNextTrack: hasNext, hasPreviousTrack: hasPrev });
    };

    return {
        // initial state
        currentTrack: null,
        currentTrackId: null,
        isPlaying: false,
        showPlayer: false,

        currentTime: 0,
        duration: 0,

        volume: 1,
        muted: false,

        isLoading: false,
        canPlay: false,

        playlist: [],
        currentTrackIndex: -1,
        hasNextTrack: false,
        hasPreviousTrack: false,

        // actions
        playTrack: async (track, newPlaylist) => {
            if (!track) return;
            try {
                // ensure audio exists on client
                initAudio();
                if (!audio) {
                    console.warn("Audio not available (server environment).");
                    set({ isPlaying: false, isLoading: false, canPlay: false });
                    return;
                }

                if (newPlaylist) {
                    set({
                        playlist: newPlaylist,
                        currentTrackIndex: Math.max(
                            0,
                            newPlaylist.findIndex((t) => t.id === track.id),
                        ),
                    });
                } else {
                    const { playlist: currentList } = get();
                    const idx = currentList.findIndex((t) => t.id === track.id);
                    if (idx >= 0) {
                        set({ currentTrackIndex: idx });
                    } else {
                        // replace playlist with single track
                        set({ playlist: [track], currentTrackIndex: 0 });
                    }
                }

                // update computed nav flags
                updateNavFlags();

                set({
                    currentTrack: track,
                    currentTrackId: track.id,
                    showPlayer: true,
                    isPlaying: false,
                    isLoading: true,
                    canPlay: false,
                    currentTime: 0,
                    duration: 0,
                });

                if (!track.url) {
                    throw new Error("No audio URL available for this track");
                }

                audio.src = track.url;
                audio.currentTime = 0;

                await audio
                    .play()
                    .then(async () => {
                        set({ isPlaying: true, isLoading: false, canPlay: true });

                        // Increment track plays after successful play start
                        try {
                            console.log(`Incrementing plays for track: ${track.id}`);
                            const result = await supabase.rpc("increment_track_play", { track_id: track.id });
                            console.log("RPC result:", result);
                            if (result.error) {
                                console.error("RPC error:", result.error);
                            } else {
                                console.log("Track plays incremented successfully");
                            }
                        } catch (err) {
                            console.error("Error incrementing track plays:", err);
                        }
                    })
                    .catch((err) => {
                        console.error("Audio play error:", err);
                        set({ isPlaying: false, isLoading: false, canPlay: false });
                    });
            } catch (err) {
                console.error("playTrack error:", err);
                set({ isPlaying: false, isLoading: false, canPlay: false });
            }
        },

        playNextTrack: () => {
            const { playlist, currentTrackIndex } = get();
            const nextIdx = currentTrackIndex + 1;
            if (nextIdx >= 0 && nextIdx < playlist.length) {
                const next = playlist[nextIdx];
                if (next) void get().playTrack(next);
            }
        },

        playPreviousTrack: () => {
            const { playlist, currentTrackIndex } = get();
            const prevIdx = currentTrackIndex - 1;
            if (prevIdx >= 0 && prevIdx < playlist.length) {
                const prev = playlist[prevIdx];
                if (prev) void get().playTrack(prev);
            }
        },

        resume: () => {
            const { currentTrack, canPlay } = get();
            if (!currentTrack) return;
            initAudio();
            if (!audio) {
                // cannot resume on server
                void get().playTrack(currentTrack);
                return;
            }
            if (!audio.src || !canPlay) {
                void get().playTrack(currentTrack);
                return;
            }
            audio
                .play()
                .then(() => set({ isPlaying: true }))
                .catch(() => set({ isPlaying: false }));
        },

        pauseTrack: () => {
            initAudio();
            if (audio) audio.pause();
            set({ isPlaying: false });
        },

        closePlayer: () => {
            initAudio();
            if (audio) {
                audio.pause();
                try {
                    audio.currentTime = 0;
                    audio.src = "";
                } catch {
                    // ignore
                }
            }

            set({
                showPlayer: false,
                currentTrack: null,
                currentTrackId: null,
                playlist: [],
                currentTrackIndex: -1,
                isPlaying: false,
                currentTime: 0,
                duration: 0,
                isLoading: false,
                canPlay: false,
                hasNextTrack: false,
                hasPreviousTrack: false,
            });
        },

        seekTo: (time) => {
            initAudio();
            try {
                if (audio) {
                    audio.currentTime = Math.max(0, Math.min(time, get().duration || time));
                    set({ currentTime: audio.currentTime });
                }
            } catch {
                // ignore
            }
        },

        setVolume: (v) => {
            const vol = Math.max(0, Math.min(1, v));
            set({ volume: vol });
            initAudio();
            if (audio) audio.volume = get().muted ? 0 : vol;
        },

        toggleMute: () => {
            initAudio();
            const next = !get().muted;
            set({ muted: next });
            if (audio) {
                audio.muted = next;
                audio.volume = next ? 0 : get().volume;
            }
        },
    };
});
