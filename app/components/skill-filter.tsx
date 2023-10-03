//
// Composant de filtrage de la section des compétences.
//

"use client";

import { type ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useTranslation } from "@/utilities/ClientTranslations";
import type { SkillAttributes } from "@/interfaces/Skill";

export default function SkillFilter( { skills }: { skills: SkillAttributes[] } )
{
	// Déclaration des constantes.
	const parameters = useSearchParams();
	const router = useRouter();
	const filter = parameters.get( "filter" ) ?? "";

	// Déclaration des variables d'état.
	const { t } = useTranslation();

	// Mise à jour du filtre des compétences.
	const updateSkillFilter = ( event: ChangeEvent<HTMLInputElement> ) =>
	{
		const url = new URLSearchParams( parameters );
		url.set( "filter", event.currentTarget.id );

		router.push( url ? `?${ url.toString() }` : url, { scroll: false } );
	};

	// Affichage du rendu HTML du composant.
	return (
		<section id="skills">
			{/* Section des compétences */}
			<h2>{t( "pages.index.header_skills" )}</h2>

			{/* Filtre des compétences */}
			<article>
				<input
					id="all"
					type="radio"
					name="skills"
					checked={filter === "all" || filter === ""}
					onChange={updateSkillFilter}
				/>
				<label htmlFor="all">{t( "pages.index.filter_all" )}</label>

				<input
					id="front"
					type="radio"
					name="skills"
					checked={filter === "front"}
					onChange={updateSkillFilter}
				/>
				<label htmlFor="front">{t( "pages.index.filter_front" )}</label>

				<input
					id="back"
					type="radio"
					name="skills"
					checked={filter === "back"}
					onChange={updateSkillFilter}
				/>
				<label htmlFor="back">{t( "pages.index.filter_back" )}</label>

				<input
					id="other"
					type="radio"
					name="skills"
					checked={filter === "other"}
					onChange={updateSkillFilter}
				/>
				<label htmlFor="other">{t( "pages.index.filter_other" )}</label>
			</article>

			{/* Génération des compétences */}
			<article>
				{Object.entries( skills ).map( ( [ key, value ] ) =>
				{
					if ( filter === "" || filter === "all" || value.type.includes( filter ) )
					{
						const colored =
							key !== "lua"
							&& key !== "wordpress"
							&& value.icon !== "original";

						return (
							<div key={key}>
								<i
									className={`devicon-${ key }-${
										value.icon + ( colored ? " colored" : "" )
									}`}
								/>

								<span>{value.name}</span>
							</div>
						);
					}

					return null;
				} )}
			</article>
		</section>
	);
}