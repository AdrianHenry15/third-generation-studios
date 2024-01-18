import MusicSplash from "@/components/layout/music/music-splash";
import Row from "@/components/row";
import ArtistRow from "@/components/rows/artist-row";
import { SearchOriginalProjects } from "@/lib/projects";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <MusicSplash />
            <ArtistRow />
            <Row title="Original Tracks By Search" item={SearchOriginalProjects} />
        </div>
    );
}
