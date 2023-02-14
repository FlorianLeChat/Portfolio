//
// Route vers la page d'accueil du site.
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCode, faExternalLinkAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home()
{
	// Envoi d'un courriel après sélection de la messagerie.
	const sendMail = async ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) =>
	{
		// On cesse d'abord le comportement par défaut du lien.
		event.preventDefault();

		// On importe ensuite la bibliothèque SweetAlert2.
		const Swal = ( await import( "sweetalert2" ) ).default;

		// On affiche ensuite la boîte de dialogue pour la sélection de la messagerie.
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

	// Affichage du rendu HTML de la page.
	return (
		<main>
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
					<a href="https://www.google.com/">
						<button>Télécharger le C.V</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>Projets</h2>

				<article>
					{/* Image du projet */}
					<img src="./assets/images/test.png" alt="test" />

					{/* Contenu du projet */}
					<div>
						{/* Titre du projet */}
						<h3>Lorem Ipsum</h3>

						{/* Description du projet */}
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>

						{/* Compétences utilisées pour le projet */}
						<ul>
							<li>JavaScript</li>
							<li>React.js</li>
							<li>Redux</li>
							<li>Jest</li>
							<li>Cypress</li>
							<li>Webpack</li>
							<li>Node.js</li>
							<li>Express.js</li>
							<li>MongoDB</li>
							<li>Redis</li>
						</ul>

						{/* Liens du projet */}
						<ul>
							<li>
								<a href="https://www.google.com/" target="_blank" rel="noopener">
									<FontAwesomeIcon icon={faCode} />
								</a>
							</li>

							<li>
								<a href="https://www.google.com/" target="_blank">
									<FontAwesomeIcon icon={faExternalLinkAlt} />
								</a>
							</li>
						</ul>
					</div>
				</article>
			</section>

			<section id="skills">
				<h2>Compétences</h2>

				<article>
					<div>
						<i className="devicon-html5-plain colored"></i>
						HTML
					</div>

					<div>
						<i className="devicon-css3-plain colored"></i>
						CSS
					</div>

					<div>
						<i className="devicon-nodejs-plain colored"></i>
						NodeJS
					</div>
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
						<a href="https://www.google.com/" target="_blank">
							<button>
								<FontAwesomeIcon icon={faGithub} />
								GitHub
							</button>
						</a>
					</li>

					<li>
						<a href="https://www.google.com/" target="_blank">
							<button>
								<FontAwesomeIcon icon={faLinkedin} />
								LinkedIn
							</button>
						</a>
					</li>
				</ul>
			</section>
		</main>
	);
}