import { create } from "zustand";

import { WebsiteType } from "@/lib/types";
import { persist } from "zustand/middleware";

interface IWebsiteState {
    currentWebsite: WebsiteType;
}

interface IWebsiteActions {
    setWebsite: (website: WebsiteType) => void;
}

type WebsiteStore = IWebsiteState & IWebsiteActions;

export const useWebsiteStore = create<WebsiteStore>()(
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
