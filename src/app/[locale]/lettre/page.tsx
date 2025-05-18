'use client'

import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  HStack,
  VStack,
  Grid,
  GridItem,
  Stack,
  RadioGroup,
  Radio,
  FormHelperText,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import ChatWidget from '@/components/ChatWidget'
import { useTranslation } from 'react-i18next'

// Prompt pour Mistral
const MISTRAL_PROMPT = `Tu es un assistant virtuel amical et professionnel, conçu pour aider des personnes vulnérables à transformer leurs expériences de vie en expériences et compétences professionnelles pour leur lettre de motivation. 

Par exemple, si une personne mentionne avoir participé à des activités associatives, tu dois l'aider à identifier les compétences acquises comme la gestion de projet, le travail d'équipe ou la communication. 

Si quelqu'un évoque des responsabilités familiales, guide-le pour reconnaître les compétences en organisation, en gestion des priorités ou en résolution de problèmes.

Pose des questions ouvertes et précises pour aider l'utilisateur à découvrir et formuler ses compétences de manière professionnelle, en utilisant un langage adapté à une lettre de motivation.

Ton objectif est de rendre l'utilisateur autonome en lui donnant des outils pour valoriser ses expériences.`

export default function LettreMotivationPage({ params }: { params: { locale: string } }) {
  const { t } = useTranslation('common')
  const locale = params.locale || 'fr'
  const router = useRouter()
  const toast = useToast()
  const formBg = useColorModeValue('white', 'gray.700')
  
  const [formData, setFormData] = useState({
    poste: '',
    entreprise: '',
    secteur: '',
    ton: 'professionnel',
    fichePoste: '',
    experience: '',
    competences: '',
    motivation: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTonChange = (value: string) => {
    setFormData(prev => ({ ...prev, ton: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lettre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        // Redirection vers la page de résultat avec l'ID
        router.push(`/${locale}/lettre/view/${data.id}`)
      } else {
        throw new Error('Erreur lors de la génération de la lettre')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: t('lettre.error'),
        description: t('lettre.error_message'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Heading color="redCross.500" mb={2}>{t('lettre.title')}</Heading>
      <Text mb={6}>{t('lettre.subtitle')}</Text>
      
      <Grid templateColumns={{base: "1fr", lg: "3fr 2fr"}} gap={6}>
        <GridItem>
          <form onSubmit={handleSubmit}>
            <Box 
              bg={formBg}
              p={6}
              borderRadius="lg"
              boxShadow="md"
              mb={6}
            >
              <VStack spacing={4} align="stretch">
                <Stack direction={{base: "column", md: "row"}} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('lettre.form.poste')}</FormLabel>
                    <Input 
                      name="poste" 
                      value={formData.poste}
                      onChange={handleInputChange}
                      placeholder={t('lettre.form.poste_placeholder')}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>{t('lettre.form.entreprise')}</FormLabel>
                    <Input 
                      name="entreprise" 
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      placeholder={t('lettre.form.entreprise_placeholder')}
                    />
                  </FormControl>
                </Stack>
                
                <Stack direction={{base: "column", md: "row"}} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>{t('lettre.form.secteur')}</FormLabel>
                    <Input 
                      name="secteur" 
                      value={formData.secteur}
                      onChange={handleInputChange}
                      placeholder={t('lettre.form.secteur_placeholder')}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>{t('lettre.form.ton')}</FormLabel>
                    <RadioGroup value={formData.ton} onChange={handleTonChange}>
                      <HStack spacing={4}>
                        <Radio value="professionnel">{t('lettre.form.ton_professionnel')}</Radio>
                        <Radio value="dynamique">{t('lettre.form.ton_dynamique')}</Radio>
                        <Radio value="formel">{t('lettre.form.ton_formel')}</Radio>
                        <Radio value="creatif">{t('lettre.form.ton_creatif')}</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                </Stack>

                <FormControl>
                  <FormLabel>{t('lettre.form.fiche_poste')}</FormLabel>
                  <Textarea
                    name="fichePoste"
                    value={formData.fichePoste}
                    onChange={handleInputChange}
                    placeholder={t('lettre.form.fiche_poste_placeholder')}
                    minHeight="100px"
                  />
                  <FormHelperText>
                    {t('lettre.form.fiche_poste_help')}
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t('lettre.form.experience')}</FormLabel>
                  <Textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder={t('lettre.form.experience_placeholder')}
                    minHeight="100px"
                  />
                  <FormHelperText>
                    {t('lettre.form.experience_help')}
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t('lettre.form.competences')}</FormLabel>
                  <Textarea
                    name="competences"
                    value={formData.competences}
                    onChange={handleInputChange}
                    placeholder={t('lettre.form.competences_placeholder')}
                    minHeight="100px"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t('lettre.form.motivation')}</FormLabel>
                  <Textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder={t('lettre.form.motivation_placeholder')}
                    minHeight="100px"
                  />
                </FormControl>

                <Button 
                  colorScheme="red" 
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Génération en cours..."
                  size="lg"
                  width="full"
                  mt={4}
                >
                  {t('lettre.form.submit')}
                </Button>
              </VStack>
            </Box>
          </form>
        </GridItem>
        
        <GridItem>
          <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            h="100%" 
            boxShadow="md" 
            bg={formBg}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            position="sticky"
            top="100px"
          >
            <Text p={4} fontWeight="bold" borderBottomWidth="1px">
              {t('lettre.assistant_title')}
            </Text>
            <Box flexGrow={1} minHeight="500px">
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