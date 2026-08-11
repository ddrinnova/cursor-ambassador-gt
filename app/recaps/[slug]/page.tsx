import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecapPage from '@/components/pages/RecapPage';
import { recapsBySlug } from '@/content/recaps';
import { recapMetadata, recapSlugs } from '@/lib/recaps';

const locale = 'es';

interface PageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return recapSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const recap = recapsBySlug[slug];

	return recap ? recapMetadata(recap, locale) : {};
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const recap = recapsBySlug[slug];

	if (!recap) {
		notFound();
	}

	return <RecapPage recap={recap} locale={locale} />;
}
