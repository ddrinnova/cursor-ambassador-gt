import type { Metadata } from 'next';
import AgendaPage from '@/components/AgendaPage';
import { coworkingDay } from '@/content/coworking-day';

export const metadata: Metadata = {
	title: `Agenda · ${coworkingDay.title}`,
	description: coworkingDay.description.es,
	openGraph: {
		title: `Agenda · ${coworkingDay.titleLocal}`,
		description: coworkingDay.description.es,
		images: [{ url: '/events/coworking-day/flyer-event.png', alt: 'Coworking & Lightning Talks' }],
	},
};

export default function Page() {
	return <AgendaPage />;
}
