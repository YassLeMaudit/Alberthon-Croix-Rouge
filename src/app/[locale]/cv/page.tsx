'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  Link,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import ChatWidget from '@/components/ChatWidget'
import { useTranslation } from 'react-i18next'

// Prompt pour Mistral
const MISTRAL_PROMPT = `Tu es un assistant virtuel amical et professionnel, conçu pour aider des personnes vulnérables à créer un CV. Ton rôle est de poser des questions ouvertes pour identifier les compétences et expériences pertinentes issues de leur vie quotidienne. Par exemple, si une personne mentionne être parent au foyer, demande-lui de décrire ses responsabilités et les compétences développées, comme l'organisation, la gestion du temps, ou la résolution de problèmes. Encourage l'utilisateur à détailler chaque expérience pour enrichir le contenu de son CV. Ton objectif est de guider l'utilisateur étape par étape pour qu'il puisse mettre en valeur ses atouts, même s'ils ne viennent pas d'un parcours professionnel classique.`

export default function CVPage({ params }: { params: { locale: string } }) {
  const { t } = useTranslation('common')
  const locale = params.locale || 'fr'
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  // URL du Google Doc partagé
  const googleDocUrl = "https://docs.google.com/document/d/1NwTuCoBKhYQz8_xWF2l_5YlkMKNdz0zeglpso1sJwF8/edit?usp=sharing"
  
  // URL pour l'iframe (mode édition)
  const embedUrl = googleDocUrl.replace("/edit?usp=sharing", "/edit?usp=sharing&embedded=true")
  
  // URL pour ouvrir dans un nouvel onglet
  const publicUrl = googleDocUrl
  
  // Manipuler l'événement de chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false)
    
    toast({
      title: t('cv.document_loaded'),
      description: t('cv.document_loaded'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Heading color="redCross.500" mb={5}>{t('cv.title')}</Heading>
      
      <Grid templateColumns="2fr 1fr" gap={4} h="calc(100vh - 200px)">
        <GridItem>
          <VStack spacing={4} align="stretch" h="100%">
            <HStack justify="space-between">
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <AlertDescription>
                  {t('cv.info_text')}
                </AlertDescription>
              </Alert>
              
              <Link href={publicUrl} isExternal>
                <Button colorScheme="blue" rightIcon={<ExternalLinkIcon />} size="sm">
                  {t('cv.open_doc')}
                </Button>
              </Link>
            </HStack>

            <Box
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="md"
              position="relative"
              overflow="hidden"
              h="100%"
            >
              {isLoading && (
                <Flex 
                  position="absolute" 
                  top={0} 
                  left={0} 
                  right={0} 
                  bottom={0} 
                  alignItems="center" 
                  justifyContent="center"
                  bg="rgba(255, 255, 255, 0.8)"
                  zIndex={2}
                >
                  <Text fontSize="lg">{t('cv.loading')}</Text>
                </Flex>
              )}
              
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                onLoad={handleIframeLoad}
                style={{ border: "none" }}
                title="CV Google Doc"
              />
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            h="100%" 
            boxShadow="md" 
            bg="white"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Text p={4} fontWeight="bold" borderBottomWidth="1px">
              {t('cv.assistant_title')}
            </Text>
            <Box flexGrow={1}>
              <ChatWidget 
                initialPrompt={MISTRAL_PROMPT} 
                noDrawer={true}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
} 