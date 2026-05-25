'use client';

import React, { ReactNode, useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { siteConfig } from '@/content/site.config';
import { localeBundles } from '@/content/locales';

const resources = Object.fromEntries(
	Object.entries(localeBundles).map(([lng, translation]) => [lng, { translation }]),
);

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources,
		lng: siteConfig.defaultLocale,
		fallbackLng: siteConfig.defaultLocale,
		interpolation: {
			escapeValue: false,
			prefix: '{',
			suffix: '}',
		},
	});
}

type I18nProviderProps = {
	children: ReactNode;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
	useEffect(() => {
		const savedLocale = localStorage.getItem('locale');
		if (savedLocale && siteConfig.locales.includes(savedLocale)) {
			void i18n.changeLanguage(savedLocale);
		}
	}, []);

	useEffect(() => {
		const syncLocale = (lng: string) => {
			document.documentElement.lang = lng;
			localStorage.setItem('locale', lng);
		};

		syncLocale(i18n.language);
		i18n.on('languageChanged', syncLocale);
		return () => {
			i18n.off('languageChanged', syncLocale);
		};
	}, []);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export function useI18n() {
	const { t, i18n: i18nInstance } = useTranslation();

	return {
		locale: i18nInstance.language,
		setLocale: (nextLocale: string) => {
			if (siteConfig.locales.includes(nextLocale)) {
				void i18nInstance.changeLanguage(nextLocale);
			}
		},
		t: (key: string, params?: Record<string, string>) => t(key, params),
	};
}
