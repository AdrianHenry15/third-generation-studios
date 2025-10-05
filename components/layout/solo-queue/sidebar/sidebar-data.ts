import { Home, Search, Heart, PlayCircle, Settings, User, Clock, Star, Music, Upload, LucideIcon } from "lucide-react";

export interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface SidebarSection {
    title?: string;
    items: SidebarItem[];
}

export const sidebarData: Record<string, SidebarSection> = {
    main: {
        items: [
            { icon: Home, label: "Home", href: "/solo-queue" },
            { icon: Search, label: "Search", href: "/solo-queue/search" },
        ],
    },
    library: {
        title: "Your Library",
        items: [
            { icon: Clock, label: "Recently Played", href: "/solo-queue/recent" },
            { icon: Heart, label: "Liked Songs", href: "/solo-queue/liked" },
            { icon: Star, label: "Favorites", href: "/solo-queue/favorites" },
            { icon: PlayCircle, label: "Playlists", href: "/solo-queue/playlists" },
        ],
    },
    artist: {
        title: "Artist",
        items: [
            { icon: Music, label: "My Tracks", href: "/solo-queue/studio/my-tracks" },
            { icon: Upload, label: "Upload Track", href: "/solo-queue/studio/upload" },
        ],
    },
    playlist: {
        title: "Playlist",
        items: [{ icon: PlayCircle, label: "Create Playlist", href: "/solo-queue/playlists/create" }],
    },
    user: {
        items: [
            { icon: User, label: "Profile", href: "/solo-queue/profile" },
            { icon: Settings, label: "Settings", href: "/solo-queue/settings" },
        ],
    },
};
