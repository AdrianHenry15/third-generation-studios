import { create } from "zustand";

interface ActionOverlayState {
    liked: boolean;
    saved: boolean;
    setLiked: () => void;
    setSaved: () => void;
}

export const useActionsOverlayStore = create<ActionOverlayState>((set) => ({
    liked: false,
    saved: false,
    setLiked: () => set((state) => ({ liked: !state.liked })),
    setSaved: () => set((state) => ({ saved: !state.saved })),
}));
