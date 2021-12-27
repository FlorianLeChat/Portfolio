<?php
	// Ceci est le fichier de la page du formulaire de contact
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

	<h2>Contact</h2>

	<!-- Description -->
	<p>
		Voici le formulaire de contact permettant de m'adresser un message. Ce message sera directement transmis
		dans ma boite mail personnelle. Afin de vous répondre, ce formulaire vous demande de renseigner une
		adresse mail valide pour que je puisse vous répondre, elle ne sera ni stockée et ni utilisée à des fins
		malveillantes. Sans ça, votre message restera évidemment lettre morte. Vous trouvez ce moyen de communication
		trop.. <em>archaïque</em> ? N'oubliez pas que des supports de communication plus modernes sont disponibles
		sur la page d'accueil (Discord, Twitter, LinkedIn, ...).
	</p>

	<!-- Message de vérification/validation -->
	<p id="result"></p>

	<!-- Formulaire -->
	<form method="POST" novalidate>
		<!-- Prénom -->
		<label for="firstname">Prénom</label>
		<input type="text" autocomplete="off" spellcheck="false" id="firstname" name="firstname" placeholder="Jean" minlength="2" maxlength="20" required />
		<span></span>

		<!-- Nom de famille -->
		<label for="lastname">Nom</label>
		<input type="text" autocomplete="off" spellcheck="false" id="lastname" name="lastname" placeholder="Dupont" minlength="3" maxlength="25" required />
		<span></span>

		<!-- Adresse email -->
		<label for="email">Adresse e-mail</label>
		<input type="email" spellcheck="false" id="email" name="email" placeholder="jeandupont@domaine.com" minlength="10" maxlength="40" required />
		<span></span>

		<!-- Sujet de la prise de contact -->
		<label for="subject">Sujet</label>
		<select id="subject" name="subject" >
			<option value="question">Question</option>
			<option value="issue">Problème</option>
			<option value="other">Autre</option>
		</select>

		<!-- Message -->
		<label for="message">Message</label>
		<textarea id="message" name="message" placeholder="Vous voulez me poser des questions ? C'est le bon endroit !" minlength="20" maxlength="4000" required></textarea>
		<span></span>

		<!-- Validation -->
		<input type="submit" value="Envoyer" />
	</form>
</section>