import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import EventRecap from '@/components/EventRecap';
import JsonLd from '@/components/JsonLd';
import { I18nProvider } from '@/lib/i18n';
import { createTranslator, languageTags, type Locale } from '@/lib/locale';
import { resolveRecap } from '@/lib/recaps';
import { breadcrumbNode, eventNode, graph, organizationNode } from '@/lib/schema';
import type { RecapData } from '@/lib/types';

interface RecapPageProps {
	recap: RecapData;
	locale: Locale;
}

const RecapPage: React.FC<RecapPageProps> = ({ recap, locale }) => {
	const t = createTranslator(locale);
	const resolved = resolveRecap(recap, locale);

	const breadcrumbItems = [
		{ name: t('nav.home'), path: '/' },
		{ name: t('events.heading'), path: 'eventos' },
		{ name: resolved.title, path: `recaps/${recap.slug}` },
	];

	const jsonLd = graph(
		organizationNode(t('seo.homeDescription')),
		resolved.event ? eventNode(resolved.event, locale, recap) : null,
		breadcrumbNode(locale, breadcrumbItems),
	);

	return (
		<I18nProvider locale={locale}>
			<JsonLd data={jsonLd} />
			<Navbar />
			<main lang={languageTags[locale]} className="min-h-screen bg-cursor-bg text-cursor-text">
				<div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
					<div className="mb-8">
						<Breadcrumbs locale={locale} label={t('events.heading')} items={breadcrumbItems} />
					</div>
					<EventRecap recap={recap} />
					<div className="mt-16 pt-8 border-t border-cursor-border">
						<Footer />
					</div>
				</div>
			</main>
		</I18nProvider>
	);
};

export default RecapPage;
