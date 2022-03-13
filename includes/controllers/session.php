<?php
	//
	// Contrôleur de gestion des variables de session.
	//
	namespace Portfolio\Controllers;

	// Classe permettant de manipuler les sessions.
	class SessionStorage
	{
		//
		// Permet de démarrer automatiquement une session lors de
		// 	l'instanciation de la classe.
		//
		public function __construct()
		{
			if (session_status() == PHP_SESSION_NONE)
			{
				session_start();
			}
		}

		//
		// Permet d'ajouter un enregistrement dans les variables
		//	de session.
		//
		public function __set(string $name, mixed $value): void
		{
			$_SESSION[$name] = $value;
		}

		//
		// Permet de récupérer un enregistrement existant dans
		//	les variables de session.
		//
		public function __get(string $name): mixed
		{
			if (isset($_SESSION[$name]))
			{
				return $_SESSION[$name];
			}
		}

		//
		// Permet de déterminer si un enregistrement est présent
		//	dans les variables de session actuelles.
		//
		public function __isset(string $name): bool
		{
			return isset($_SESSION[$name]);
		}

		//
		// Permet de supprimer un enregistrement quelconque dans
		//	les variables de session.
		//
		public function __unset(string $name): void
		{
			unset($_SESSION[$name]);
		}
	}
?>