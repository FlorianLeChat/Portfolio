<?php
	//
	// Modèle des données représentatives d'un utilisateur.
	//
	namespace Portfolio\Models;

	class User
	{
		protected $username = "";
		protected $password = "";
		protected $connected = false;

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
			if (isset($_SESSION) && !empty($_SESSION["username"]))
			{
				// Récupération dans la session active.
				$this->username = $_SESSION["username"];
			}

			return $this->username;
		}

		// Mot de passe (chiffré) de l'utilisateur.
		public function setPassword(string $password)
		{
			$this->password = $password;
		}

		public function getPassword(): string
		{
			return $this->password;
		}

		// État de la connexion.
		public function isConnected(): bool
		{
			return !empty($this->getUsername());
		}
	}
?>