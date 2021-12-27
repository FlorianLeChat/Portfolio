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
			// Si les informations sont valides, alors on va réaliser des
			// 	vérifications au niveau du client ayant demandé la page.
			// 	Note : Cela est considéré comme une protection contre les
			//		robots et les utilisateurs malveillants.
			$ip = htmlspecialchars($_SERVER["REMOTE_ADDR"] ?? "");

			if (filter_var($ip, FILTER_VALIDATE_IP))
			{
				// On effectue une requête HTTP vers un service de détection
				//	des connexions sous proxy ou/et VPN.
				$header = ["X-Key: api_key"];
				$request = curl_init();

				curl_setopt($request, CURLOPT_URL, "https://v2.api.iphub.info/ip/$ip");
				curl_setopt($request, CURLOPT_HTTPHEADER, $header);
				curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

				$result = json_decode(curl_exec($request), true);

				// On vérifie le résultat de l'API afin d'autoriser ou non la
				//	suite du processus de validation du formulaire.
				if (count($result) > 1 && $result["block"] == "1")
				{
					// Il semble que le client soit un utilisateur sous une connexion
					//	« camouflée », alors on redirige la personne ailleurs...
					http_response_code(418);
					header("Location: https://www.youtube.com/watch?v=dQw4w9WgXcQ");
					exit();
				}
				else
				{
					// Dans le cas contraire, on utilise un serveur SMTP (OVH) pour envoyer un mail.
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

					// On écrit par la même occassion ces informations dans la base de
					//	données pour y accéder plus tard dans l'interface d'administration.
					$data->addMessage($form);
				}
			}
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