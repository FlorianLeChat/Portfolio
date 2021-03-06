<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page du formulaire de contact.
	//

	// On récupère les traductions nécessaires pour le formulaire.
	$contact = $translation->getPhrases("contact");
	$contact["contact_message"] = str_replace("<br /><br />", " ", $contact["contact_message"]);

	// On filtre ensuite les résultats pour obtenir le nom de tous
	//	les sujets du formulaire.
	$options_html = "";
	$options_data = array_filter($contact, function($key)
	{
		return str_contains($key, "contact_form_subject");
	}, ARRAY_FILTER_USE_KEY);

	foreach ($options_data as $key => $value)
	{
		// Définition du nom de la catégorie.
		$disabled = $key == "contact_form_subject" ? " disabled" : "";

		// Options présentes dans le sélecteur.
		$options_html .= "<option value=\"$value\"$disabled>$value</option>";
	}

	// On réalise enfin les vérifications liées au formulaire si la
	//	requête est de type POST.
	if ($_SERVER["REQUEST_METHOD"] === "POST")
	{
		$form->setLimits([
			"firstname" => [2, 20],			// Prénom
			"lastname" => [3, 25],			// Nom de l'utilisateur
			"email" => [10, 40],			// Adresse email
			"content" => [50, 4000]			// Message
		]);

		if ($form->validate($_POST))
		{
			// Si les informations sont valides, on utilise un serveur SMTP (OVH) pour envoyer un mail.
			// 	Source : https://www.cloudbooklet.com/how-to-install-and-setup-sendmail-on-ubuntu/
			// 	Note : le destinataire et l'auteur ont la même adresse mail pour éviter le signalement
			//		« SPAM » de certaines boites mail comme Gmail avant une redirection automatique côté OVH.
			if (str_contains($_SERVER["SERVER_NAME"], "florian-dev.fr"))
			{
				$to = "admin@florian-dev.fr";
				$subject = "Portfolio - " . html_entity_decode($form->getSubject()) . " - " . html_entity_decode($form->getEmail());
				$message = $form->getContent();
				$headers = array(
					"From" => $form->getFirstname() . " " . $form->getLastName() . "<$to>",
					"X-Mailer" => "PHP/" . phpversion()
				);

				mb_send_mail($to, $subject, $message, $headers);
			}

			// On écrit par la même occasion ces informations dans la base de
			//	données pour y accéder plus tard dans l'interface d'administration.
			$public_data->addFormMessage($form);
		}
	}
?>

<!-- Traductions JavaScript -->
<script>
	// Messages d'avertissement du système de vérification du formulaire
	//	côté JavaScript (doit être modifié avec 3 paramètres).
	const check_phrase = "<?= addslashes($contact["contact_form_warning"]); ?>";

	// Message indiquant à l'utilisateur d'entrer un code de vérification
	//	pour lutter contre les robots et le spam.
	const verification_code = "<?= addslashes($contact["contact_form_check_1"]); ?>";

	// Message indiquant à l'utilisateur que le code indiqué est erroné.
	const code_failed = "<?= addslashes($contact["contact_form_check_2"]); ?>";
</script>

<!-- Contact -->
<section id="form">
	<h3>#contact</h3>

	<h2>
		<?= $contact["contact_title"] . PHP_EOL; ?>
	</h2>

	<!-- Description -->
	<p>
		<?= $contact["contact_description"] . PHP_EOL; ?>
	</p>

	<!-- Messages de vérification -->
	<p id="warning"></p>

	<!-- Message de résultat après envoi -->
	<p id="result"><?= $form->message ?? ""; ?></p>

	<!-- Formulaire -->
	<form method="POST" novalidate>
		<!-- Prénom -->
		<label for="firstname"><?= $contact["contact_form_firstname"]; ?></label>
		<input type="text" autocomplete="given-name" spellcheck="false" id="firstname" name="firstname" placeholder="Jean" minlength="2" maxlength="20" required />
		<span></span>

		<!-- Nom de famille -->
		<label for="lastname"><?= $contact["contact_form_lastname"]; ?></label>
		<input type="text" autocomplete="family-name" spellcheck="false" id="lastname" name="lastname" placeholder="Dupont" minlength="3" maxlength="25" required />
		<span></span>

		<!-- Adresse email -->
		<label for="email"><?= $contact["contact_form_email"]; ?></label>
		<input type="email" autocomplete="email" spellcheck="false" id="email" name="email" placeholder="jeandupont@mail.com" minlength="10" maxlength="40" required />
		<span></span>

		<!-- Sujet de la prise de contact -->
		<label for="subject"><?= $contact["contact_form_subject"]; ?></label>
		<select id="subject" name="subject">
			<?= $options_html; ?>
		</select>

		<!-- Contenu du message -->
		<label for="content"><?= $contact["contact_form_content"]; ?></label>
		<textarea id="content" name="content" placeholder="<?= $contact["contact_message"]; ?>" minlength="50" maxlength="4000" required></textarea>
		<span></span>

		<!-- Validation -->
		<input type="submit" value="Envoyer" />
	</form>
</section>