# In French

## Installation

### Développement local

- Installer [NodeJS LTS](https://nodejs.org/) (>20 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Démarrer le serveur local NextJS avec la commande `npm run dev`.

### Déploiement en production

- Installer [NodeJS LTS](https://nodejs.org/) (>20 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Compiler les fichiers statiques du site Internet avec la commande `npm run build` ;
- Supprimer les dépendances de développement avec la commande `npm prune --omit=dev` ;
- Démarrer le serveur local NodeJS avec la commande `npm run start` ;
- *(Facultatif)* Utiliser [Varnish](https://varnish-cache.org/) comme serveur de cache HTTP pour atténuer les effets des fortes charges ([configuration intégrée](docker/configuration/default.vcl)).

> [!TIP]
> Pour tester le projet, vous *pouvez* également utiliser [Docker](https://www.docker.com/). Une fois installé, il suffit de lancer l'image Docker de production à l'aide de la commande `docker compose up --detach --build`. Le site devrait être accessible à l'adresse suivante : http://localhost:3000/. 🐳

> [!CAUTION]
> L'image Docker *peut* également être déployée en production, mais cela **nécessite des connaissances approfondies pour déployer, optimiser et sécuriser correctement votre installation**, afin d'éviter toute conséquence indésirable. ⚠️

# In English

## Setup

### Local development

- Install [NodeJS LTS](https://nodejs.org/) (>20 or higher) ;
- Install project dependencies using `npm install` ;
- Start NextJS local server using `npm run dev`.

### Production deployment

- Install [NodeJS LTS](https://nodejs.org/) (>20 or higher) ;
- Install project dependencies using `npm install` ;
- Build static website files using `npm run build` ;
- Remove development dependencies using `npm prune --omit=dev` ;
- Start NodeJS local server using `npm run start` ;
- *(Optional)* Use [Varnish](https://varnish-cache.org/) as an HTTP cache server to mitigate effects of heavy loads ([built-in configuration](docker/configuration/default.vcl)).

> [!TIP]
> To try the project, you *can* also use [Docker](https://www.docker.com/) installed. Once installed, simply start the production Docker image with `docker compose up --detach --build` command. The website should be available at http://localhost:3000/. 🐳

> [!CAUTION]
> The Docker image *can* also be deployed in production, but **this requires advanced knowledge to properly deploy, optimize, and secure your installation**, in order to avoid any unwanted consequences. ⚠️
