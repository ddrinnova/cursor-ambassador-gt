'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { localePath } from '@/lib/locale';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import Partners from '@/components/Partners';

const Footer: React.FC = () => {
	const { t, locale } = useI18n();
	const nextEvent = upcomingEvents[0];

	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mt-24 pt-8 border-t border-cursor-border"
		>
			<Partners />

			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
				{/* Branding */}
				<div>
					<div className="flex items-center gap-2 mb-2">
						<Image
							src="/cursor-logo.svg"
							alt=""
							aria-hidden="true"
							width={90}
							height={24}
							className="h-5 w-auto"
						/>
						<span className="text-cursor-text-muted text-sm">
							{siteConfig.communityNameLocal}
						</span>
					</div>
				<p className="text-cursor-text-muted text-sm leading-relaxed">
					{t('footer.madeWith')}
				</p>
				</div>

				{/* Community links */}
				<nav aria-label={siteConfig.communityName} className="flex flex-col gap-2.5">
					<Link
						href={localePath(locale, 'eventos')}
						className="text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors"
					>
						{t('events.heading')}
					</Link>
					<a
						href={siteConfig.lumaEventsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors inline-flex items-center gap-1.5"
					>
						{t('footer.allEvents')}
						<ExternalLink className="w-3 h-3" aria-hidden="true" />
					</a>
					<a
						href={siteConfig.whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors inline-flex items-center gap-1.5"
					>
						{t('recap.joinCommunity')}
						<ExternalLink className="w-3 h-3" aria-hidden="true" />
					</a>
					<a
						href={siteConfig.cursorCommunityUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors inline-flex items-center gap-1.5"
					>
						{t('footer.community')}
						<ExternalLink className="w-3 h-3" aria-hidden="true" />
					</a>
					<a
						href={siteConfig.cursorXUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-cursor-text-secondary hover:text-cursor-text transition-colors inline-flex items-center gap-1.5"
					>
						{t('footer.followUs')}
						<ExternalLink className="w-3 h-3" aria-hidden="true" />
					</a>
				</nav>

				{/* CTA */}
				<div className="md:text-right">
					<a
						href={nextEvent?.lumaUrl ?? siteConfig.lumaEventsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f54e00] text-white rounded-md hover:bg-[#e04500] transition-colors text-sm font-medium"
					>
						{t('footer.joinNext')}
						<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
					</a>
				</div>
			</div>

		<p className="text-cursor-text-faint text-xs text-center mt-10 pb-6">
			{t('footer.madeWith')}
		</p>
		</motion.footer>
	);
};

export default Footer;
