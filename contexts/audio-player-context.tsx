"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { ITrackProps } from "@/lib/types";
import { fetchSpotifyTrackById } from "@/lib/spotify";

type AudioPlayerContextType = {
    currentTrack: ITrackProps | null;
    currentTrackId: string | null;
    isPlaying: boolean;
    showPlayer: boolean;

    // playback controls
    playTrack: (track: ITrackProps) => Promise<void>;
    pauseTrack: () => void;
    resume: () => void;
    closePlayer: () => void;

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

    const playTrack = async (track: ITrackProps) => {
        const audio = audioRef.current;
        if (!audio) return;

        setCurrentTrack(track);
        setShowPlayer(true);
        setIsPlaying(false);
        setIsLoading(true);
        setCanPlay(false);
        setCurrentTime(0);
        setDuration(0);

        try {
            let src: string | undefined;
            if (track.source === "Spotify") {
                if (!track.spotify_id) {
                    throw new Error("Missing spotify_id for Spotify track");
                }
                const sp = await fetchSpotifyTrackById(track.spotify_id);
                if (!sp.previewUrl) {
                    throw new Error("No Spotify preview available");
                }
                src = sp.previewUrl;
                setDuration(sp.duration || 30);
            } else {
                src = track.source;
                setDuration(track.duration);
            }

            audio.src = src!;
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

                currentTime,
                duration,
                seekTo,

                volume,
                setVolume,
                muted,
                toggleMute,

                isLoading,
                canPlay,
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    );
}
