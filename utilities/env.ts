//
// Types pour les variables d'environnement avec le validateur Valibot.
//  Source : https://github.com/t3-oss/t3-env/blob/ac21b7ad1ebfb3958dec6d32cd32b716518c0e43/examples/nextjs/app/env.ts
//
import * as v from "valibot";

const schema = v.object( {
	TZ: v.pipe( v.string(), v.minLength( 1 ) ),
	NEXT_LOGGING: v.picklist( [ "true", "false" ] ),
	NEXT_PUBLIC_ENV: v.picklist( [ "development", "production" ] ),

	NEXT_PUBLIC_RECAPTCHA_ENABLED: v.picklist( [ "true", "false" ] ),
	NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY: v.pipe(
		v.string(),
		v.length( 40 ),
		v.startsWith( "6L" )
	),
	RECAPTCHA_SECRET_KEY: v.pipe( v.string(), v.length( 40 ), v.startsWith( "6L" ) ),

	NEXT_PUBLIC_ANALYTICS_ENABLED: v.picklist( [ "true", "false" ] ),
	NEXT_PUBLIC_ANALYTICS_TAG: v.pipe(
		v.string(),
		v.length( 12 ),
		v.startsWith( "G-" )
	)
} );

v.parse( schema, process.env );

// Exportation des types pour les variables d'environnement.
export interface ProcessEnv extends v.InferOutput<typeof schema> {}