/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
<<<<<<< HEAD
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
        NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY
    },
=======
>>>>>>> e26cfc1db4f0f43c1b99065feffd9d99059f0833
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
