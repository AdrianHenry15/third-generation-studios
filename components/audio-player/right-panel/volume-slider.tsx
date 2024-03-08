"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

import { useAudioPlayerStore } from "stores/audio-player-store";
import { LuVolume, LuVolume1, LuVolume2 } from "react-icons/lu";

export default function VolumeSlider() {
    const [volume, setVolume] = React.useState(0.5);
    const { audioRef } = useAudioPlayerStore(); // Get setVolume from store

    // useEffect hook to set volume when component mounts
    React.useEffect(() => {
        // Check if audioRef is available
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [audioRef, volume]);

    const handleVolumeChange = (e: any) => {
        const newVolume = (e.target.value as any) / 100;
        setVolume(newVolume);
        audioRef.current!.volume = newVolume;
    };

    const renderVolumeIcon = () => {
        if (volume > 0.5) {
            return <LuVolume2 size={25} />;
        } else if (volume < 0.1) {
            return <LuVolume size={25} />;
        } else {
            return <LuVolume1 size={25} />;
        }
    };

    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {renderVolumeIcon()}
                <Slider color="error" aria-label="Volume" value={volume * 100} onChange={handleVolumeChange} />
            </Stack>
        </Box>
    );
}
