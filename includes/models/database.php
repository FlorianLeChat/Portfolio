<?php
	//
	// Modèle des données représentatives de la base de données SQL.
	//
	namespace Portfolio\Models;

	abstract class Database
	{
		public $connector;

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