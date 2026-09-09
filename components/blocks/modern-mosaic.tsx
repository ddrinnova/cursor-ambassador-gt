"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface CarouselImage {
  src: string;
  label: string;
  alt: string;
}

const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    src: "/events/antigua-cursor-gt-2.jpeg",
    label: "Meetup",
    alt: "Asistentes al Cursor Meetup Antigua Guatemala durante una charla",
  },
  {
    src: "/events/cafe-cursor-gt-5.jpeg",
    label: "Café Cursor",
    alt: "Sesión de trabajo colaborativo en Café Cursor Guatemala",
  },
  {
    src: "/events/antigua-cursor-gt-1.jpeg",
    label: "Meetup",
    alt: "Foto grupal del Cursor Meetup Antigua Guatemala",
  },
  {
    src: "/events/cafe-cursor-gt-1.jpeg",
    label: "Café Cursor",
    alt: "Participantes programando en Café Cursor Guatemala",
  },
  {
    src: "/events/primer-meetup-cursor-gt-1.jpeg",
    label: "Meetup",
    alt: "Asistentes al primer meetup de Cursor en Ciudad de Guatemala",
  },
  {
    src: "/events/cafe-cursor-gt-3.jpeg",
    label: "Café Cursor",
    alt: "Reto Advent of Prompt en Café Cursor Guatemala",
  },
  {
    src: "/events/antigua-cursor-gt-10.jpeg",
    label: "Meetup",
    alt: "Materiales y snacks del Cursor Meetup Antigua Guatemala",
  },
  {
    src: "/events/cafe-cursor-gt-10.jpeg",
    label: "Café Cursor",
    alt: "Comunidad de developers reunida en Café Cursor Guatemala",
  },
  {
    src: "/events/primer-meetup-cursor-gt-2.jpeg",
    label: "Meetup",
    alt: "Foto grupal del primer meetup de Cursor en Guatemala",
  },
  {
    src: "/events/cafe-cursor-gt-7.jpeg",
    label: "Café Cursor",
    alt: "Presentación del reto Advent of Prompt en Café Cursor Guatemala",
  },
  {
    src: "/events/cursor-hackathon-gt-1.jpeg",
    label: "Hackathon",
    alt: "Auditorio lleno en el Cursor Hackathon Guatemala en la Universidad del Valle de Guatemala",
  },
  {
    src: "/events/cursor-hackathon-gt-4.jpeg",
    label: "Hackathon",
    alt: "Equipos construyendo prototipos durante el Cursor Hackathon Guatemala",
  },
  {
    src: "/events/Tec-Co-work-Day/21bf65fc-d802-4934-81bf-04122ae9f790.JPG",
    label: "Coworking",
    alt: "Asistentes en el Cursor Coworking Day Guatemala en Campus TEC",
  },
];

export const ModernMosaic = ({ label }: { label: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);

  // Auto-scroll animation
  const animate = useCallback(() => {
    const container = scrollRef.current;
    if (!container || isPaused || isDragging) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    container.scrollLeft += speedRef.current;

    // Reset to start for seamless infinite loop
    const halfScroll = container.scrollWidth / 2;
    if (container.scrollLeft >= halfScroll) {
      container.scrollLeft -= halfScroll;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isDragging]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Duplicate images for seamless looping
  const allImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <section
      aria-label={label}
      className="relative w-full py-4 overflow-hidden bg-cursor-bg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      {/* Left fade gradient */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-linear-to-r from-cursor-bg to-transparent" />
      {/* Right fade gradient */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-linear-to-l from-cursor-bg to-transparent" />

      {/* Scrollable carousel track */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-3 overflow-x-hidden cursor-grab active:cursor-grabbing select-none px-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allImages.map((img, index) => (
          <motion.div
            key={`${img.src}-${index}`}
            className="relative shrink-0 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
          >
            <div className="relative w-[280px] h-[200px] sm:w-[340px] sm:h-[240px] md:w-[420px] md:h-[280px] lg:w-[500px] lg:h-[340px] rounded-sm overflow-hidden">
              <Image
                src={img.src}
                alt={index < CAROUSEL_IMAGES.length ? img.alt : ""}
                aria-hidden={index >= CAROUSEL_IMAGES.length ? true : undefined}
                fill
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 500px"
                draggable={false}
              />
              {/* Subtle bottom gradient for label readability */}
              <motion.div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent" />
            </div>
            {/* Label */}
            <p className="mt-3 text-sm md:text-base text-cursor-text-secondary font-cursor tracking-wide pl-1">
              {img.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
