<?php
	namespace Portfolio\Models;

	class Language
	{
		protected $code;

		// Code ISO-3166
		public function setCode(string $code)
		{
			$this->code = $code;
		}

		public function getCode()
		{
			return $this->code;
		}
	}
?>