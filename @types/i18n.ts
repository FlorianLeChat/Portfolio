// Types pour les traductions de Next-Intl.
// Source : https://next-intl-docs.vercel.app/docs/workflows/typescript
type Messages = typeof import( "@/public/locales/en.json" );
declare interface IntlMessages extends Messages {}