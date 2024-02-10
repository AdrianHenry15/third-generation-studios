"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

import { useAudioPlayerStore } from "stores/audio-player-store";
import { LuVolume1, LuVolume2 } from "react-icons/lu";

export default function VolumeSlider() {
    const [volume, setVolume] = React.useState(0.5);
    const { audioRef } = useAudioPlayerStore(); // Get setVolume from store

    const handleVolumeChange = (e: any) => {
        const newVolume = (e.target.value as any) / 100;
        setVolume(newVolume);
        audioRef.current!.volume = newVolume;
    };

    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {volume > 0.5 ? <LuVolume2 size={25} /> : <LuVolume1 size={25} />}
                <Slider color="error" aria-label="Volume" value={volume * 100} onChange={handleVolumeChange} />
            </Stack>
        </Box>
    );
}
