# 📚 Portfolio

## In French

### Introduction

Ceci est mon portfolio tout simplement ! Au départ, il s'agissait de mon tout premier site Internet réalisé durant mes études et utilisant HTML, CSS, JavaScript ainsi que PHP sans aucun framework particulier. Plusieurs mois ont défilés et j'ai décidé de le refaire complètement en adoptant un nouveau design inspiré de [ce portfolio](https://github.com/rajshekhar26/cleanfolio) avec NextJS ainsi que des technologies beaucoup plus modernes.

Les anciennes versions de mon portfolio sont également disponibles sur les autres branches GitHub : `no-next-js` (dernière version utilisant PHP), `no-gmail` (version PHP ayant encore un formulaire de contact sans GMail), `no-sass` (version PHP sans l'utilisation du préprocesseur SASS) et `no-php` (version utilisant seulement HTML, CSS et JavaScript).

> [!IMPORTANT]
> L'entièreté du code de ce projet est commenté dans ma langue natale (en français) et n'est pas voué à être traduit en anglais par soucis de simplicité de développement.

### Installation

**Développement local**
- Installer [NodeJS LTS](https://nodejs.org/) (>18 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Démarrer le serveur local NextJS avec la commande `npm run dev`.

**Déploiement en production**
- Installer [NodeJS LTS](https://nodejs.org/) (>18 ou plus) ;
- Installer les dépendances du projet avec la commande `npm install` ;
- Compiler les fichiers statiques du site Internet avec la commande `npm run build` ;
- Supprimer les dépendances de développement avec la commande `npm prune --production` ;
- Démarrer le serveur local NodeJS avec la commande `npm run start`.

> [!TIP]
> Pour tester le projet, vous *pouvez* également utiliser [Docker](https://www.docker.com/). Une fois installé, il suffit de lancer l'image Docker de développement à l'aide de la commande `docker compose up --detach --build`. Le site devrait être accessible à l'adresse suivante : http://localhost:3000/. Si vous souhaitez travailler sur le projet avec Docker, vous devez utiliser la commande `docker compose watch --no-up` pour que vos changements locaux soient automatiquement synchronisés avec le conteneur. 🐳

![image](https://user-images.githubusercontent.com/26360935/220702548-5d333d02-e5a2-48bf-bdbf-afc08492f035.png)

___

## In English

### Introduction

This is my portfolio! At the beginning, it was my very first website made during my studies and using HTML, CSS, JavaScript and PHP without any framework. Several months later, I decided to redo it completely by adopting a new design inspired by [this portfolio](https://github.com/rajshekhar26/cleanfolio) with NextJS and much more modern technologies.

Older versions of my portfolio are also available on the other GitHub branches: `no-next-js` (latest version using PHP), `no-gmail` (PHP version still having a contact form without GMail), `no-sass` (PHP version without using the SASS preprocessor) and `no-php` (version using only HTML, CSS and JavaScript).

> [!IMPORTANT]
> The whole code of this project is commented in my native language (in French) and will not be translated in English for easier programming.

### Setup

**Local development**
- Install [NodeJS LTS](https://nodejs.org/) (>18 or later) ;
- Install project dependencies using `npm install` ;
- Start NextJS local server using `npm run dev`.

**Production deployment**
- Installer [NodeJS LTS](https://nodejs.org/) (>18 or later) ;
- Install project dependencies using `npm install` ;
- Build static website files using `npm run build` ;
- Remove development dependencies using `npm prune --production` ;
- Start NodeJS local server using `npm run start`.

> [!TIP]
> To try the project, you *can* also use [Docker](https://www.docker.com/) installed. Once installed, simply start the development Docker image with `docker compose up --detach --build` command. The website should be available at http://localhost:3000/. If you want to work on the project with Docker, you need to use `docker compose watch --no-up` to automatically synchronize your local changes with the container. 🐳

![image](https://user-images.githubusercontent.com/26360935/220702663-5cd0eb29-097f-484f-8c82-2f1023459d9c.png)