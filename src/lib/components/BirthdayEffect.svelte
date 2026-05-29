<script lang="ts">
    import { onMount } from "svelte";

    onMount( () =>
    {
        const currentDate = new Date();
        const isBirthday = currentDate.getMonth() === 7 && currentDate.getDate() === 8;

        if ( !isBirthday ) return;

        // https://www.kirilv.com/canvas-confetti/#fireworks
        const duration = 3 * 1000;
        const animationEnd = currentDate.getTime() + duration;

        const randomInRange = ( min: number, max: number ) => Math.random() * ( max - min ) + min;

        import( "canvas-confetti" ).then( ( { default: confetti } ) =>
        {
            const interval = setInterval( () =>
            {
                const timeLeft = animationEnd - Date.now();

                if ( timeLeft <= 0 )
                {
                    clearInterval( interval );
                    return;
                }

                confetti( {
                    ticks: 60,
                    origin: { x: randomInRange( 0.1, 0.9 ), y: Math.random() - 0.2 },
                    zIndex: 0,
                    spread: 360,
                    startVelocity: 30,
                    particleCount: 100
                } );
            }, 250 );

            return () => clearInterval( interval );
        } );
    } );
</script>
