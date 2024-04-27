import { init, replayIntegration } from "@sentry/nextjs";

init( {
	dsn: process.env.SENTRY_DSN,
	debug: false,
	integrations: [
		replayIntegration( {
			maskAllText: true,
			blockAllMedia: true
		} )
	],
	tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.01,
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1
} );