/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/admin/dashboard",
        permanent: true,
      },
      
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
    rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.skatrium.com/api/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: [
      "i.ibb.co.com",
      "my-planeer-s3.s3.us-east-1.amazonaws.com",
      "lh3.googleusercontent.com",
      "imagess555.s3.eu-north-1.amazonaws.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
 
export default nextConfig;
 
 