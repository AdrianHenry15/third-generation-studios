/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
        NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'image.tmdb.org',
            }
        ]
    }
};

module.exports = nextConfig;
