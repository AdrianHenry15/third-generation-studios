"use client";

import { useEffect } from "react";
import { initializeSpotifyPlayer } from "@/lib/spotify/spotify-player";

interface SpotifySDKProviderProps {
    accessToken?: string;
    children: React.ReactNode;
}

export default function SpotifySDKProvider({ accessToken, children }: SpotifySDKProviderProps) {
    useEffect(() => {
        if (accessToken) {
            console.log("Initializing Spotify SDK with access token");
            initializeSpotifyPlayer(accessToken)
                .then((success) => {
                    if (success) {
                        console.log("Spotify SDK initialized successfully");
                    } else {
                        console.warn("Failed to initialize Spotify SDK");
                    }
                })
                .catch((error) => {
                    console.error("Error initializing Spotify SDK:", error);
                });
        }
    }, [accessToken]);

    return <>{children}</>;
}
