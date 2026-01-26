/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // 308 redirect for SEO
      },
    ];
  },
};

module.exports = nextConfig;
