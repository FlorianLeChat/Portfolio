<?php
	//
	// Contrôleur de la connexion et la gestion de la base de données SQL.
	//
	namespace Portfolio\Controllers;

	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/models/database.php");

	use PDO;
	use Portfolio\Models\Form;
	use Portfolio\Models\Database;

	// Classe permettant d'établir la liaison avec la base de données.
	class Connector extends Database
	{
		public function __construct()
		{
			// On indique les informations de connexions.
			$link = sprintf("mysql:host=%s;dbname=%s;charset=%s;port=%s", $this->getHost(), $this->getDatabase(), $this->getCharset(), $this->getPort());
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
			catch (\PDOException $error)
			{
				throw new \PDOException($error->getMessage(), (int)$error->getCode());
			}
		}
	}

	// Classe permettant de récupérer les données publiques du site.
	class PublicData extends Connector
	{
		//
		// Permet d'ajouter un message reçu depuis le formulaire dans la base
		//	de données pour y accéder dans l'interface d'administration.
		//
		public function addFormMessage(Form $data): void
		{
			$query = $this->connector->prepare("INSERT INTO messages (`firstname`, `lastname`, `email`, `subject`, `content`) VALUES (?, ?, ?, ?, ?);");
			$query->execute([$data->getFirstname(), $data->getLastname(), $data->getEmail(), $data->getSubject(), $data->getContent()]);
		}

		//
		// Permet de récupérer des informations les données d'une ou plusieurs
		//	colonnes présentes dans la base de données.
		//
		public function getTableData(string $table, array $columns, bool $offset_start = false): array
		{
			// On tranforme la liste numérique en chaîne de caractère
			//	comprise par la base de données via une requête SQL.
			$columns = count($columns) > 1 ? implode(", ", $columns) : $columns[0];

			// On effectue ensuite la requête avec les colonnes demandées.
			$query = $this->connector->prepare("SELECT $columns FROM `$table` ORDER BY `position` ASC;");
			$query->execute();

			$result = $query->fetchAll();

			// On réordonne (si demandé) le résultat de la requête SQL
			// 	pour que l'indice commence à 1 et non pas à 0. Cela peut
			//	être sur certaines opérations arithmétique de base.
			if ($offset_start)
			{
				array_unshift($result, "");	// Décalage de 1.
				unset($result[0]);			// Suppression de l'indice 0.
			}

			return $result;
		}
	}
?>