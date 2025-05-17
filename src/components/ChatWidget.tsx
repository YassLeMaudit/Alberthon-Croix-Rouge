'use client'

import { useState } from 'react'
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

export default function ChatWidget() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

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
          context: 'Je suis en train de rédiger une lettre de motivation.',
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
            Assistant IA
          </DrawerHeader>

          <DrawerBody>
            <VStack h="full" spacing={4}>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
} 