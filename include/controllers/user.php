<?php
	//
	// Contrôleur de gestion des données utilisateurs.
	//
	namespace Portfolio\Controllers;

	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/models/user.php");

	use Portfolio\Models\User;

	// Classe permettant d'authentifier un utilisateur.
	class UserAuthentication extends User
	{
		//
		// Permet d'authentifier un utilisateur au niveau de la
		//	base de données.
		//
		public function authenticate(array $data)
		{
			// On récupère les les valeurs du formulaire.
			$username = $data["username"] ?? "";
			$password = $data["password"] ?? "";

			// On effectue ensuite une requête SQL pour vérifier
			//	si un enregistrement est présent avec les identifiants
			//	donnés lors de l'étape précédente.
			$query = $this->connector->prepare("SELECT * FROM `users` WHERE `username` = ?;");
			$query->execute([$username]);

			$result = $query->fetch();

			// On vérifie enfin le résultat de la requête SQL avant
			//	de comparer le mot de passe hashé par l'entrée utilisateur.
			if (gettype($result) == "array" && count($result) > 0 && password_verify($password, $result["password"]))
			{
				// Enregistrement de certaines données.
				$this->setUsername($username);	// Nom d'utilisateur.
				$this->setPassword($password);	// Mot de passe.

				// Redirection automatique vers la page d'accueil
				//	(l'authentification a réussie).
				http_response_code(302);
				header("Location: index.php");
				exit();
			}
		}
	}
?>