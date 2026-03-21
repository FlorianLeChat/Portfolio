"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function BirthdayEffect()
{
    const randomInRange = ( min: number, max: number ) => Math.random() * ( max - min ) + min;

    useEffect( () =>
    {
        const currentDate = new Date();
        const isBirthday = currentDate.getMonth() === 7 && currentDate.getDate() === 8;

        if ( !isBirthday )
        {
            return () => {};
        }

        // https://www.kirilv.com/canvas-confetti/#fireworks
        const duration = 3 * 1000;
        const animationEnd = currentDate.getTime() + duration;

        const interval = setInterval( () =>
        {
            const timeLeft = animationEnd - Date.now();

            if ( timeLeft <= 0 )
            {
                return clearInterval( interval );
            }

            return confetti( {
                ticks: 60,
                origin: { x: randomInRange( 0.1, 0.9 ), y: Math.random() - 0.2 },
                zIndex: 0,
                spread: 360,
                startVelocity: 30,
                particleCount: 100
            } );
        }, 250 );

        return () => clearInterval( interval );
    }, [] );

    return null;
}
