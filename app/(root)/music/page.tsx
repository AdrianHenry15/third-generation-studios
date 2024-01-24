import MusicSplash from "@/components/layout/music/music-splash";
import Row from "@/components/row";
import { Artists, SearchOriginalProjects } from "@/lib/projects";
import { Category } from "@/lib/types";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <MusicSplash />
            <Row category={Category.ARTIST} title="Artists" item={Artists} />
            <Row category={Category.MUSIC} title="Original Tracks By Search" item={SearchOriginalProjects} />
        </div>
    );
}
