//
// Génération des images statiques correspondants aux projets.
//  Note : cette astuce est utilisée pour le chargement progressif des images.
//  Source : https://nextjs.org/docs/app/api-reference/components/image#placeholder
//
import Domego from "@/images/domego.png";
import Homepage from "@/images/homepage.png";
import Portfolio from "@/images/portfolio.png";
import GamesOnWeb from "@/images/gamesonweb2023.png";
import FileStorage from "@/images/filestorage.png";
import OnlineResume from "@/images/onlineresume.png";
import SourceConsole from "@/images/sourceconsole.png";
import MangaParadise from "@/images/mangaparadise.png";
import RavenFramework from "@/images/ravenframework.png";
import RavenShortener from "@/images/ravenshortener.png";
import SteamDownloader from "@/images/steamdownloader.png";
import FacepunchMonitor from "@/images/facepunchmonitor.png";

export const getImage = ( name: string ) =>
{
	switch ( name )
	{
		// Domego.
		case "domego":
			return Domego;

		// Homepage.
		case "homepage":
			return Homepage;

		// Portfolio.
		case "portfolio":
			return Portfolio;

		// Games On Web 2023.
		case "gamesonweb2023":
			return GamesOnWeb;

		// Simple File Storage.
		case "filestorage":
			return FileStorage;

		// Source Web Console.
		case "sourceconsole":
			return SourceConsole;

		// Manga Paradise.
		case "mangaparadise":
			return MangaParadise;

		// Raven Framework.
		case "ravenframework":
			return RavenFramework;

		// Online Resume.
		case "onlineresume":
			return OnlineResume;

		// Raven URL Shortener.
		case "ravenshortener":
			return RavenShortener;

		// Steam Collection Download Size Calculator
		case "steamdownloader":
			return SteamDownloader;

		// Facepunch Commits Monitor
		case "facepunchmonitor":
			return FacepunchMonitor;

		// Aucune image.
		default:
			return "";
	}
};