<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page du formulaire de contact.
	//

	// On récupère les traductions nécessaires pour le formulaire.
	$contact = $translation->getPhrases("contact");
	$contact["contact_message"] = str_replace("<br /><br />", " ", $contact["contact_message"]);

	// On réalise ensuite les vérifications liées au formulaire.
	//	Note : la page doit avoir été demandée sous requête POST.
	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$form = new Portfolio\Controllers\FormValidation();

		$form->translation = $translation;	// Traduction

		$form->setLimits([
			"firstname" => [2, 20],			// Prénom
			"lastname" => [3, 25],			// Nom de l'utilisateur
			"email" => [10, 40],			// Adresse email
			"content" => [20, 4000]			// Message
		]);

		if ($form->validate($_POST))
		{
			// Si les informations sont valides, alors on utilise
			//	un serveur SMTP distant (OVH) pour envoyer un mail
			//	à moi-même !
			// 	Source : https://www.cloudbooklet.com/how-to-install-and-setup-sendmail-on-ubuntu/
			$from = $form->getEmail();
			$to = "admin@florian-dev.fr";
			$subject = "Portfolio - " . $form->getSubject();
			$message = $form->getContent();
			$headers = array(
				"From" => $form->getFirstname() . " " . $form->getLastName() . "<$from>",
				"X-Mailer" => "PHP/" . phpversion()
			);

			mb_send_mail($to, $subject, $message, $headers);
		}
	}
?>

<!-- Traductions JavaScript -->
<script>
	// Messages d'avertissement du système de vérification du formulaire
	//	côté JavaScript (doit être modifié avec 3 paramètres).
	const check_phrase = "<?php echo($contact["contact_form_warning"]); ?>";

	// Message indiquant à l'utilisateur d'entrer un code de vérification
	//	pour lutter contre les robots et le spam.
	const verification_code = "<?php echo($contact["contact_form_check_1"]); ?>";

	// Message indiquant à l'utilisateur que le code indiqué est erroné.
	const code_failed = "<?php echo($contact["contact_form_check_2"]); ?>";
</script>

<!-- Contact -->
<section id="form">
	<h3>#contact</h3>

	<h2>
		<?php echo($contact["contact_title"] . "\n"); ?>
	</h2>

	<!-- Description -->
	<p>
		<?php echo($contact["contact_description"] . "\n"); ?>
	</p>

	<!-- Messages de vérification -->
	<p id="warning"></p>

	<!-- Message de résultat après envoi -->
	<p id="result"><?php echo($form->message ?? ""); ?></p>

	<!-- Formulaire -->
	<form method="POST" novalidate>
		<!-- Prénom -->
		<label for="firstname"><?php echo($contact["contact_form_firstname"]); ?></label>
		<input type="text" autocomplete="off" spellcheck="false" id="firstname" name="firstname" placeholder="Jean" minlength="2" maxlength="20" required />
		<span></span>

		<!-- Nom de famille -->
		<label for="lastname"><?php echo($contact["contact_form_lastname"]); ?></label>
		<input type="text" autocomplete="off" spellcheck="false" id="lastname" name="lastname" placeholder="Dupont" minlength="3" maxlength="25" required />
		<span></span>

		<!-- Adresse email -->
		<label for="email"><?php echo($contact["contact_form_email"]); ?></label>
		<input type="email" spellcheck="false" id="email" name="email" placeholder="jeandupont@mail.com" minlength="10" maxlength="40" required />
		<span></span>

		<!-- Sujet de la prise de contact -->
		<label for="subject"><?php echo($contact["contact_form_subject"]); ?></label>
		<select id="subject" name="subject" >
			<option value="question"><?php echo($contact["contact_form_subject_1"]); ?></option>
			<option value="issue"><?php echo($contact["contact_form_subject_2"]); ?></option>
			<option value="other"><?php echo($contact["contact_form_subject_3"]); ?></option>
		</select>

		<!-- Contenu du message -->
		<label for="content"><?php echo($contact["contact_form_content"]); ?></label>
		<textarea id="content" name="content" placeholder="<?php echo($contact["contact_message"]); ?>" minlength="20" maxlength="4000" required></textarea>
		<span></span>

		<!-- Validation -->
		<input type="submit" value="Envoyer" />
	</form>
</section>