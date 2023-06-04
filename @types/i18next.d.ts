//
// Correction des types de i18next pour éviter les erreurs de compilation.
//  Source : https://github.com/i18next/i18next/issues/1874
//
import "i18next";

declare module "i18next"
{
	interface CustomTypeOptions
	{
		returnNull: false;
		returnEmptyString: false;
	}
}