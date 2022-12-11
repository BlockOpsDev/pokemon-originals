/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@acme/ui'],
  },
}

module.exports = nextConfig
