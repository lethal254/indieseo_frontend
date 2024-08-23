/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adhnhbqutokxznfvpquw.supabase.co",
      },
    ],
  },
}

export default nextConfig
