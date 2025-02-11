import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.thedogapi.com',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: '**.thecatapi.com',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
                port: '',
                search: '',
            }
        ],
    },
};

export default nextConfig;