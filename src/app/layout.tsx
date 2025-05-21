'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'


// Initialiser i18n
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonFr from '../../public/locales/fr/common.json'
import commonEn from '../../public/locales/en/common.json'
import commonFa from '../../public/locales/fa/common.json'
import commonKu from '../../public/locales/ku/common.json'
import commonZh from '../../public/locales/zh/common.json'

// Initialiser i18n une seule fois
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        fr: { common: commonFr },
        en: { common: commonEn },
        fa: { common: commonFa },
        ku: { common: commonKu },
        zh: { common: commonZh }
      },
      lng: 'fr',
      fallbackLng: 'fr',
      interpolation: { escapeValue: false },
    })
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={i18n.language}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 