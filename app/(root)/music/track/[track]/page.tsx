"use client";

import Licensing from "@/components/layout/music/tracks/track-page/licensing";
import TrackItem from "@/components/layout/music/tracks/track-page/track-item";
import { Category, SongType } from "@/lib/types";
import { useItemStore } from "stores/item-store";

interface ITrackPageProps {
    category: Category;
    trackId: string;
    audioFile: string;
    artistName: string;
    trackImg: any;
    trackTitle: string;
    isFree: boolean;
    price: number;
    bpm: string;
    trackScale: string;
}

export default function TrackPage({ params }: { params: { id: string } }) {
    const { currentItemId } = useItemStore();
    const getTrackInfo = () => {
        if (currentItemId === params.id) {
        }
    };
    return (
        <section className="px-10 flex flex-col h-full bg-black">
            <TrackItem trackName={""} trackImg={""} artistName={""} />
            <Licensing />
        </section>
    );
}
