import type { Metadata } from 'next';
import { siteConfig } from '@/content/site.config';

export function getSiteUrl() {
	const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
	return fromEnv ?? siteConfig.siteUrl;
}

export function buildRootMetadata(): Metadata {
	const siteUrl = getSiteUrl();
	const { seo } = siteConfig;

	return {
		metadataBase: new URL(siteUrl),
		title: {
			default: seo.title,
			template: seo.titleTemplate,
		},
		description: seo.description,
		keywords: [...seo.keywords],
		applicationName: siteConfig.communityName,
		authors: [{ name: siteConfig.communityName, url: siteUrl }],
		creator: siteConfig.communityName,
		publisher: siteConfig.communityName,
		category: 'technology',
		alternates: {
			canonical: '/',
		},
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
		openGraph: {
			type: 'website',
			locale: 'es_GT',
			alternateLocale: ['en_US'],
			url: siteUrl,
			siteName: siteConfig.communityName,
			title: seo.title,
			description: seo.description,
			images: [
				{
					url: '/events/antigua-cursor-gt-1.jpeg',
					width: 1200,
					height: 630,
					alt: 'Cursor Guatemala — comunidad de desarrolladores con IA',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.title,
			description: seo.description,
			images: ['/events/antigua-cursor-gt-1.jpeg'],
		},
		other: {
			'geo.region': 'GT',
			'geo.placename': siteConfig.city,
		},
	};
}

export function buildSiteJsonLd() {
	const siteUrl = getSiteUrl();

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				name: siteConfig.communityName,
				alternateName: ['cursor.gt', 'Cursor Community Guatemala', 'Comunidad Cursor Guatemala'],
				url: siteUrl,
				description: siteConfig.seo.description,
				inLanguage: ['es-GT', 'en'],
				publisher: { '@id': `${siteUrl}/#organization` },
			},
			{
				'@type': 'Organization',
				'@id': `${siteUrl}/#organization`,
				name: siteConfig.communityName,
				alternateName: ['Cursor Community Guatemala', 'cursor.gt'],
				url: siteUrl,
				logo: `${siteUrl}/cursor-logo.svg`,
				description: siteConfig.seo.description,
				areaServed: {
					'@type': 'Country',
					name: siteConfig.country,
				},
				sameAs: [
					siteConfig.lumaEventsUrl,
					siteConfig.cursorCommunityUrl,
					siteConfig.lumaUrl,
				],
			},
		],
	};
}
