 /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Windows permission issues fix
  experimental: {
    isrMemoryCacheSize: 0,
    // Turbopack config
    turbo: {
      resolveAlias: {},
      rules: {},
    },
  },
  
  // Empty turbopack config to silence warning
  turbopack: {},
}

module.exports = nextConfig