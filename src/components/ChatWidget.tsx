'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa'

interface ChatWidgetProps {
  initialPrompt?: string;
  noDrawer?: boolean;
  drawerState?: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

export default function ChatWidget({ initialPrompt, noDrawer = false, drawerState }: ChatWidgetProps) {
  const defaultDrawerState = useDisclosure()
  const { isOpen, onOpen, onClose } = drawerState || defaultDrawerState
  
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState<string | undefined>(initialPrompt)

  // Afficher un message d'accueil de l'assistant au chargement
  useEffect(() => {
    if (initialPrompt) {
      // Message initial de l'assistant pour aider l'utilisateur
      setChatHistory([{ 
        role: 'assistant', 
        content: "Bonjour ! Je suis votre assistant pour la création de CV. Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me parler de vos expériences, même si elles ne sont pas professionnelles."
      }]);
    }
  }, [initialPrompt]);

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: systemPrompt || 'Je suis en train de rédiger une lettre de motivation.',
          history: chatHistory,
        }),
      })

      if (!response.ok) throw new Error('Erreur lors de l\'envoi du message')

      const data = await response.json()
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Erreur:', error)
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Désolé, une erreur est survenue. Veuillez réessayer.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Contenu du chat à réutiliser dans le drawer et directement dans la page
  const chatContent = (
    <VStack h="100%" spacing={4}>
      <Box
        flex="1"
        w="full"
        overflowY="auto"
        p={4}
        borderRadius="md"
        bg="gray.50"
      >
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            mb={4}
            p={3}
            borderRadius="lg"
            bg={msg.role === 'user' ? 'blue.100' : 'white'}
            alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Text>{msg.content}</Text>
          </Box>
        ))}
        {isLoading && (
          <Box p={3} borderRadius="lg" bg="gray.100">
            <Text>L'assistant rédige une réponse...</Text>
          </Box>
        )}
      </Box>

      <HStack w="full" p={4} borderTopWidth="1px">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Posez votre question..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          aria-label="Envoyer"
          icon={<FaPaperPlane />}
          onClick={handleSend}
          colorScheme="blue"
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );

  // Si noDrawer est true, renvoyer uniquement le contenu du chat sans le drawer
  if (noDrawer) {
    return chatContent;
  }

  // Sinon, renvoyer le bouton flottant et le drawer
  return (
    <>
      <IconButton
        aria-label="Chat"
        icon={<FaComments />}
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="blue"
        size="lg"
        isRound
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Assistant CV
          </DrawerHeader>

          <DrawerBody>
            {chatContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
} 