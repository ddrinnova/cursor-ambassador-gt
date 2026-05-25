export const siteConfig = {
	communityName: 'Cursor Guatemala',
	communityNameLocal: 'Cursor Guatemala',
	siteUrl: 'https://cursor.gt',
	city: 'Guatemala City',
	country: 'Guatemala',
	lumaUrl: 'https://chat.whatsapp.com/B7qvuHRAVg2Bl57CpuhJ41',
	lumaEventsUrl: 'https://luma.com/cursor-guatemala',
	cursorCommunityUrl: 'https://cursor.com/community',
	defaultLocale: 'es',
	locales: ['es', 'en'],
	footerTagline: 'Hecho con Cursor por ambassadors en Guatemala 🇬🇹',
	seo: {
		title: 'Cursor Guatemala | Comunidad oficial de Cursor en Guatemala',
		titleTemplate: '%s | Cursor Guatemala',
		description:
			'Cursor Guatemala (cursor.gt) es la comunidad oficial de desarrolladores que usan Cursor en Guatemala. Meetups, hackathons, Café Cursor y eventos en Ciudad de Guatemala y Antigua.',
		keywords: [
			'Cursor Guatemala',
			'Cursor Community Guatemala',
			'cursor.gt',
			'comunidad Cursor Guatemala',
			'Cursor meetup Guatemala',
			'Cursor hackathon Guatemala',
			'desarrolladores IA Guatemala',
			'Cursor ambassadors Guatemala',
		],
	},
} as const;

export type SiteConfig = typeof siteConfig;
