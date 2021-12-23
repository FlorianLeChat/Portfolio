<?php
	namespace Portfolio\Controllers;

	include_once("./include/models/database.php");

	use PDO;
	use Portfolio\Models\Database;

	// Classe permettant d'établir la liaison avec la base de données.
	class Connector extends Database
	{
		public function __construct()
		{
			// On indique les informations de connexions.
			$link = sprintf("mysql:host=%s;dbname=%s;charset=%s", $this->getHost(), $this->getDatabase(), $this->getCharset());
			$options = [
				PDO::ATTR_ERRMODE			 	=> PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES 		=> false,
			];

			// On tente ensuite de créer le connecteur avec les informations renseignés.
			try
			{
				$this->setPDO(new PDO($link, $this->getUsername(), $this->getPassword(), $options));
			}
			catch (PDOException $error)
			{
				throw new PDOException($error->getMessage(), (int)$error->getCode());
			}
		}
	}
?>