'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pastEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { localePath } from '@/lib/locale';
import EventList from '@/components/EventList';

const PastEvents: React.FC = () => {
	const { t, locale } = useI18n();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<motion.section
			id="recaps"
			aria-labelledby="past-events-heading"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16 scroll-mt-20"
		>
			<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
				{t('home.pastEvents')}
			</p>
			<h2 id="past-events-heading" className="text-2xl md:text-3xl font-bold text-cursor-text mb-6">
				{t('home.pastEventsHeading')}
			</h2>

			<EventList events={pastEvents} locale={locale} t={t} />

			<Link
				href={localePath(locale, 'eventos')}
				className="inline-flex items-center gap-2 mt-8 text-sm text-[#f54e00] hover:underline"
			>
				{t('recap.allEvents')}
				<ArrowRight className="w-4 h-4" aria-hidden="true" />
			</Link>
		</motion.section>
	);
};

export default PastEvents;
