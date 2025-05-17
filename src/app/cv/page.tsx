'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { FaDownload, FaCopy, FaEdit, FaSave } from 'react-icons/fa'
import ChatWidget from '@/components/ChatWidget'

export default function LettrePage({ params }: { params: { id: string } }) {
  const [lettre, setLettre] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()

  useEffect(() => {
    // Ici, vous pouvez charger la lettre depuis votre stockage
    // Pour l'instant, nous utilisons les données de la session
    const savedLettre = sessionStorage.getItem('currentLettre')
    if (savedLettre) {
      setLettre(savedLettre)
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    sessionStorage.setItem('currentLettre', lettre)
    toast({
      title: 'Lettre sauvegardée',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(lettre)
    toast({
      title: 'Lettre copiée',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleDownload = () => {
    const blob = new Blob([lettre], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lettre-de-motivation.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading>Lettre de Motivation</Heading>
          <HStack>
            {isEditing ? (
              <IconButton
                aria-label="Sauvegarder"
                icon={<FaSave />}
                onClick={handleSave}
                colorScheme="green"
              />
            ) : (
              <>
                <IconButton
                  aria-label="Modifier"
                  icon={<FaEdit />}
                  onClick={handleEdit}
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="Copier"
                  icon={<FaCopy />}
                  onClick={handleCopy}
                  colorScheme="purple"
                />
                <IconButton
                  aria-label="Télécharger"
                  icon={<FaDownload />}
                  onClick={handleDownload}
                  colorScheme="teal"
                />
              </>
            )}
          </HStack>
        </HStack>

        <Box
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
        >
          {isEditing ? (
            <Textarea
              value={lettre}
              onChange={(e) => setLettre(e.target.value)}
              minH="500px"
              fontSize="md"
              lineHeight="1.6"
            />
          ) : (
            <Text
              whiteSpace="pre-wrap"
              fontSize="md"
              lineHeight="1.6"
            >
              {lettre}
            </Text>
          )}
        </Box>
      </VStack>

      <ChatWidget />
    </Container>
  )
} 