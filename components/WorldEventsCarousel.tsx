'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPhotos } from '@/lib/photos';
import { useI18n } from '@/lib/i18n';

const WorldEventsCarousel: React.FC = () => {
	const { t, locale } = useI18n();
	const photos = getPhotos();
	const [currentIndex, setCurrentIndex] = useState(0);

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % photos.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
	};

	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
			{/* Main Photo Display Area */}
			<div className="relative flex-1 aspect-4/3 sm:aspect-16/10 md:aspect-video rounded-lg overflow-hidden bg-black/40 group">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: 0.3 }}
						className="relative w-full h-full"
					>
						<Image
							src={currentPhoto.src}
							alt={currentPhoto.alt}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 60vw"
							priority
							unoptimized
						/>
					</motion.div>
				</AnimatePresence>

				{/* Navigation Overlay Arrows */}
				<div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
					<button
						onClick={handlePrev}
						className="pointer-events-auto bg-black/60 hover:bg-black/80 border border-white/10 rounded-full p-2 text-white hover:scale-105 transition-all"
						aria-label={t('worldEvents.prevImage')}
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						onClick={handleNext}
						className="pointer-events-auto bg-black/60 hover:bg-black/80 border border-white/10 rounded-full p-2 text-white hover:scale-105 transition-all"
						aria-label={t('worldEvents.nextImage')}
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>

				{/* Top Host/Location Badge on Image */}
				<div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
					<MapPin className="w-3.5 h-3.5 text-[#f54e00]" />
					<span className="text-xs font-medium text-white">{currentPhoto.location}</span>
				</div>
			</div>

			{/* Info & Navigation Details Pane */}
			<div className="w-full lg:w-[320px] flex flex-col justify-between py-1">
				<div>
					<div className="flex items-center gap-2 text-cursor-text-secondary text-xs uppercase tracking-wider mb-2">
						<Calendar className="w-3.5 h-3.5 text-cursor-text-muted" />
						<span>{currentPhoto.dates?.[locale] ?? currentPhoto.date}</span>
					</div>
					<h3 className="text-lg font-semibold text-cursor-text mb-3 leading-snug">
						{currentPhoto.alt}
					</h3>
					<p className="text-sm text-cursor-text-muted leading-relaxed mb-4">
						{t('worldEvents.carouselDescription', { location: currentPhoto.location })}
					</p>
					{currentPhoto.recapPath && (
						<Link
							href={currentPhoto.recapPath}
							className="inline-flex items-center gap-2 text-sm text-[#f54e00] hover:text-[#f54e00]/80 transition-colors font-medium mb-6 group"
						>
							<span>{t('home.viewRecap')}</span>
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
						</Link>
					)}
				</div>

				{/* Thumbnails Row */}
				<div>
					<p className="text-xs font-semibold text-cursor-text-muted uppercase tracking-wider mb-3">
						{t('worldEvents.galleryLabel')}
					</p>
					<div className="flex gap-2.5 overflow-x-auto pb-1">
						{photos.map((photo, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`relative w-16 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
									index === currentIndex
										? 'border-[#f54e00] scale-95 shadow-md shadow-[#f54e00]/25'
										: 'border-transparent hover:border-white/20'
								}`}
							>
								<Image
									src={photo.src}
									alt={photo.alt}
									fill
									className="object-cover"
									sizes="64px"
									unoptimized
								/>
								<div className={`absolute inset-0 bg-black/30 transition-opacity ${
									index === currentIndex ? 'opacity-0' : 'opacity-40 hover:opacity-10'
								}`} />
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorldEventsCarousel;
