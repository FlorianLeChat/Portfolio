//
// Composant de filtrage de la section des compétences.
//

"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";

import type { SkillAttributes } from "@/interfaces/Skill";

export default function SkillFilter( { skills }: { skills: SkillAttributes[] } )
{
	// Déclaration des variables d'état.
	const parameters = useSearchParams();
	const filter = parameters.get( "filter" ) ?? "";
	const t = useTranslations( "landing" );

	// Mise à jour du filtre des compétences.
	const updateSkillFilter = ( event: ChangeEvent<HTMLInputElement> ) =>
	{
		const url = new URLSearchParams( parameters );
		url.set( "filter", event.currentTarget.id );

		window.history.pushState( null, "", `?${ url.toString() }` );
	};

	// Affichage du rendu HTML du composant.
	return (
		<section id="skills">
			{/* Section des compétences */}
			<h2>{t( "header_skills" )}</h2>

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

					<label htmlFor="all">{t( "filter_all" )}</label>
				</li>

				<li>
					<input
						id="front"
						type="radio"
						name="skills"
						checked={filter === "front"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="front">{t( "filter_front" )}</label>
				</li>

				<li>
					<input
						id="back"
						type="radio"
						name="skills"
						checked={filter === "back"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="back">{t( "filter_back" )}</label>
				</li>

				<li>
					<input
						id="other"
						type="radio"
						name="skills"
						checked={filter === "other"}
						onChange={updateSkillFilter}
					/>

					<label htmlFor="other">{t( "filter_other" )}</label>
				</li>
			</ul>

			{/* Génération des compétences */}
			<ul>
				{Object.entries( skills ).map( ( [ key, value ] ) =>
				{
					if (
						filter === ""
						|| filter === "all"
						|| value.type.includes( filter )
					)
					{
						const colored =
							key !== "lua"
							&& key !== "wordpress"
							&& value.icon !== "original";

						return (
							<li key={key}>
								<i
									className={`devicon-${ key }-${
										value.icon + ( colored ? " colored" : "" )
									}`}
								/>

								<span>{value.name}</span>
							</li>
						);
					}

					return null;
				} )}
			</ul>
		</section>
	);
}