<?php
	//
	// Modèle des données représentatives du formulaire de contact.
	//
	namespace Portfolio\Models;

	class Form
	{
		protected string $firstname;
		protected string $lastname;
		protected string $email;
		protected string $subject;
		protected string $content;

		// Prénom de l'utilisateur.
		public function setFirstname(string $firstname)
		{
			$this->firstname = $firstname;
		}

		public function getFirstname(): string
		{
			return $this->firstname;
		}

		// Nom de famille de l'utilisateur.
		public function setLastname(string $lastname)
		{
			$this->lastname = $lastname;
		}

		public function getLastname(): string
		{
			return $this->lastname;
		}

		// Adresse e-mail de l'utilisateur.
		public function setEmail(string $email)
		{
			$this->email = $email;
		}

		public function getEmail(): string
		{
			return $this->email;
		}

		// Sujet du message.
		public function setSubject(string $subject)
		{
			$this->subject = $subject;
		}

		public function getSubject(): string
		{
			return $this->subject;
		}

		// Contenu du message de l'utilisateur.
		public function setContent(string $content)
		{
			$this->content = $content;
		}

		public function getContent(): string
		{
			return $this->content;
		}
	}
?>