import Blog from "$lib/images/blog.png";
import TimeLoop from "$lib/images/timeloop.png";
import Homepage from "$lib/images/homepage.png";
import Portfolio from "$lib/images/portfolio.png";
import FileStorage from "$lib/images/filestorage.png";
import OnlineResume from "$lib/images/onlineresume.png";
import MagicAnswers from "$lib/images/magicanswers.png";
import SourceConsole from "$lib/images/sourceconsole.png";
import MangaParadise from "$lib/images/mangaparadise.png";
import RavenShortener from "$lib/images/ravenshortener.png";

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
