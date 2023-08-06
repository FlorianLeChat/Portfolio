// @ts-check

/**
 * @type {import("next").NextConfig}
 */
module.exports = ( {
	basePath: "",
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
} );