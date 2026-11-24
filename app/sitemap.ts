import type { MetadataRoute } from "next";
import { publicPages, siteOrigin } from "@/features/marketing/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return publicPages.map(([path]) => ({ url: new URL(path, siteOrigin).href }));
}
