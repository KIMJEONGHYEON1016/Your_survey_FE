/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
