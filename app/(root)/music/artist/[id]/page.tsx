import ArtistSplash from "@/components/layout/music/artist/artist-splash";
import { Artists } from "@/lib/artists";

export default function ArtistPage({ params }: { params: { id: string } }) {
    const artist = Artists.find((artist) => artist.id === params.id);

    if (!artist) {
        return <span>Artist not found</span>;
    }
    return (
        <div className="px-10 flex flex-col h-full bg-black">
            <ArtistSplash artist={artist} />
        </div>
    );
}
