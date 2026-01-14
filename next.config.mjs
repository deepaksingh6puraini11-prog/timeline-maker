/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // ⚠️ Vercel ko bol rahe hain: Type errors ko ignore karo
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Vercel ko bol rahe hain: Linting errors ko ignore karo
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;