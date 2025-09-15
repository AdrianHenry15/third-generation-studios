import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IExternalLinkButtonProps {
    spotify_id?: string;
    noPreviewAvailable?: boolean;
    title?: string;
    link?: string;
    albumName?: string;
    linkType?: "spotify" | "digital-stores";
}

const ExternalLinkButton: React.FC<IExternalLinkButtonProps> = ({ 
    spotify_id, 
    noPreviewAvailable, 
    title, 
    link, 
    albumName,
    linkType = "spotify"
}) => {
    const getHref = () => {
        if (link) return link;
        
        if (linkType === "spotify" && spotify_id) {
            return `https://open.spotify.com/track/${spotify_id}`;
        }
        
        if (linkType === "digital-stores" && albumName) {
            // Create search query for digital stores (generic search that works across platforms)
            const searchQuery = encodeURIComponent(albumName);
            return `https://www.google.com/search?q=${searchQuery}+music+streaming+apple+music+amazon+music`;
        }
        
        return "#";
    };

    const getTitle = () => {
        if (title) return title;
        
        if (linkType === "spotify") {
            return noPreviewAvailable ? "Listen Full Track on Spotify" : "Open in Spotify";
        }
        
        if (linkType === "digital-stores") {
            return "Find on Digital Stores";
        }
        
        return "External Link";
    };

    const getButtonStyle = () => {
        if (linkType === "spotify") {
            return "bg-green-500 hover:bg-green-400";
        }
        
        return "bg-blue-500 hover:bg-blue-400";
    };

    return (
        <Link
            href={getHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 flex items-center justify-center py-2 px-4 text-white text-sm rounded-lg transition ${getButtonStyle()}`}
        >
            <ExternalLink size={16} className="mr-2" />
            {getTitle()}
        </Link>
    );
};

export default ExternalLinkButton;
