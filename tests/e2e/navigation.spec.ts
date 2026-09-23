import { test, expect } from "@playwright/test";

test.beforeEach( async ( { page } ) =>
{
    await page.goto( "/" );
} );

test( "Vérification de certains contenus", async ( { page } ) =>
{
    await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );
    await expect( page.getByRole( "heading", { name: "Hi. I am Florian Trayon." } ) ).toBeVisible();
    await expect( page.locator( "nav > ul a" ) ).toHaveText( [ "Projects", "Skills", "Blog", "Contact" ] );
    await expect( page.locator( "#contact button, #contact a" ) ).toContainText( [
        "Mail",
        "GitLab",
        "GitHub",
        "LinkedIn"
    ] );
} );

test( "Basculement des thèmes de couleurs", async ( { page } ) =>
{
    await expect( page.locator( "html" ) ).toHaveClass( /light/ );

    await page.getByRole( "button", { name: "Switch to the dark theme" } ).click();

    await expect( page.locator( "html" ) ).toHaveClass( /dark/ );
    await expect( page.getByRole( "button", { name: "Switch to the light theme" } ) ).toBeVisible();
} );

test( "Navigation par l'en-tête", async ( { page, isMobile } ) =>
{
    const open = async ( name: string ) =>
    {
        if ( isMobile )
        {
            await page.getByRole( "button", { name: "Navigation menu" } ).click();
        }

        const link = page.getByRole( "navigation" ).getByRole( "link", { name, exact: true } );

        await expect( link ).toBeInViewport();
        await link.click();
    };

    await open( "Projects" );
    await expect( page ).toHaveURL( "#projects" );

    await open( "Skills" );
    await expect( page ).toHaveURL( "#skills" );

    await open( "Blog" );
    await expect( page ).toHaveURL( "#blog" );

    await open( "Contact" );
    await expect( page ).toHaveURL( "#contact" );
} );

test( "Retour en haut de page", async ( { page, isMobile } ) =>
{
    test.skip( isMobile, "Le bouton est masqué sous 1024px." );

    await page.getByRole( "navigation" ).getByRole( "link", { name: "Contact" } ).click();

    await page.getByRole( "button", { name: "Scroll to top" } ).click();

    await expect.poll( () => page.evaluate( () => window.scrollY ) ).toBe( 0 );
} );

test( "Disponibilité du C.V", async ( { page } ) =>
{
    const link = page.locator( "#about" ).getByRole( "link", { name: "Go to the online resume" } );

    await expect( link ).toHaveAttribute( "href", "https://pages.florian-dev.fr/floriantrayon/Online-Resume/" );
    await expect( link ).toHaveAttribute( "target", "_blank" );
} );

test( "Filtrage des compétences", async ( { page } ) =>
{
    const selector = "#skills > div > ul > li";
    const count = await page.locator( selector ).count();

    for ( const [ label, value ] of [
        [ "Front-end", "front" ],
        [ "Back-end", "back" ],
        [ "Other", "other" ]
    ] )
    {
        await page.getByLabel( label ).click();
        await expect( page ).toHaveURL( `?filter=${ value }` );

        expect( await page.locator( selector ).count() ).toBeLessThan( count );
    }

    await page.getByLabel( "All" ).click();
    await expect( page ).toHaveURL( "?filter=all" );

    expect( await page.locator( selector ).count() ).toBe( count );
} );
