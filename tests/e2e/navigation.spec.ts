import { test, expect } from "@playwright/test";

test.beforeEach( async ( { page } ) =>
{
    await page.goto( "/" );
} );

test( "Page content", async ( { page } ) =>
{
    await expect( page ).toHaveTitle( "Florian Trayon - Portfolio" );
    await expect( page.getByRole( "heading", { name: "Hi, I'm Florian Trayon" } ) ).toBeVisible();
    await expect( page.locator( "nav > ul a" ) ).toHaveText( [ "Projects", "Skills", "Blog", "Contact" ] );

    const sections = await page.locator( "main > section" ).evaluateAll( ( nodes ) => nodes.map( ( node ) => node.id ) );

    expect( sections ).toEqual( [ "about", "projects", "skills", "blog", "contact" ] );

    await expect( page.locator( "#contact a" ) ).toContainText( [
        "contact@florian-dev.fr",
        "Online resume",
        "LinkedIn",
        "GitHub",
        "GitLab"
    ] );

    const resume = page.locator( "#about" ).getByRole( "link", { name: "Online resume" } );

    await expect( resume ).toHaveAttribute( "href", "https://pages.florian-dev.fr/floriantrayon/Online-Resume/" );
    await expect( resume ).toHaveAttribute( "target", "_blank" );
} );

test( "Colour theme switch", async ( { page } ) =>
{
    await expect( page.locator( "html" ) ).toHaveClass( /light/ );

    await page.getByRole( "button", { name: "Switch to the dark theme" } ).click();

    await expect( page.locator( "html" ) ).toHaveClass( /dark/ );
    await expect( page.getByRole( "button", { name: "Switch to the light theme" } ) ).toBeVisible();
} );

test( "Language switch", async ( { page } ) =>
{
    await page.getByRole( "button", { name: "Version française" } ).click();

    await expect( page ).toHaveURL( "/" );
    await expect( page.locator( "html" ) ).toHaveAttribute( "lang", "fr" );
    await expect( page.getByRole( "heading", { name: "Bonjour, je suis Florian Trayon" } ) ).toBeVisible();

    await page.reload();

    await expect( page.getByRole( "heading", { name: "Bonjour, je suis Florian Trayon" } ) ).toBeVisible();
} );

test( "Header navigation and scroll to top", async ( { page, isMobile } ) =>
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

    // The button hides while the footer is in view, which it is at `#contact`:
    // clicking from there only works while the smooth scroll is still running.
    await open( "Skills" );
    await expect( page ).toHaveURL( "#skills" );

    await page.getByRole( "button", { name: "Scroll to top" } ).click();

    await expect.poll( () => page.evaluate( () => window.scrollY ) ).toBe( 0 );
} );

test( "Screenshot lightbox opens from the keyboard", async ( { page } ) =>
{
    const button = page.getByRole( "button", { name: "Enlarge the screenshot of Raven Url Shortener" } );
    const lightbox = page.locator( ".pswp--ui-visible" );

    // PhotoSwipe is imported after the page mounts, so an `Enter` pressed before
    // it arrives reaches a button nothing listens to yet. Pressing again until
    // the lightbox shows waits for exactly that, without a fixed delay.
    await expect( async () =>
    {
        await button.press( "Enter" );
        await expect( lightbox ).toBeVisible( { timeout: 1000 } );
    } ).toPass();

    // Keys are ignored while the opening zoom plays, for the same reason.
    await expect( async () =>
    {
        await page.keyboard.press( "Escape" );
        await expect( page.locator( ".pswp" ) ).toHaveCount( 0, { timeout: 1000 } );
    } ).toPass();
} );

test( "Skill filtering", async ( { page } ) =>
{
    const selector = "#skills > div > ul > li";
    const count = await page.locator( selector ).count();

    for ( const [ label, value ] of [
        [ "Front-end", "front" ],
        [ "Back-end", "back" ],
        [ "Other", "other" ]
    ] )
    {
        await page.locator( "#skills label" ).getByText( label, { exact: true } ).click();
        await expect( page.locator( `#filter-${ value }` ) ).toBeChecked();

        expect( await page.locator( selector ).count() ).toBeLessThan( count );
    }

    await page.locator( "#skills label" ).getByText( "All", { exact: true } ).click();
    await expect( page.locator( "#filter-all" ) ).toBeChecked();

    expect( await page.locator( selector ).count() ).toBe( count );
} );

test( "Fold out the other projects", async ( { page } ) =>
{
    const cards = page.locator( "#projects > h3 + ul > li" );

    await expect( cards ).toHaveCount( 3 );

    await page.getByRole( "button", { name: /^See \d+ more projects$/ } ).click();

    expect( await cards.count() ).toBeGreaterThan( 3 );
    await expect( page.getByRole( "button", { name: /more projects$/ } ) ).toHaveCount( 0 );
} );
