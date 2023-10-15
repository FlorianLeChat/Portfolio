import { init, Replay } from "@sentry/nextjs";

init( {
	dsn: process.env.SENTRY_DSN,
	debug: false,
	integrations: [
		new Replay( {
			maskAllText: true,
			blockAllMedia: true
		} )
	],
	tracesSampleRate: 1,
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate:
		process.env.NODE_ENV === "development" ? 1.0 : 0.1
} );