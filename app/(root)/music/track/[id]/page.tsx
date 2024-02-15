import TrackItem from "@/components/layout/music/tracks/track-page";
import { AllSearchTracks } from "@/lib/tracks";

export default function TrackPage({ params }: { params: { id: string } }) {
    // Find the track with the matching ID
    const track = AllSearchTracks.find((track) => track.id === params.id);
    return (
        <section className="flex flex-col h-full w-full bg-black lg:px-10">
            <TrackItem track={track!} />
        </section>
    );
}
