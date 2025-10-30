import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IExternalLinkButtonProps {
    title?: string;
    link?: string;
    albumName: string;
}

const ExternalLinkButton: React.FC<IExternalLinkButtonProps> = ({ title, link, albumName }) => {
    const getHref = () => {
        if (link) return link;

        // Create search query for digital stores (generic search that works across platforms)
        const searchQuery = encodeURIComponent(albumName);
        return `https://www.google.com/search?q=${searchQuery}+music+streaming+apple+music+amazon+music`;
    };

    const getTitle = () => {
        if (title) return title;

        return "Find on Digital Stores";
    };

    const getButtonStyle = () => {
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
