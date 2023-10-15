import { init } from "@sentry/nextjs";

init( {
	dsn: process.env.SENTRY_DSN,
	debug: false,
	tracesSampleRate: 1
} );