'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Text,
  Select,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { LettreFormData } from '@/types'
import ChatWidget from '@/components/ChatWidget'

// Prompt pour Mistral pour la lettre de motivation
const LETTRE_PROMPT = `Tu es un assistant virtuel amical et professionnel, conçu pour aider des personnes vulnérables à créer une lettre de motivation. Ton rôle est de poser des questions ouvertes pour transformer leurs expériences de vie quotidienne en compétences professionnelles pertinentes. Par exemple, si une personne mentionne s'être occupée d'un parent malade, aide-la à identifier des compétences comme l'organisation, la gestion du stress, la fiabilité, et la communication. Pour chaque expérience mentionnée, suggère au minimum 3 compétences professionnelles qui pourraient être valorisées dans une lettre de motivation, en expliquant pourquoi ces compétences sont pertinentes dans un contexte professionnel. Ton objectif est d'aider l'utilisateur à reconnaître la valeur de ses expériences personnelles et à les formuler de manière professionnelle pour sa lettre de motivation.`

export default function LettrePage() {
  const router = useRouter()
  const toast = useToast()
  const [formData, setFormData] = useState<LettreFormData>({
    poste: '',
    entreprise: '',
    secteur: '',
    experience: '',
    motivation: '',
    competences: '',
    ton: 'professionnel',
    fichePoste: '', // Nouveau champ
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/generate-lettre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la lettre')
      }

      const data = await response.json()
      
      // Sauvegarder la lettre dans le sessionStorage
      sessionStorage.setItem('currentLettre', data.lettre)
      
      toast({
        title: 'Lettre générée avec succès',
        description: 'Votre lettre de motivation a été créée avec l\'aide de l\'IA',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Rediriger vers la page d'affichage
      router.push('/lettre/view')
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération de la lettre',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading textAlign="center" mb={6}>Lettre de Motivation</Heading>
      <Text textAlign="center" color="gray.600" mb={8}>
        Créez une lettre de motivation personnalisée avec l'aide de notre assistant
      </Text>

      <Grid templateColumns={{base: "1fr", lg: "3fr 2fr"}} gap={6}>
        <GridItem>
          <Box 
            as="form" 
            onSubmit={handleSubmit} 
            borderWidth="1px" 
            borderRadius="lg"
            p={6}
            bg="white"
            boxShadow="md"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Poste recherché</FormLabel>
                <Input
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  placeholder="Ex: Développeur Full Stack"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Entreprise</FormLabel>
                <Input
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="Nom de l'entreprise"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Secteur d'activité</FormLabel>
                <Input
                  name="secteur"
                  value={formData.secteur}
                  onChange={handleChange}
                  placeholder="Ex: Technologies, Santé, Finance..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ton de la lettre</FormLabel>
                <Select
                  name="ton"
                  value={formData.ton}
                  onChange={handleChange}
                >
                  <option value="professionnel">Professionnel</option>
                  <option value="dynamique">Dynamique</option>
                  <option value="formel">Formel</option>
                  <option value="créatif">Créatif</option>
                </Select>
              </FormControl>

              <Accordion allowToggle width="100%">
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" fontWeight="medium">
                        Fiche de poste (facultatif)
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <FormControl>
                      <FormLabel>Collez la fiche de poste ici</FormLabel>
                      <Textarea
                        name="fichePoste"
                        value={formData.fichePoste}
                        onChange={handleChange}
                        placeholder="Copiez-collez la description du poste ici pour personnaliser votre lettre selon les compétences recherchées..."
                        rows={6}
                      />
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        Nous analyserons cette fiche pour adapter votre lettre aux exigences du poste.
                      </Text>
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Tabs variant="enclosed" width="100%">
                <TabList>
                  <Tab>Expérience</Tab>
                  <Tab>Compétences</Tab>
                  <Tab>Motivation</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Votre expérience pertinente</FormLabel>
                      <Textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Décrivez votre expérience pertinente pour ce poste..."
                        rows={4}
                      />
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        Utilisez l'assistant à droite pour transformer vos expériences de vie en compétences professionnelles.
                      </Text>
                    </FormControl>
                  </TabPanel>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Vos compétences clés</FormLabel>
                      <Textarea
                        name="competences"
                        value={formData.competences}
                        onChange={handleChange}
                        placeholder="Listez vos compétences les plus pertinentes..."
                        rows={4}
                      />
                    </FormControl>
                  </TabPanel>
                  <TabPanel>
                    <FormControl>
                      <FormLabel>Votre motivation</FormLabel>
                      <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Expliquez pourquoi ce poste vous intéresse..."
                        rows={4}
                      />
                    </FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="full"
              >
                Générer ma lettre
              </Button>
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            h="100%" 
            minH="600px"
            boxShadow="md" 
            bg="white"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Text p={4} fontWeight="bold" borderBottomWidth="1px">
              Assistant Lettre de Motivation
            </Text>
            <Box flexGrow={1}>
              <ChatWidget 
                initialPrompt={LETTRE_PROMPT} 
                noDrawer={true}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
} 