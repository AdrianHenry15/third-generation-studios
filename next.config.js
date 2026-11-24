/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "i.scdn.co",
            },
            {
                protocol: "https",
                hostname: "kgwxlzocwejlqaolecbf.supabase.co",
            },
        ],
        qualities: [25, 50, 75, 85, 100], // ✅ add allowed qualities
    },
    productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
