<?php
	//
	// Modèle des données représentatives de la base de données SQL.
	//
	namespace Portfolio\Models;

	class Database
	{
		protected $host = "localhost";
		protected $database	= "portfolio";
		protected $username	= "user";
		protected $password = "RoTIGC!cLNIdml89";	// Devra être actualisé par la suite...
		protected $charset = "utf8";
		protected $connector;

		// Adresse du serveur distant.
		public function setHost(string $host)
		{
			$this->host = $host;
		}

		public function getHost(): string
		{
			return $this->host;
		}

		// Nom de la base de données.
		public function setDatabase(string $database)
		{
			$this->database = $database;
		}

		public function getDatabase(): string
		{
			return $this->database;
		}

		// Nom d'utilisateur.
		public function setUsername(string $username)
		{
			$this->username = $username;
		}

		public function getUsername(): string
		{
			return $this->username;
		}

		// Mot de passe.
		public function setPassword(string $password)
		{
			$this->password = $password;
		}

		public function getPassword(): string
		{
			return $this->password;
		}

		// Encodage des caractères.
		public function setCharset(string $charset)
		{
			$this->charset = $charset;
		}

		public function getCharset(): string
		{
			return $this->charset;
		}

		// Object PDO (connecteur).
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