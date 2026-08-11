import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/site.config';
import { createTranslator, localePath } from '@/lib/locale';

const locale = siteConfig.defaultLocale;
const t = createTranslator(locale);

export const metadata: Metadata = {
	title: { absolute: `${t('seo.notFoundTitle')} | ${siteConfig.communityName}` },
	description: t('seo.notFoundDescription'),
	robots: { index: false, follow: true },
};

const NotFound: React.FC = () => {
	return (
		<main className="min-h-screen bg-cursor-bg text-cursor-text flex flex-col items-center justify-center px-6 text-center">
			<Image
				src="/cursor-logo.svg"
				alt=""
				aria-hidden="true"
				width={120}
				height={32}
				className="h-8 w-auto mb-12 opacity-40"
			/>
			<p className="text-6xl md:text-8xl font-bold tracking-tight text-cursor-text-faint mb-4">404</p>
			<h1 className="text-2xl md:text-3xl font-regular text-cursor-text mb-3">
				{t('seo.notFoundTitle')}
			</h1>
			<p className="text-cursor-text-muted text-base mb-8 max-w-md">{t('notFound.message')}</p>
			<div className="flex flex-wrap justify-center gap-3">
				<Link
					href={localePath(locale, '/')}
					className="inline-flex items-center gap-2 px-5 py-2.5 bg-cursor-text text-cursor-bg rounded-md hover:bg-cursor-text-muted transition-colors text-sm font-medium"
				>
					{t('notFound.backHome', { communityName: siteConfig.communityName })}
				</Link>
				<Link
					href={localePath(locale, 'eventos')}
					className="inline-flex items-center gap-2 px-5 py-2.5 border border-cursor-border-emphasis text-cursor-text rounded-md hover:bg-white/5 transition-colors text-sm font-medium"
				>
					{t('events.heading')}
				</Link>
			</div>
		</main>
	);
};

export default NotFound;
