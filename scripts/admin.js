//
// Permet d'afficher en clair le mot de passe entré
//	dans le champ de saisie.
//
const clear = document.getElementById( "clear" );
const password = document.getElementById( "password" );

if ( clear != null && password != null )
{
	clear.addEventListener( "click", ( _event ) =>
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
}

//
// Permet de pouvoir envoyer les données du formulaire de
//	connexion en appuyant sur la touche "ENTRÉE".
//
const submit = document.querySelector( "input[type=submit]" );

if ( submit != null && password != null )
{
	password.addEventListener( "keyup", ( event ) =>
	{
		// Source : https://keycode.info/
		if ( event.key === "Enter" )
		{
			submit.click();
		}
	} );
}

//
// Permet d'actualiser en temps réel l'horloge présente
//	dans l'en-tête de l'interface d'administration.
//
const time = document.querySelector( "header p:first-of-type" );

if ( time != null )
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
//
//
const upload = document.querySelector("#upload div > input[type=file]");

if ( upload != null )
{
	upload.addEventListener( "change", ( _event ) =>
	{
		//
		if (upload.files && upload.files[0])
		{
			//
			const reader = new FileReader();

			reader.onload = function(event)
			{
				//
				document.querySelector("#upload > form div:first-of-type").style.display = "none";
				document.querySelector('#upload > form div:last-of-type').style.display = "block";

				//
				document.querySelector('#upload > form div:last-of-type').firstElementChild.src = event.target.result;

				//
				document.querySelector('.image-title').innerHTML = upload.files[0].name;
			};

			//
			reader.readAsDataURL(upload.files[0]);
		}
		else
		{
			//
			$('.file-upload-input').replaceWith($('.file-upload-input').clone());
			$('.file-upload-content').hide();
			$('.image-upload-wrap').show();
		}
	})
}

// 	$('.image-upload-wrap').bind('dragover', function ()
// 	{
// 		$('.image-upload-wrap').addClass('image-dropping');
// 	});

// 	$('.image-upload-wrap').bind('dragleave', function ()
// 	{
// 		$('.image-upload-wrap').removeClass('image-dropping');
// 	};