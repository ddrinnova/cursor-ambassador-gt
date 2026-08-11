'use client';

import React from 'react';
import Image from 'next/image';
import { partners } from '@/content/partners';
import { useI18n } from '@/lib/i18n';

const Partners: React.FC = () => {
	const { t } = useI18n();

	if (partners.length === 0) {
		return null;
	}

	return (
		<div className="mb-8">
			<h3 className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-4">
				{t('footer.hostingPartners')}
			</h3>
		<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
			{partners.map((partner) => (
				<a
					key={partner.name}
					href={partner.url}
					target="_blank"
					rel="noopener noreferrer"
					className="border border-cursor-border rounded-lg overflow-hidden flex flex-col hover:border-cursor-border-emphasis transition-colors group"
				>
					<div
						className="w-full flex items-center justify-center px-6 py-5"
						style={{ backgroundColor: partner.logoBg ?? '#ffffff' }}
					>
						<div className={`relative ${partner.logoHeight ?? 'h-14'} w-full`}>
							<Image
								src={partner.logo}
								alt={t('footer.partnerLogoAlt', { name: partner.name })}
								fill
								className="object-contain"
								sizes="(max-width: 768px) 45vw, 30vw"
								unoptimized
							/>
						</div>
					</div>
					<div className="bg-cursor-bg-dark px-3 py-2">
						<span className="text-[11px] text-cursor-text-muted group-hover:text-cursor-text transition-colors">{partner.name}</span>
					</div>
				</a>
			))}
		</div>
		</div>
	);
};

export default Partners;
