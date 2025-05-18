'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { i18n } = useTranslation()
  
  // Vérifier si la locale est valide (fr, en, fa, ku, zh)
  const validLocales = ['fr', 'en', 'fa', 'ku', 'zh']
  const validLocale = validLocales.includes(locale) ? locale : 'fr'

  // Changer la langue en fonction du paramètre locale
  useEffect(() => {
    // S'assurer que la langue est chargée et appliquée
    const handleLanguageChange = async () => {
      if (i18n.language !== validLocale) {
        await i18n.changeLanguage(validLocale)
        document.documentElement.lang = validLocale
        document.documentElement.dir = validLocale === 'fa' || validLocale === 'ku' ? 'rtl' : 'ltr'
      }
    }
    
    handleLanguageChange()
  }, [validLocale, i18n])

  return (
    <>
      <Header />
      {children}
    </>
  )
} 