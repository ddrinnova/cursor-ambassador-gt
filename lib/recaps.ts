import type { Metadata } from 'next';
import { eventByRecapSlug } from '@/content/events';
import { recapsBySlug } from '@/content/recaps';
import { siteConfig, type Locale } from '@/content/site.config';
import { buildPageMetadata, truncate } from '@/lib/seo';
import type { CursorEvent, RecapData, RecapHighlight, RecapSpeaker } from '@/lib/types';

export interface ResolvedRecap {
	slug: string;
	title: string;
	/** Human-readable date in the active locale. */
	displayDate: string;
	/** ISO 8601 date from the matching event entry, when one exists. */
	isoDate?: string;
	summary: string[];
	speakers: RecapSpeaker[];
	highlights: RecapHighlight[];
	event?: CursorEvent;
	source: RecapData;
}

/**
 * Merges a recap with its locale overrides and the matching event entry, so
 * pages and structured data read from one consistent shape.
 */
export function resolveRecap(recap: RecapData, locale: Locale): ResolvedRecap {
	const overrides = recap.translations?.[locale];
	const event = eventByRecapSlug.get(recap.slug);

	const speakers = (recap.speakers ?? []).map((speaker, index) => ({
		...speaker,
		topic: overrides?.speakerTopics?.[index] ?? speaker.topic,
	}));

	return {
		slug: recap.slug,
		title: overrides?.title ?? recap.title,
		displayDate: overrides?.date ?? event?.displayDates?.[locale] ?? recap.date,
		isoDate: event?.date,
		summary: overrides?.summary ?? recap.summary,
		speakers,
		highlights: overrides?.highlights ?? recap.highlights ?? [],
		event,
		source: recap,
	};
}

export const recapSlugs = Object.keys(recapsBySlug);

export function recapMetadata(recap: RecapData, locale: Locale): Metadata {
	const resolved = resolveRecap(recap, locale);

	return buildPageMetadata({
		locale,
		path: `recaps/${recap.slug}`,
		title: `${resolved.title} | ${siteConfig.communityName}`,
		description: truncate(resolved.summary[0] ?? resolved.title),
		type: 'article',
		...(resolved.isoDate ? { publishedTime: resolved.isoDate } : {}),
		...(recap.ogImage
			? {
					image: {
						url: recap.ogImage,
						width: siteConfig.ogImage.width,
						height: siteConfig.ogImage.height,
						alt: `${resolved.title} — ${siteConfig.communityName}`,
					},
				}
			: {}),
	});
}

/** Recaps ordered newest first, using the ISO date of the matching event. */
export const recapsByDateDesc = Object.values(recapsBySlug).sort((a, b) => {
	const aDate = eventByRecapSlug.get(a.slug)?.date ?? '';
	const bDate = eventByRecapSlug.get(b.slug)?.date ?? '';
	return bDate.localeCompare(aDate);
});
