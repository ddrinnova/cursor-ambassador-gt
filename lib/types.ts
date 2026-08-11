export type LocaleCode = string;

export type EventFormat = 'meetup' | 'hackathon' | 'cafe' | 'workshop' | 'coworking';

export interface EventAgendaItem {
	time: string;
	title: string;
	description?: string;
	speaker?: string;
}

export interface CursorEvent {
	id: string;
	title: string;
	titleLocal?: string;
	/** ISO 8601 date (YYYY-MM-DD) used for schema.org and sorting. */
	date: string;
	displayDate: string;
	displayDates?: Record<string, string>;
	time?: string;
	attendees?: number;
	capacity?: number;
	location: string;
	/** City on its own, for schema.org addressLocality and local SEO copy. */
	city: string;
	format: EventFormat;
	description?: string;
	descriptions?: Record<string, string>;
	lumaUrl?: string;
	recapPath?: string;
	thumbnail?: string;
	galleryImages?: string[];
	agenda?: EventAgendaItem[];
	status: 'upcoming' | 'past';
	host?: { name: string; logo: string; url?: string };
}

export interface SocialLinks {
	x?: string;
	linkedin?: string;
	github?: string;
	website?: string;
}

export type TeamGroup = 'ambassador' | 'builder';

export interface Ambassador {
	name: string;
	role?: string;
	group: TeamGroup;
	photo: string;
	/** CSS object-position for avatar crop, e.g. "center 30%" */
	photoPosition?: string;
	links: SocialLinks;
}

export interface Partner {
	name: string;
	logo: string;
	url: string;
	logoBg?: string;
	logoHeight?: string;
}

export interface FeaturedResource {
	title: string;
	description: string;
	href: string;
	ctaLabel: string;
	translations?: Record<string, { description?: string; ctaLabel?: string }>;
}

export interface HeaderPhoto {
	src: string;
	alt: string;
	row: number;
	col: number;
	rowSpan?: number;
	colSpan?: number;
	mobile?: {
		row: number;
		col: number;
		rowSpan?: number;
		colSpan?: number;
	};
	mobileHidden?: boolean;
}

export interface GalleryPhoto {
	src: string;
	alt: string;
}

export interface RecapPhotoCredit {
	name: string;
	url?: string;
}

export interface RecapSpeaker {
	name: string;
	topic: string;
	photo?: string;
	url?: string;
}

export interface RecapProject {
	name: string;
	description: string;
	author?: string;
	url?: string;
}

export interface RecapHighlight {
	quote: string;
	author?: string;
}

export interface RecapResource {
	label: string;
	url: string;
}

export interface RecapLocaleData {
	title?: string;
	date?: string;
	summary?: string[];
	speakerTopics?: string[];
	highlights?: RecapHighlight[];
}

export interface RecapData {
	slug: string;
	title: string;
	date: string;
	/** Landscape 1200x630 crop used for Open Graph and Twitter cards. */
	ogImage?: string;
	attendees?: number;
	summary: string[];
	host?: { name: string; logo: string; url?: string };
	speakers?: RecapSpeaker[];
	projects?: RecapProject[];
	highlights?: RecapHighlight[];
	resources?: RecapResource[];
	photoCredits?: RecapPhotoCredit[];
	photos: GalleryPhoto[];
	translations?: Record<string, RecapLocaleData>;
}

export interface WorldEventPhoto {
	src: string;
	location: string;
	date?: string;
	dates?: Record<string, string>;
	alt: string;
	recapPath?: string;
}
