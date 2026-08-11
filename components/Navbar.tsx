'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { localePath } from '@/lib/locale'
import LanguageToggle from '@/components/LanguageToggle'
import { siteConfig } from '@/content/site.config'

function useScrollState() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrolled }
}

export default function Navbar() {
  const { t, locale } = useI18n()
  const { scrolled } = useScrollState()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: localePath(locale, 'agenda'), key: 'nav.agenda', external: false },
    { href: localePath(locale, 'eventos'), key: 'nav.events', external: false },
    { href: siteConfig.lumaEventsUrl, key: 'nav.upcomingEvents', external: true },
  ] as const

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled
            ? 'bg-cursor-bg  border-b border-cursor-border'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center h-16">
          <Link
            href={localePath(locale, '/')}
            className="flex items-center gap-3 group"
            aria-label={`${siteConfig.communityName} — ${t('nav.home')}`}
          >
            <Image
              src="/cursor-logo.svg"
              alt=""
              aria-hidden="true"
              width={100}
              height={28}
              priority
              className="h-6 md:h-7 w-auto transition-transform group-hover:scale-105"
            />
            <span className="font-cursor text-base md:text-lg font-semibold uppercase tracking-wide text-cursor-text-secondary">
              {t('nav.communityName')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, key, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cursor-text-muted hover:text-cursor-text transition-colors"
                >
                  {t(key)}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-cursor-text-muted hover:text-cursor-text transition-colors"
                >
                  {t(key)}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full bg-white text-cursor-bg hover:bg-cursor-text hover:text-cursor-bg transition-colors"
            >
              {t('nav.joinUs')}
            </a>
            <LanguageToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-cursor-text-muted hover:text-cursor-text transition-colors"
              aria-label={t('nav.toggleMenu')}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-cursor-bg backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12 px-4">
            {navLinks.map(({ href, key, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="text-xl text-cursor-text-muted hover:text-cursor-text transition-colors"
                >
                  {t(key)}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="text-xl text-cursor-text-muted hover:text-cursor-text transition-colors"
                >
                  {t(key)}
                </Link>
              ),
            )}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="text-base font-medium px-6 py-3 rounded-full bg-white text-cursor-bg hover:bg-cursor-text transition-colors"
            >
              {t('nav.joinUs')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
