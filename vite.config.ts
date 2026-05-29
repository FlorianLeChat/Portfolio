import { resolve } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig( {
    plugins: [
        sveltekit(),
        paraglideVitePlugin( {
            outdir: "./src/lib/locales",
            project: "./locales/.inlang",
            strategy: [ "preferredLanguage", "baseLocale" ]
        } )
    ],
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: [ resolve( "./node_modules" ) ]
            }
        }
    }
} );
