/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async headers() {
    return [
      {
        source: "/api/shoppingItems/:id",
        headers: [
          {
            key: "id",
            value: ":id", // Matched parameters can be used in the value
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
