'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  useToast,
  Spinner,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import html2pdf from 'html2pdf.js'

export default function ViewLettrePage({ 
  params 
}: { 
  params: { locale: string, id: string } 
}) {
  const { t } = useTranslation('common')
  const locale = params.locale || 'fr'
  const id = params.id
  const toast = useToast()
  
  const [lettre, setLettre] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLettre() {
      try {
        const response = await fetch(`/api/lettre/${id}`)
        if (!response.ok) {
          throw new Error('Lettre non trouvée')
        }
        const data = await response.json()
        setLettre(data)
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue')
        toast({
          title: t('lettre.error'),
          description: err.message || t('lettre.error_message'),
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLettre()
  }, [id, toast, t])

  const handleDownloadPDF = () => {
    const element = document.getElementById('lettre-content')
    if (!element) return

    const opt = {
      margin: [15, 15, 15, 15] as [number, number, number, number],
      filename: `lettre_motivation_${lettre.poste.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as 'portrait' | 'landscape' }
    }

    html2pdf().from(element).set(opt).save()
  }

  if (loading) {
    return (
      <Center h="70vh">
        <Spinner size="xl" color="redCross.500" />
      </Center>
    )
  }

  if (error || !lettre) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={4} align="center">
          <Heading color="red.500">{t('lettre.error')}</Heading>
          <Text>{error || t('lettre.error_message')}</Text>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Heading color="redCross.500" size="lg">{t('lettre.title')}</Heading>
          <Button 
            colorScheme="blue" 
            onClick={handleDownloadPDF}
          >
            Télécharger en PDF
          </Button>
        </HStack>
        
        <Box
          id="lettre-content"
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="md"
          whiteSpace="pre-line"
        >
          <div dangerouslySetInnerHTML={{ __html: lettre.contenu }} />
        </Box>
      </VStack>
    </Container>
  )
} 