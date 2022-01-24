<?php
	//
	// Contrôleur de gestion des données utilisateurs.
	//
	namespace Portfolio\Controllers;

	require_once($root . "/include/models/user.php");

	use Portfolio\Models\User;

	// Classe permettant d'authentifier un utilisateur.
	class UserAuthentication extends User
	{
		//
		// Permet d'authentifier un utilisateur au niveau de la
		//	base de données.
		//
		public function authenticate(array $data): bool
		{
			// On récupère les les valeurs du formulaire.
			$username = $data["username"] ?? "";
			$password = $data["password"] ?? "";

			// On effectue ensuite une requête SQL pour vérifier
			//	si un enregistrement est présent avec les identifiants
			//	donnés lors de l'étape précédente.
			$query = $this->connector->prepare("SELECT `password` FROM `users` WHERE `username` = ?;");
			$query->execute([$username]);

			$result = $query->fetch();

			// On vérifie enfin le résultat de la requête SQL avant
			//	de comparer le mot de passe hashé par l'entrée utilisateur.
			if (is_array($result) && count($result) > 0 && password_verify($password, $result["password"]))
			{
				// L'authentification a réussie.
				$this->setUsername($username);
				$this->setPassword($password);

				return true;
			}

			// L'authentification a échouée.
			return false;
		}

		//
		// Permet de déconnecter l'utilisateur de l'interface.
		//
		public function destroy(): void
		{
			unset($_SESSION["username"]);
		}
	}
?>