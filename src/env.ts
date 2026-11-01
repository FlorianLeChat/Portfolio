import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars( {
    PUBLIC_VERSION: {
        public: true,
        static: true,
        description: "Version displayed in the footer (set by the CI)",
        schema: ( value ) => value || "0.0.1"
    },
    PUBLIC_ANALYTICS_ENABLED: {
        public: true,
        static: true,
        description: "Whether the Umami analytics scripts are loaded",
        schema: ( value ) => value === "true"
    },
    PUBLIC_ANALYTICS_ENDPOINT: {
        public: true,
        static: true,
        description: "Base URL of the Umami instance serving the analytics scripts",
        schema: ( value ) => value
    },
    PUBLIC_ANALYTICS_PROJECT_ID: {
        public: true,
        static: true,
        description: "Umami website identifier",
        schema: ( value ) => value
    },
    PUBLIC_ANALYTICS_RESPECT_DNT: {
        public: true,
        static: true,
        description: "Whether Umami honours the visitor's Do Not Track preference",
        schema: ( value ) => value
    },
    PUBLIC_BLOG_FEED_URL: {
        public: true,
        static: true,
        description: "RSS feed read in the browser to render the blog cards",
        schema: ( value ) => value ?? "https://blog.florian-dev.fr/feed.xml"
    },
    PUBLIC_GITLAB_API_URL: {
        public: true,
        static: true,
        description: "GitLab instance queried for the latest public commit",
        schema: ( value ) => value ?? "https://git.florian-dev.fr"
    },
    PUBLIC_GITLAB_USERNAME: {
        public: true,
        static: true,
        description: "GitLab user whose latest public commit is shown",
        schema: ( value ) => value ?? "floriantrayon"
    },
    PUBLIC_GITHUB_USERNAME: {
        public: true,
        static: true,
        description: "GitHub user whose latest public commit is shown",
        schema: ( value ) => value ?? "FlorianLeChat"
    }
} );
