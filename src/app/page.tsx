'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, Heading, SimpleGrid, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react'
import { FaFileAlt, FaEnvelope, FaUserTie } from 'react-icons/fa'
import Link from 'next/link'

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirection vers la langue par défaut (fr)
    router.replace('/fr')
  }, [router])
  
  // Page vide pour la redirection
  return null
}

export function Home() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  const features = [
    {
      title: 'Création de CV',
      description: 'Créez un CV professionnel avec l\'aide de notre IA',
      icon: FaFileAlt,
      href: '/cv'
    },
    {
      title: 'Lettre de Motivation',
      description: 'Rédigez une lettre de motivation personnalisée',
      icon: FaEnvelope,
      href: '/lettre'
    },
    {
      title: 'Coaching Carrière',
      description: 'Obtenez des conseils personnalisés pour votre carrière',
      icon: FaUserTie,
      href: '/coaching'
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
              Votre assistant personnel pour la recherche d'emploi
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