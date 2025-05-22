'use client'

import { Box, Container, Heading, Text, VStack, useColorModeValue, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { FaLightbulb, FaTasks, FaComments, FaRocket, FaUserShield, FaAward } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CoachingPage() {
  const { t } = useTranslation();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('redCross.500', 'redCross.300');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdvice, setSelectedAdvice] = useState('');

  const coachingSections = [
    {
      icon: FaLightbulb,
      title: t('coaching.sections.strategy.title'),
      description: t('coaching.sections.strategy.description'),
      advice: t('coaching.sections.strategy.advice')
    },
    {
      icon: FaTasks,
      title: t('coaching.sections.interviews.title'),
      description: t('coaching.sections.interviews.description'),
      advice: t('coaching.sections.interviews.advice')
    },
    {
      icon: FaComments,
      title: t('coaching.sections.profile.title'),
      description: t('coaching.sections.profile.description'),
      advice: t('coaching.sections.profile.advice')
    },
    {
      icon: FaRocket,
      title: t('coaching.sections.skills.title'),
      description: t('coaching.sections.skills.description'),
      advice: t('coaching.sections.skills.advice')
    },
    {
      icon: FaUserShield,
      title: t('coaching.sections.confidence.title'),
      description: t('coaching.sections.confidence.description'),
      advice: t('coaching.sections.confidence.advice')
    },
    {
      icon: FaAward,
      title: t('coaching.sections.negotiation.title'),
      description: t('coaching.sections.negotiation.description'),
      advice: t('coaching.sections.negotiation.advice')
    }
  ];

  const handleShowAdvice = (advice: string) => {
    setSelectedAdvice(advice);
    onOpen();
  };

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl" color={headingColor}>
              {t('coaching.title')}
            </Heading>
            <Text fontSize="xl" color={textColor}>
              {t('coaching.subtitle')}
            </Text>
            <Text fontSize="md" color={textColor} maxW="2xl">
              {t('coaching.description')}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {coachingSections.map((section, index) => (
              <Card key={index} bg={cardBg} shadow="lg" rounded="xl" transition="all 0.3s" _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }} border="1px solid" borderColor="redCross.100">
                <CardHeader>
                  <VStack>
                    <Box p={3} rounded="full" bg="redCross.500" color="white" display="inline-block">
                      <Icon as={section.icon} w={8} h={8} />
                    </Box>
                    <Heading size="md" color={headingColor} textAlign="center">{section.title}</Heading>
                  </VStack>
                </CardHeader>
                <CardBody>
                  <Text textAlign="center" color={textColor}>{section.description}</Text>
                </CardBody>
                <CardFooter justifyContent="center">
                  <Button
                    onClick={() => handleShowAdvice(section.advice)}
                    colorScheme="redCross"
                    variant="outline"
                    px={6}
                  >
                    {t('coaching.button.start')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>

          <VStack spacing={4} textAlign="center" pt={10}>
            <Heading as="h2" size="xl" color={headingColor}>
              {t('coaching.cta.title')}
            </Heading>
            <Text fontSize="lg" color={textColor}>
              {t('coaching.cta.description')}
            </Text>
            <Button as={Link} href="mailto:mkabbaj@albertschool.com" size="lg" colorScheme="redCross">
              {t('coaching.cta.button')}
            </Button>
          </VStack>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={cardBg}>
          <ModalHeader color={headingColor}>{t('coaching.modal.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>{selectedAdvice}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="redCross" onClick={onClose}>
              {t('coaching.modal.close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
} 