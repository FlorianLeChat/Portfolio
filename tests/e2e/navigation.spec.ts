import { test, expect } from "@playwright/test";

test.beforeEach( async ( { page } ) =>
{
    await page.goto( "/" );
    await page.locator( ".loading" ).waitFor( { state: "hidden" } );
} );

test( "Vérification de certains contenus", async ( { page } ) =>
{
    await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );
    await expect( page.getByRole( "heading", { name: "Hi. I am Florian Trayon." } ) ).toBeVisible();
    await expect( page.locator( "nav > ul a" ) ).toHaveText( [ "Projects", "Skills", "Contact", "Blog" ] );
    await expect( page.locator( "#contact button, #contact a" ) ).toContainText( [ "Mail", "GitHub", "LinkedIn" ] );
} );

test( "Basculement des thèmes de couleurs", async ( { page } ) =>
{
    await expect( page.locator( "html" ) ).toHaveClass( /light/ );
    await page.getByRole( "button" ).first().click();
    await expect( page.locator( "html" ) ).toHaveClass( /dark/ );
} );

test( "Navigation par l'en-tête", async ( { page, isMobile } ) =>
{
    if ( isMobile )
    {
        await page.getByRole( "button" ).nth( 1 ).click();
    }

    await page.getByRole( "link", { name: "Projects" } ).click();
    await expect( page ).toHaveURL( "#projects" );

    await page.getByRole( "link", { name: "Skills" } ).click();
    await expect( page ).toHaveURL( "#skills" );

    await page.getByRole( "link", { name: "Contact" } ).click();
    await expect( page ).toHaveURL( "#contact" );

    const blogPromise = page.waitForEvent( "popup" );
    await page.getByRole( "link", { name: "Blog" } ).click();

    const blogPage = await blogPromise;
    await blogPage.waitForLoadState();

    await expect( blogPage ).toHaveTitle( "Le blog de Florian" );
} );

test( "Retour en haut de page", async ( { page, isMobile } ) =>
{
    test.skip( isMobile );

    await page.getByRole( "link", { name: "Contact" } ).click();
    await page.waitForTimeout( 1000 );
    await page.getByRole( "complementary" ).getByRole( "button" ).click();
    await page.waitForTimeout( 1000 );

    const isAtTop = await page.evaluate( () => window.scrollY === 0 );
    expect( isAtTop ).toBeTruthy();
} );

test( "Disponibilité du C.V", async ( { page } ) =>
{
    const resumePromise = page.waitForEvent( "popup" );
    await page.getByRole( "button", { name: "Go to the online resume" } ).click();

    const resumePage = await resumePromise;
    await resumePage.waitForLoadState();

    await expect( resumePage ).toHaveTitle( "Florian Trayon - Curriculum Vitae" );
} );

test( "Filtrage des compétences", async ( { page } ) =>
{
    const selector = "#skills ul:last-of-type li";
    const count = await page.locator( selector ).count();

    await page.getByLabel( "Front-end" ).click();
    await expect( page ).toHaveURL( "?filter=front" );

    expect( await page.locator( selector ).count() ).toBeLessThan( count );

    await page.getByLabel( "Back-end" ).click();
    await expect( page ).toHaveURL( "?filter=back" );

    expect( await page.locator( selector ).count() ).toBeLessThan( count );

    await page.getByLabel( "Other" ).click();
    await expect( page ).toHaveURL( "?filter=other" );

    expect( await page.locator( selector ).count() ).toBeLessThan( count );

    await page.getByLabel( "All" ).click();
    await expect( page ).toHaveURL( "?filter=all" );

    expect( await page.locator( selector ).count() ).toBe( count );
} );
