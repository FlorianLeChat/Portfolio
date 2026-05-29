# 📚 Portfolio

![HTML](.gitlab/badges/html.svg)
![CSS](.gitlab/badges/css.svg)
![Sass](.gitlab/badges/sass.svg)
![TypeScript](.gitlab/badges/typescript.svg)

![Svelte](.gitlab/badges/svelte.svg)
![SvelteKit](.gitlab/badges/sveltekit.svg)
![Font Awesome](.gitlab/badges/fontawesome.svg)
![Playwright](.gitlab/badges/playwright.svg)
![Inlang](.gitlab/badges/inlang.svg)
![Vite](.gitlab/badges/vite.svg)
![Prettier](.gitlab/badges/prettier.svg)
![ESLint](.gitlab/badges/eslint.svg)

## In French

> [!IMPORTANT]
> Depuis mars 2026, le code du projet est désormais hébergé sur mon instance GitLab personnalisée, accessible à [cette adresse](https://git.florian-dev.fr/floriantrayon/Portfolio). Le dépôt GitHub est un miroir du dépôt GitLab, **mis à jour automatiquement**.
>
> **Les contributions publiques restent sur GitHub et sont les bienvenues** ; les pull requests validées y seront ensuite transférées manuellement sur GitLab pour être intégrées. 🙂

Ceci est mon portfolio tout simplement ! Au départ, il s'agissait de mon tout premier site Internet réalisé durant mes études et utilisant HTML, CSS, JavaScript ainsi que PHP sans aucun framework particulier. À plusieurs reprises, j'ai décidé de le refaire complètement en adoptant un nouveau design inspiré par [ce portfolio](https://github.com/rajshekhar26/cleanfolio), d'abord avec Next.js puis plus récemment avec SvelteKit 💝 et des technologies beaucoup plus modernes. 💪

La version actuelle n'utilise plus du tout de serveur Node.js pour fonctionner, mais est conçue pour générer des fichiers statiques pouvant être servis depuis n'importe quel serveur Web, ce qui contribue à réduire son empreinte carbone. De plus, la limitation du nombre de dépendances réellement utilisées, l'utilisation de techniques d'optimisation des images ainsi que la réduction du nombre de requêtes HTTP permettent de limiter l'impact environnemental du site internet. 🌱

Les anciennes versions de mon portfolio sont également disponibles sur les autres branches GitHub : `no-next-js` (dernière version utilisant PHP), `no-gmail` (version PHP ayant encore un formulaire de contact sans Gmail), `no-sass` (version PHP sans l'utilisation du préprocesseur SASS), `no-php` (version utilisant seulement HTML, CSS et JavaScript) et `no-svele-kit` (version utilisant Next.js). 🧹

### Installation

> [!WARNING]
> Le déploiement en environnement de production nécessite un serveur Web déjà configuré comme [Nginx](https://nginx.org/en/), [Apache](https://httpd.apache.org/) ou [Caddy](https://caddyserver.com/) pour servir les fichiers statiques générés par Vite. ⚠️

#### Développement local

- Installer [Node.js LTS](https://nodejs.org/) (>22 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Démarrer le serveur local Vite avec la commande `npm run dev`.

#### Déploiement en production

- Installer [Node.js LTS](https://nodejs.org/) (>22 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Compiler les fichiers statiques du site Internet avec la commande `npm run build` ;
- Utiliser un serveur Web pour servir les fichiers statiques générés à l'étape précédente.

![image](.gitlab/images/portfolio_french.png)

## In English

> [!IMPORTANT]
> Since March 2026, the project's code has been hosted on my custom GitLab instance, accessible at [this address](https://git.florian-dev.fr/floriantrayon/Portfolio). The GitHub repository is a mirror of the GitLab repository, **automatically kept up to date**.
>
> **Public contributions remain on GitHub and are welcome**; validated pull requests will then be manually transferred to GitLab to be integrated. 🙂

This is my portfolio! At the beginning, it was my very first website made during my studies and using HTML, CSS, JavaScript and PHP without any framework. Several months later, I decided to redo it completely by adopting a new design inspired by [this portfolio](https://github.com/rajshekhar26/cleanfolio) with SvelteKit 💝 and much more modern technologies. 💪

The current version no longer relies on a Node.js server. Instead, it generates static files that can be hosted on any web server, significantly reducing its carbon footprint. In addition, minimizing the number of dependencies, optimizing images, and reducing HTTP requests all contribute to lowering the website's overall environmental impact. 🌱

Older versions of my portfolio are also available on the other GitHub branches: `no-next-js` (latest version using PHP), `no-gmail` (PHP version still having a contact form without Gmail), `no-sass` (PHP version without using the SASS preprocessor), `no-php` (version using only HTML, CSS and JavaScript) and `no-svele-kit` (version using Next.js). 🧹

#### Local development

- Install [Node.js LTS](https://nodejs.org/) (>22 or higher) ;
- Install project dependencies using `npm install` ;
- Start Vite local server using `npm run dev`.

#### Production deployment

- Install [Node.js LTS](https://nodejs.org/) (>22 or higher) ;
- Install project dependencies using `npm install` ;
- Build static website files using `npm run build` ;
- Remove development dependencies using `npm prune --omit=dev` ;
- Use a web server to serve the static files generated in the previous step.

![image](.gitlab/images/portfolio_english.png)
