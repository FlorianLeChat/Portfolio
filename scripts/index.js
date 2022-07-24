//
// Permet de mettre à jour dynamiquement l'âge indiqué dans la
// 	section "à propos de moi" (si ça ce n'est pas du dynamisme !).
//
const now = new Date().getTime();								// Horodatage de l'heure actuelle
const born = Date.parse( "08 Aug 1999 00:00:00 GMT" );			// Horodatage de ma date de naissance
const relative = new Date( now - born ).getFullYear() - 1970;	// Nombre d'années séparant les deux dates

const aboutme = document.querySelector( "#aboutme > p" );
aboutme.innerHTML = aboutme.innerHTML.replace( /[0-9]+/g, relative );