import { test, expect } from "@playwright/test";

//
// Permet de vérifier que le site est accessible et que les contenus sont bien présents.
//
test( "Vérification de certains contenus", async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Vérification du titre de la page.
	await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );

	// Vérification du titre principal.
	await expect( page.getByRole( "heading", {
		name: "Hi. I am Florian Trayon."
	} ) ).toHaveText( "Hi. I amFlorianTrayon." );

	// Vérification de la présence des liens de navigation.
	await expect( page.locator( "nav > ul a" ) ).toHaveText( [ "Projects", "Skills", "Contact" ] );

	// Vérification de la présence des liens de contact.
	await expect( page.locator( "#contact button, #contact a" ) ).toContainText( [ "Mail", "GitHub", "LinkedIn" ] );
} );

//
// Permet de vérifier que le basculement des thèmes de couleurs fonctionne.
//
test( "Basculement des thèmes de couleurs", async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Vérification de la présence de la classe initiale « theme-light ».
	await expect( page.locator( "html" ) ).toHaveClass( "theme-light" );

	// Clic sur le bouton de basculement de thème.
	await page.getByRole( "button" ).first().click();

	// Vérification de la présence de la classe « theme-dark ».
	await expect( page.locator( "html" ) ).toHaveClass( "theme-dark" );
} );

//
// Permet de vérifier que la navigation par l'en-tête fonctionne.
//
test( "Navigation par l'en-tête", async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Clic sur le lien « Projets ».
	await page.getByRole( "link", { name: "Projects" } ).click();
	await expect( page ).toHaveURL( "#projects" );

	// Clic sur le lien « Compétences ».
	await page.getByRole( "link", { name: "Skills" } ).click();
	await expect( page ).toHaveURL( "#skills" );

	// Clic sur le lien « Contact ».
	await page.getByRole( "link", { name: "Contact" } ).click();
	await expect( page ).toHaveURL( "#contact" );
} );

//
// Permet de vérifier que le retour en haut de page fonctionne.
//
test( "Retour en haut de page", async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Simule un défilement vers le bas de la page.
	await page.evaluate( () =>
	{
		window.scroll( 0, document.body.scrollHeight );
	} );

	// Attente d'une seconde pour laisser le temps au défilement de se faire.
	await page.waitForTimeout( 1000 );

	// Clic sur le bouton de retour en haut de page.
	await page.getByRole( "complementary" ).getByRole( "button" ).click();

	// Attente d'une seconde pour laisser le temps au défilement de se faire.
	await page.waitForTimeout( 1000 );

	// Vérification que le défilement a bien été effectué.
	const isAtTop = await page.evaluate( () => window.scrollY === 0 );
	expect( isAtTop ).toBeTruthy();
} );

//
// Permet de vérifier que le téléchargement du C.V. fonctionne.
//
test( "Disponibilité du C.V", async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Clic sur le bouton de téléchargement du C.V.
	await page.getByRole( "button", { name: "Download the resume" } ).click();

	// Accès à la page de téléchargement du C.V.
	await page.goto( "https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view" );

	// Vérification du titre de la page.
	await expect( page ).toHaveTitle( /CV.pdf/ );
} );