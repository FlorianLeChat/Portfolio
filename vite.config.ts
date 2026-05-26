import { resolve } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig( {
    plugins: [
        sveltekit(),
        paraglideVitePlugin( {
            project: "./project.inlang",
            outdir: "./src/lib/paraglide",
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
