'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	Mic,
	Lightbulb,
	MessageSquareQuote,
	Link as LinkIcon,
	Calendar,
	MapPin,
	Users,
	ChevronLeft,
	ArrowRight,
	ExternalLink,
} from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import { pastEvents } from '@/content/events';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';
import { localePath } from '@/lib/locale';
import { resolveRecap } from '@/lib/recaps';
import { RecapData } from '@/lib/types';

interface EventRecapProps {
	recap: RecapData;
}

const EventRecap: React.FC<EventRecapProps> = ({ recap }) => {
	const { t, locale } = useI18n();
	const resolved = resolveRecap(recap, locale);
	const { event } = resolved;
	const related = pastEvents.filter((item) => item.recapPath && item.recapPath !== `/recaps/${recap.slug}`);

	return (
		<div className="space-y-8">
			<div>
				<Link
					href={localePath(locale, '/')}
					className="inline-flex items-center gap-2 text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors group"
				>
					<ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
					<span>{t('recap.backHome')}</span>
				</Link>
			</div>

			<motion.header
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="border-b border-cursor-border pb-8"
			>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-regular tracking-tight text-cursor-text mb-4">
					{resolved.title}
				</h1>

				<div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cursor-text-secondary">
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-cursor-text-muted" aria-hidden="true" />
						{resolved.isoDate ? (
							<time dateTime={resolved.isoDate}>{resolved.displayDate}</time>
						) : (
							<span>{resolved.displayDate}</span>
						)}
					</div>

					{event ? (
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4 text-cursor-text-muted" aria-hidden="true" />
							<span>{event.location}</span>
						</div>
					) : null}

					{recap.attendees ? (
						<div className="flex items-center gap-2">
							<Users className="w-4 h-4 text-cursor-text-muted" aria-hidden="true" />
							<span>{t('home.attendees', { count: String(recap.attendees) })}</span>
						</div>
					) : null}

					{recap.host ? (
						<div className="flex items-center gap-2">
							<span className="text-cursor-text-muted">{t('recap.hostedAt')}</span>
							<a
								href={recap.host.url || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="text-cursor-text hover:underline inline-flex items-center gap-1.5 font-medium"
							>
								<Image
									src={recap.host.logo}
									alt=""
									aria-hidden="true"
									width={16}
									height={16}
									className="rounded-full"
								/>
								{recap.host.name}
							</a>
						</div>
					) : null}
				</div>
			</motion.header>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="lg:col-span-2 space-y-8"
				>
					<section aria-labelledby="recap-about">
						<h2 id="recap-about" className="text-xl font-semibold text-cursor-text mb-4">
							{t('recap.aboutHeading')}
						</h2>
						<div className="prose prose-invert max-w-none text-cursor-text-secondary text-base leading-relaxed space-y-4">
							{resolved.summary.map((paragraph) => (
								<p key={paragraph} className="text-justify md:text-left">
									{paragraph}
								</p>
							))}
						</div>
					</section>

					<section aria-label={t('recap.photoGallery')} className="pt-6 border-t border-cursor-border">
						<PhotoGallery photos={recap.photos} embedded />
					</section>

					{recap.photoCredits && recap.photoCredits.length > 0 ? (
						<div className="text-xs text-cursor-text-faint pt-2">
							<span className="mr-1">{t('recap.photoCredits')}</span>
							{recap.photoCredits.map((credit, index) => (
								<span key={`${credit.name}-${index}`}>
									{credit.url ? (
										<a
											href={credit.url}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:underline text-cursor-text-muted"
										>
											{credit.name}
										</a>
									) : (
										<span>{credit.name}</span>
									)}
									{index < recap.photoCredits!.length - 1 ? <span>, </span> : <span>.</span>}
								</span>
							))}
						</div>
					) : null}
				</motion.div>

				<motion.aside
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="space-y-6 lg:border-l lg:border-cursor-border lg:pl-8 lg:sticky lg:top-24"
				>
					{resolved.speakers.length > 0 ? (
						<section className="space-y-4">
							<div className="flex items-center gap-2 border-b border-cursor-border pb-2">
								<Mic className="w-4 h-4 text-cursor-accent-blue" aria-hidden="true" />
								<h2 className="text-sm font-semibold uppercase tracking-wider text-cursor-text-secondary">
									{t('recap.speakers')}
								</h2>
							</div>
							<div className="space-y-3">
								{resolved.speakers.map((speaker) => (
									<div
										key={speaker.name}
										className="bg-cursor-bg-dark/40 border border-cursor-border/60 rounded-lg p-3.5 flex items-start gap-3 transition-colors hover:bg-cursor-bg-dark/80"
									>
										{speaker.photo ? (
											<div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-cursor-border-emphasis">
												<Image
													src={speaker.photo}
													alt=""
													aria-hidden="true"
													fill
													className="object-cover"
													sizes="40px"
												/>
											</div>
										) : null}
										<div className="min-w-0">
											{speaker.url ? (
												<a
													href={speaker.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-cursor-text font-medium text-sm hover:underline"
												>
													{speaker.name}
												</a>
											) : (
												<p className="text-cursor-text font-medium text-sm">{speaker.name}</p>
											)}
											<p className="text-cursor-text-muted text-xs mt-0.5">{speaker.topic}</p>
										</div>
									</div>
								))}
							</div>
						</section>
					) : null}

					{recap.projects && recap.projects.length > 0 ? (
						<section className="space-y-4">
							<div className="flex items-center gap-2 border-b border-cursor-border pb-2">
								<Lightbulb className="w-4 h-4 text-cursor-accent-yellow" aria-hidden="true" />
								<h2 className="text-sm font-semibold uppercase tracking-wider text-cursor-text-secondary">
									{t('recap.projects')}
								</h2>
							</div>
							<div className="space-y-3">
								{recap.projects.map((project) => (
									<div
										key={project.name}
										className="bg-cursor-bg-dark/40 border border-cursor-border/60 rounded-lg p-3.5 transition-colors hover:bg-cursor-bg-dark/80"
									>
										{project.url ? (
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-cursor-text font-medium text-sm hover:underline inline-flex items-center gap-1"
											>
												{project.name}
												<LinkIcon className="w-3 h-3 text-cursor-text-muted" aria-hidden="true" />
											</a>
										) : (
											<p className="text-cursor-text font-medium text-sm">{project.name}</p>
										)}
										<p className="text-cursor-text-muted text-xs mt-1 leading-relaxed">
											{project.description}
										</p>
										{project.author ? (
											<p className="text-cursor-text-faint text-xs mt-2">
												{t('recap.by')} {project.author}
											</p>
										) : null}
									</div>
								))}
							</div>
						</section>
					) : null}

					{resolved.highlights.length > 0 ? (
						<section className="space-y-4">
							<div className="flex items-center gap-2 border-b border-cursor-border pb-2">
								<MessageSquareQuote className="w-4 h-4 text-cursor-accent-purple" aria-hidden="true" />
								<h2 className="text-sm font-semibold uppercase tracking-wider text-cursor-text-secondary">
									{t('recap.highlights')}
								</h2>
							</div>
							<div className="space-y-3">
								{resolved.highlights.map((highlight) => (
									<blockquote
										key={highlight.quote}
										className="bg-cursor-bg-dark/40 border-l-2 border-cursor-accent-purple rounded-r-lg px-3.5 py-3 text-sm"
									>
										<p className="text-cursor-text-secondary italic leading-relaxed">
											&ldquo;{highlight.quote}&rdquo;
										</p>
										{highlight.author ? (
											<footer className="text-cursor-text-faint text-xs mt-1.5 font-medium text-right">
												&mdash; {highlight.author}
											</footer>
										) : null}
									</blockquote>
								))}
							</div>
						</section>
					) : null}

					{recap.resources && recap.resources.length > 0 ? (
						<section className="space-y-4">
							<div className="flex items-center gap-2 border-b border-cursor-border pb-2">
								<LinkIcon className="w-4 h-4 text-cursor-accent-green" aria-hidden="true" />
								<h2 className="text-sm font-semibold uppercase tracking-wider text-cursor-text-secondary">
									{t('recap.resources')}
								</h2>
							</div>
							<ul className="space-y-2">
								{recap.resources.map((resource) => (
									<li key={resource.url}>
										<a
											href={resource.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-cursor-text hover:text-cursor-text-secondary transition-colors inline-flex items-center gap-1.5"
										>
											{resource.label}
											<LinkIcon className="w-3.5 h-3.5 text-cursor-text-muted" aria-hidden="true" />
										</a>
									</li>
								))}
							</ul>
						</section>
					) : null}
				</motion.aside>
			</div>

			{related.length > 0 ? (
				<section aria-labelledby="recap-related" className="pt-8 border-t border-cursor-border">
					<h2 id="recap-related" className="text-xl font-semibold text-cursor-text mb-4">
						{t('recap.relatedHeading')}
					</h2>
					<ul className="grid gap-3 sm:grid-cols-2 list-none p-0">
						{related.map((item) => (
							<li key={item.id}>
								<Link
									href={localePath(locale, item.recapPath!)}
									className="group flex items-center justify-between gap-3 bg-[#1B1913] border border-cursor-border rounded-md px-4 py-3 hover:border-cursor-border-emphasis transition-colors"
								>
									<span>
										<span className="block text-sm text-cursor-text">
											{locale === 'en' ? item.title : (item.titleLocal ?? item.title)}
										</span>
										<span className="block text-xs text-cursor-text-muted mt-0.5">
											{item.city} · {item.displayDates?.[locale] ?? item.displayDate}
										</span>
									</span>
									<ArrowRight
										className="w-4 h-4 text-cursor-text-muted shrink-0 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</Link>
							</li>
						))}
					</ul>
					<Link
						href={localePath(locale, 'eventos')}
						className="inline-flex items-center gap-2 mt-4 text-sm text-[#f54e00] hover:underline"
					>
						{t('recap.allEvents')}
						<ArrowRight className="w-4 h-4" aria-hidden="true" />
					</Link>
				</section>
			) : null}

			<section
				aria-labelledby="recap-join"
				className="bg-[#1B1913] border border-cursor-border rounded-md p-6"
			>
				<h2 id="recap-join" className="text-xl font-semibold text-cursor-text mb-2">
					{t('recap.nextStepsHeading')}
				</h2>
				<p className="text-cursor-text-secondary text-sm leading-relaxed mb-5 max-w-2xl">
					{t('recap.nextStepsBody')}
				</p>
				<div className="flex flex-wrap gap-3">
					<a
						href={siteConfig.whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-5 py-2.5 bg-cursor-text text-cursor-bg rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
					>
						{t('recap.joinCommunity')}
						<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
					</a>
					<a
						href={siteConfig.lumaEventsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-5 py-2.5 border border-cursor-border-emphasis text-cursor-text rounded-md hover:bg-white/5 transition-colors text-sm font-medium"
					>
						{t('recap.seeUpcoming')}
						<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
					</a>
				</div>
			</section>
		</div>
	);
};

export default EventRecap;
