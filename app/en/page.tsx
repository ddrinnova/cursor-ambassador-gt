import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { createTranslator } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/seo';

const locale = 'en';
const t = createTranslator(locale);

export const metadata: Metadata = buildPageMetadata({
	locale,
	title: t('seo.homeTitle'),
	description: t('seo.homeDescription'),
	keywords: [
		'Cursor Guatemala',
		'Cursor community Guatemala',
		'AI developers Guatemala',
		'AI coding Guatemala',
		'AI events Guatemala',
		'tech meetups Guatemala',
		'hackathons Guatemala',
	],
});

export default function Page() {
	return <HomePage locale={locale} />;
}
