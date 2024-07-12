import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Music Store",
    description: "Find A Song That Fits Your Project",
};

export default function MusicPage() {
    const BeatstoreID = process.env.NEXT_BEATSTORE_ID as string;
    return (
        <div className="flex justify-center bg-black">
            <iframe src={`https://player.beatstars.com/?storeId=${BeatstoreID}`} width="100%" height="800" />
        </div>
    );
}
