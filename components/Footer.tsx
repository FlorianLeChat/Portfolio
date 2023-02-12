//
// Composant du pied de page générique du site.
//
export default function Footer()
{
	// Affichage du rendu HTML du composant.
	return (
		<footer>
			{/* Lien vers le dépôt GitHub du projet */}
			<span>Réalisé par <a href="https://github.com/FlorianLeChat">Florian Trayon 🐈</a></span>

			{/* Date de création du site */}
			<small>&copy; {new Date().getFullYear()}</small>
		</footer>
	);
}