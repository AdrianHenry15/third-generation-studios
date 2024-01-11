/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    images: {
        domains: ['image.tmdb.org']
    }
};

module.exports = nextConfig;
