import { join } from "path";
import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";

const port = process.env.PORT ?? 3000;
const baseURL = `http://localhost:${ port }`;

export default defineConfig(
	{
		use: {
			baseURL,
			trace: "retain-on-failure",
			video: "retain-on-failure"
		},
		expect: { timeout: 10000 },
		workers: 1,
		retries: process.env.CI ? 2 : 0,
		testDir: join( __dirname, "tests/e2e" ),
		reporter: process.env.CI ? "github" : "html",
		outputDir: "test-results/",
		webServer: {
			port,
			command: "npm run dev",
			reuseExistingServer: !process.env.CI
		},
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
	} as PlaywrightTestConfig
);