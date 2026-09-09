import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import FaqSection from '@/components/FaqSection';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { ModernMosaic } from '@/components/blocks/modern-mosaic';
import { faqByLocale } from '@/content/faq';
import { pastEvents } from '@/content/events';
import { recapsBySlug } from '@/content/recaps';
import { siteConfig } from '@/content/site.config';
import { I18nProvider } from '@/lib/i18n';
import { createTranslator, languageTags, type Locale } from '@/lib/locale';
import { ambassadorNodes, eventNode, faqNode, graph, organizationNode, websiteNode } from '@/lib/schema';

const ACTIVITIES = [
	{ key: 'cafeCursor', image: '/events/cafe-cursor-gt-5.jpeg' },
	{ key: 'workshops', image: '/events/cafe-cursor-gt-10.jpeg' },
	{ key: 'meetups', image: '/events/antigua-cursor-gt-1.jpeg' },
	{ key: 'hackathons', image: '/events/cursor-hackathon-gt-1.jpeg' },
] as const;

const HomePage: React.FC<{ locale: Locale }> = ({ locale }) => {
	const t = createTranslator(locale);
	const description = t('seo.homeDescription');

	const jsonLd = graph(
		organizationNode(description),
		websiteNode(description),
		...ambassadorNodes(),
		...pastEvents.map((event) =>
			eventNode(event, locale, recapsBySlug[event.recapPath?.replace('/recaps/', '') ?? '']),
		),
		faqNode(faqByLocale[locale]),
	);

	return (
		<I18nProvider locale={locale}>
			<JsonLd data={jsonLd} />
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-3 focus:bg-cursor-text focus:text-cursor-bg focus:px-4 focus:py-2 focus:rounded-md"
			>
				{t('nav.skipToContent')}
			</a>
			<Navbar />
			<main
				id="main-content"
				lang={languageTags[locale]}
				className="min-h-screen bg-cursor-bg text-cursor-text scroll-smooth"
			>
				<header className="flex flex-col items-center my-16">
					<div className="flex flex-col items-center max-w-md py-20">
						<h1 className="text-3xl font-regular text-center mb-2 mt-4">{t('hero.title')}</h1>
						<p className="text-sm text-center text-cursor-text-secondary mb-6">{t('hero.subtitle')}</p>
						<div className="flex justify-center gap-2 py-2">
							<a
								href={siteConfig.whatsappUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-cursor-light-bg text-cursor-bg px-4 py-2 rounded-4xl font-medium hover:opacity-90 transition-opacity"
							>
								{t('hero.joinNow')}
							</a>
							<a
								href={siteConfig.lumaEventsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-cursor-text border border-white px-4 py-2 rounded-4xl hover:bg-white/10 transition-colors"
							>
								{t('hero.exploreEvents')}
							</a>
						</div>
					</div>
					<ModernMosaic label={t('hero.galleryLabel')} />
				</header>

				<AboutSection locale={locale} />

				<section aria-labelledby="activities-heading" className="max-w-6xl mx-auto px-10 py-16 md:py-24">
					<h2 id="activities-heading" className="max-w-xs text-2xl font-regular mb-2 mt-4">
						{t('activities.heading')}
					</h2>
					<p className="max-w-xs text-sm text-cursor-text-secondary mb-8">{t('activities.subheading')}</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
						{ACTIVITIES.map(({ key, image }) => (
							<article key={key} className="flex flex-col">
								<div className="relative aspect-3/4 w-full rounded-sm overflow-hidden mb-4">
									<Image
										src={image}
										alt={t('activities.imageAlt', { title: t(`activities.${key}.title`) })}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										className="object-cover transition-transform duration-500 hover:scale-105"
										unoptimized
									/>
								</div>
								<h3 className="text-base font-semibold text-cursor-text mb-1">
									{t(`activities.${key}.title`)}
								</h3>
								<p className="text-sm text-cursor-text-secondary leading-relaxed mb-6">
									{t(`activities.${key}.description`)}
								</p>
							</article>
						))}
					</div>
				</section>

				<div className="max-w-7xl mx-auto px-17 py-16 md:py-24">
					<AmbassadorSection />
					{/* <UpcomingEvents /> */}
					<SectionDivider />
					<PastEvents />
					{/* <FeaturedSection /> */}
					<SectionDivider />
					<GlobalEvents />
					<FaqSection locale={locale} />
					<Footer />
				</div>
			</main>
		</I18nProvider>
	);
};

export default HomePage;
