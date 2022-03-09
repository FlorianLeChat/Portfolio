<?php
	//
	// Contrôleur de gestion des données utilisateurs.
	//
	namespace Portfolio\Controllers;

	require_once(__DIR__ . "/../models/user.php");

	use Portfolio\Models\User;

	// Classe permettant d'authentifier un utilisateur.
	final class UserAuthentication extends User
	{
		// Temps d'expiration du jeton d'authentification (en secondes).
		public const EXPIRATION_TIME = 60 * 60 * 24 * 31;

		//
		// Permet de comparer et de valider un jeton d'authentification
		//	envoyé par un utilisateur connecté précédemment.
		//
		public function compareToken(string $token): bool
		{
			// On exécute une requête SQL pour récupérer le jeton
			//	d'authentification enregistré dans la base de données.
			$query = $this->connector->prepare("SELECT `username`, `password`, `creation_time` FROM `users` WHERE `access_token` = ?;");
			$query->execute([$token]);

			$result = $query->fetch();

			// On vérifie alors le résultat de la requête.
			if (is_array($result) && count($result) > 0 && strtotime($result["creation_time"]) + $this::EXPIRATION_TIME > time())
			{
				// Si elle est valide, on assigne certaines variables
				//	à l'utilisateur.
				$this->setUsername($result["username"]);
				$this->setPassword($result["password"]);
				$this->setToken($token);

				return true;
			}

			// Dans le cas contraire, on signale que le jeton est invalide.
			return false;
		}

		//
		// Permet d'enregistrer le jeton d'authentification de l'utilisateur
		//	dans la base de données.
		//
		public function storeToken(string $token): void
		{
			$query = $this->connector->prepare("UPDATE `users` SET `access_token` = ? WHERE `username` = ?;");
			$query->execute([$token, $this->getUsername()]);
		}

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
				$this->setPassword($result["password"]);

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
			// On supprime le jeton d'authentification de l'utilisateur
			//	aussi bien côté client que dans la base de données.
			$this->storeToken("");

			setcookie("generated_token", "", 1, "/portfolio/admin/", $_SERVER["HTTP_HOST"], true);

			// On supprime toutes les informations utilisateurs sauvegardées
			// 	dans les sessions.
			unset($_SESSION);
		}
	}
?>