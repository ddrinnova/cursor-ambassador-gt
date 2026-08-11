import { RecapData } from '@/lib/types';

export const cursorHackathonGuatemalaRecap: RecapData = {
	slug: 'cursor-hackathon-guatemala',
	title: 'Cursor Hackathon Guatemala 2026',
	date: '7 de marzo de 2026',
	ogImage: '/og/cursor-hackathon-guatemala.jpg',
	attendees: 140,
	summary: [
		'Más de 140 builders, desarrolladores y entusiastas de la IA se reunieron en la Universidad del Valle de Guatemala para experimentar, colaborar y construir prototipos en solo 7 horas.',
		'Equipos de 2 a 4 personas de todos los perfiles — programadores, diseñadores, marketers, creadores de contenido, emprendedores y mentes curiosas — participaron. No se requería experiencia en programación, ya que las herramientas de IA permitieron que cualquier persona con una idea la materializara.',
		'La energía de la comunidad tech de Guatemala fue increíble. Este fue el hackathon de IA más grande de Centroamérica, y fue solo el comienzo.',
	],
	host: {
		name: 'Universidad del Valle de Guatemala',
		logo: '/images/partners/uvg.svg',
		url: 'https://www.uvg.edu.gt',
	},
	highlights: [
		{
			quote: 'La energía de la comunidad tech de Guatemala fue increíble — esto es solo el comienzo.',
			author: 'Diego Andrés Cum Chávez',
		},
		{
			quote: 'Más de 140 builders se reunieron para crear, experimentar y construir prototipos en pocas horas.',
		},
	],
	translations: {
		en: {
			date: 'March 7, 2026',
			summary: [
				'More than 140 builders, developers, and AI enthusiasts came together at Universidad del Valle de Guatemala to experiment, collaborate, and build prototypes in just 7 hours.',
				'Teams of 2-4 people from all profiles — programmers, designers, marketers, content creators, entrepreneurs, and curious minds — participated. No programming knowledge was required, as AI tools allowed anyone with an idea to materialize it.',
				'The energy of the tech community in Guatemala was incredible. This was the largest AI hackathon in Central America, and it was just the beginning.',
			],
			highlights: [
				{
					quote: 'The energy of the tech community in Guatemala was incredible — this is just the beginning.',
					author: 'Diego Andrés Cum Chávez',
				},
				{ quote: 'More than 140 builders came together to create, experiment, and build prototypes in just a few hours.' },
			],
		},
	},
	photoCredits: [{ name: 'Cursor Guatemala Community' }],
	photos: [
		{ src: '/events/cursor-hackathon-gt-1.jpeg', alt: 'Cursor Hackathon Guatemala — auditorio lleno de participantes' },
		{ src: '/events/cursor-hackathon-gt-2.jpeg', alt: 'Cursor Hackathon Guatemala — equipos colaborando' },
		{ src: '/events/cursor-hackathon-gt-3.jpeg', alt: 'Cursor Hackathon Guatemala — presentaciones finales' },
		{ src: '/events/cursor-hackathon-gt-4.jpeg', alt: 'Cursor Hackathon Guatemala — ambiente del evento' },
	],
};
