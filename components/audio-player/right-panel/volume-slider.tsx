"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

import { useAudioPlayerStore } from "stores/audio-player-store";
import { LuVolume1, LuVolume2, LuVolumeX } from "react-icons/lu";

export default function VolumeSlider() {
    const [volume, setVolume] = React.useState(0.5);
    const [isMuted, setIsMuted] = React.useState(false); // State for mute/unmute
    const [previousVolume, setPreviousVolume] = React.useState(0); // State to store previous volume
    const { audioRef } = useAudioPlayerStore(); // Get setVolume from store

    // useEffect hook to set volume when component mounts
    React.useEffect(() => {
        // Check if audioRef is available
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [audioRef, volume, isMuted]);

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
        if (!isMuted) {
            setPreviousVolume(volume);
            setVolume(0);
            audioRef.current!.volume = 0;
        } else {
            setVolume(previousVolume);
            audioRef.current!.volume = previousVolume;
        }
    };

    const handleVolumeChange = (e: any) => {
        const newVolume = (e.target.value as any) / 100;
        setVolume(newVolume);
        audioRef.current!.volume = newVolume;
    };

    const renderVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <LuVolumeX className="cursor-pointer" onClick={handleMuteToggle} size={25} />;
        } else if (volume > 0.5) {
            return <LuVolume2 className="cursor-pointer" onClick={handleMuteToggle} size={25} />;
        } else {
            return <LuVolume1 className="cursor-pointer" onClick={handleMuteToggle} size={25} />;
        }
    };

    return (
        <Box sx={{ width: 150 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                {renderVolumeIcon()}
                <Slider size="small" color="error" aria-label="Volume" value={isMuted ? 0 : volume * 100} onChange={handleVolumeChange} />
            </Stack>
        </Box>
    );
}
