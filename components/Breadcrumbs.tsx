import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { localePath, type Locale } from '@/lib/locale';
import type { BreadcrumbItem } from '@/lib/schema';

interface BreadcrumbsProps {
	locale: Locale;
	items: BreadcrumbItem[];
	label: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ locale, items, label }) => {
	return (
		<nav aria-label={label} className="text-sm text-cursor-text-muted">
			<ol className="flex flex-wrap items-center gap-1.5 list-none p-0">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<li key={item.path} className="flex items-center gap-1.5">
							{isLast ? (
								<span aria-current="page" className="text-cursor-text-secondary">
									{item.name}
								</span>
							) : (
								<Link href={localePath(locale, item.path)} className="hover:text-cursor-text transition-colors">
									{item.name}
								</Link>
							)}
							{!isLast ? <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" /> : null}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
