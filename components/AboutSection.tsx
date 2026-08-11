import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createTranslator, localePath, type Locale } from '@/lib/locale';

const AboutSection: React.FC<{ locale: Locale }> = ({ locale }) => {
	const t = createTranslator(locale);

	return (
		<section aria-labelledby="about-cursor-guatemala" className="max-w-6xl mx-auto px-10 pt-16 md:pt-24">
			<h2
				id="about-cursor-guatemala"
				className="max-w-2xl text-2xl md:text-3xl font-regular text-cursor-text mb-4"
			>
				{t('about.heading')}
			</h2>
			<div className="max-w-2xl space-y-4 text-cursor-text-secondary text-sm md:text-base leading-relaxed">
				<p>{t('about.body')}</p>
				<p>{t('about.secondary')}</p>
			</div>
			<Link
				href={localePath(locale, 'eventos')}
				className="inline-flex items-center gap-2 mt-6 text-sm text-[#f54e00] hover:underline"
			>
				{t('about.eventsLink')}
				<ArrowRight className="w-4 h-4" aria-hidden="true" />
			</Link>
		</section>
	);
};

export default AboutSection;
