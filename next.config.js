/** @type {import('next').NextConfig} */
const nextConfig = {
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
