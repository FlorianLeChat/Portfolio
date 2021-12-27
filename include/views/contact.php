<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page du formulaire de contact.
	//

	// On récupère les traductions nécessaires pour le formulaire.
	$contact = $translation->getPhrases("contact");
	$contact["contact_message"] = str_replace("<br /><br />", " ", $contact["contact_message"]);
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

		<!-- Message -->
		<label for="message"><?php echo($contact["contact_form_message"]); ?></label>
		<textarea id="message" name="message" placeholder="<?php echo($contact["contact_message"]); ?>" minlength="20" maxlength="4000" required></textarea>
		<span></span>

		<!-- Validation -->
		<input type="submit" value="Envoyer" />
	</form>
</section>