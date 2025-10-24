/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // App Router enable
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  output: 'standalone', // optional, optimized production
}
module.exports = nextConfig
