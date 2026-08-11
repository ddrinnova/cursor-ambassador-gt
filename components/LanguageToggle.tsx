'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';
import { localePath, splitLocalePath } from '@/lib/locale';

const LanguageToggle: React.FC = () => {
	const { locale, t } = useI18n();
	const pathname = usePathname();

	if (siteConfig.locales.length <= 1) {
		return null;
	}

	const { path } = splitLocalePath(pathname ?? '/');

	return (
		<nav aria-label={t('nav.languageLabel')} className="flex items-center gap-2">
			{siteConfig.locales.map((localeCode) => {
				const isActive = locale === localeCode;

				return (
					<Link
						key={localeCode}
						href={localePath(localeCode, path)}
						hrefLang={localeCode}
						aria-current={isActive ? 'true' : undefined}
						className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
							isActive ? 'bg-cursor-text text-cursor-bg' : 'text-cursor-text-muted hover:text-cursor-text'
						}`}
					>
						{localeCode.toUpperCase()}
					</Link>
				);
			})}
		</nav>
	);
};

export default LanguageToggle;
