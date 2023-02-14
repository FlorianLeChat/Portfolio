//
// Interface des attributs d'un projet.
//
export interface ProjectAttributes
{
	// Titre du projet.
	title: string;

	// Description du projet.
	description: string;

	// Langages utilisés pour le projet.
	skills: string[];

	// Dépôt Git du projet.
	repository?: string;

	// Site de démonstration du projet.
	demo?: string;
}