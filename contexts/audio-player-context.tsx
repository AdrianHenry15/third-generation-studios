"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { ITrackProps } from "@/lib/types";

type AudioPlayerContextType = {
    currentTrack: ITrackProps | null;
    currentTrackId: string | null;
    isPlaying: boolean;
    showPlayer: boolean;

    // playback controls
    playTrack: (track: ITrackProps, playlist?: ITrackProps[]) => Promise<void>;
    pauseTrack: () => void;
    resume: () => void;
    closePlayer: () => void;
    playNextTrack: () => void;
    playPreviousTrack: () => void;

    // transport & volume
    currentTime: number;
    duration: number;
    seekTo: (time: number) => void;

    volume: number;
    setVolume: (v: number) => void;
    muted: boolean;
    toggleMute: () => void;

    // state flags
    isLoading: boolean;
    canPlay: boolean;

    // playlist info
    playlist: ITrackProps[];
    currentTrackIndex: number;
    hasNextTrack: boolean;
    hasPreviousTrack: boolean;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function useAudioPlayer() {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
    return ctx;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<ITrackProps | null>(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState<ITrackProps[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, _setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [canPlay, setCanPlay] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio();
        audioRef.current = audio;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
        const onEnded = () => setIsPlaying(false);
        const onLoadedMetadata = () => setDuration(isFinite(audio.duration) ? audio.duration : 0);
        // Ensure loading stops as soon as we can play
        const onCanPlay = () => {
            setCanPlay(true);
            setIsLoading(false);
        };
        const onWaiting = () => setIsLoading(true);
        const onPlaying = () => setIsLoading(false);
        // Handle audio errors
        const onError = () => {
            setIsLoading(false);
            setCanPlay(false);
            setIsPlaying(false);
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("waiting", onWaiting);
        audio.addEventListener("playing", onPlaying);
        audio.addEventListener("error", onError);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("waiting", onWaiting);
            audio.removeEventListener("playing", onPlaying);
            audio.removeEventListener("error", onError);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = muted ? 0 : volume;
        audio.muted = muted;
    }, [volume, muted]);

    const hasNextTrack = currentTrackIndex < playlist.length - 1;
    const hasPreviousTrack = currentTrackIndex > 0;

    const playTrack = async (track: ITrackProps, newPlaylist?: ITrackProps[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        // Update playlist if provided, otherwise use current track as single-item playlist
        if (newPlaylist) {
            setPlaylist(newPlaylist);
            const index = newPlaylist.findIndex((t) => t.id === track.id);
            setCurrentTrackIndex(index >= 0 ? index : 0);
        } else if (playlist.length === 0 || !playlist.find((t) => t.id === track.id)) {
            setPlaylist([track]);
            setCurrentTrackIndex(0);
        } else {
            // Track exists in current playlist, update index
            const index = playlist.findIndex((t) => t.id === track.id);
            setCurrentTrackIndex(index >= 0 ? index : 0);
        }

        setCurrentTrack(track);
        setShowPlayer(true);
        setIsPlaying(false);
        setIsLoading(true);
        setCanPlay(false);
        setCurrentTime(0);
        setDuration(0);

        try {
            if (!track.url) {
                throw new Error("No audio URL available for this track");
            }

            audio.src = track.url;
            audio.currentTime = 0;

            await audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                    setCanPlay(true);
                })
                .catch((error) => {
                    console.error("Audio play error:", error);
                    setIsPlaying(false);
                    setIsLoading(false);
                    setCanPlay(false);
                });
        } catch (error) {
            console.error("PlayTrack error:", error);
            setIsPlaying(false);
            setIsLoading(false);
            setCanPlay(false);
        }
    };

    const playNextTrack = () => {
        if (!hasNextTrack || playlist.length === 0) return;
        const nextTrack = playlist[currentTrackIndex + 1];
        if (nextTrack) {
            void playTrack(nextTrack);
        }
    };

    const playPreviousTrack = () => {
        if (!hasPreviousTrack || playlist.length === 0) return;
        const previousTrack = playlist[currentTrackIndex - 1];
        if (previousTrack) {
            void playTrack(previousTrack);
        }
    };

    // Make resume smart: if no src (or not ready), initialize playback
    const resume = () => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;
        if (!audio.src || !canPlay) {
            void playTrack(currentTrack);
            return;
        }
        audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
    };

    const pauseTrack = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        setIsPlaying(false);
    };

    const closePlayer = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.src = "";
        }
        setShowPlayer(false);
        setCurrentTrack(null);
        setPlaylist([]);
        setCurrentTrackIndex(-1);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setIsLoading(false);
        setCanPlay(false);
    };

    const seekTo = (time: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, Math.min(time, duration || time));
        setCurrentTime(audio.currentTime);
    };

    const setVolume = (v: number) => {
        _setVolume(Math.max(0, Math.min(1, v)));
    };

    const toggleMute = () => setMuted((m) => !m);

    return (
        <AudioPlayerContext.Provider
            value={{
                currentTrack,
                currentTrackId: currentTrack! ? currentTrack!.id : null,
                isPlaying,
                showPlayer,

                playTrack,
                pauseTrack,
                resume,
                closePlayer,
                playNextTrack,
                playPreviousTrack,

                currentTime,
                duration,
                seekTo,

                volume,
                setVolume,
                muted,
                toggleMute,

                isLoading,
                canPlay,

                playlist,
                currentTrackIndex,
                hasNextTrack,
                hasPreviousTrack,
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    );
}
