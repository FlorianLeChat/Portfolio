<?php
	//
	// Modèle des données représentatives du formulaire de contact.
	//
	namespace Portfolio\Models;

	class Form
	{
		protected $firstname;
		protected $lastname;
		protected $email;
		protected $subject;
		protected $message;

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

		// Message de l'utilisateur.
		public function setMessage(string $message)
		{
			$this->message = $message;
		}

		public function getMessage(): string
		{
			return $this->message;
		}
	}
?>