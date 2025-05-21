'use client'

import { useEffect } from 'react'
import '../../i18n'
import i18n from 'i18next'
import Header from '@/components/Header'

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <>
      <Header />
      {children}
    </>
  )
} 