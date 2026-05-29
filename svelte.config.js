import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
