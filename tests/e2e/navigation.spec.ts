import { test, expect } from "@playwright/test";

//
// Accès à la page d'accueil avant chaque test.
//
test.beforeEach( async ( { page } ) =>
{
	// Accès à la page d'accueil.
	await page.goto( "/" );

	// Attente de la fin du chargement de la page.
	await page.locator( ".loading" ).waitFor( { state: "hidden" } );
} );

//
// Vérification de l'accessibilité du site et des contenus associés.
//
test( "Vérification de certains contenus", async ( { page } ) =>
{
	// Vérification du titre de la page.
	await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );

	// Vérification du titre principal.
	await expect(
		page.getByRole( "heading", { name: "Hi. I am Florian Trayon." } )
	).toBeVisible();

	// Vérification de la présence des liens de navigation.
	await expect( page.locator( "nav > ul a" ) ).toHaveText( [
		"Projects",
		"Skills",
		"Contact"
	] );

	// Vérification de la présence des liens de contact.
	await expect( page.locator( "#contact button, #contact a" ) ).toContainText( [
		"Mail",
		"GitHub",
		"LinkedIn"
	] );
} );

//
// Vérification du basculement des thèmes de couleurs.
//
test( "Basculement des thèmes de couleurs", async ( { page } ) =>
{
	// Vérification de la présence de la classe initiale « light ».
	await expect( page.locator( "html" ) ).toHaveClass( /light/ );

	// Clic sur le bouton de basculement de thème.
	await page.getByRole( "button" ).first().click();

	// Vérification de la présence de la classe « dark ».
	await expect( page.locator( "html" ) ).toHaveClass( /dark/ );
} );

//
// Vérification de la navigation par l'en-tête.
//
test( "Navigation par l'en-tête", async ( { page, context, isMobile } ) =>
{
	if ( isMobile )
	{
		// Clic sur le bouton d'ouverture du menu.
		await page.getByRole( "button" ).nth( 1 ).click();
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

	// Clic sur le lien « Blog ».
	const blogPromise = context.waitForEvent( "page" );

	await page.getByRole( "link", { name: "Blog" } ).click();

	const blogPage = await blogPromise;
	await blogPage.waitForLoadState();

	await expect( blogPage ).toHaveTitle( "Le blog de Florian" );
} );

//
// Vérification du retour en haut de page via le bouton dédié.
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
// Vérification de l'accès de téléchargement vers le C.V.
//
test( "Disponibilité du C.V", async ( { page, context } ) =>
{
	// Préparation à l'ouverte d'une nouvelle page.
	const resumePromise = context.waitForEvent( "page" );

	// Clic sur le bouton de téléchargement du C.V.
	await page.getByRole( "button", { name: "Go to the online resume" } ).click();

	// Attente de l'ouverture de la nouvelle page.
	const resumePage = await resumePromise;
	await resumePage.waitForLoadState();

	// Vérification du titre de la nouvelle page.
	await expect( resumePage ).toHaveTitle( "Florian Trayon - Curriculum Vitae" );
} );

//
// Vérification du filtrage des compétences.
//
test( "Filtrage des compétences", async ( { page } ) =>
{
	// Récupération du nombre de compétences avant le filtrage.
	const selector = "#skills ul:last-of-type li";
	const count = await page.locator( selector ).count();

	// Filtrage par compétence « Front-end ».
	await page.getByLabel( "Front-end" ).click();
	await expect( page ).toHaveURL( "?filter=front" );

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « Back-end ».
	await page.getByLabel( "Back-end" ).click();
	await expect( page ).toHaveURL( "?filter=back" );

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « Other »
	await page.getByLabel( "Other" ).click();
	await expect( page ).toHaveURL( "?filter=other" );

	expect( await page.locator( selector ).count() ).toBeLessThan( count );

	// Filtrage par compétence « All ».
	await page.getByLabel( "All" ).click();
	await expect( page ).toHaveURL( "?filter=all" );

	expect( await page.locator( selector ).count() ).toBe( count );
} );