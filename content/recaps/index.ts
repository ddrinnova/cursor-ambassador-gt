import { cursorHackathonGuatemalaRecap } from '@/content/recaps/cursor-hackathon-guatemala';
import { cursorMeetupAntiguaRecap } from '@/content/recaps/cursor-meetup-antigua';
import { cafeCursorGuatemalaRecap } from '@/content/recaps/cafe-cursor-guatemala';
import { firstCursorMeetupRecap } from '@/content/recaps/first-cursor-meetup';
import { cursorCoworkingDayGuatemalaRecap } from '@/content/recaps/cursor-coworking-day-guatemala';
import { RecapData } from '@/lib/types';

export const recapsBySlug: Record<string, RecapData> = {
	[cursorHackathonGuatemalaRecap.slug]: cursorHackathonGuatemalaRecap,
	[cursorMeetupAntiguaRecap.slug]: cursorMeetupAntiguaRecap,
	[cafeCursorGuatemalaRecap.slug]: cafeCursorGuatemalaRecap,
	[firstCursorMeetupRecap.slug]: firstCursorMeetupRecap,
	[cursorCoworkingDayGuatemalaRecap.slug]: cursorCoworkingDayGuatemalaRecap,
};
