import type { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/content/site.config';
import { buildRootMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang={siteConfig.defaultLocale}>
			<body className="antialiased">
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
						title="Google Tag Manager"
					/>
				</noscript>

				{children}

				{/* Google Tag Manager */}
				<Script id="google-tag-manager" strategy="afterInteractive">
					{`
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${siteConfig.gtmId}');
					`}
				</Script>

				{/* Google Analytics (gtag.js) */}
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${siteConfig.gaId}');
					`}
				</Script>
			</body>
		</html>
	);
}
