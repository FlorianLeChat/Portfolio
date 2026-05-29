import * as m from "$lib/locales/messages";

export const getDescription = ( name: string ) =>
{
    switch ( name )
    {
        case "portfolio":
            return m.projects_portfolio();

        case "filestorage":
            return m.projects_filestorage();

        case "sourceconsole":
            return m.projects_sourceconsole();

        case "mangaparadise":
            return m.projects_mangaparadise();

        case "homepage":
            return m.projects_homepage();

        case "ravenshortener":
            return m.projects_ravenshortener();

        case "onlineresume":
            return m.projects_onlineresume();

        case "timeloop":
            return m.projects_timeloop();

        case "blog":
            return m.projects_blog();

        case "magicanswers":
            return m.projects_magicanswers();

        default:
            return "";
    }
};
