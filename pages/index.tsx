//
// Route vers la page d'accueil du site.
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCode, faExternalLinkAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home()
{
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
						{/* <i className="devicon-html5-plain colored"></i> */}
						HTML
					</div>

					<div>
						{/* <i className="devicon-css3-plain colored"></i> */}
						CSS
					</div>
				</article>
			</section>

			<section id="contact">
				{/* Section de contact */}
				<h2>Contact</h2>

				{/* Liens vers les réseaux sociaux */}
				<ul>
					<li>
						<a href="mailto:floriantrayon942@gmail.com">
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