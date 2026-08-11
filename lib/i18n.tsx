'use client';

import React, { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { siteConfig } from '@/content/site.config';
import { createTranslator, languageTags, type Locale, type Translate } from '@/lib/locale';

type I18nValue = {
	locale: Locale;
	t: Translate;
};

const I18nContext = createContext<I18nValue>({
	locale: siteConfig.defaultLocale,
	t: createTranslator(siteConfig.defaultLocale),
});

type I18nProviderProps = {
	locale: Locale;
	children: ReactNode;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ locale, children }) => {
	const value = useMemo(() => ({ locale, t: createTranslator(locale) }), [locale]);

	// The root layout is shared by both language trees, so the document language
	// is corrected here for the non-default locale.
	useEffect(() => {
		document.documentElement.lang = languageTags[locale];
	}, [locale]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nValue {
	return useContext(I18nContext);
}
