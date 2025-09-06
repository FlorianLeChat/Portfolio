//
// Génération des images statiques correspondants aux projets.
//  Note : cette astuce est utilisée pour le chargement progressif des images.
//  Source : https://nextjs.org/docs/app/api-reference/components/image#placeholder
//
import TimeLoop from "@/images/timeloop.png";
import Homepage from "@/images/homepage.png";
import Portfolio from "@/images/portfolio.png";
import FileStorage from "@/images/filestorage.png";
import OnlineResume from "@/images/onlineresume.png";
import SourceConsole from "@/images/sourceconsole.png";
import MangaParadise from "@/images/mangaparadise.png";
import RavenShortener from "@/images/ravenshortener.png";

export const getImage = ( name: string ) =>
{
	switch ( name )
	{
		// TimeLoop.
		case "timeloop":
			return TimeLoop;

		// Homepage.
		case "homepage":
			return Homepage;

		// Portfolio.
		case "portfolio":
			return Portfolio;

		// Simple File Storage.
		case "filestorage":
			return FileStorage;

		// Source Web Console.
		case "sourceconsole":
			return SourceConsole;

		// Manga Paradise.
		case "mangaparadise":
			return MangaParadise;

		// Online Resume.
		case "onlineresume":
			return OnlineResume;

		// Raven URL Shortener.
		case "ravenshortener":
			return RavenShortener;

		// Aucune image.
		default:
			return "";
	}
};