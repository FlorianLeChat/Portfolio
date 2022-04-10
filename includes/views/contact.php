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
		$options_html .= "<option value=\"$value\"$disabled>$value</option>\n";
	}

	// On réalise enfin les vérifications liées au formulaire si la
	//	requête est de type POST et si l'utilisateur n'a pas déjà
	//	envoyé le formulaire durant sa session personnelle.
	if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_SESSION["form_cooldown"]))
	{
		$form->setLimits([
			"firstname" => [2, 20],			// Prénom
			"lastname" => [3, 25],			// Nom de l'utilisateur
			"email" => [10, 40],			// Adresse email
			"content" => [50, 4000]			// Message
		]);

		if ($form->validate($_POST))
		{
			// Si les informations sont valides, alors on va réaliser des
			// 	vérifications au niveau du client ayant demandé la page.
			// 	Note : Cela est considéré comme une protection contre les
			//		robots et les utilisateurs malveillants.
			$ip = htmlentities($_SERVER["HTTP_X_FORWARDED_FOR"] ?? "", ENT_QUOTES);

			if (filter_var($ip, FILTER_VALIDATE_IP))
			{
				// On effectue une requête HTTP vers un service de détection
				//	des connexions sous proxy ou/et VPN.
				// 	Source : lien de récupération d'une clé - https://iphub.info/
				$header = ["X-Key: api_key"];
				$request = curl_init();

				curl_setopt($request, CURLOPT_URL, "https://v2.api.iphub.info/ip/$ip");
				curl_setopt($request, CURLOPT_HTTPHEADER, $header);
				curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

				$result = json_decode(curl_exec($request), true);

				// On vérifie le résultat de l'API afin d'autoriser ou non la
				//	suite du processus de validation du formulaire.
				if (is_array($result) && count($result) > 1 && $result["block"] == "1")
				{
					// Il semble que le client soit un utilisateur sous une connexion
					//	« camouflée », alors on redirige la personne ailleurs...
					http_response_code(418);
					echo("<meta http-equiv=\"refresh\" content=\"0;URL=https://www.youtube.com/watch?v=dQw4w9WgXcQ\" />");
					exit();
				}
				else
				{
					// Dans le cas contraire, on utilise un serveur SMTP (OVH) pour envoyer un mail.
					// 	Source : https://www.cloudbooklet.com/how-to-install-and-setup-sendmail-on-ubuntu/
					// 	Note : le destinataire et l'auteur ont la même adresse mail pour éviter le signalement
					//		« SPAM » de certaines boites mail comme Gmail avant une redirection automatique côté OVH.
					if (str_contains($_SERVER["SERVER_NAME"], "florian-dev.fr"))
					{
						$to = "admin@florian-dev.fr";
						$subject = "Portfolio - " . $form->getSubject() . " - " . $form->getEmail();
						$message = $form->getContent();
						$headers = array(
							"From" => $form->getFirstname() . " " . $form->getLastName() . "<$to>",
							"X-Mailer" => "PHP/" . phpversion()
						);

						mb_send_mail($to, $subject, $message, $headers);
					}

					// On écrit par la même occassion ces informations dans la base de
					//	données pour y accéder plus tard dans l'interface d'administration.
					$public_data->addFormMessage($form);
				}
			}

			// On met en mémoire cette action pour éviter que l'utilisateur (valide ou non)
			//	puisse en envoyer un autre pendant toute la durée de sa session.
			$_SESSION["form_cooldown"] = true;
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