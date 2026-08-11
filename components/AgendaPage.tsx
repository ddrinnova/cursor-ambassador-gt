'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCountdown from '@/components/EventCountdown';
import { coworkingDay } from '@/content/coworking-day';
import { events } from '@/content/events';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { localePath, type Locale } from '@/lib/locale';

const AgendaPageContent: React.FC = () => {
	const { t, locale } = useI18n();
	const [downloading, setDownloading] = useState(false);
	const event = events.find((e) => e.id === 'cursor-coworking-day-guatemala');
	const description =
		coworkingDay.description[locale as 'es' | 'en'] ?? coworkingDay.description.es;
	const dateLabel =
		coworkingDay.dateLabel[locale as 'es' | 'en'] ?? coworkingDay.dateLabel.es;

	const handleDownloadPdf = async () => {
		if (!event?.agenda?.length || downloading) return;
		setDownloading(true);
		try {
			const { downloadAgendaPdf: download } = await import('@/lib/downloadAgendaPdf');
			download({ agenda: event.agenda, locale });
		} finally {
			setDownloading(false);
		}
	};

	return (
		<main className="min-h-screen bg-cursor-bg text-cursor-text">
			<Navbar />

			<div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-20">
				<Link
					href={`${localePath(locale, '/')}#upcoming`}
					className="inline-flex items-center gap-2 text-sm text-cursor-text-muted hover:text-cursor-text transition-colors mb-8"
				>
					<ArrowLeft className="w-4 h-4" />
					{t('agenda.back')}
				</Link>

				<header className="mb-14">
					<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
						{t('agenda.eyebrow')}
					</p>
					<div className="flex flex-wrap items-center gap-3 mb-4">
						<h1 className="text-3xl md:text-5xl font-bold tracking-tight">
							{locale === 'es' ? coworkingDay.titleLocal : coworkingDay.title}
						</h1>
						<EventCountdown startsAt={coworkingDay.startsAt} />
					</div>
					<p className="text-cursor-text-muted max-w-2xl leading-relaxed mb-6">{description}</p>
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-cursor-text-secondary mb-6">
						<span>{dateLabel}</span>
						<span className="text-cursor-text-faint">·</span>
						<span>{coworkingDay.timeLabel}</span>
						<span className="text-cursor-text-faint">·</span>
						<span>{coworkingDay.location}</span>
					</div>
					<div className="flex flex-wrap gap-3">
						<a
							href={coworkingDay.lumaUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-cursor-text text-cursor-bg rounded-md px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
						>
							{t('home.register')}
							<ExternalLink className="w-3.5 h-3.5" />
						</a>
						{event?.agenda?.length ? (
							<button
								type="button"
								onClick={handleDownloadPdf}
								disabled={downloading}
								className="inline-flex items-center gap-2 border border-cursor-border text-cursor-text rounded-md px-5 py-2.5 text-sm font-medium hover:border-cursor-border-emphasis hover:bg-cursor-overlay transition-colors disabled:opacity-60"
							>
								<Download className="w-3.5 h-3.5" />
								{downloading ? t('agenda.downloadingPdf') : t('agenda.downloadPdf')}
							</button>
						) : null}
					</div>
				</header>

				{/* Full agenda first */}
				{event?.agenda && event.agenda.length > 0 ? (
					<section className="mb-16">
						<div className="flex flex-wrap items-end justify-between gap-3 mb-6">
							<div>
								<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
									{t('home.agenda')}
								</p>
								<h2 className="text-2xl md:text-3xl font-bold">{t('agenda.scheduleHeading')}</h2>
							</div>
							<button
								type="button"
								onClick={handleDownloadPdf}
								disabled={downloading}
								className="inline-flex items-center gap-2 border border-cursor-border text-cursor-text rounded-md px-4 py-2 text-sm font-medium hover:border-cursor-border-emphasis hover:bg-cursor-overlay transition-colors disabled:opacity-60"
							>
								<Download className="w-3.5 h-3.5" />
								{downloading ? t('agenda.downloadingPdf') : t('agenda.downloadPdf')}
							</button>
						</div>
						<ul className="divide-y divide-cursor-border border border-cursor-border rounded-lg overflow-hidden">
							{event.agenda.map((item) => (
								<li
									key={`${item.time}-${item.title}`}
									className="flex gap-4 px-4 py-3.5 bg-cursor-surface/40"
								>
									<span className="shrink-0 w-14 font-mono text-sm text-cursor-text-muted tabular-nums pt-0.5">
										{item.time}
									</span>
									<div className="min-w-0">
										<p className="text-cursor-text font-medium text-sm md:text-base leading-snug">
											{item.title}
										</p>
										{item.speaker ? (
											<p className="text-sm text-cursor-text-muted mt-0.5">{item.speaker}</p>
										) : null}
										{item.description ? (
											<p className="text-xs text-cursor-text-faint mt-1 leading-relaxed">
												{item.description}
											</p>
										) : null}
									</div>
								</li>
							))}
						</ul>
					</section>
				) : null}

				{/* Speaker posts */}
				<section className="mb-16">
					<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
						{t('agenda.talksEyebrow')}
					</p>
					<h2 className="text-2xl md:text-3xl font-bold mb-8">{t('agenda.talksHeading')}</h2>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{coworkingDay.speakers.map((speaker) => (
							<article
								key={speaker.id}
								className="group overflow-hidden rounded-lg border border-cursor-border bg-cursor-surface hover:border-cursor-border-emphasis transition-colors"
							>
								<div className="relative aspect-[4/5] w-full bg-cursor-bg-dark">
									<Image
										src={speaker.flyer}
										alt={`${speaker.name} — ${speaker.talk}`}
										fill
										className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										priority={speaker.id === 'sael'}
									/>
								</div>
								<div className="p-4">
									<p className="text-xs font-mono text-cursor-text-muted mb-1">{speaker.time}</p>
									<h3 className="text-base font-semibold leading-snug text-cursor-text">
										{speaker.talk}
									</h3>
									{speaker.talkSubtitle ? (
										<p className="text-sm text-cursor-text-muted mt-1 leading-relaxed">
											{speaker.talkSubtitle}
										</p>
									) : null}
									<p className="text-sm text-cursor-text-secondary mt-2">
										{speaker.name}
										{speaker.role ? (
											<span className="text-cursor-text-faint"> · {speaker.role}</span>
										) : null}
									</p>
								</div>
							</article>
						))}
					</div>
				</section>

				{/* Event flyers */}
				<section>
					<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2">
						{t('agenda.flyersEyebrow')}
					</p>
					<h2 className="text-2xl md:text-3xl font-bold mb-6">{t('agenda.flyersHeading')}</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{coworkingDay.flyers.map((flyer) => (
							<figure
								key={flyer.id}
								className="relative aspect-[4/5] overflow-hidden rounded-lg border border-cursor-border bg-cursor-bg-dark"
							>
								<Image
									src={flyer.src}
									alt={flyer.alt}
									fill
									className="object-cover object-top"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
							</figure>
						))}
					</div>
				</section>

				<div className="mt-14 text-center">
					<p className="text-cursor-text-muted mb-4">{t('agenda.ctaHint')}</p>
					<a
						href={coworkingDay.lumaUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-[#f54e00] text-white rounded-md px-6 py-3 text-sm font-medium hover:bg-[#e04500] transition-colors"
					>
						{t('home.register')}
						<ExternalLink className="w-3.5 h-3.5" />
					</a>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 md:px-17">
				<Footer />
			</div>
		</main>
	);
};

const AgendaPage: React.FC<{ locale?: Locale }> = ({ locale = 'es' }) => {
	return (
		<I18nProvider locale={locale}>
			<AgendaPageContent />
		</I18nProvider>
	);
};

export default AgendaPage;
