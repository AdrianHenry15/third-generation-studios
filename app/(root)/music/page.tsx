import MusicSplash from "@/components/layout/music/music-splash";
import ArtistRow from "@/components/rows/artist-row";
import MusicRow from "@/components/rows/music-row";
import { SearchOriginalProjects } from "@/lib/projects";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-screen bg-black">
            <MusicSplash />
            <ArtistRow />
            <MusicRow title="Original Tracks By Search" projects={SearchOriginalProjects} />
        </div>
    );
}
