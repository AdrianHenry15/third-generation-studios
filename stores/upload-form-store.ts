import { create } from "zustand";
import type { AlbumUploadData, RemixUploadData, Track, TrackCreditInsert, TrackUploadData, TrackWithRelations } from "@/lib/types/database";

interface UploadFormState {
    tracks: TrackUploadData[];
    albumData: AlbumUploadData;
    trackCreditData: Record<string, TrackCreditInsert>;
    remixData: Record<string, RemixUploadData>;
    setTrackCreditData: (data: Record<string, TrackCreditInsert>) => void;
    setTracks: (tracks: TrackUploadData[]) => void;
    updateTrack: (id: string, update: Partial<TrackUploadData>) => void;
    setAlbumData: (update: Partial<AlbumUploadData>) => void;
    reset: () => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

export const useUploadFormStore = create<UploadFormState>((set) => ({
    tracks: [],
    albumData: { name: "", type: "Single", release_date: new Date().toISOString().split("T")[0] },
    trackCreditData: {},
    remixData: {},
    setTrackCreditData: (data) => set({ trackCreditData: data }),
    setTracks: (tracks) => {
        console.log("📝 Store setTracks called with:", tracks);
        set({ tracks });
        console.log("✅ Store tracks updated");
    },
    updateTrack: (id, update) =>
        set((state) => ({
            tracks: state.tracks.map((t) => (t.id === id ? { ...t, ...update } : t)),
        })),
    setAlbumData: (update) => set((state) => ({ albumData: { ...state.albumData, ...update } })),
    reset: () =>
        set({
            tracks: [],
            albumData: { name: "", type: "Single", release_date: "" },
            trackCreditData: {},
            remixData: {},
        }),
    isEditing: false,
    setIsEditing: (isEditing) => set({ isEditing }),
}));
