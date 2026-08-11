import type { Metadata } from 'next';
import EventsPage from '@/components/pages/EventsPage';
import { createTranslator } from '@/lib/locale';
import { buildPageMetadata } from '@/lib/seo';

const locale = 'en';
const t = createTranslator(locale);

export const metadata: Metadata = buildPageMetadata({
	locale,
	path: 'eventos',
	title: t('seo.eventsTitle'),
	description: t('seo.eventsDescription'),
	keywords: [
		'Cursor events Guatemala',
		'Cursor meetup Guatemala',
		'Cursor hackathon Guatemala',
		'Cursor workshop Guatemala',
		'AI events Guatemala',
		'Café Cursor Guatemala',
	],
});

export default function Page() {
	return <EventsPage locale={locale} />;
}
