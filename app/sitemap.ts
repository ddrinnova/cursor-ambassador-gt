import { MetadataRoute } from 'next';
import { eventByRecapSlug } from '@/content/events';
import { siteConfig } from '@/content/site.config';
import { languageTags, localePath } from '@/lib/locale';
import { recapSlugs } from '@/lib/recaps';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

interface Route {
	path: string;
	changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
	priority: number;
	lastModified: Date;
}

const buildDate = new Date();

function entry({ path, changeFrequency, priority, lastModified }: Route): MetadataRoute.Sitemap[number] {
	return {
		url: absoluteUrl(localePath(siteConfig.defaultLocale, path)),
		lastModified,
		changeFrequency,
		priority,
		alternates: {
			languages: Object.fromEntries(
				siteConfig.locales.map((locale) => [languageTags[locale], absoluteUrl(localePath(locale, path))]),
			),
		},
	};
}

export default function sitemap(): MetadataRoute.Sitemap {
	const recapRoutes = recapSlugs.map<Route>((slug) => {
		const eventDate = eventByRecapSlug.get(slug)?.date;

		return {
			path: `recaps/${slug}`,
			changeFrequency: 'yearly',
			priority: 0.8,
			lastModified: eventDate ? new Date(`${eventDate}T00:00:00Z`) : buildDate,
		};
	});

	const routes: Route[] = [
		{ path: '/', changeFrequency: 'weekly', priority: 1, lastModified: buildDate },
		{ path: 'eventos', changeFrequency: 'weekly', priority: 0.9, lastModified: buildDate },
		{ path: 'agenda', changeFrequency: 'weekly', priority: 0.9, lastModified: buildDate },
		...recapRoutes,
	];

	return routes.map(entry);
}
