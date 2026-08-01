'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';

type EventCountdownProps = {
	startsAt: string;
	className?: string;
};

type Remaining = {
	totalMs: number;
	days: number;
	hours: number;
	minutes: number;
};

function getRemaining(startsAt: string): Remaining {
	const totalMs = new Date(startsAt).getTime() - Date.now();
	const clamped = Math.max(0, totalMs);
	const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
	const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((clamped / (1000 * 60)) % 60);
	return { totalMs, days, hours, minutes };
}

const EventCountdown: React.FC<EventCountdownProps> = ({ startsAt, className = '' }) => {
	const { t } = useI18n();
	const [mounted, setMounted] = useState(false);
	const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(startsAt));

	useEffect(() => {
		setMounted(true);
		const tick = () => setRemaining(getRemaining(startsAt));
		tick();
		const id = window.setInterval(tick, 30_000);
		return () => window.clearInterval(id);
	}, [startsAt]);

	// Avoid hydration mismatch: render a stable placeholder until client mount
	if (!mounted) {
		return (
			<span
				className={`inline-flex items-center gap-2 rounded-md border border-[#f54e00]/35 bg-[#f54e00]/10 px-3 py-1.5 text-sm font-medium text-[#f54e00] ${className}`}
				suppressHydrationWarning
			>
				<span className="relative flex h-2 w-2">
					<span className="relative inline-flex h-2 w-2 rounded-full bg-[#f54e00]" />
				</span>
				…
			</span>
		);
	}

	if (remaining.totalMs <= 0) {
		return (
			<span
				className={`inline-flex items-center gap-2 rounded-md border border-cursor-accent-green/30 bg-cursor-accent-green-bg px-3 py-1.5 text-sm text-cursor-accent-green ${className}`}
			>
				<span className="relative flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cursor-accent-green opacity-75" />
					<span className="relative inline-flex h-2 w-2 rounded-full bg-cursor-accent-green" />
				</span>
				{t('countdown.live')}
			</span>
		);
	}

	const totalHours = remaining.days * 24 + remaining.hours;
	let label: string;

	if (remaining.days >= 1) {
		label = t('countdown.daysHours', {
			days: String(remaining.days),
			hours: String(remaining.hours),
		});
	} else if (totalHours >= 1) {
		label = t('countdown.hours', { hours: String(totalHours) });
	} else {
		label = t('countdown.minutes', { minutes: String(Math.max(1, remaining.minutes)) });
	}

	return (
		<span
			className={`inline-flex items-center gap-2 rounded-md border border-[#f54e00]/35 bg-[#f54e00]/10 px-3 py-1.5 text-sm font-medium text-[#f54e00] ${className}`}
		>
			<span className="relative flex h-2 w-2">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f54e00] opacity-75" />
				<span className="relative inline-flex h-2 w-2 rounded-full bg-[#f54e00]" />
			</span>
			{label}
		</span>
	);
};

export default EventCountdown;
