import { RecapData } from '@/lib/types';

export const cursorMeetupAntiguaRecap: RecapData = {
	slug: 'cursor-meetup-antigua',
	title: 'Cursor Meetup Antigua Guatemala',
	date: '22 de marzo de 2026',
	ogImage: '/og/cursor-meetup-antigua.jpg',
	summary: [
		'Lo que está pasando con IA + Devs en Guatemala se siente diferente. El Cursor Meetup Antigua fue la prueba de eso.',
		'Personas construyendo, experimentando y aprendiendo juntas en tiempo real. Un Cursor Field Engineer se unió para compartir su visión sobre el futuro de la ingeniería de software en la era de la IA, junto a charlas, live coding y networking.',
	],
	host: {
		name: 'El Cubo Center',
		logo: '/images/partners/el-cubo-center.svg',
		url: 'https://elcubocenter.com',
	},
	speakers: [
		{
			name: 'Jet Semrick',
			topic: 'El futuro de la ingeniería de software en la era de la IA',
		},
		{
			name: 'Diego V. Rosales',
			topic: 'Live coding con Cursor',
		},
		{
			name: 'Juan Pablo Mora Argueta',
			topic: 'Construyendo con herramientas de IA',
		},
	],
	highlights: [
		{
			quote: 'Lo que está pasando con IA + Devs en Guatemala… se siente diferente.',
			author: 'Diego Andrés Cum Chávez',
		},
	],
	translations: {
		en: {
			date: 'March 22, 2026',
			summary: [
				"What's happening with AI + Devs in Guatemala feels different. Cursor Meetup Antigua was proof of that.",
				'People building, experimenting, and learning together in real time. A Cursor Field Engineer joined to share insights about the future of software engineering in the AI era, along with talks, live coding, and networking.',
			],
			speakerTopics: [
				'The future of software engineering in the AI era',
				'Live coding with Cursor',
				'Building with AI tools',
			],
			highlights: [
				{
					quote: "What's happening with AI + Devs in Guatemala… feels different.",
					author: 'Diego Andrés Cum Chávez',
				},
			],
		},
	},
	photoCredits: [{ name: 'Cursor Guatemala Community' }],
	photos: [
		{ src: '/events/antigua-cursor-gt-1.jpeg', alt: 'Cursor Meetup Antigua — foto grupal con volcán de fondo' },
		{ src: '/events/antigua-cursor-gt-2.jpeg', alt: 'Cursor Meetup Antigua — asistentes en el salón' },
		{ src: '/events/antigua-cursor-gt-3.jpeg', alt: 'Cursor Meetup Antigua — speakers del evento' },
		{ src: '/events/antigua-cursor-gt-4.jpeg', alt: 'Cursor Meetup Antigua — presentación en pantalla' },
		{ src: '/events/antigua-cursor-gt-5.jpeg', alt: 'Cursor Meetup Antigua — participantes atentos' },
		{ src: '/events/antigua-cursor-gt-6.jpeg', alt: 'Cursor Meetup Antigua — foto grupal exterior' },
		{ src: '/events/antigua-cursor-gt-7.jpeg', alt: 'Cursor Meetup Antigua — grabación en rooftop' },
		{ src: '/events/antigua-cursor-gt-8.jpeg', alt: 'Cursor Meetup Antigua — vista panorámica desde el venue' },
		{ src: '/events/antigua-cursor-gt-9.jpeg', alt: 'Cursor Meetup Antigua — sesión en curso' },
		{ src: '/events/antigua-cursor-gt-10.jpeg', alt: 'Cursor Meetup Antigua — snacks y materiales' },
		{ src: '/events/antigua-cursor-gt-11.jpeg', alt: 'Cursor Meetup Antigua — panel de cierre del evento' },
	],
};
