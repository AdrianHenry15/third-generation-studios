import Licensing from "@/components/layout/music/tracks/track-page/licensing";
import TrackItem from "@/components/layout/music/tracks/track-page/track-item";

export default function TrackPage({ params }: { params: { id: string } }) {
    return (
        <section className="flex flex-col h-full bg-black lg:px-10 lg:flex-row">
            <TrackItem />
            <Licensing />
        </section>
    );
}
