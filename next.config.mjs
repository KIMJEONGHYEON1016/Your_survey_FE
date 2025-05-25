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
  };
  
  export default nextConfig;
  