import TrackItem from "@/components/layout/music/tracks/track-page";

export default function TrackPage({ params }: { params: { id: string } }) {
    return (
        <section className="flex flex-col h-full w-full bg-black lg:px-10">
            <TrackItem />
        </section>
    );
}
