'use client'

import { Box, Flex, HStack, Link, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { t, i18n } = useTranslation('common')
  const pathname = usePathname()
  
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const currentLang = i18n.language || 'fr'
  
  // Options de navigation
  const navItems = [
    { key: 'home', label: t('header.home'), href: `/${currentLang}` },
    { key: 'cv', label: t('header.cv'), href: `/${currentLang}/cv` },
    { key: 'lettre', label: t('header.lettre'), href: `/${currentLang}/lettre` },
  ]

  // Déterminer si le lien est actif
  const isActive = (path: string) => {
    return pathname === path || (path !== `/${currentLang}` && pathname?.startsWith(path))
  }

  return (
    <Box 
      as="nav" 
      bg={bg} 
      px={4} 
      py={3} 
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box fontWeight="bold" fontSize="xl">Alberthon</Box>
          <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                as={NextLink}
                href={item.href}
                fontWeight={isActive(item.href) ? 'semibold' : 'normal'}
                color={isActive(item.href) ? 'blue.500' : 'inherit'}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.400',
                }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </HStack>
        <LanguageSwitcher />
      </Flex>
    </Box>
  )
} 