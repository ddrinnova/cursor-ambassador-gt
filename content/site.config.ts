export const siteConfig = {
	communityName: 'Cursor Guatemala',
	communityNameLocal: 'Cursor Guatemala',
	siteUrl: 'https://cursor.gt',
	city: 'Ciudad de Guatemala',
	region: 'Guatemala',
	country: 'Guatemala',
	countryCode: 'GT',
	whatsappUrl: 'https://chat.whatsapp.com/B7qvuHRAVg2Bl57CpuhJ41',
	lumaEventsUrl: 'https://luma.com/cursor-guatemala',
	cursorCommunityUrl: 'https://cursor.com/community',
	cursorXUrl: 'https://x.com/cursor_ai',
	gaId: 'G-S24R81KPGV',
	gtmId: 'GTM-T9NB7F9Q',
	defaultLocale: 'es',
	locales: ['es', 'en'],
	footerTagline: 'Hecho con Cursor por ambassadors en Guatemala 🇬🇹',
	/** Landscape asset used for Open Graph and Twitter cards. */
	ogImage: {
		url: '/og/cursor-guatemala.jpg',
		width: 1200,
		height: 630,
	},
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];

export function isLocale(value: string): value is Locale {
	return (siteConfig.locales as readonly string[]).includes(value);
}
