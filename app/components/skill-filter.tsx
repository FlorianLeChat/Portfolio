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
	const updateSkillFilter = ( event: ChangeEvent<HTMLInputElement> ) => setSkillFilter( event.target.id );

	// L'utilisateur se trouve à plus de 200 pixels du haut de la page.
	return (
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
					Object.entries( skills ).map( ( [ key, value ] ) =>
					{
						if ( skillFilter === "all" || value.type.includes( skillFilter ) )
						{
							const type = ( key !== "lua" && value.icon !== "original" ) ? " colored" : "";

							return (
								<div key={key}>
									<i className={`devicon-${ key }-${ value.icon + type }`} />
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