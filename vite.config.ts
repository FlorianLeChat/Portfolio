import { defineConfig } from "vite";
import { resolve } from "node:path";
import Icons from "unplugin-icons/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-static";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig( {
    plugins: [
        Icons( { compiler: "svelte" } ),
        sveltekit( {
            adapter: adapter(),
            preprocess: vitePreprocess()
        } ),
        paraglideVitePlugin( {
            outdir: "./src/lib/locales",
            project: "./locales/.inlang",
            strategy: [ "preferredLanguage", "baseLocale" ]
        } )
    ],
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: [ resolve( "./node_modules" ), resolve( "./src/lib/styles" ) ]
            }
        }
    }
} );
