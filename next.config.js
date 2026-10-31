/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/ref/:file.jpg',
        destination: '/ref/:file.jpeg',
      },
    ];
  },
};

module.exports = nextConfig;
