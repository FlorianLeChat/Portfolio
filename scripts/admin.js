//
// Permet d'afficher en clair le mot de passe entré
//	dans le champ de saisie.
//
const clear = document.getElementById( "clear" );
const password = document.getElementById( "password" );

clear?.addEventListener( "click", () =>
{
	if ( password.type === "password" )
	{
		password.type = "text";
	}
	else
	{
		password.type = "password";
	}
} );

//
// Permet de pouvoir envoyer les données du formulaire de
//	connexion en appuyant sur la touche "ENTRÉE".
//
password?.addEventListener( "keyup", ( event ) =>
{
	// Source : https://keycode.info/
	if ( event.key === "Enter" )
	{
		document.querySelector( "input[type=submit]" ).click();
	}
} );

//
// Permet de demander la création d'un nouveau mot de passe
//	administrateur si l'ancien a été perdu.
//
const new_password = document.querySelector( "form a" );

new_password?.addEventListener( "click", async ( event ) =>
{
	// On demande l'adresse électronique et le nouveau mot de passe
	//	créé par l'utilisateur.
	const data = new FormData();
	data.append( "email", prompt( "Saisissez votre adresse électronique." ) );
	data.append( "password", prompt( "Saisissez un nouveau mot de passe." ) );

	// On effectue ensuite une requête asynchrone à la page
	//	actuelle pour pouvoir faire des vérifications.
	await fetch( window.location.href, {
		method: "POST",
		body: data
	} )

	// On avertit alors l'utilisateur dès que la requête a été soumise.
	alert( "Si vos informations sont correctes, le nouveau mot de passe devrait être actif." );

	// On cesse enfin le comportement par défaut du lien.
	event.preventDefault();
} );

//
// Permet d'actualiser en temps réel l'horloge présente
//	dans l'en-tête de l'interface d'administration.
//
const time = document.querySelector( "header p:first-of-type" );

if ( time !== null )
{
	function updateTime()
	{
		time.innerHTML = new Date().toLocaleTimeString();
	}

	// Exécution de la fonction toutes les secondes.
	setInterval( updateTime, 1000 );

	// Exécution initiale lors du chargement de la page.
	updateTime();
}

//
// Permet de supprimer le texte initial « Aucune table sélectionnée »
//	dès lors que l'utilisateur a bien sélectionné une table.
//
const text = document.querySelector( "#data > p" );
const table = document.querySelector( "#data table" );

if ( table?.children.length > 0 )
{
	text?.remove();
}

//
// Permet de contrôler les actions de la section de téléversement
//	de certains fichiers vers le serveur.
//
const upload_zone = document.querySelector( "#upload > form div:first-of-type" );
const preview_zone = document.querySelector( "#upload > form div:last-of-type" );
const upload_button = document.querySelector( "#upload div > input[type=file]" );

// On ajoute un déclencheur sur la zone de sélection lorsque
//	l'utilisateur ajoute une image.
upload_button?.addEventListener( "change", () =>
{
	// On vérifie si l'image a bien été reçu par le HTML.
	if ( upload_button.files && upload_button.files[ 0 ] )
	{
		// On invoque une instance pour charger le fichier.
		const reader = new FileReader();
		reader.readAsDataURL( upload_button.files[ 0 ] );				// Demande de chargement.
		reader.onload = ( event ) =>
		{
			// Dès son chargement terminé, on affiche une section
			//	de visualisation tout en cachant l'ancienne.
			upload_zone.style.display = "none";							// Zone de téléversement.
			preview_zone.style.display = "block";						// Zone de visualisation.
			preview_zone.firstElementChild.src = event.target.result;	// Chemin d'accès vers l'image.
		};
	}
} );

// On ajoute un déclencheur lorsque l'utilisateur clique
//	sur le bouton afin de supprimer l'aperçu de l'image.
preview_zone?.lastElementChild.addEventListener( "click", () =>
{
	upload_button.value = "";
	upload_zone.style.display = "block";
	preview_zone.style.display = "none";
	preview_zone.firstElementChild.src = "#";
} );