'use client'

import { Box, Container, Heading, SimpleGrid, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react'
import { FaFileAlt, FaEnvelope, FaUserTie } from 'react-icons/fa'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Home({ params }: { params: { locale: string } }) {
  const { t, i18n } = useTranslation('common')
  const locale = params.locale || 'fr'
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  const features = [
    {
      title: t('cv.title'),
      description: t('welcome'),
      icon: FaFileAlt,
      href: `/${locale}/cv`
    },
    {
      title: t('lettre.title'),
      description: t('lettre.subtitle'),
      icon: FaEnvelope,
      href: `/${locale}/lettre`
    },
    {
      title: t('assistant'),
      description: t('chat.welcome_cv'),
      icon: FaUserTie,
      href: `/${locale}/coaching`
    }
  ]

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl" color="redCross.500">
              Job Coach AI
            </Heading>
            <Text fontSize="xl" color="gray.600">
              {t('welcome')}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {features.map((feature, index) => (
              <Link href={feature.href} key={index} style={{ textDecoration: 'none' }}>
                <Box
                  p={8}
                  bg={cardBg}
                  rounded="xl"
                  shadow="lg"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                  border="2px solid"
                  borderColor="redCross.100"
                >
                  <VStack spacing={4}>
                    <Box
                      p={4}
                      rounded="full"
                      bg="redCross.500"
                      color="white"
                    >
                      <feature.icon size={24} />
                    </Box>
                    <Heading as="h3" size="md" color="redCross.500">
                      {feature.title}
                    </Heading>
                    <Text textAlign="center" color="gray.600">
                      {feature.description}
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
} 