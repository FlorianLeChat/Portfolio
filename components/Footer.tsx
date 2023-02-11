//
// Composant du pied de page générique du site.
//
import Link from "next/link";

export default function Footer()
{
	// Affichage du rendu HTML du composant.
	return (
		<footer>
			{/* Lien vers le dépôt GitHub du projet */}

			{/* I made this website with ❤ and React. © Copyright 2023.| */}
			<strong>Réalisé par <Link href="https://github.com/FlorianLeChat/Portfolio">Florian Trayon 🐈</Link> !</strong>
		</footer>
	);
}