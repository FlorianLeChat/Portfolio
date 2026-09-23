import IconCss from "~icons/simple-icons/css";
import IconGit from "~icons/simple-icons/git";
import IconLua from "~icons/simple-icons/lua";
import IconPhp from "~icons/simple-icons/php";
import IconSass from "~icons/simple-icons/sass";
import IconHtml5 from "~icons/simple-icons/html5";
import IconMysql from "~icons/simple-icons/mysql";
import IconNginx from "~icons/simple-icons/nginx";
import IconReact from "~icons/simple-icons/react";
import IconRedis from "~icons/simple-icons/redis";
import IconApache from "~icons/simple-icons/apache";
import IconCentos from "~icons/simple-icons/centos";
import IconDebian from "~icons/simple-icons/debian";
import IconDocker from "~icons/simple-icons/docker";
import IconEslint from "~icons/simple-icons/eslint";
import IconGithub from "~icons/simple-icons/github";
import IconGitlab from "~icons/simple-icons/gitlab";
import IconJekyll from "~icons/simple-icons/jekyll";
import IconJquery from "~icons/simple-icons/jquery";
import IconSvelte from "~icons/simple-icons/svelte";
import IconAnsible from "~icons/simple-icons/ansible";
import IconMariadb from "~icons/simple-icons/mariadb";
import IconMongodb from "~icons/simple-icons/mongodb";
import IconSymfony from "~icons/simple-icons/symfony";
import IconDoctrine from "~icons/simple-icons/doctrine";
import IconMarkdown from "~icons/simple-icons/markdown";
import IconRabbitmq from "~icons/simple-icons/rabbitmq";
import IconBootstrap from "~icons/simple-icons/bootstrap";
import IconNextdotjs from "~icons/simple-icons/nextdotjs";
import IconNodedotjs from "~icons/simple-icons/nodedotjs";
import IconWordpress from "~icons/simple-icons/wordpress";
import IconJavascript from "~icons/simple-icons/javascript";
import IconTypescript from "~icons/simple-icons/typescript";
import IconTailwindcss from "~icons/simple-icons/tailwindcss";
import IconTraefikproxy from "~icons/simple-icons/traefikproxy";
import type { Skill } from "$lib/types/Skill";

export const SKILLS = {
    ansible: { name: "Ansible", icon: IconAnsible, type: "other" },
    apache: { name: "Apache", icon: IconApache, color: "#cb2533", type: "other" },
    bootstrap: { name: "Bootstrap", icon: IconBootstrap, color: "#712cf9", type: "front" },
    centos: { name: "CentOS", icon: IconCentos, color: "#932178", type: "other" },
    css3: { name: "CSS", icon: IconCss, color: "#3d8fc6", type: "front" },
    debian: { name: "Debian", icon: IconDebian, color: "#a80030", type: "other" },
    docker: { name: "Docker", icon: IconDocker, color: "#019bc6", type: "other" },
    doctrine: { name: "Doctrine", icon: IconDoctrine, color: "#f56d39", type: "back" },
    eslint: { name: "ESLint", icon: IconEslint, color: "#4b32c3", type: "other" },
    git: { name: "Git", icon: IconGit, color: "#f34f29", type: "other" },
    github: { name: "GitHub", icon: IconGithub, type: "other" },
    gitlab: { name: "GitLab", icon: IconGitlab, color: "#e24329", type: "other" },
    html5: { name: "HTML", icon: IconHtml5, color: "#e54d26", type: "front" },
    javascript: { name: "JavaScript", icon: IconJavascript, color: "#f0db4f", type: [ "front", "back" ] },
    jekyll: { name: "Jekyll", icon: IconJekyll, type: "other" },
    jquery: { name: "jQuery", icon: IconJquery, color: "#0769ad", type: "front" },
    lua: { name: "Lua", icon: IconLua, type: "other" },
    mariadb: { name: "MariaDB", icon: IconMariadb, color: "#003545", type: [ "back", "other" ] },
    markdown: { name: "Markdown", icon: IconMarkdown, type: "other" },
    mongodb: { name: "MongoDB", icon: IconMongodb, color: "#4faa41", type: [ "back", "other" ] },
    mysql: { name: "MySQL", icon: IconMysql, color: "#00618a", type: [ "back", "other" ] },
    nextjs: { name: "Next.js", icon: IconNextdotjs, type: [ "front", "back" ] },
    nginx: { name: "Nginx", icon: IconNginx, color: "#009900", type: "other" },
    nodejs: { name: "Node.js", icon: IconNodedotjs, color: "#5fa04e", type: "back" },
    php: { name: "PHP", icon: IconPhp, color: "#777bb3", type: "back" },
    rabbitmq: { name: "RabbitMQ", icon: IconRabbitmq, color: "#ff6600", type: "back" },
    react: { name: "React", icon: IconReact, color: "#61dafb", type: "front" },
    redis: { name: "Redis", icon: IconRedis, color: "#d82c20", type: "back" },
    sass: { name: "Sass", icon: IconSass, color: "#cc6699", type: "front" },
    svelte: { name: "Svelte", icon: IconSvelte, color: "#ff3e00", type: "front" },
    symfony: { name: "Symfony", icon: IconSymfony, type: "back" },
    tailwindcss: { name: "Tailwind CSS", icon: IconTailwindcss, color: "#38bdf8", type: "front" },
    traefikproxy: { name: "Traefik", icon: IconTraefikproxy, color: "#24a1c1", type: "other" },
    typescript: { name: "TypeScript", icon: IconTypescript, color: "#007acc", type: [ "front", "back" ] },
    wordpress: { name: "WordPress", icon: IconWordpress, type: [ "front", "back", "other" ] }
} satisfies Record<string, Skill>;
