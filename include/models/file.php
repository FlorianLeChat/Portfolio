<?php
	//
	// Modèle des données représentatives d'un fichier.
	//
	namespace Portfolio\Models;

	class File
	{
		protected $name = "";
		protected $type = "";
		protected $size = 0;

		// Nom du fichier.
		public function setName(string $name)
		{
			$this->name = $name;
		}

		public function getName(): string
		{
			return $this->name;
		}

		// Extension du fichier.
		public function setType(string $type)
		{
			$this->type = $type;
		}

		public function getType(): string
		{
			return $this->type;
		}

		// Poids du fichier.
		public function setSize(int $size)
		{
			$this->size = $size;
		}

		public function getSize(): int
		{
			return $this->size;
		}
	}
?>