//
// Permet de gérer le basculement entre les thèmes clair et sombre.
//  Source : https://betterprogramming.pub/a-complete-guide-to-implementing-dark-mode-in-react-47af893b22eb
//

"use client";

import { useMemo, useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

// Création et exportation du contexte.
export const ThemeContext = createContext<{ theme: string; setTheme: Dispatch<SetStateAction<string>>; }>( {
	theme: "",
	setTheme: () =>
	{
		// Cette fonction est définie par une variable d'état
		//  dans le mécanisme de changement de thème.
	}
} );

// Exportation du fournisseur de contexte.
export function ThemeProvider( { children }: { children: ReactNode; } )
{
	const [ theme, setTheme ] = useState( "" );
	const switcher = useMemo( () => ( { theme, setTheme } ), [ theme ] );

	return <ThemeContext.Provider value={switcher}>{children}</ThemeContext.Provider>;
}