/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, 
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/survey/create',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
