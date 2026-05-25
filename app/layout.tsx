import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import JsonLd from '@/components/JsonLd';
import { I18nProvider } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { buildRootMetadata, buildSiteJsonLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang={siteConfig.defaultLocale}>
			<body className="antialiased">
				<JsonLd data={buildSiteJsonLd()} />
				<I18nProvider>{children}</I18nProvider>
				<Analytics />
			</body>
		</html>
	);
}
