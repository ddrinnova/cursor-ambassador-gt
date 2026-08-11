import es from '@/content/locales/es.json';
import en from '@/content/locales/en.json';
import { isLocale, siteConfig, type Locale } from '@/content/site.config';

export type { Locale };

const dictionaries: Record<Locale, unknown> = { es, en };

export type Translate = (key: string, params?: Record<string, string>) => string;

function lookup(dictionary: unknown, key: string): string | undefined {
	const value = key.split('.').reduce<unknown>(
		(node, part) =>
			node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined,
		dictionary,
	);

	return typeof value === 'string' ? value : undefined;
}

export function createTranslator(locale: Locale): Translate {
	return (key, params) => {
		const template =
			lookup(dictionaries[locale], key) ?? lookup(dictionaries[siteConfig.defaultLocale], key) ?? key;

		if (!params) return template;

		return Object.entries(params).reduce(
			(text, [name, value]) => text.replaceAll(`{${name}}`, value),
			template,
		);
	};
}

/**
 * Site-relative path for a route in a given locale. The default locale lives at
 * the root so existing URLs keep working; other locales are prefixed.
 * Paths always end in a slash to match `trailingSlash: true`.
 */
export function localePath(locale: Locale, path = '/'): string {
	const segment = path.replace(/^\/+|\/+$/g, '');
	const prefix = locale === siteConfig.defaultLocale ? '' : `/${locale}`;

	return segment ? `${prefix}/${segment}/` : `${prefix}/`;
}

/** Splits a live pathname into its locale and locale-agnostic route. */
export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
	const segments = pathname.split('/').filter(Boolean);
	const [first, ...rest] = segments;

	return isLocale(first ?? '') && first !== siteConfig.defaultLocale
		? { locale: first as Locale, path: rest.join('/') }
		: { locale: siteConfig.defaultLocale, path: segments.join('/') };
}

/** BCP 47 tags used for hreflang annotations and schema.org `inLanguage`. */
export const languageTags: Record<Locale, string> = {
	es: 'es-GT',
	en: 'en',
};

export const openGraphLocales: Record<Locale, string> = {
	es: 'es_GT',
	en: 'en_US',
};
