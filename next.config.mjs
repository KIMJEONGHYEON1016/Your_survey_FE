/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api2/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // → http://localhost:8080/api/survey
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/survey/create',
        permanent: false, // 301으로 할 수도 있음
      },
    ];
  },
};

export default nextConfig;
