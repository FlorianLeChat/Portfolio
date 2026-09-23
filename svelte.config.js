import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        typescript: {
            config: ( config ) =>
            {
                config.include.push( "../*.config.*" );
                return config;
            }
        },
        adapter: adapter()
    }
};

export default config;
