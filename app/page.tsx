"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AmbassadorSection from "@/components/AmbassadorSection";
import FeaturedSection from "@/components/FeaturedSection";
import UpcomingEvents from "@/components/UpcomingEvents";
import PastEvents from "@/components/PastEvents";
import GlobalEvents from "@/components/GlobalEvents";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/content/site.config";
import { upcomingEvents } from "@/content/events";
import { ModernMosaic } from "@/components/blocks/modern-mosaic";
import { useI18n } from "@/lib/i18n";

function buildHomeJsonLd() {
  const org = {
    "@type": "Organization",
    name: siteConfig.communityName,
    url: siteConfig.cursorCommunityUrl,
  };

  const eventItems = upcomingEvents.map((event) => ({
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: org,
    ...(event.lumaUrl ? { url: event.lumaUrl } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [org, ...eventItems],
  };
}

const ACTIVITY_KEYS = [
  { key: "cafeCursor", image: "/events/cafe-cursor-gt-5.jpeg" },
  { key: "workshops", image: "/events/cafe-cursor-gt-10.jpeg" },
  { key: "meetups", image: "/events/antigua-cursor-gt-1.jpeg" },
  { key: "hackathons", image: "/events/cursor-hackathon-gt-1.jpeg" },
] as const;

const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-cursor-bg text-cursor-text scroll-smooth">
      <JsonLd data={buildHomeJsonLd()} />
      <Navbar />
      <header className="flex flex-col items-center my-16">
        <div className="flex flex-col items-center max-w-sm py-20">
          <h1 className="text-3xl font-regular text-center mb-2 mt-4">
            {t("hero.title")}
          </h1>
          <p className="text-sm text-center text-cursor-text-secondary mb-6">
            {t("hero.subtitle")}
          </p>
          <div className="flex justify-center gap-2 py-2">
            <a
              href="https://chat.whatsapp.com/B7qvuHRAVg2Bl57CpuhJ41"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cursor-light-bg text-cursor-bg px-4 py-2 rounded-4xl font-medium hover:opacity-90 transition-opacity"
            >
              {t("hero.joinNow")}
            </a>
            <a
              href="https://luma.com/cursor-guatemala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cursor-text border border-white px-4 py-2 rounded-4xl hover:bg-white/10 transition-colors"
            >
              {t("hero.exploreEvents")}
            </a>
          </div>
        </div>
        <ModernMosaic />
      </header>
      <section className="max-w-6xl mx-auto px-10 py-16 md:py-24">
        <div>
          <h3 className=" max-w-xs text-2xl font-regular  mb-2 mt-4">
            {t("activities.heading")}
          </h3>
          <p className="max-w-xs text-sm  text-cursor-text-secondary mb-8">
            {t("activities.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACTIVITY_KEYS.map(({ key, image }) => (
            <div key={key} className="flex flex-col">
              <div className="relative aspect-3/4 w-full rounded-sm overflow-hidden mb-4">
                <Image
                  src={image}
                  alt={t(`activities.${key}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  unoptimized
                />
              </div>
              <h4 className="text-base font-semibold text-cursor-text mb-1">
                {t(`activities.${key}.title`)}
              </h4>
              <p className="text-sm text-cursor-text-secondary leading-relaxed mb-6">
                {t(`activities.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-17 py-16 md:py-24">
        <AmbassadorSection />
        <UpcomingEvents />
        <SectionDivider />
        <PastEvents />
        <FeaturedSection />
        <SectionDivider />
        <GlobalEvents />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
