<?php
	//
	// Modèle des données représentatives de la base de données SQL.
	//
	namespace Portfolio\Models;

	$credentials = fopen(__DIR__ . "/../../config.csv", "r");

	if ($credentials)
	{
		// Le fichier de configuration doit exister.
		$credentials = fgetcsv($credentials);
	}

	abstract class Database
	{
		protected $connector;

		// Adresse du serveur distant (lecture seule).
		public function getHost(): string
		{
			global $credentials;
			return $credentials[0];
		}

		// Nom de la base de données (lecture seule).
		public function getDatabase(): string
		{
			global $credentials;
			return $credentials[1];
		}

		// Nom d'utilisateur (lecture seule).
		public function getUsername(): string
		{
			global $credentials;
			return $credentials[2];
		}

		// Mot de passe (lecture seule).
		public function getPassword(): string
		{
			global $credentials;
			return $credentials[3];
		}

		// Encodage des caractères (lecture seule).
		public function getCharset(): string
		{
			global $credentials;
			return $credentials[4];
		}

		// Port de connexion (lecture seule).
		public function getPort(): string
		{
			global $credentials;
			return $credentials[5];
		}

		// Objet PDO (connecteur).
		public function setPDO(\PDO $connector)
		{
			$this->connector = $connector;
		}

		public function getPDO(): \PDO
		{
			return $this->connector;
		}
	}
?>