import { create } from "zustand";

import { WebsiteType } from "@/lib/types";
import { persist } from "zustand/middleware";

interface WebsiteStoreState {
    currentWebsite: WebsiteType;
    setWebsite: (website: WebsiteType) => void;
}

export const useWebsiteStore = create<WebsiteStoreState>()(
    persist(
        (set) => ({
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
        }),
        {
            name: "website-store",
        }
    )
);
