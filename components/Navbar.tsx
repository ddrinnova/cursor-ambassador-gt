'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import LanguageToggle from '@/components/LanguageToggle'
import { siteConfig } from '@/content/site.config'

const NAV_LINKS = [
  { href: 'https://luma.com/cursor-guatemala', key: 'nav.upcomingEvents' },
  { href: '#recaps', key: 'nav.pastEvents' },
] as const

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
  const { t } = useI18n()
  const { scrolled } = useScrollState()
  const [mobileOpen, setMobileOpen] = useState(false)

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
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/cursor-logo.svg"
              alt="Cursor"
              width={100}
              height={28}
              priority
              className="h-6 md:h-7 w-auto transition-transform group-hover:scale-105"
            />
            <span className="font-cursor text-base md:text-lg font-semibold uppercase tracking-wide text-cursor-text-secondary">
              {t('nav.communityName')}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-cursor-text-muted hover:text-cursor-text transition-colors"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={siteConfig.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full bg-white text-cursor-bg hover:bg-cursor-text hover:text-cursor-bg transition-colors"
            >
              {t('nav.joinUs')}
            </a>
            <LanguageToggle />

            {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-cursor-bg backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12 px-4">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobile}
                className="text-xl text-cursor-text-muted hover:text-cursor-text transition-colors"
              >
                {t(key)}
              </a>
            ))}
            <a
              href={siteConfig.lumaUrl}
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
