// Paramètres personnalisés pour le typage de i18next.
import "i18next";

declare module "i18next"
{
	interface CustomTypeOptions
	{
		defaultNS: "common";
		resources: {
			common: typeof import( "@/public/locales/en/common.json" ) | string;
		};
		returnNull: false;
		returnEmptyString: false;
	}
}