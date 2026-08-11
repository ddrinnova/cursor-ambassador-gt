import type { Metadata } from 'next';
import { siteConfig, type Locale } from '@/content/site.config';
import { languageTags, localePath, openGraphLocales } from '@/lib/locale';

export function getSiteUrl() {
	const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
	return fromEnv ?? siteConfig.siteUrl;
}

export function absoluteUrl(path: string) {
	return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Trims copy to a meta-description-friendly length without cutting mid-word. */
export function truncate(text: string, maxLength = 160) {
	if (text.length <= maxLength) return text;
	const clipped = text.slice(0, maxLength - 1);
	return `${clipped.slice(0, clipped.lastIndexOf(' ')).trimEnd()}…`;
}

/**
 * Self-referencing canonical plus reciprocal hreflang annotations for every
 * locale the route exists in. `path` is locale-agnostic (e.g. `recaps/foo`).
 */
export function buildAlternates(path: string): Metadata['alternates'] {
	const languages = Object.fromEntries(
		siteConfig.locales.map((locale) => [languageTags[locale], absoluteUrl(localePath(locale, path))]),
	);

	return {
		canonical: absoluteUrl(localePath(siteConfig.defaultLocale, path)),
		languages: {
			...languages,
			'x-default': absoluteUrl(localePath(siteConfig.defaultLocale, path)),
		},
	};
}

export interface PageMetadataInput {
	locale: Locale;
	/** Locale-agnostic route, e.g. `''` for home or `recaps/cafe-cursor-guatemala`. */
	path?: string;
	title: string;
	description: string;
	image?: { url: string; width?: number; height?: number; alt: string };
	type?: 'website' | 'article';
	publishedTime?: string;
	keywords?: string[];
	noIndex?: boolean;
}

export function buildPageMetadata({
	locale,
	path = '',
	title,
	description,
	image,
	type = 'website',
	publishedTime,
	keywords,
	noIndex = false,
}: PageMetadataInput): Metadata {
	const url = absoluteUrl(localePath(locale, path));
	const alternates = buildAlternates(path);
	const card = image ?? {
		url: siteConfig.ogImage.url,
		width: siteConfig.ogImage.width,
		height: siteConfig.ogImage.height,
		alt: `${siteConfig.communityName} — ${description}`.slice(0, 160),
	};

	return {
		// Pages own their full title so the brand is never duplicated by the template.
		title: { absolute: title },
		description,
		...(keywords ? { keywords } : {}),
		alternates: {
			...alternates,
			// Each URL must point at itself, not at the default locale.
			canonical: url,
		},
		...(noIndex ? { robots: { index: false, follow: true } } : {}),
		openGraph: {
			type,
			locale: openGraphLocales[locale],
			alternateLocale: siteConfig.locales
				.filter((other) => other !== locale)
				.map((other) => openGraphLocales[other]),
			url,
			siteName: siteConfig.communityName,
			title,
			description,
			images: [card],
			...(publishedTime ? { publishedTime } : {}),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [card.url],
		},
	};
}

/** Metadata shared by every route; per-page values are merged on top of it. */
export function buildRootMetadata(): Metadata {
	return {
		metadataBase: new URL(getSiteUrl()),
		title: {
			default: siteConfig.communityName,
			template: `%s | ${siteConfig.communityName}`,
		},
		applicationName: siteConfig.communityName,
		authors: [{ name: siteConfig.communityName, url: getSiteUrl() }],
		creator: siteConfig.communityName,
		publisher: siteConfig.communityName,
		category: 'technology',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
		},
		other: {
			'geo.region': `${siteConfig.countryCode}-GU`,
			'geo.placename': siteConfig.city,
		},
	};
}
