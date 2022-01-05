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

	// Classe permettant de récupérer les données générales du site.
	class Data extends Connector
	{
		//
		// Permet d'ajouter un message reçu depuis le formulaire dans la base
		//	de données pour y accéder dans l'interface d'administration.
		//
		public function addMessage(Form $data): void
		{
			$query = $this->connector->prepare("INSERT INTO messages (`firstname`, `lastname`, `email`, `subject`, `content`) VALUES (?, ?, ?, ?, ?);");
			$query->execute([$data->getFirstname(), $data->getLastname(), $data->getEmail(), $data->getSubject(), $data->getContent()]);
		}

		//
		// Permet de récupérer les contributions utilisateurs depuis la base
		//	de données.
		//
		public function getContributions(): array
		{
			$query = $this->connector->prepare("SELECT `firstname`, `lastname`, `details` FROM `contributions` ORDER BY `position` ASC;");
			$query->execute();

			return $query->fetchAll();
		}

		//
		// Permet de récupérer les plateformes de communications depuis la base
		//	de données.
		//
		public function getPlateforms(): array
		{
			$query = $this->connector->prepare("SELECT `identifier`, `hex_color`, `target_url` FROM `plateforms` ORDER BY `position` ASC;");
			$query->execute();

			return $query->fetchAll();
		}

		//
		// Permet de récupérer les projets déclarés dans la base de données.
		//
		public function getProjects(array $tables, bool $offset_start = true): array
		{
			// On tranforme la liste numérique en chaîne de caractère
			//	comprise par la base de données via une requête SQL.
			$tables = count($tables) > 1 ? implode(", ", $tables) : $tables[0];

			// On effectue ensuite la requête avec les tables demandés.
			$query = $this->connector->prepare("SELECT $tables FROM `projects` ORDER BY `position` ASC;");
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

		//
		// Permet de récupérer les diplômes et certifications depuis la base
		//	de données.
		//
		public function getDegrees(): array
		{
			$query = $this->connector->prepare("SELECT `identifier`, `date`, `graduated` FROM `degrees` ORDER BY `position` ASC;");
			$query->execute();

			return $query->fetchAll();
		}

		//
		// Permet de récupérer les expériences professionnelles depuis la base
		//	de données.
		//
		public function getExperiences(): array
		{
			$query = $this->connector->prepare("SELECT `identifier`, `date` FROM `experiences` ORDER BY `position` ASC;");
			$query->execute();

			return $query->fetchAll();
		}

		//
		// Permet de récupérer les compétences professionnelles depuis la base
		//	de données.
		//
		public function getSkills(): array
		{
			$query = $this->connector->prepare("SELECT `name`, `level` FROM `skills` ORDER BY `position` ASC;");
			$query->execute();

			return $query->fetchAll();
		}
	}
?>