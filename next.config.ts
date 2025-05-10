import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // remotePatterns: [new URL('https://nkihbopqxauxphmaqvey.supabase.co/storage/**')],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkihbopqxauxphmaqvey.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
        pathname: '/articles/**', // Sesuaikan path jika perlu
      },
    ],
  },
};

export default nextConfig;
