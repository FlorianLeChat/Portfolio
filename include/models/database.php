<?php
	namespace Portfolio\Models;

	class Database
	{
		protected $host;
		protected $database;
		protected $username;
		protected $password;
		protected $charset;

		public function __construct()
		{
			// Valeurs par défaut.
			$this->host 		= "localhost";
			$this->database   	= "portfolio";
			$this->username		= "user";
			$this->password 	= "RoTIGC!cLNIdml89";
			$this->charset 		= "utf8";
		}

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
	}
?>