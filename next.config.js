// @ts-check

/**
 * @type {import("next").NextConfig}
 */
module.exports = {
	basePath: process.env[ "NEXT_PUBLIC_BASE_PATH" ],
	poweredByHeader: false,
	reactStrictMode: true,
	async redirects()
	{
		return [
			{
				// Redirection vers le dépôt GitHub.
				source: "/source",
				permanent: true,
				destination: "https://github.com/FlorianLeChat/Portfolio"
			}
		];
	}
};