//
// Composant de filtrage de la section des compétences.
//

"use client";

import { type ChangeEvent, useState } from "react";
import type { SkillAttributes } from "@/interfaces/Skill";
import { useTranslation } from "@/utilities/ClientTranslations";

export default function SkillFilter( { skills }: { skills: SkillAttributes[]; } )
{
	// Déclaration des constantes.
	const { t } = useTranslation();

	// Déclaration des variables d'état.
	const [ skillFilter, setSkillFilter ] = useState( "all" );

	// Mise à jour du filtre des compétences.
	const updateSkillFilter = ( event: ChangeEvent<HTMLInputElement> ) => setSkillFilter( event.currentTarget.id );

	// Affichage du rendu HTML du composant.
	return (
		<section id="skills">
			{/* Section des compétences */}
			<h2>{t( "pages.index.header_skills" )}</h2>

			{/* Filtre des compétences */}
			<article>
				<input type="radio" id="all" name="skills" onChange={updateSkillFilter} checked={skillFilter === "all"} />
				<label htmlFor="all">{t( "pages.index.filter_all" )}</label>

				<input type="radio" id="front" name="skills" onChange={updateSkillFilter} />
				<label htmlFor="front">{t( "pages.index.filter_front" )}</label>

				<input type="radio" id="back" name="skills" onChange={updateSkillFilter} />
				<label htmlFor="back">{t( "pages.index.filter_back" )}</label>

				<input type="radio" id="other" name="skills" onChange={updateSkillFilter} />
				<label htmlFor="other">{t( "pages.index.filter_other" )}</label>
			</article>

			{/* Génération des compétences */}
			<article>
				{
					Object.entries( skills ).map( ( [ key, value ] ) =>
					{
						if ( skillFilter === "all" || value.type.includes( skillFilter ) )
						{
							const colored = ( key !== "lua" && key !== "wordpress" && value.icon !== "original" );

							return (
								<div key={key}>
									<i className={`devicon-${ key }-${ value.icon + ( colored ? " colored" : "" ) }`} />
									<span>{value.name}</span>
								</div>
							);
						}

						return null;
					} )
				}
			</article>
		</section>
	);
}