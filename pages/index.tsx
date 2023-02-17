//
// Route vers la page d'accueil du site.
//
import path from "path";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { promises as fileSystem } from "fs";
import { faCode, faExternalLinkAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { ProjectAttributes } from "@/interfaces/Project";

export async function getStaticProps()
{
	// On récupère les compétences et les projets depuis
	// 	le système de fichiers.
	const directory = path.join( process.cwd(), "public/data" );
	const projects = await fileSystem.readFile( directory + "/projects.json", "utf8" );
	const skills = await fileSystem.readFile( directory + "/skills.json", "utf8" );

	return {
		props: {
			// On retourne enfin les données sous format
			//	JSON lors de la génération du site.
			projects: JSON.parse( projects ),
			skills: JSON.parse( skills )
		},
	};
}

export default function Home( props: { projects: ProjectAttributes[], skills: string[]; } )
{
	// Envoi d'un courriel après sélection de la messagerie.
	const sendMail = async ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) =>
	{
		// On cesse d'abord le comportement par défaut du lien.
		event.preventDefault();

		// On importe ensuite la bibliothèque SweetAlert2.
		const Swal = ( await import( "sweetalert2" ) ).default;

		// On affiche ensuite la boîte de dialogue pour la
		//	sélection de la messagerie.
		const { value: service } = await Swal.fire( {
			icon: "question",
			text: "Pour envoyer un courriel, vous avez le choix entre plusieurs messageries. Sélectionnez celle de votre choix.",
			title: "Sélection de la messagerie",
			input: "radio",
			inputOptions: {
				"gmail": "GMail (Google)",
				"default": "Messagerie par défaut"
			},
			inputValidator: ( value ) =>
			{
				return !value && "Vous devez choisir une messagerie." || null;
			}
		} );

		// On ouvre enfin la messagerie sélectionnée.
		switch ( service )
		{
			case "gmail":
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

		recognition.onspeechend = () =>
		{
			recognition.stop();
		};
	}, [] );

	// Affichage du rendu HTML de la page.
	return (
		<>
			<section>
				{/* Prénom et nom du développeur */}
				<h1>
					Bonjour. Je suis
					<span>Lorem</span>
					<span>Ipsum.</span>
				</h1>

				<article>
					{/* Résumé du développeur. */}
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					</p>

					{/* Bouton de téléchargement du CV */}
					<a href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view" target="_blank">
						<button>Télécharger le C.V</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>Projets</h2>

				{
					// Génération des projets.
					Object.entries( props.projects ).map( ( [ key, value ] ) =>
					{
						return (
							<article key={key}>
								{/* Image du projet */}
								<img src={"./assets/images/" + key + ".webp"} alt={value.title} />

								{/* Contenu du projet */}
								<div>
									{/* Titre du projet */}
									<h3>{value.title}</h3>

									{/* Description du projet */}
									<p>{value.description}</p>

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
				<h2>Compétences</h2>

				<article>
					{
						// Génération des compétences.
						Object.entries( props.skills ).map( ( skill ) =>
						{
							return (
								<div key={skill[ 0 ]}>
									<i className={"devicon-" + skill[ 0 ] + "-plain colored"}></i>
									{skill[ 1 ]}
								</div>
							);
						} )
					}
				</article>
			</section>

			<section id="contact">
				{/* Section de contact */}
				<h2>Contact</h2>

				{/* Liens vers les réseaux sociaux */}
				<ul>
					<li>
						<a onClick={sendMail}>
							<button>
								<FontAwesomeIcon icon={faEnvelope} />
								Courriel
							</button>
						</a>
					</li>

					<li>
						<a href="https://github.com/FlorianLeChat" target="_blank">
							<button>
								<FontAwesomeIcon icon={faGithub} />
								GitHub
							</button>
						</a>
					</li>

					<li>
						<a href="https://www.linkedin.com/in/florian-trayon/" target="_blank">
							<button>
								<FontAwesomeIcon icon={faLinkedin} />
								LinkedIn
							</button>
						</a>
					</li>
				</ul>
			</section>
		</>
	);
}