'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ambassadors } from '@/content/ambassadors';
import { useI18n } from '@/lib/i18n';
import type { Ambassador } from '@/lib/types';

function primaryLink(links: Ambassador['links']) {
	return links.linkedin ?? links.website ?? links.github ?? links.x;
}

type AvatarProps = {
	ambassador: Ambassador;
};

const TeamAvatar: React.FC<AvatarProps> = ({ ambassador }) => {
	const { t } = useI18n();
	const href = primaryLink(ambassador.links);
	const className =
		'relative block w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-cursor-border bg-cursor-bg-dark transition-transform duration-300 group-hover:scale-110 group-hover:z-10 group-hover:border-cursor-border-emphasis focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor-accent-blue';
	const groupLabel =
		ambassador.group === 'builder'
			? t('ambassadors.buildersLabel')
			: t('ambassadors.ambassadorsLabel');
	const ariaLabel = [ambassador.name, groupLabel, ambassador.role].filter(Boolean).join(', ');

	const photo = (
		<Image
			src={ambassador.photo}
			alt={ambassador.name}
			fill
			className="object-cover"
			style={{ objectPosition: ambassador.photoPosition ?? 'center top' }}
			sizes="112px"
		/>
	);

	return (
		<li className="relative group list-none shrink-0">
			{href ? (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={className}
					aria-label={ariaLabel}
				>
					{photo}
				</a>
			) : (
				<div className={className} aria-label={ariaLabel}>
					{photo}
				</div>
			)}

			<div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-max max-w-[12rem] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
				<div className="rounded-md bg-cursor-surface border border-cursor-border px-2.5 py-1.5 text-center shadow-lg">
					<p className="text-xs font-medium text-cursor-text leading-snug">
						{ambassador.name.trim()}
					</p>
					<p className="text-[10px] text-cursor-text-muted leading-snug mt-0.5">{groupLabel}</p>
					{ambassador.role ? (
						<p className="text-[10px] text-cursor-text-faint leading-snug mt-0.5">
							{ambassador.role}
						</p>
					) : null}
				</div>
			</div>
		</li>
	);
};

const AmbassadorSection: React.FC = () => {
	const { t } = useI18n();

	if (ambassadors.length === 0) {
		return null;
	}

	const loop = [...ambassadors, ...ambassadors, ...ambassadors, ...ambassadors];

	return (
		<motion.section
			aria-labelledby="ambassadors-heading"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16"
		>
			<p className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-2 text-center">
				{t('ambassadors.subtitle')}
			</p>
			<h2
				id="ambassadors-heading"
				className="text-2xl md:text-3xl font-bold text-cursor-text mb-8 text-center"
			>
				{t('ambassadors.heading')}
			</h2>

			<div className="relative overflow-hidden">
				<div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 z-10 bg-gradient-to-r from-cursor-bg to-transparent" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 z-10 bg-gradient-to-l from-cursor-bg to-transparent" />

				<ul className="team-marquee flex w-max items-start gap-6 md:gap-8 py-2 pb-16">
					{loop.map((ambassador, index) => (
						<TeamAvatar key={`${ambassador.name}-${index}`} ambassador={ambassador} />
					))}
				</ul>
			</div>

			<p className="mt-2 text-sm text-cursor-text-faint text-center">
				{t('ambassadors.meta', { count: String(ambassadors.length) })}
			</p>
		</motion.section>
	);
};

export default AmbassadorSection;
