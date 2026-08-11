import type { Locale } from '@/content/site.config';

export interface FaqEntry {
	question: string;
	answer: string;
}

/**
 * Answers are written to stand on their own so search engines and answer
 * engines can quote them directly. Every fact here comes from the events,
 * recaps and ambassadors content in this repository.
 */
export const faqByLocale: Record<Locale, FaqEntry[]> = {
	es: [
		{
			question: '¿Qué es Cursor Guatemala?',
			answer:
				'Cursor Guatemala es la comunidad local de developers, AI builders, founders y estudiantes que usan Cursor para programar con inteligencia artificial. Organiza meetups, hackathons, workshops y ediciones de Café Cursor en Ciudad de Guatemala y Antigua Guatemala.',
		},
		{
			question: '¿Cómo puedo unirme a Cursor Guatemala?',
			answer:
				'Puedes unirte gratis al grupo de WhatsApp de la comunidad desde el botón «Únete» de este sitio, y seguir la página de Luma de Cursor Guatemala para registrarte en los próximos eventos.',
		},
		{
			question: '¿Qué tipo de eventos organiza Cursor Guatemala?',
			answer:
				'Organizamos cuatro formatos: meetups presenciales con charlas y networking, hackathons de inteligencia artificial, workshops prácticos de Cursor y Café Cursor, sesiones de coworking en cafeterías locales para programar en comunidad.',
		},
		{
			question: '¿Dónde se realizan los eventos de Cursor en Guatemala?',
			answer:
				'La mayoría de eventos se realizan en Ciudad de Guatemala, incluyendo el Cursor Hackathon Guatemala en la Universidad del Valle de Guatemala. También organizamos actividades en Antigua Guatemala, como el Cursor Meetup Antigua en El Cubo Center.',
		},
		{
			question: '¿Hay hackathons de inteligencia artificial en Guatemala?',
			answer:
				'Sí. Cursor Guatemala organizó el Cursor Hackathon Guatemala, donde más de 140 builders construyeron prototipos con herramientas de IA en 7 horas en la Universidad del Valle de Guatemala. Fue el hackathon de IA más grande de Centroamérica.',
		},
		{
			question: '¿Necesito saber programar para participar?',
			answer:
				'No. En el Cursor Hackathon Guatemala participaron programadores, diseñadores, marketers, creadores de contenido y emprendedores sin experiencia previa en programación. En Café Cursor nuestro participante más joven tenía 14 años.',
		},
		{
			question: '¿Quién organiza Cursor Guatemala?',
			answer:
				'La comunidad la lidera un equipo de Cursor Ambassadors y community builders en Guatemala, encabezado por Diego Andrés Cum Chávez como Community Lead, junto a Diego V. Rosales, Eleanor Menchu Melgar, Oscar Morales, Misael Ordoñéz y Marvin Mazariegos.',
		},
	],
	en: [
		{
			question: 'What is Cursor Guatemala?',
			answer:
				'Cursor Guatemala is the local community of developers, AI builders, founders and students who use Cursor to code with artificial intelligence. It hosts meetups, hackathons, workshops and Café Cursor editions in Guatemala City and Antigua Guatemala.',
		},
		{
			question: 'How can I join Cursor Guatemala?',
			answer:
				'You can join the community WhatsApp group for free from the "Join us" button on this site, and follow the Cursor Guatemala page on Luma to register for upcoming events.',
		},
		{
			question: 'What kind of events does Cursor Guatemala host?',
			answer:
				'We run four formats: in-person meetups with talks and networking, artificial intelligence hackathons, hands-on Cursor workshops, and Café Cursor, coworking sessions at local cafés where the community codes together.',
		},
		{
			question: 'Where do Cursor events in Guatemala take place?',
			answer:
				'Most events happen in Guatemala City, including the Cursor Hackathon Guatemala at Universidad del Valle de Guatemala. We also host activities in Antigua Guatemala, such as the Cursor Meetup Antigua at El Cubo Center.',
		},
		{
			question: 'Are there artificial intelligence hackathons in Guatemala?',
			answer:
				'Yes. Cursor Guatemala hosted the Cursor Hackathon Guatemala, where more than 140 builders shipped prototypes with AI tools in 7 hours at Universidad del Valle de Guatemala. It was the largest AI hackathon in Central America.',
		},
		{
			question: 'Do I need to know how to code to take part?',
			answer:
				'No. The Cursor Hackathon Guatemala welcomed programmers, designers, marketers, content creators and entrepreneurs with no programming background. At Café Cursor our youngest participant was 14 years old.',
		},
		{
			question: 'Who organizes Cursor Guatemala?',
			answer:
				'The community is led by a team of Cursor Ambassadors and community builders in Guatemala, headed by Diego Andrés Cum Chávez as Community Lead, alongside Diego V. Rosales, Eleanor Menchu Melgar, Oscar Morales, Misael Ordoñéz and Marvin Mazariegos.',
		},
	],
};
