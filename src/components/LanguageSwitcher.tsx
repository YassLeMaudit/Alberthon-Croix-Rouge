'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Box, Select, useColorModeValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { t, i18n } = useTranslation('common')
  const bg = useColorModeValue('white', 'gray.700')

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    const currentLocale = i18n.language
    
    // Changer la langue dans i18next
    i18n.changeLanguage(newLocale)
    
    // Construire la nouvelle URL avec la nouvelle locale
    if (pathname) {
      // Obtenir le chemin actuel sans la locale
      let pathWithoutLocale = pathname
      const localePattern = /^\/([^\/]+)(\/.*)?$/
      const match = pathname.match(localePattern)
      
      if (match) {
        const [, locale, rest] = match
        pathWithoutLocale = rest || ''
      }
      
      // Construire le nouveau chemin avec la nouvelle locale
      const newPath = `/${newLocale}${pathWithoutLocale}`
      router.push(newPath)
    } else {
      // Si pas de chemin, rediriger vers la page d'accueil avec la nouvelle locale
      router.push(`/${newLocale}`)
    }
  }

  return (
    <Box ml={2}>
      <Select
        size="sm"
        onChange={changeLanguage}
        value={i18n.language}
        variant="filled"
        bg={bg}
        borderRadius="md"
        w="auto"
        icon={<></>}
      >
        <option value="fr">{t('languages.fr')}</option>
        <option value="en">{t('languages.en')}</option>
        <option value="fa">{t('languages.fa')}</option>
        <option value="ku">{t('languages.ku')}</option>
        <option value="zh">{t('languages.zh')}</option>
      </Select>
    </Box>
  )
} 