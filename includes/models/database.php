<?php
	//
	// Modèle des données représentatives de la base de données SQL.
	//
	namespace Portfolio\Models;

	$credentials = parse_ini_file(__DIR__ . "/../../config.ini", true)["SQL"];

	abstract class Database
	{
		protected $connector;

		// Adresse du serveur distant (lecture seule).
		public function getHost(): string
		{
			global $credentials;
			return $credentials["host"];
		}

		// Nom de la base de données (lecture seule).
		public function getDatabase(): string
		{
			global $credentials;
			return $credentials["database"];
		}

		// Nom d'utilisateur (lecture seule).
		public function getUsername(): string
		{
			global $credentials;
			return $credentials["username"];
		}

		// Mot de passe (lecture seule).
		public function getPassword(): string
		{
			global $credentials;
			return $credentials["password"];
		}

		// Encodage des caractères (lecture seule).
		public function getCharset(): string
		{
			global $credentials;
			return $credentials["charset"];
		}

		// Port de connexion (lecture seule).
		public function getPort(): string
		{
			global $credentials;
			return $credentials["port"];
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