//
// Options de configuration pour la journalisation via Pino.
//  Source : https://getpino.io/#/docs/api
//
import pino from "pino";

const level = process.env.NODE_ENV === "production" ? "info" : "debug";
export const logger = pino( {
	base: undefined,
	level,
	transport: {
		targets: [
			{
				// Messages d'informations lisibles par l'homme et
				//  journalisés dans le système de fichiers.
				level,
				target: "pino-pretty",
				options: {
					mkdir: true,
					append: true,
					colorize: false,
					singleLine: false,
					levelFirst: true,
					destination: `logs/${ new Date().toISOString().split( "T" )[ 0 ] }.log`
				}
			},
			{
				// Messages de débogages lisibles par l'homme et
				//  journalisés dans la sortie du programme.
				level,
				target: "pino-pretty",
				options: {
					colorize: true,
					levelFirst: true,
					destination: 1
				}
			}
		]
	}
} );