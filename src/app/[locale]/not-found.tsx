'use client'

import { Box, Container, Heading, Text, Button, Center, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export default function NotFoundPage({ params }: { params: { locale: string } }) {
  const { t } = useTranslation('common')
  const locale = params?.locale || 'fr'
  const router = useRouter()
  
  return (
    <Container maxW="container.lg" py={20}>
      <Center>
        <VStack spacing={8} textAlign="center">
          <Heading size="4xl">404</Heading>
          <Heading size="xl">Page non trouvée</Heading>
          <Text>La page que vous recherchez n'existe pas ou a été déplacée.</Text>
          <Button 
            colorScheme="red" 
            onClick={() => router.push(`/${locale}`)}
          >
            Retour à l'accueil
          </Button>
        </VStack>
      </Center>
    </Container>
  )
} 