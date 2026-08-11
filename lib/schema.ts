import { ambassadors } from '@/content/ambassadors';
import { siteConfig, type Locale } from '@/content/site.config';
import { languageTags, localePath } from '@/lib/locale';
import { resolveRecap } from '@/lib/recaps';
import { absoluteUrl, getSiteUrl } from '@/lib/seo';
import type { CursorEvent, RecapData } from '@/lib/types';

type Node = Record<string, unknown>;

const ORGANIZATION_ID = () => `${getSiteUrl()}/#organization`;
const WEBSITE_ID = () => `${getSiteUrl()}/#website`;

export function graph(...nodes: (Node | null | undefined)[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': nodes.filter((node): node is Node => Boolean(node)),
	};
}

export function organizationNode(description: string): Node {
	return {
		'@type': 'Organization',
		'@id': ORGANIZATION_ID(),
		name: siteConfig.communityName,
		alternateName: ['Cursor Community Guatemala', 'Comunidad Cursor Guatemala', 'cursor.gt'],
		url: getSiteUrl(),
		logo: absoluteUrl('/cursor-logo.svg'),
		image: absoluteUrl(siteConfig.ogImage.url),
		description,
		areaServed: {
			'@type': 'Country',
			name: siteConfig.country,
		},
		location: {
			'@type': 'Place',
			name: siteConfig.city,
			address: {
				'@type': 'PostalAddress',
				addressLocality: siteConfig.city,
				addressCountry: siteConfig.countryCode,
			},
		},
		member: ambassadors.map((ambassador) => ({ '@id': ambassadorId(ambassador.name) })),
		sameAs: [siteConfig.lumaEventsUrl],
	};
}

export function websiteNode(description: string): Node {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID(),
		name: siteConfig.communityName,
		alternateName: ['cursor.gt', 'Cursor Community Guatemala'],
		url: getSiteUrl(),
		description,
		inLanguage: Object.values(languageTags),
		publisher: { '@id': ORGANIZATION_ID() },
	};
}

function ambassadorId(name: string) {
	const slug = name
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

	return `${getSiteUrl()}/#person-${slug}`;
}

export function ambassadorNodes(): Node[] {
	return ambassadors.map((ambassador) => {
		const profiles = [ambassador.links.linkedin, ambassador.links.x, ambassador.links.github].filter(
			(link): link is string => Boolean(link),
		);

		return {
			'@type': 'Person',
			'@id': ambassadorId(ambassador.name),
			name: ambassador.name.trim(),
			...(ambassador.role ? { jobTitle: ambassador.role } : {}),
			image: absoluteUrl(encodeURI(ambassador.photo)),
			...(ambassador.links.website ? { url: ambassador.links.website } : {}),
			...(profiles.length > 0 ? { sameAs: profiles } : {}),
			memberOf: { '@id': ORGANIZATION_ID() },
		};
	});
}

function placeNode(event: CursorEvent): Node {
	return {
		'@type': 'Place',
		name: event.host?.name ?? event.city,
		address: {
			'@type': 'PostalAddress',
			addressLocality: event.city,
			addressCountry: siteConfig.countryCode,
		},
	};
}

export function eventNode(event: CursorEvent, locale: Locale, recap?: RecapData): Node {
	const resolved = recap ? resolveRecap(recap, locale) : undefined;
	// Keep the schema name aligned with the title shown on the event's page.
	const name = resolved?.title ?? (locale === 'en' ? event.title : (event.titleLocal ?? event.title));
	const images = [event.thumbnail, ...(event.galleryImages ?? [])]
		.filter((src): src is string => Boolean(src))
		.slice(0, 4)
		.map((src) => absoluteUrl(src));

	const url = event.recapPath
		? absoluteUrl(localePath(locale, event.recapPath))
		: (event.lumaUrl ?? absoluteUrl(localePath(locale, 'eventos')));

	return {
		'@type': 'Event',
		'@id': `${url}#event`,
		name,
		startDate: event.date,
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		inLanguage: languageTags[locale],
		location: placeNode(event),
		organizer: { '@id': ORGANIZATION_ID() },
		performer: { '@id': ORGANIZATION_ID() },
		url,
		...(images.length > 0 ? { image: images } : {}),
		...(resolved?.summary[0] ? { description: resolved.summary[0] } : {}),
		...(event.host?.url ? { sponsor: { '@type': 'Organization', name: event.host.name, url: event.host.url } } : {}),
	};
}

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export function breadcrumbNode(locale: Locale, items: BreadcrumbItem[]): Node {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(localePath(locale, item.path)),
		})),
	};
}

export interface FaqEntry {
	question: string;
	answer: string;
}

export function faqNode(entries: FaqEntry[]): Node {
	return {
		'@type': 'FAQPage',
		mainEntity: entries.map((entry) => ({
			'@type': 'Question',
			name: entry.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: entry.answer,
			},
		})),
	};
}

export function eventCollectionNode(
	locale: Locale,
	name: string,
	description: string,
	events: CursorEvent[],
): Node {
	return {
		'@type': 'CollectionPage',
		'@id': `${absoluteUrl(localePath(locale, 'eventos'))}#collection`,
		name,
		description,
		url: absoluteUrl(localePath(locale, 'eventos')),
		inLanguage: languageTags[locale],
		isPartOf: { '@id': WEBSITE_ID() },
		about: { '@id': ORGANIZATION_ID() },
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: events.map((event, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				url: event.recapPath
					? absoluteUrl(localePath(locale, event.recapPath))
					: absoluteUrl(localePath(locale, 'eventos')),
			})),
		},
	};
}