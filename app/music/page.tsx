import ArtistRow from "@/components/layout/rows/artist-row";
import MusicRow from "@/components/layout/rows/music-row";

export default function MusicPage() {
    return (
        <div className="p-4 overflow-x-scroll flex flex-col">
            <ArtistRow />
            <MusicRow />
        </div>
    );
}
