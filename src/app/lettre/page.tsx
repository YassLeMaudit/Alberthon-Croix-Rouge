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
} from '@chakra-ui/react'
import { LettreFormData } from '@/types'

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
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Lettre de Motivation</Heading>
        <Text textAlign="center" color="gray.600">
          Remplissez les informations ci-dessous pour générer votre lettre de motivation personnalisée
        </Text>

        <Box as="form" w="full" onSubmit={handleSubmit}>
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

            <FormControl>
              <FormLabel>Votre expérience pertinente</FormLabel>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Décrivez votre expérience pertinente pour ce poste..."
                rows={4}
              />
            </FormControl>

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
      </VStack>
    </Container>
  )
} 