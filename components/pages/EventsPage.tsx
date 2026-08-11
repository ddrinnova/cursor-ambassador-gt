import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import EventList from '@/components/EventList';
import JsonLd from '@/components/JsonLd';
import { pastEvents, upcomingEvents } from '@/content/events';
import { recapsBySlug } from '@/content/recaps';
import { siteConfig } from '@/content/site.config';
import { I18nProvider } from '@/lib/i18n';
import { createTranslator, languageTags, type Locale } from '@/lib/locale';
import {
	breadcrumbNode,
	eventCollectionNode,
	eventNode,
	graph,
	organizationNode,
} from '@/lib/schema';

const EventsPage: React.FC<{ locale: Locale }> = ({ locale }) => {
	const t = createTranslator(locale);
	const heading = t('events.heading');
	const description = t('seo.eventsDescription');

	const jsonLd = graph(
		organizationNode(t('seo.homeDescription')),
		eventCollectionNode(locale, heading, description, pastEvents),
		breadcrumbNode(locale, [
			{ name: t('nav.home'), path: '/' },
			{ name: heading, path: 'eventos' },
		]),
		...pastEvents.map((event) =>
			eventNode(event, locale, recapsBySlug[event.recapPath?.replace('/recaps/', '') ?? '']),
		),
	);

	return (
		<I18nProvider locale={locale}>
			<JsonLd data={jsonLd} />
			<Navbar />
			<main lang={languageTags[locale]} className="min-h-screen bg-cursor-bg text-cursor-text">
				<div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
					<Breadcrumbs
						locale={locale}
						label={heading}
						items={[
							{ name: t('nav.home'), path: '/' },
							{ name: heading, path: 'eventos' },
						]}
					/>

					<h1 className="text-3xl md:text-4xl lg:text-5xl font-regular tracking-tight text-cursor-text mt-6 mb-4">
						{heading}
					</h1>
					<p className="max-w-2xl text-cursor-text-secondary text-base leading-relaxed mb-12">
						{t('events.intro')}
					</p>

					<section aria-labelledby="upcoming-events-heading" className="mb-16">
						<h2
							id="upcoming-events-heading"
							className="text-2xl md:text-3xl font-bold text-cursor-text mb-6"
						>
							{t('events.upcomingHeading')}
						</h2>
						{upcomingEvents.length > 0 ? (
							<EventList events={upcomingEvents} locale={locale} t={t} />
						) : (
							<p className="text-cursor-text-secondary text-sm leading-relaxed max-w-2xl">
								{t('events.noUpcoming')}{' '}
								<a
									href={siteConfig.lumaEventsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#f54e00] hover:underline"
								>
									{t('footer.allEvents')}
								</a>
							</p>
						)}
					</section>

					<section aria-labelledby="past-events-heading">
						<h2 id="past-events-heading" className="text-2xl md:text-3xl font-bold text-cursor-text mb-6">
							{t('events.pastHeading')}
						</h2>
						<EventList events={pastEvents} locale={locale} t={t} />
					</section>

					<Footer />
				</div>
			</main>
		</I18nProvider>
	);
};

export default EventsPage;
