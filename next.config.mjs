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
        destination: 'http://52.79.118.248:8080/api/survey/:path*', // EC2 백엔드 주소 하드코딩
      },
    ];
  },
};

export default nextConfig;
