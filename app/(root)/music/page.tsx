import MusicSplash from "@/components/layout/music/music-splash";
import Row from "@/components/row";
import { Artists, SearchOriginalProjects } from "@/lib/projects";
import { ItemType } from "@/lib/types";

export default function MusicPage() {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <MusicSplash />
            <Row itemType={ItemType.ARTIST} title="Artists" item={Artists} />
            <Row itemType={ItemType.MUSIC} title="Original Tracks By Search" item={SearchOriginalProjects} />
        </div>
    );
}
