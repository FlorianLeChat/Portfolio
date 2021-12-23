<?php
	namespace Portfolio\Models;

	class Language
	{
		protected $code = "fr";

		// Code ISO-3166
		public function setCode(string $code)
		{
			$this->code = $code;

			if (!empty($_SESSION))
			{
				// Si une session est active, alors on enregistre
				//	ce code dans celle-ci.
				$_SESSION["language"] = $code;
			}
		}

		public function getCode()
		{
			if (!empty($_SESSION) && !empty($_SESSION["language"]))
			{
				// Si une session est active, on tente alors de
				// 	récupérer la langue sélectionnée précédemment.
				$this->code = $_SESSION["language"];
			}

			return $this->code;
		}
	}
?>