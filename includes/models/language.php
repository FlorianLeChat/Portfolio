<?php
	//
	// Modèle des données représentatives de la gestion des langues.
	//
	namespace Portfolio\Models;

	abstract class Language
	{
		protected string $code = "FR";

		// Code ISO-3166 de la langue.
		public function setCode(string $code)
		{
			$this->code = strtoupper($code);

			if (isset($_SESSION))
			{
				// Enregistrement dans la session active.
				$_SESSION["language"] = $this->code;
			}
		}

		public function getCode(): string
		{
			if (isset($_SESSION) && !empty($_SESSION["language"]))
			{
				// Récupération dans la session active.
				$this->code = $_SESSION["language"];
			}

			return $this->code;
		}
	}
?>