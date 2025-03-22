/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/",
            destination: "/apage",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
