import { create } from "zustand";

import { WebsiteType } from "@/lib/types";

interface WebsiteStoreState {
    currentWebsite: WebsiteType;
    setWebsite: (website: WebsiteType) => void;
}

export const useWebsiteStore = create<WebsiteStoreState>((set) => ({
    currentWebsite: {
        id: "",
        img: null,
        title: "",
        overview: "",
        release_date: "",
        link: "",
        backdrop_path: null,
    },
    setWebsite: (website) => set((state) => ({ currentWebsite: website })),
}));
