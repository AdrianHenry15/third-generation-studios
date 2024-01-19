import MusicSplash from "@/components/layout/music/music-splash";
import Row from "@/components/row";
import { Artists, SearchOriginalProjects } from "@/lib/projects";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <MusicSplash />
            <Row artist title="Artists" item={Artists} />
            <Row music title="Original Tracks By Search" item={SearchOriginalProjects} />
        </div>
    );
}
