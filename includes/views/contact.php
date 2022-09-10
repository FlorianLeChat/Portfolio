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
?>

<!-- Traductions JavaScript -->
<script>
	// Messages d'avertissement du système de vérification du formulaire
	//	côté JavaScript (doit être modifié avec 3 paramètres).
	const check_phrase = "<?= addslashes($contact["contact_form_warning"]); ?>";
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

	<!-- Formulaire -->
	<form method="POST" novalidate>
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