import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { createTranslator } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/seo';

const locale = 'es';
const t = createTranslator(locale);

export const metadata: Metadata = buildPageMetadata({
	locale,
	title: t('seo.homeTitle'),
	description: t('seo.homeDescription'),
	keywords: [
		'Cursor Guatemala',
		'comunidad Cursor Guatemala',
		'Cursor AI Guatemala',
		'AI developers Guatemala',
		'eventos de inteligencia artificial Guatemala',
		'meetups de tecnología Guatemala',
		'hackathons Guatemala',
	],
});

export default function Page() {
	return <HomePage locale={locale} />;
}
