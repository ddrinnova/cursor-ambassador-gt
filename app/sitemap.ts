import { MetadataRoute } from 'next';
import { recapsBySlug } from '@/content/recaps';
import { getSiteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getSiteUrl();
	const recapEntries = Object.values(recapsBySlug).map((recap) => ({
		url: `${baseUrl}/recaps/${recap.slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/agenda/`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.9,
		},
		...recapEntries,
	];
}
