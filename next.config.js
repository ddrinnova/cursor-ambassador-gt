/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: false,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'images.lumacdn.com',
			},
		],
	},
};

module.exports = nextConfig;
