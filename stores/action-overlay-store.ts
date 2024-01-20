import { create } from "zustand";

interface ActionOverlayState {
    isLiked: boolean;
    isSaved: boolean;
    like: () => void;
    save: () => void;
}

export const useActionsOverlayStore = create<ActionOverlayState>((set) => ({
    isLiked: false,
    isSaved: false,
    like: () => set((state) => ({ isLiked: !state.isLiked })),
    save: () => set((state) => ({ isSaved: !state.isSaved })),
}));
