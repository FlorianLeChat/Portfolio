<?php
	// Ceci est le fichier générique de la navigation latérale

	// -> requête traduction
	// -> check if $file existe
?>

<aside>
	<!-- Sélection de la langue -->
	<form method="POST" action="?target=<?php echo($file); ?>">
		<ul id="flags">
			<li>
				<!-- Français -->
				<button type="submit" name="language" value="fr">
					<img src="images/flags/fr.svg" width="21" height="16" draggable="false" alt="Drapeau de la langue française" />
					<span>Français</span>
				</button>
			</li>

			<li>
				<!-- Anglais -->
				<button type="submit" name="language" value="en">
					<img src="images/flags/gb.svg" width="21" height="16" draggable="false" alt="Drapeau de la langue anglaise" />
					<span>Anglais</span>
				</button>
			</li>

			<li>
				<!-- Espagnol -->
				<button type="submit" name="language" value="es">
					<img src="images/flags/es.svg" width="21" height="16" draggable="false" alt="Drapeau de la langue espagnol" />
					<span>Anglais</span>
				</button>
			</li>

			<li>
				<!-- Japonais -->
				<button type="submit" name="language" value="jp">
					<img src="images/flags/jp.svg" width="21" height="16" draggable="false" alt="Drapeau de la langue japonaise" />
					<span>Japonais</span>
				</button>
			</li>
		</ul>
	</form>

	<!-- Retour au début de la page -->
	<button id="scrollTop" title="Retour au début de la page"></button>
</aside>