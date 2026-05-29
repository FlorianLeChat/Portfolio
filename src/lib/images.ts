import Blog from "$lib/images/blog.webp";
import TimeLoop from "$lib/images/timeloop.webp";
import Homepage from "$lib/images/homepage.webp";
import Portfolio from "$lib/images/portfolio.webp";
import FileStorage from "$lib/images/filestorage.webp";
import OnlineResume from "$lib/images/onlineresume.webp";
import MagicAnswers from "$lib/images/magicanswers.webp";
import SourceConsole from "$lib/images/sourceconsole.webp";
import MangaParadise from "$lib/images/mangaparadise.webp";
import RavenShortener from "$lib/images/ravenshortener.webp";

export const getImage = ( name: string ) =>
{
    switch ( name )
    {
        case "blog":
            return Blog;

        case "timeloop":
            return TimeLoop;

        case "homepage":
            return Homepage;

        case "portfolio":
            return Portfolio;

        case "filestorage":
            return FileStorage;

        case "sourceconsole":
            return SourceConsole;

        case "mangaparadise":
            return MangaParadise;

        case "onlineresume":
            return OnlineResume;

        case "magicanswers":
            return MagicAnswers;

        case "ravenshortener":
            return RavenShortener;

        default:
            return "";
    }
};
