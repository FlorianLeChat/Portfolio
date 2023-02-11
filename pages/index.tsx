//
// Route vers la page d'accueil du site.
//
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
						<button>C.V</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>Projects</h2>

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
									<i className="fas fa-code"></i>
								</a>
							</li>

							<li>
								<a href="https://www.google.com/" target="_blank">
									<i className="fas fa-external-link-alt"></i>
								</a>
							</li>
						</ul>
					</div>
				</article>
			</section>

			<section id="skills">
				<h2>Tech Stack</h2>

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
						<i className="devicon-javascript-plain colored"></i>
						JavaScript
					</div>

					<div>
						<i className="devicon-react-original colored"></i>
						React.js
					</div>

					<div>
						<i className="devicon-redux-original colored"></i>
						Redux
					</div>

					<div>
						<i className="devicon-nextjs-original colored"></i>
						Next.js
					</div>

					<div>
						<i className="devicon-typescript-plain colored"></i>
						TypeScript
					</div>

					<div>
						<i className="devicon-nodejs-plain colored"></i>
						Node.js
					</div>

					<div>
						<i className="devicon-express-original colored"></i>
						Express.js
					</div>

					<div>
						<i className="devicon-mongodb-plain colored"></i>
						MongoDB
					</div>

					<div>
						<i className="devicon-git-plain colored"></i>
						Git
					</div>

					<div>
						<i className="devicon-linux-plain"></i>
						Linux
					</div>

					<div>
						<i className="devicon-docker-plain colored"></i>
						Docker
					</div>

					<div>
						<i className="devicon-vim-plain colored"></i>
						Vim
					</div>
				</article>
			</section>

			<section id="contact">
				{/* Section de contact */}
				<h2>Restons en contact</h2>

				{/* Liens vers les réseaux sociaux */}
				<ul>
					<li>
						<a href="mailto:floriantrayon942@gmail.com">
							<button>
								<i className="fas icon fa-envelope"></i>
								Courriel
							</button>
						</a>
					</li>

					<li>
						<a href="https://www.google.com/">
							<button>
								<i className="fab icon fa-github"></i>
								GitHub
							</button>
						</a>
					</li>

					<li>
						<a href="https://www.google.com/">
							<button>
								<i className="fab icon fa-linkedin"></i>
								LinkedIn
							</button>
						</a>
					</li>
				</ul>
			</section>
		</main>
	);
}