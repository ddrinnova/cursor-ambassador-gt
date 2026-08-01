export type TalkSpeaker = {
	id: string;
	name: string;
	role?: string;
	talk: string;
	talkSubtitle?: string;
	time: string;
	flyer: string;
};

export type AgendaFlyer = {
	id: string;
	src: string;
	alt: string;
};

export const coworkingDay = {
	slug: 'cursor-coworking-day',
	title: 'Cursor Coworking Day',
	titleLocal: 'Cursor Coworking Day Guatemala',
	/** Guatemala City local time (UTC-6) */
	startsAt: '2026-08-01T09:00:00-06:00',
	endsAt: '2026-08-01T18:00:00-06:00',
	dateLabel: { es: 'Sábado 1 de agosto, 2026', en: 'Saturday, August 1, 2026' },
	timeLabel: '09:00 – 18:00',
	location: 'Campus Tec · Mountain View · Nivel 2 · Salón 204',
	city: 'Ciudad de Guatemala',
	capacity: 75,
	lumaUrl: 'https://luma.com/cursor-xxan',
	description: {
		es: 'Un día completo para developers, founders y builders que construyen con IA — no es un evento de slides, es un día real de trabajo, aprendizaje y comunidad.',
		en: 'A full day for developers, founders, and builders building with AI — not a slide event, but a real day of work, learning, and community.',
	},
	speakers: [
		{
			id: 'sael',
			name: 'Sael Developer',
			role: 'CEO · Onacode Agency',
			talk: 'Dominando Cursor / Del Contexto a la Acción',
			talkSubtitle:
				'Guía práctica sobre funciones clave de Cursor IDE & Ask y reglas inteligentes para tus proyectos.',
			time: '10:00',
			flyer: '/events/coworking-day/speaker-sael.png',
		},
		{
			id: 'jordi',
			name: 'Jordi Dimas',
			role: 'Full Stack Developer · Pixel Agency',
			talk: 'Harness your Agent',
			talkSubtitle: 'Una breve historia de la evolución del desarrollo agéntico.',
			time: '11:00',
			flyer: '/events/coworking-day/speaker-jordi.png',
		},
		{
			id: 'marvin',
			name: 'Marvin Mazariegos',
			role: 'AI Developer Relations | DDR Innova',
			talk: 'De Developer a AI Builder',
			talkSubtitle: 'Lo que aprendí construyendo con IA desde Guatemala.',
			time: '12:00',
			flyer: '/events/coworking-day/speaker-marvin.png',
		},
		{
			id: 'diego-cum',
			name: 'Diego Cum',
			role: 'CEO · DDR Innova',
			talk: 'Misión: Certifícate',
			talkSubtitle: 'Consejos prácticos para perderle el miedo a las certificaciones tech.',
			time: '14:30',
			flyer: '/events/coworking-day/speaker-diego-cum.png',
		},
		{
			id: 'diego-rosales',
			name: 'Diego Rosales',
			role: 'AI Builder',
			talk: 'Agentes con superpoderes',
			talkSubtitle: 'Cómo pasar de un modelo de IA a un agente de IA.',
			time: '15:45',
			flyer: '/events/coworking-day/speaker-diego-rosales.png',
		},
	] satisfies TalkSpeaker[],
	flyers: [
		{
			id: 'event',
			src: '/events/coworking-day/flyer-event.png',
			alt: 'Coworking & Lightning Talks',
		},
		{
			id: 'day',
			src: '/events/coworking-day/flyer-day.png',
			alt: 'Agenda del día',
		},
		{
			id: 'lightning',
			src: '/events/coworking-day/flyer-lightning.png',
			alt: 'Lightning Talks',
		},
		{
			id: 'coworking',
			src: '/events/coworking-day/flyer-coworking.png',
			alt: 'Coworking Session',
		},
		{
			id: 'audience',
			src: '/events/coworking-day/flyer-audience.png',
			alt: 'Quién debería asistir',
		},
	] satisfies AgendaFlyer[],
} as const;
