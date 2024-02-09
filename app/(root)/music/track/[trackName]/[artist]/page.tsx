import Licensing from "@/components/layout/music/tracks/track-page/licensing";
import TrackItem from "@/components/layout/music/tracks/track-page/track-item";

export default function TrackPage({ params }: { params: { trackName: string; artist: string } }) {
    return (
        <section className="px-10 flex flex-col h-full bg-black">
            <TrackItem trackName={params.trackName} trackImg={undefined} artist={params.artist} />
            <Licensing />
        </section>
    );
}
