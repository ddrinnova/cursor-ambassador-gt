import React from 'react';
import { faqByLocale } from '@/content/faq';
import { createTranslator, type Locale } from '@/lib/locale';

const FaqSection: React.FC<{ locale: Locale }> = ({ locale }) => {
	const t = createTranslator(locale);
	const entries = faqByLocale[locale];

	return (
		<section aria-labelledby="faq-heading" className="mb-16">
			<h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-cursor-text mb-6">
				{t('faq.heading')}
			</h2>
			<dl className="grid gap-4 md:grid-cols-2">
				{entries.map((entry) => (
					<div
						key={entry.question}
						className="bg-[#1B1913] border border-cursor-border rounded-md p-5 transition-colors hover:border-cursor-border-emphasis"
					>
						<dt className="text-cursor-text font-medium mb-2">{entry.question}</dt>
						<dd className="text-cursor-text-secondary text-sm leading-relaxed">{entry.answer}</dd>
					</div>
				))}
			</dl>
		</section>
	);
};

export default FaqSection;
