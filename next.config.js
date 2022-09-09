const nextConfig = {

  optimizeFonts: true,
	trailingSlash: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config;
  },

  images: {
    domains: ['sidorov-test.s3.amazonaws.com'],
  },
}

module.exports = nextConfig;
