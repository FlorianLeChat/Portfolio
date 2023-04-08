import path from "path";
import { PlaywrightTestConfig, devices } from "@playwright/test";

const baseURL = `http://localhost:${ process.env.PORT ?? 3000 }`;
const config: PlaywrightTestConfig = {
	use: {
		baseURL,
		trace: "on-first-retry"
	},
	retries: 1,
	timeout: 30 * 1000,
	testDir: path.join( __dirname, "tests/e2e" ),
	outputDir: "test-results/",
	webServer: {
		url: baseURL,
		command: "npm run dev",
		timeout: 30 * 1000,
		reuseExistingServer: !process.env.CI
	},
	fullyParallel: true,
	projects: [
		{
			name: "Desktop Chrome",
			use: {
				...devices[ "Desktop Chrome" ]
			}
		},
		{
			name: "Desktop Firefox",
			use: {
				...devices[ "Desktop Firefox" ]
			}
		},
		{
			name: "Desktop Safari",
			use: {
				...devices[ "Desktop Safari" ]
			}
		},
		{
			name: "Mobile Chrome",
			use: {
				...devices[ "Pixel 5" ]
			}
		},
		{
			name: "Mobile Safari",
			use: devices[ "iPhone 13" ]
		}
	]
};

export default config;