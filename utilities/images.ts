// https://nextjs.org/docs/app/api-reference/components/image#placeholder
import Blog from "@/images/blog.png";
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

        case "ravenshortener":
            return RavenShortener;

        default:
            return "";
    }
};
