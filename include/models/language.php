<?php
	//
	// Modèle des données représentatives de la gestion des langues.
	//
	namespace Portfolio\Models;

	class Language
	{
		protected $code = "fr";

		// Code ISO-3166 de la langue.
		public function setCode(string $code)
		{
			$this->code = strtoupper($code);

			if (isset($_SESSION))
			{
				// Si une session est active, alors on enregistre
				//	ce code dans celle-ci.
				$_SESSION["language"] = $this->code;
			}
		}

		public function getCode(): string
		{
			if (isset($_SESSION) && !empty($_SESSION["language"]))
			{
				// Si une session est active, on tente alors de
				// 	récupérer la langue sélectionnée précédemment.
				$this->code = $_SESSION["language"];
			}

			return $this->code;
		}
	}
?>