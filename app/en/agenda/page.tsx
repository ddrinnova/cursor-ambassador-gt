import type { Metadata } from 'next';
import AgendaPage from '@/components/AgendaPage';
import { coworkingDay } from '@/content/coworking-day';
import { buildPageMetadata } from '@/lib/seo';

const locale = 'en';

export const metadata: Metadata = buildPageMetadata({
	locale,
	path: 'agenda',
	title: `Agenda · ${coworkingDay.title} | Cursor Guatemala`,
	description: coworkingDay.description.en,
	image: {
		url: '/events/coworking-day/flyer-event.png',
		alt: 'Coworking & Lightning Talks — Cursor Coworking Day Guatemala',
	},
});

export default function Page() {
	return <AgendaPage locale={locale} />;
}
