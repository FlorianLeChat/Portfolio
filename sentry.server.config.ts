import { init } from "@sentry/nextjs";

init( {
	dsn: process.env.SENTRY_DSN,
	debug: false,
	tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1
} );