/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io"
            },
            {
                protocol: "https",
                hostname: "img.clerk.com"
            },
        ],
    },
    env: {
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID,
        SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
        SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    },
    productionBrowserSourceMaps: false,


}

module.exports = nextConfig