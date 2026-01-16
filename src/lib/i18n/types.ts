import type { en } from "./locales/en";

// Tipo inferido del archivo inglés (source of truth)
export type Translations = typeof en;

// Namespaces disponibles
export type Namespace = keyof Translations;

// Tipo recursivo para aplanar claves anidadas a dot notation
type FlattenKeys<T, Prefix extends string = ""> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends string
					? `${Prefix}${K}`
					: FlattenKeys<T[K], `${Prefix}${K}.`>
				: never;
		}[keyof T]
	: never;

// Claves disponibles para cada namespace (dot notation)
export type TranslationKey<N extends Namespace> = FlattenKeys<Translations[N]>;

// Locales soportados
export type SupportedLocale =
	| "en"
	| "es"
	| "de"
	| "fr"
	| "it"
	| "pt"
	| "ru"
	| "zh"
	| "ja"
	| "ko";

// Tipo recursivo que convierte literales de string a string genérico
// Mantiene la estructura pero permite cualquier valor string
type DeepStringify<T> = T extends string
	? string
	: T extends object
		? { [K in keyof T]: DeepStringify<T[K]> }
		: T;

// Tipo para archivos de traducción (misma estructura que en, pero con strings genéricos)
export type LocaleTranslations = DeepStringify<Translations>;
