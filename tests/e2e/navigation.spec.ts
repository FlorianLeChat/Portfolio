import { test, expect } from "@playwright/test";

//
// Permet d'accéder à la page d'accueil avant chaque test.
//
test.beforeEach( async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );
} );

//
// Permet de vérifier que le site est accessible et que les contenus sont bien présents.
//
test( "Vérification de certains contenus", async ( { page } ) =>
{
	// Vérification du titre de la page.
	await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );

	// Vérification du titre principal.
	await expect( page.getByRole( "heading", { name: "Hi. I am Florian Trayon." } ) ).toBeVisible();

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
	// Vérification de la présence de la classe initiale « theme-light ».
	await expect( page.locator( "html" ) ).toHaveClass( /theme-light/ );

	// Clic sur le bouton de basculement de thème.
	await page.getByRole( "button" ).first().click();

	// Vérification de la présence de la classe « theme-dark ».
	await expect( page.locator( "html" ) ).toHaveClass( /theme-dark/ );
} );

//
// Permet de vérifier que le consentement des cookies fonctionne.
//
test( "Affichage du consentement des cookies", async ( { page } ) =>
{
	// Clic sur le bouton du consentement des cookies.
	await page.getByRole( "button" ).nth( 1 ).click();

	// Sauvegarde des préférences actuelles.
	await page.getByRole( "button", { name: "Save preferences" } ).click();

	// Vérification de la page actuelle.
	await expect( page ).toHaveURL( "/" );
} );

//
// Permet de vérifier que la navigation par l'en-tête fonctionne.
//
test( "Navigation par l'en-tête", async ( { page, isMobile } ) =>
{
	if ( isMobile )
	{
		// Clic sur le bouton d'ouverture du menu.
		await page.getByRole( "button" ).nth( 2 ).click();
	}

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
test( "Retour en haut de page", async ( { page, isMobile } ) =>
{
	// Ignorer le test sur les mobiles.
	test.skip( isMobile );

	// Simule un défilement vers la section « Contact ».
	await page.getByRole( "link", { name: "Contact" } ).click();

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
test( "Disponibilité du C.V", async ( { page, context } ) =>
{
	// Préparation à l'ouverte d'une nouvelle page.
	const drivePromise = context.waitForEvent( "page" );

	// Clic sur le bouton de téléchargement du C.V.
	await page.getByRole( "button", { name: "Download the resume" } ).click();

	// Attente de l'ouverture de la nouvelle page.
	const drivePage = await drivePromise;
	await drivePage.waitForLoadState();

	// Vérification du titre de la nouvelle page.
	await expect( drivePage ).toHaveTitle( /CV.pdf/ );
} );

//
// Permet de vérifier que le filtrage des compétences fonctionne.
//
test( "Filtrage des compétences", async ( { page } ) =>
{
	// Récupération du nombre de compétences avant le filtrage.
	const selector = "#skills article:last-of-type div";
	const count = await page.locator( selector ).count();

	// Filtrage par compétence « Front-end ».
	await page.getByLabel( "Front-end" ).check();

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « Back-end ».
	await page.getByLabel( "Back-end" ).check();

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « Other ».
	await page.getByLabel( "Other" ).check();

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « All ».
	await page.getByLabel( "All" ).check();

	expect( await page.locator( selector ).count() ).toBe( count );
} );