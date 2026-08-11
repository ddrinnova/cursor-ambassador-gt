import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { localePath, type Locale, type Translate } from '@/lib/locale';
import type { CursorEvent } from '@/lib/types';

interface EventListProps {
	events: CursorEvent[];
	locale: Locale;
	t: Translate;
	/** Rendered as h2 on pages where the list is the main content. */
	headingLevel?: 'h2' | 'h3';
}

function eventTitle(event: CursorEvent, locale: Locale) {
	return locale === 'en' ? event.title : (event.titleLocal ?? event.title);
}

function eventDate(event: CursorEvent, locale: Locale) {
	return event.displayDates?.[locale] ?? event.displayDate;
}

const EventList: React.FC<EventListProps> = ({ events, locale, t, headingLevel = 'h3' }) => {
	const Heading = headingLevel;

	return (
		<ul className="space-y-6 -mx-3 sm:mx-0 list-none p-0">
			{events.map((event) => {
				if (!event.recapPath) return null;

				const title = eventTitle(event, locale);
				const hasGallery = event.galleryImages && event.galleryImages.length > 0;
				const href = localePath(locale, event.recapPath);

				return (
					<li key={event.id}>
						<Link href={href} className="block group">
							<article className="relative bg-[#1B1913] border border-cursor-border rounded-none sm:rounded-md overflow-hidden transition-all duration-300 hover:border-[#f54e00]/50 hover:shadow-[0_0_30px_rgba(245,78,0,0.12)] flex flex-col sm:flex-row">
								<div className="pointer-events-none absolute -inset-px sm:rounded-md bg-[radial-gradient(ellipse_at_bottom,rgba(245,78,0,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

								{event.thumbnail ? (
									<div className="relative w-full sm:w-[280px] md:w-[360px] shrink-0">
										<div
											className={`aspect-2/1 sm:aspect-auto sm:h-full overflow-hidden ${hasGallery ? 'grid grid-cols-3 gap-1' : ''}`}
										>
											<div className={`relative ${hasGallery ? 'col-span-2' : ''} sm:h-full`}>
												<Image
													src={event.thumbnail}
													alt={`${title} — ${event.city}, ${eventDate(event, locale)}`}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
													sizes="(max-width: 640px) 100vw, 360px"
												/>
											</div>
											{hasGallery &&
												event.galleryImages!.slice(0, 2).map((img) => (
													<div key={img} className="relative sm:h-full">
														<Image
															src={img}
															alt=""
															aria-hidden="true"
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
															sizes="(max-width: 640px) 33vw, 120px"
														/>
													</div>
												))}
										</div>
										{event.host ? (
											<div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
												<Image
													src={event.host.logo}
													alt={t('footer.partnerLogoAlt', { name: event.host.name })}
													width={20}
													height={20}
													className="rounded-full"
												/>
												<span className="text-xs text-white">{event.host.name}</span>
											</div>
										) : null}
									</div>
								) : null}

								<div className="px-5 py-5 sm:p-6 flex flex-col justify-center grow">
									<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-1.5">
										{t(`events.formats.${event.format}`)}
									</p>
									<Heading className="text-lg md:text-xl text-cursor-text font-medium mb-1.5">
										{title}
									</Heading>
									<div className="flex flex-wrap items-center gap-3 text-sm text-cursor-text-muted mb-3">
										<span className="flex items-center gap-1.5">
											<Calendar className="w-4 h-4" aria-hidden="true" />
											<time dateTime={event.date}>{eventDate(event, locale)}</time>
										</span>
										<span className="flex items-center gap-1.5">
											<MapPin className="w-4 h-4" aria-hidden="true" />
											{event.city}
										</span>
										{event.attendees ? (
											<span className="flex items-center gap-1.5">
												<Users className="w-4 h-4" aria-hidden="true" />
												{t('home.attendees', { count: String(event.attendees) })}
											</span>
										) : null}
									</div>
									<span className="flex items-center gap-2 text-sm text-[#f54e00] mt-2">
										{t('home.viewRecap')}
										<ArrowRight
											className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out"
											aria-hidden="true"
										/>
									</span>
								</div>
							</article>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default EventList;
