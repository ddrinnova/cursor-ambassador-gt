import { MetadataRoute } from 'next';
import { recapsBySlug } from '@/content/recaps';
import { getSiteUrl } from '@/lib/seo';

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
		...recapEntries,
	];
}
