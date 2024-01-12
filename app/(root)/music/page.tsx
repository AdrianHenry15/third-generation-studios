import ArtistRow from "@/components/layout/rows/artist-row";
import MusicRow from "@/components/layout/rows/music-row";
import { SearchOriginalProjects } from "@/lib/projects";

export default function MusicPage() {
    return (
        <div className="p-4 flex flex-col h-screen bg-black">
            <ArtistRow />
            <MusicRow title="Original Tracks By Search" projects={SearchOriginalProjects} />
        </div>
    );
}
