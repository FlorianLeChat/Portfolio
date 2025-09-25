import { join } from "path";
import { devices,
	defineConfig,
	type PlaywrightTestConfig } from "@playwright/test";

const port = process.env.PORT ?? 3000;
const baseURL = `http://localhost:${ port }`;

export default defineConfig( {
	use: {
		trace: process.env.CI ? "off" : "retain-on-failure",
		video: process.env.CI ? "off" : "retain-on-failure",
		locale: "en-GB",
		baseURL,
		headless: !!process.env.CI,
		screenshot: process.env.CI ? "off" : "only-on-failure"
	},
	expect: { timeout: 10000 },
	workers: 1,
	retries: process.env.CI ? 2 : 0,
	testDir: join( __dirname, "tests/e2e" ),
	reporter: process.env.CI ? "github" : "html",
	outputDir: "test-results/",
	webServer: {
		port,
		command: "next start",
		reuseExistingServer: !process.env.CI
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices[ "Desktop Chrome" ] }
		},
		{
			name: "firefox",
			use: { ...devices[ "Desktop Firefox" ] }
		},
		{
			name: "webkit",
			use: { ...devices[ "Desktop Safari" ] }
		},
		{
			name: "Mobile Chrome",
			use: { ...devices[ "Pixel 5" ] }
		},
		{
			name: "Mobile Safari",
			use: { ...devices[ "iPhone 12" ] }
		}
	]
} as PlaywrightTestConfig );