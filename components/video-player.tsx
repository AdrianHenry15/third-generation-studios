"use client";

import React, { useEffect, useRef } from "react";

interface IVideoPlayerProps {
    src: string;
}

const VideoPlayer = (props: IVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Disable video controls
        videoRef.current ? (videoRef.current.controls = false) : null;
    }, []);

    return (
        // ADD AUTOPLAY TO VIDEO PROPS
        <div className="relative h-screen">
            <video id="video" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop controls={false} playsInline>
                <source src={props.src} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoPlayer;
