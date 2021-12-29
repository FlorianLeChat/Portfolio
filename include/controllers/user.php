<?php
	//
	// Contrôleur de gestion des données utilisateurs.
	//
	namespace Portfolio\Controllers;

	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/models/user.php");

	use Portfolio\Models\User;

	// Classe permettant d'authentifier un utilisateur.
	class UserAuthentification extends User
	{

	}
?>