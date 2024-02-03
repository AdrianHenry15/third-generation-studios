import ArtistSplash from "@/components/layout/music/artist/artist-splash";

export default function ArtistPage({ params }: { params: { id: string } }) {
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <ArtistSplash />
        </div>
    );
}
