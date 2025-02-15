//
// Composant de filtrage de la section des compétences.
//

"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import type { SkillAttributes } from "@/interfaces/Skill";

export default function SkillFilter( { skills }: Readonly<{ skills: SkillAttributes[] }> )
{
	// Déclaration des variables d'état.
	const parameters = useSearchParams();
	const messages = useTranslations( "landing" );
	const filter = parameters.get( "filter" ) ?? "";

	// Mise à jour du filtre des compétences.
	const updateSkillFilter = ( event: ChangeEvent<HTMLInputElement> ) =>
	{
		const url = new URLSearchParams( parameters );
		url.set( "filter", event.currentTarget.id );

		window.history.pushState( null, "", `?${ url }` );
	};

	// Affichage du rendu HTML du composant.
	return (
		<section id="skills">
			{/* Section des compétences */}
			<h2>{messages( "header_skills" )}</h2>

			{/* Filtre des compétences */}
			<ul>
				<li>
					<input
						id="all"
						type="radio"
						name="skills"
						checked={filter === "all" || filter === ""}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="all">{messages( "filter_all" )}</label>
				</li>

				<li>
					<input
						id="front"
						type="radio"
						name="skills"
						checked={filter === "front"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="front">{messages( "filter_front" )}</label>
				</li>

				<li>
					<input
						id="back"
						type="radio"
						name="skills"
						checked={filter === "back"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="back">{messages( "filter_back" )}</label>
				</li>

				<li>
					<input
						id="other"
						type="radio"
						name="skills"
						checked={filter === "other"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="other">{messages( "filter_other" )}</label>
				</li>
			</ul>

			{/* Génération des compétences */}
			<ul>
				{Object.entries( skills ).map( ( [ key, value ] ) =>
				{
					if ( filter === "" || filter === "all" || value.type.includes( filter ) )
					{
						return (
							<li key={key}>
								<i className={`devicon-${ key }-${ value.icon }`} />

								{value.name}
							</li>
						);
					}

					return null;
				} )}
			</ul>
		</section>
	);
}