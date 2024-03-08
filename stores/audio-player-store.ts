"use client";

import { create } from "zustand";
import React from "react";

import { useTrackStore } from "./track-store";
import { SongType } from "@/lib/types";
import { AllSearchTracks } from "@/lib/tracks";

const { setCurrentTrack } = useTrackStore.getState();

interface IAudioPlayerState {
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
}

interface IAudioPlayerActions {
    play: (track: SongType) => void;
    pause: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

type AudioPlayerStore = IAudioPlayerState & IAudioPlayerActions;

export const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
    // STATE
    isPlaying: false,
    audioRef: React.createRef(),
    // ACTIONS
    play: async (track) => {
        // Set current track
        await setCurrentTrack(track);

        // Get the audio element reference
        const audioRef = useAudioPlayerStore.getState().audioRef.current;
        // If audio element exists
        if (audioRef) {
            // Play audio
            audioRef.play().then(() => {
                // Once playback starts, set isPlaying flag to true
                set({ isPlaying: true });
            });
        }
    },
    pause: () => {
        // Pause audio
        useAudioPlayerStore.getState().audioRef.current!.pause();
        // Set isPlaying flag to false indicating audio is paused
        set({ isPlaying: false });
    },
    playNext: async () => {
        // Find index of the current track in the array of all tracks
        const currentTrack = useTrackStore.getState().currentTrack;
        const currentIndex = AllSearchTracks.findIndex((track) => track.id === currentTrack.id);

        // Check if the current track is not the last track
        if (currentIndex !== -1 && currentIndex < AllSearchTracks.length - 1) {
            // Get the next track from the array
            const nextTrack = AllSearchTracks[currentIndex + 1];
            // Set the next track as the current track
            await setCurrentTrack(nextTrack);
            // Audio playback
            useAudioPlayerStore.getState().play(nextTrack);
        }
    },
    playPrevious: async () => {
        // Get the current track and the audio element reference
        const currentTrack = useTrackStore.getState().currentTrack;
        const audioRef = useAudioPlayerStore.getState().audioRef.current;

        // Check if the audio element exists and if the current track has been playing for more than 5 seconds
        if (audioRef && audioRef.currentTime >= 5) {
            // If the song has been playing for more than 5 seconds, restart the track
            audioRef.currentTime = 0;
        } else {
            // Find the index of the current track in the array of all tracks
            const currentIndex = AllSearchTracks.findIndex((track) => track.id === currentTrack.id);
            // Check if the current track is not the first track
            if (currentIndex > 0) {
                // Get the previous track from the array
                const previousTrack = AllSearchTracks[currentIndex - 1];
                // Set the previous track as the current track
                await setCurrentTrack(previousTrack);
                // Audio playback
                useAudioPlayerStore.getState().play(previousTrack);
            }
        }
    },
}));
