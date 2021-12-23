<?php
	namespace Portfolio\Models;

	class Database
	{
		protected $host = "localhost";
		protected $database	= "portfolio";
		protected $username	= "user";
		protected $password = "RoTIGC!cLNIdml89";
		protected $charset = "utf8";
		protected $connector;

		// Adresse du serveur distant.
		public function setHost(string $host)
		{
			$this->host = $host;
		}

		public function getHost()
		{
			return $this->host;
		}

		// Nom de la base de données.
		public function setDatabase(string $database)
		{
			$this->database = $database;
		}

		public function getDatabase()
		{
			return $this->database;
		}

		// Nom d'utilisateur.
		public function setUsername(string $username)
		{
			$this->username = $username;
		}

		public function getUsername()
		{
			return $this->username;
		}

		// Mot de passe.
		public function setPassword(string $password)
		{
			$this->password = $password;
		}

		public function getPassword()
		{
			return $this->password;
		}

		// Encodage des caractères.
		public function setCharset(string $charset)
		{
			$this->charset = $charset;
		}

		public function getCharset()
		{
			return $this->charset;
		}

		// Object PDO (connecteur).
		public function setPDO(\PDO $connector)
		{
			$this->connector = $connector;
		}

		public function getPDO()
		{
			return $this->connector;
		}
	}
?>