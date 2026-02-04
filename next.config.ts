 /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // All external images allowed
      },
    ],
    // Ya specific domains:
    // domains: ['images.unsplash.com', 'example.com'],
  },
}

module.exports = nextConfig