/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Skip trailing slash redirect for build
  skipTrailingSlashRedirect: true,
  // Disable static page generation for pages with Firebase auth
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig;
