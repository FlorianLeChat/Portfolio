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
		}

		public function getUsername(): string
		{
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

		// État de connexion.
		public function setConnected(bool $connected)
		{
			$this->connected = $connected;
		}

		public function isConnected(): bool
		{
			return $this->connected;
		}
	}
?>