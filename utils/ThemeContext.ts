//
// Permet de créer un contexte d'exportation avec l'état du thème.
// 	Source : https://betterprogramming.pub/a-complete-guide-to-implementing-dark-mode-in-react-47af893b22eb
//
import { createContext } from "react";

export const ThemeContext = createContext( { theme: "light", setTheme: ( _: string ) => { } } );