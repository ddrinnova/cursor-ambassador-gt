import { RecapData } from '@/lib/types';

export const firstCursorMeetupRecap: RecapData = {
	slug: 'first-cursor-meetup',
	title: 'Primer Meetup de Cursor en Guatemala',
	date: '31 de agosto de 2025',
	ogImage: '/og/first-cursor-meetup.jpg',
	summary: [
		'Realizamos con éxito nuestro primer Cursor Meetup en Guatemala. Junto a Diego V. Rosales y Eleanor Menchu Melgar, compartimos fundamentos de IA, cómo usar Cursor para optimizar el ciclo de desarrollo y consejos prácticos de prompt engineering.',
		'Este fue solo el comienzo. La respuesta de la comunidad fue increíble y sentó las bases de todo lo que siguió: más meetups, talleres y el primer hackathon de IA en Centroamérica.',
	],
	speakers: [
		{
			name: 'Diego Andrés Cum Chávez',
			topic: 'Fundamentos de IA y Prompt Engineering',
		},
		{
			name: 'Diego V. Rosales',
			topic: 'Usando Cursor para optimizar el ciclo de desarrollo',
		},
		{
			name: 'Eleanor Menchu Melgar',
			topic: 'Primeros pasos con Cursor',
		},
	],
	highlights: [
		{
			quote: 'Esto es solo el comienzo. Ya estamos planeando más meetups, talleres y un próximo hackathon de IA.',
			author: 'Diego Andrés Cum Chávez',
		},
		{
			quote: 'Gracias especiales a Ben Lang y a la comunidad Cursor Ambassador por el apoyo y la inspiración.',
		},
	],
	translations: {
		en: {
			title: 'First Cursor Meetup in Guatemala',
			date: 'August 31, 2025',
			summary: [
				'We successfully hosted our very first Cursor Meetup in Guatemala. Alongside co-founder and friend Diego V. Rosales and Eleanor Menchu Melgar, we shared insights on the Fundamentals of AI, how to use Cursor to smooth the development cycle, and practical tips on prompt engineering.',
				'This was just the beginning. The community response was amazing and set the foundation for everything that followed — more meetups, hands-on workshops, and the first AI hackathon in Central America.',
			],
			speakerTopics: [
				'Fundamentals of AI & Prompt Engineering',
				'Using Cursor to optimize the development cycle',
				'Getting started with Cursor',
			],
			highlights: [
				{
					quote: 'This is just the beginning. We\'re already planning more meetups, hands-on workshops, and an upcoming AI hackathon.',
					author: 'Diego Andrés Cum Chávez',
				},
				{
					quote: 'Special thanks to Ben Lang and the Cursor Ambassador community for the support and inspiration.',
				},
			],
		},
	},
	photoCredits: [{ name: 'Cursor Guatemala Community' }],
	photos: [
		{
			src: '/events/primer-meetup-cursor-gt-1.jpeg',
			alt: 'Primer Meetup de Cursor en Guatemala — grupo de asistentes',
		},
		{
			src: '/events/primer-meetup-cursor-gt-2.jpeg',
			alt: 'Primer Meetup de Cursor en Guatemala — foto grupal',
		},
		{
			src: '/events/primer-meetup-cursor-gt-3.jpeg',
			alt: 'Primer Meetup de Cursor en Guatemala — banner Cursor Guatemala',
		},
		{
			src: '/events/primer-meetup-cursor-gt-4.jpeg',
			alt: 'Primer Meetup de Cursor en Guatemala — comunidad reunida',
		},
	],
};
