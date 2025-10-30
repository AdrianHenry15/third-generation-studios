"use client";

import { useTrackCredits } from "@/hooks/music/use-track-credits";
import { useModalStore } from "@/stores/modal-store";
import { X } from "lucide-react";

export default function TrackCreditsModal({ trackId }: { trackId: string }) {
    const closeModal = useModalStore((s) => s.closeModal);
    const { creditsQuery } = useTrackCredits(trackId);

    const credits = creditsQuery.data?.[0]; // Assuming one credit row per track

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
                <button className="absolute top-4 right-4 text-neutral-400 hover:text-white" onClick={closeModal} aria-label="Close">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Track Credits</h2>
                {creditsQuery.isLoading ? (
                    <div className="text-center text-neutral-300">Loading credits...</div>
                ) : !credits ? (
                    <div className="text-center text-neutral-400">No credits found for this track.</div>
                ) : (
                    <div className="space-y-6">
                        <CreditSection title="Performed by" names={credits.performed_by} />
                        <CreditSection title="Written by" names={credits.written_by} />
                        <CreditSection title="Produced by" names={credits.produced_by} />
                    </div>
                )}
            </div>
        </div>
    );
}

function CreditSection({ title, names }: { title: string; names: string[] | null }) {
    if (!names || names.length === 0) return null;
    return (
        <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-1">{title}</h3>
            <ul className="list-disc list-inside text-neutral-200">
                {names.map((name, i) => (
                    <li key={i}>{name}</li>
                ))}
            </ul>
        </div>
    );
}
