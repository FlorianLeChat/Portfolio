//
// Route vers la page d'accueil du site.
//
import path from "path";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { promises as fileSystem } from "fs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { faCode, faExternalLinkAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import i18nextConfig from "@/next-i18next.config";
import { SkillAttributes } from "@/interfaces/Skill";
import { ProjectAttributes } from "@/interfaces/Project";

export async function getStaticProps( { locale }: { locale: string; } )
{
	// On récupère les compétences et les projets depuis
	// 	le système de fichiers.
	const directory = path.join( process.cwd(), "public/data" );
	const projects = await fileSystem.readFile( directory + "/projects.json", "utf8" );
	const skills = await fileSystem.readFile( directory + "/skills.json", "utf8" );

	return {
		props: {
			// On retourne ensuite les données sous format
			//	JSON lors de la génération du site.
			projects: JSON.parse( projects ),
			skills: JSON.parse( skills ),

			// On retourne enfin les traductions de la page.
			...( await serverSideTranslations( locale ?? i18nextConfig.i18n.defaultLocale ) )
		},
	};
}

export default function Home( props: { projects: ProjectAttributes[], skills: SkillAttributes[]; } )
{
	// Déclaration des constantes.
	const date = new Date();
	const { t } = useTranslation();

	date.setTime( date.getTime() - Date.parse( "08 Aug 1999 00:00:00 GMT" ) );

	// Déclaration des variables d'état.
	const [ skillFilter, setSkillFilter ] = useState( "all" );

	// Mise à jour du filtre des compétences.
	const updateSkillFilter = ( event: React.ChangeEvent<HTMLInputElement> ) =>
	{
		setSkillFilter( event.target.id );
	};

	// Envoi d'un courriel après sélection de la messagerie.
	const sendMail = async ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) =>
	{
		// On cesse d'abord le comportement par défaut du lien.
		event.preventDefault();

		// On importe ensuite la bibliothèque SweetAlert2.
		const Swal = ( await import( "sweetalert2" ) ).default;

		// On affiche ensuite la boîte de dialogue pour la
		//	sélection de la messagerie.
		const { value: service } = await Swal.fire( {
			icon: "question",
			text: t( "modals.mailer_description" ),
			title: t( "modals.mailer_title" ),
			input: "radio",
			inputOptions: {
				google: t( "modals.mailer_google" ),
				default: t( "modals.mailer_default" )
			},
			inputValidator: ( value ) =>
			{
				return !value && t( "modals.mailer_error" ) || null;
			}
		} );

		// On ouvre enfin la messagerie sélectionnée.
		switch ( service )
		{
			case "google":
				// On ouvre la messagerie GMail.
				window.open( "https://mail.google.com/mail/?view=cm&fs=1&to=floriantrayon942@gmail.com", "_blank" );
				break;

			case "default":
				// On ouvre la messagerie par défaut.
				window.open( "mailto:floriantrayon942@gmail.com", "_blank" );
				break;

			default:
				// On ne fait rien.
				break;
		}
	};

	// Défilement automatique vers les sections par commandes vocales.
	// 	Source : https://github.com/mdn/dom-examples/blob/44856cc22f47b0203cbcb48127af50744e89aa7e/web-speech-api/speech-color-changer/script.js
	useEffect( () =>
	{
		const recognition = new webkitSpeechRecognition();
		recognition.start();
		recognition.continuous = true;
		recognition.onresult = ( event ) =>
		{
			// On récupère d'abord le nom de la section.
			const name = event.results[ 0 ][ 0 ].transcript;
			const element = document.getElementById( name );

			if ( element )
			{
				// On défile enfin vers la section (si elle existe).
				element.scrollIntoView( { behavior: "smooth" } );
			}
		};
	}, [] );

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Affichage de l'animation du logo vers le dépôt GitHub */}
			{/* Source : https://tholman.com/github-corners/ */}
			<a href="https://github.com/FlorianLeChat/Portfolio" target="_blank" rel="noopener noreferrer">
				<svg width="80" height="80" viewBox="0 0 250 250" style={{ position: "absolute", top: 0, border: 0, right: 0 }}>
					<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
					<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: "130px 106px" }}></path>
					<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
				</svg>
			</a>

			<section>
				{/* Prénom et nom du développeur */}
				<h1>
					{t( "pages.index.hello_title" )}
					<span>{t( "pages.index.developer_firstname" )}</span>
					<span>{t( "pages.index.developer_surname" )}.</span>
				</h1>

				<article id="about">
					{/* Résumé du développeur. */}
					<p>{t( "pages.index.developer_description", { age: date.getFullYear() - 1970 } )}</p>

					{/* Bouton de téléchargement du CV */}
					<a href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view" target="_blank" rel="noopener noreferrer">
						<button>{t( "pages.index.download_resume" )}</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>{t( "pages.index.header_projects" )}</h2>

				{/* Génération des projets */}
				{
					Object.entries( props.projects ).map( ( [ key, value ] ) =>
					{
						return (
							<article key={key}>
								{/* Image du projet */}
								<Image src={"/assets/images/" + key + ".png"} alt={value.title} width={450} height={250} />

								{/* Contenu du projet */}
								<div>
									{/* Titre du projet */}
									<h3>{value.title}</h3>

									{/* Description du projet */}
									<p>{t( "projects." + key )}</p>

									{/* Compétences utilisées pour le projet */}
									<ul>
										{
											value.skills.map( ( value, index ) =>
											{
												return <li key={index}>{value}</li>;
											} )
										}
									</ul>

									{/* Liens du projet */}
									<ul>
										{
											// Dépôt Git (facultatif).
											value.repository && (
												<li>
													<a href={value.repository} target="_blank" rel="noopener noreferrer">
														<FontAwesomeIcon icon={faCode} />
													</a>
												</li>
											)
										}

										{
											// Site de démonstration (facultatif).
											value.demo && (
												<li>
													<a href={value.demo} target="_blank" rel="noopener noreferrer">
														<FontAwesomeIcon icon={faExternalLinkAlt} />
													</a>
												</li>
											)
										}
									</ul>
								</div>
							</article>
						);
					} )
				}
			</section>

			<section id="skills">
				{/* Section des compétences */}
				<h2>{t( "pages.index.header_skills" )}</h2>

				{/* Filtre des compétences */}
				<article onChange={updateSkillFilter}>
					<input type="radio" id="all" name="skills" defaultChecked />
					<label htmlFor="all">{t( "pages.index.filter_all" )}</label>

					<input type="radio" id="front" name="skills" />
					<label htmlFor="front">{t( "pages.index.filter_front" )}</label>

					<input type="radio" id="back" name="skills" />
					<label htmlFor="back">{t( "pages.index.filter_back" )}</label>

					<input type="radio" id="other" name="skills" />
					<label htmlFor="other">{t( "pages.index.filter_other" )}</label>
				</article>

				{/* Génération des compétences */}
				<article>
					{
						Object.entries( props.skills ).map( ( [ key, value ] ) =>
						{
							if ( skillFilter === "all" || value.type.includes( skillFilter ) )
							{
								return (
									<div key={key}>
										<i className={"devicon-" + key + "-" + value.icon + ( ( key === "lua" || value.icon === "original" ) ? "" : " colored" )}></i>
										<span>{value.name}</span>
									</div>
								);
							}
						} )
					}
				</article>
			</section>

			<section id="contact">
				{/* Section de contact */}
				<h2>{t( "pages.index.header_contact" )}</h2>

				{/* Liens vers les réseaux sociaux */}
				<ul>
					<li>
						<button onClick={sendMail}>
							<FontAwesomeIcon icon={faEnvelope} />
							{t( "pages.index.footer_mail" )}
						</button>
					</li>

					<li>
						<a href="https://github.com/FlorianLeChat" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={faGithub} />
							GitHub
						</a>
					</li>

					<li>
						<a href="https://www.linkedin.com/in/florian-trayon/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={faLinkedin} />
							LinkedIn
						</a>
					</li>
				</ul>
			</section>
		</>
	);
}