<?php
	//
	// Modèle des données représentatives d'un utilisateur.
	//
	namespace Portfolio\Models;

	abstract class User
	{
		protected string $username = "";
		protected string $password = "";
		protected string $email = "";
		protected string $token = "";

		// Nom d'utilisateur.
		public function setUsername(string $username)
		{
			$this->username = $username;

			if (isset($_SESSION))
			{
				// Enregistrement dans la session active.
				$_SESSION["username"] = $this->username;
			}
		}

		public function getUsername(): string
		{
			if (!empty($_SESSION["username"]))
			{
				// Récupération dans la session active.
				$this->username = $_SESSION["username"];
			}

			return $this->username;
		}

		// Mot de passe (hashé) de l'utilisateur.
		public function setPassword(string $password)
		{
			$this->password = $password;
		}

		public function getPassword(): string
		{
			return $this->password;
		}

		// Adresse électronique.
		public function setEmail(string $email)
		{
			$this->email = $email;
		}

		public function getEmail(): string
		{
			return $this->email;
		}

		// Jeton d'authentification.
		public function setToken(string $token)
		{
			$this->token = $token;
		}

		public function getToken(): string
		{
			return $this->token;
		}

		// État de la connexion.
		public function isConnected(): bool
		{
			return !empty($this->getUsername());
		}
	}
?>