//
// Interface des attributs des réponses de l'API de Google reCAPTCHA.
//  Source : https://developers.google.com/recaptcha/docs/v3
//
export interface RecaptchaResponse
{
	// État de validité du jeton d'authentification.
	"success": boolean;

	// Score de confiance attribué à l'utilisateur.
	"score": number;

	// Nom de l'action pour cette requête.
	"action": string;

	// Date et heure de la requête.
	"challenge_ts": Date;

	// Nom de domaine de l'application.
	"hostname": string;

	// Codes d'erreurs éventuelles.
	"error-codes"?: string[];
}