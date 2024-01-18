import MusicSplash from "@/components/layout/music/music-splash";
import Row from "@/components/row";
import ArtistRow from "@/components/layout/music/artist/artist-row";
import { Artists, SearchOriginalProjects } from "@/lib/projects";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <MusicSplash />
            <Row title="Artists" item={Artists} />
            <Row title="Original Tracks By Search" item={SearchOriginalProjects} />
        </div>
    );
}
