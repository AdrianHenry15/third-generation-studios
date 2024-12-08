/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
        NEXT_PRIVATE_KEY: process.env.NEXT_PRIVATE_KEY,
        NEXT_BEATSTORE_ID: process.env.NEXT_BEATSTORE_ID,
        // Stripe
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        // Printful
        PRINTFUL_PRIVATE_TOKEN: process.env.PRINTFUL_PRIVATE_TOKEN,
        PRINTFUL_STORE_ID: process.env.PRINTFUL_STORE_ID,
        PRINTFUL_SECRET_KEY: process.env.PRINTFUL_SECRET_KEY
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'img.clerk.com',
                hostname: "files.cdn.printful.com"
            },

        ]
    }
};

module.exports = nextConfig;
