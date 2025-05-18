'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
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
  Flex,
  Divider,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { FaComments, FaPaperPlane, FaTimes, FaCopy } from 'react-icons/fa'

interface ChatWidgetProps {
  initialPrompt?: string;
  noDrawer?: boolean;
  drawerState?: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
  width?: string;
}

export default function ChatWidget({ initialPrompt, noDrawer = false, drawerState, width = '100%' }: ChatWidgetProps) {
  const defaultDrawerState = useDisclosure()
  const { isOpen, onOpen, onClose } = drawerState || defaultDrawerState
  
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentResponse, setCurrentResponse] = useState<string>('')
  const [systemPrompt, setSystemPrompt] = useState<string | undefined>(initialPrompt)
  const { t, i18n } = useTranslation('common')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Scroll automatique vers le bas lors de réception de nouveaux messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory, currentResponse])

  // Afficher un message d'accueil de l'assistant au chargement
  useEffect(() => {
    if (initialPrompt) {
      // Message initial de l'assistant pour aider l'utilisateur
      setChatHistory([{ 
        role: 'assistant', 
        content: t('chat.welcome_cv')
      }]);
    }
  }, [initialPrompt, t, i18n.language]);

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setCurrentResponse('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: systemPrompt || t('chat.context_default'),
          history: chatHistory,
          language: i18n.language // Transmettre la langue actuelle à l'API
        }),
      })

      if (!response.ok) throw new Error(t('chat.error'))
      
      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Erreur:', error)
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: t('chat.error')
      }])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Extraction du texte à copier (entre "EXEMPLE À COPIER:" et la fin ou un autre marqueur)
  const extractCopyText = (message: string) => {
    const match = message.match(/EXEMPLE À COPIER:([\s\S]*?)(?:$|### |TRADUCTION:)/i)
    return match ? match[1].trim() : ''
  }
  
  // Fonction pour copier le texte dans le presse-papiers
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(t('chat.copy_success'))
      })
      .catch(err => {
        console.error('Erreur lors de la copie:', err)
      })
  }

  // Rendu d'un message avec mise en forme Markdown
  const renderMessage = (message: string, role: 'user' | 'assistant') => {
    if (role === 'user') {
      return (
        <Card bg="blue.100" borderRadius="lg" mx={2} boxShadow="sm" width="auto" ml="auto">
          <CardBody py={2} px={3}>
            <Text>{message}</Text>
          </CardBody>
        </Card>
      )
    }
    
    const copyText = extractCopyText(message)
    
    return (
      <Card bg="gray.50" borderRadius="lg" mx={2} shadow="sm" width="100%">
        <CardBody py={2} px={3}>
          {/* Utilisation simplifiée de ReactMarkdown sans personnalisation de composants */}
          <Box className="markdown-body" sx={{
            'h3': { 
              fontSize: 'lg', 
              fontWeight: 'bold',
              my: 2
            },
            'p': {
              mb: 2
            },
            'ul': {
              pl: 4,
              my: 2
            },
            'li': {
              ml: 4,
              my: 1
            },
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: 'gray.200',
              pl: 2,
              my: 2,
              bg: 'gray.50'
            },
            'strong': {
              fontWeight: 'bold'
            }
          }}>
            <ReactMarkdown>{message}</ReactMarkdown>
          </Box>
          
          {copyText && (
            <>
              <Divider my={2} />
              <Flex justify="space-between" align="center" bg="blue.50" p={2} borderRadius="md">
                <Text fontWeight="medium" fontSize="sm">{t('chat.copy_label')}</Text>
                <IconButton 
                  aria-label="Copier" 
                  icon={<FaCopy />} 
                  size="sm" 
                  onClick={() => copyToClipboard(copyText)}
                  colorScheme="blue"
                  variant="ghost"
                />
              </Flex>
            </>
          )}
        </CardBody>
      </Card>
    )
  }

  // Contenu du chat à réutiliser dans le drawer et directement dans la page
  const chatContent = (
    <VStack h="100%" spacing={0} w="100%">
      <Box
        ref={chatContainerRef}
        flex="1"
        w="full"
        overflowY="auto"
        p={4}
        bg="white"
      >
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            mb={4}
            alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
            maxWidth="90%"
            w={msg.role === 'user' ? 'auto' : '90%'}
          >
            {renderMessage(msg.content, msg.role)}
          </Box>
        ))}
        
        {currentResponse && (
          <Box mb={4} alignSelf="flex-start" maxWidth="90%" w="90%">
            {renderMessage(currentResponse, 'assistant')}
          </Box>
        )}
        
        {isLoading && !currentResponse && (
          <Box p={3} borderRadius="lg" bg="gray.100">
            <Text>{t('chat.loading')}</Text>
          </Box>
        )}
      </Box>

      <HStack w="full" p={3} borderTopWidth="1px" bg="gray.50">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('chat.placeholder')}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          bg="white"
          borderColor="gray.300"
        />
        <IconButton
          aria-label={t('chat.send')}
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
    return (
      <Box width={width} h="100%" borderRadius="md" overflow="hidden">
        {chatContent}
      </Box>
    );
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
            {t('cv.assistant_title')}
          </DrawerHeader>

          <DrawerBody>
            {chatContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
} 