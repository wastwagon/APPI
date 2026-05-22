import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const apiInternal = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@appi/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact/login', destination: '/member/login', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/summit/about', destination: '/summit', permanent: true },
      { source: '/summit/next', destination: '/summit/register', permanent: true },
      { source: '/auth/login', destination: '/member/login', permanent: true },
      { source: '/contact/forgot-password', destination: '/member/login', permanent: true },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiInternal}/api/v1/:path*`,
      },
      {
        source: '/api/health',
        destination: `${apiInternal}/health`,
      },
      {
        source: '/uploads/:path*',
        destination: `${apiInternal}/uploads/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
