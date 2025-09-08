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
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        HCAPTCHA_SECRET: process.env.HCAPTCHA_SECRET,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    },
    productionBrowserSourceMaps: false,


}

module.exports = nextConfig