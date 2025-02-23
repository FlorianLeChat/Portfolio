//
// Composant de basculement entre les thèmes clair et sombre.
//  Source : https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx
//

"use client";

import { useMemo,
	useState,
	useEffect,
	useContext,
	useCallback,
	createContext,
	type ReactNode } from "react";

// Déclaration des types.
interface UseThemeProps
{
	theme?: string;
	setTheme: ( value: string ) => void;
}

interface ThemeProviderProps
{
	children?: ReactNode;
}

// Déclaration des constantes globales.
const storageKey = "NEXT_THEME";
const ThemeContext = createContext<UseThemeProps | undefined>( undefined );
const defaultContext: UseThemeProps = { theme: "light", setTheme: () => {} };

// Définition du fonctionnement du composant.
function Theme( { children = null }: Readonly<ThemeProviderProps> )
{
	// Récupération du thème choisi par l'utilisateur.
	const getCurrentTheme = ( key: string ) =>
	{
		if ( typeof window === "undefined" )
		{
			// Valeur par défaut pour le serveur.
			return "light";
		}

		return localStorage.getItem( key ) ?? "light";
	};

	// Récupération du thème du navigateur.
	const getSystemTheme = ( event?: MediaQueryList | MediaQueryListEvent ) =>
	{
		if ( typeof window === "undefined" )
		{
			// Valeur par défaut pour le serveur.
			return "light";
		}

		// Détermination du thème par défaut.
		const media = event
			? null
			: window.matchMedia( "(prefers-color-scheme: dark)" );

		return media?.matches ? "dark" : "light";
	};

	// Déclaration des variables d'état.
	const [ theme, setTheme ] = useState( () => getCurrentTheme( storageKey ) );

	// Application du nouveau thème.
	const applyTheme = useCallback( ( value: string ) =>
	{
		// On vérifie d'abord si la valeur choisie est valide.
		if ( value !== "light" && value !== "dark" )
		{
			return;
		}

		// On définit ensuite cette même valeur avant de
		//  la sauvegarder dans le stockage de session.
		setTheme( value );

		localStorage.setItem( storageKey, value );

		// On applique enfin les classes CSS correspondantes
		//  sur le DOM.
		const element = document.documentElement;
		element.classList.remove( "light", "dark", "cc--darkmode" );
		element.classList.add( value );

		if ( value === "dark" )
		{
			// Support pour le thème sombre pour les fenêtres
			//  de consentement des cookies.
			element.classList.add( "cc--darkmode" );
		}
	}, [] );

	// Application du nouveau thème détecté précédemment.
	const detectMedia = useCallback(
		( event: MediaQueryListEvent | MediaQueryList ) =>
		{
			applyTheme( getSystemTheme( event ) );
		},
		[ applyTheme ]
	);

	// Application du nouveau thème modifié précédemment.
	const detectStorage = useCallback(
		( event: StorageEvent ) =>
		{
			if ( event.key !== storageKey )
			{
				return;
			}

			applyTheme( event.newValue ?? theme );
		},
		[ applyTheme, theme ]
	);

	// Détection et mise à jour du thème préférée par
	//  le navigateur.
	useEffect( () =>
	{
		// On récupère d'abord le thème par défaut.
		const media = window.matchMedia( "(prefers-color-scheme: dark)" );

		// On exécute enfin la fonction à chaque
		//  changement du thème par défaut.
		media.addEventListener( "change", detectMedia );

		return () => media.removeEventListener( "change", detectMedia );
	}, [ detectMedia ] );

	// Détection des modifications du stockage de session
	//  pour le thème choisi par l'utilisateur.
	useEffect( () =>
	{
		window.addEventListener( "storage", detectStorage );

		return () => window.removeEventListener( "storage", detectStorage );
	}, [ detectStorage ] );

	// Affichage du rendu HTML du composant.
	const value = useMemo(
		() => ( { theme, setTheme: applyTheme } ),
		[ theme, applyTheme ]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

// Exportation du context du composant.
export const useTheme = () => useContext( ThemeContext ) ?? defaultContext;

// Exportation du composant.
export default function ThemeProvider( { children = null }: Readonly<ThemeProviderProps> )
{
	return <Theme>{children}</Theme>;
}

// Export du script de basculement entre les thèmes.
export function ThemeSwitcher()
{
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
const theme = localStorage.getItem("${ storageKey }");
const element = document.documentElement;
const classes = element.classList;

classes.remove("light", "dark");

if (theme === "light" || theme === "dark")
{
	// Application du thème choisi par l'utilisateur.
	classes.add(theme)
}
else
{
	// Application du thème préféré par le navigateur.
	const target = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

	classes.add(target);

	localStorage.setItem("${ storageKey }", target);
}`
			}}
		/>
	);
}