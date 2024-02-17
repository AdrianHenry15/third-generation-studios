/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'image.tmdb.org',
            },
            {
                protocol: "https",
                hostname: 'img.clerk.com',
            },

        ]
    }
};

module.exports = nextConfig;
