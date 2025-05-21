'use client'

import { Box, Container, Heading, Text, VStack, useColorModeValue, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { FaLightbulb, FaTasks, FaComments, FaRocket, FaUserShield, FaAward } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function CoachingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('redCross.500', 'redCross.300');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdvice, setSelectedAdvice] = useState('');

  const coachingSections = [
    {
      icon: FaLightbulb,
      title: "Définition de Stratégie",
      description: "Nous vous aidons à clarifier vos objectifs de carrière et à élaborer une stratégie de recherche d'emploi efficace.",
      advice: "Définition de Stratégie: Commencez par lister vos compétences et vos objectifs de carrière à court et long terme."
    },
    {
      icon: FaTasks,
      title: "Préparation aux Entretiens",
      description: "Entraînez-vous avec des simulations d'entretiens et recevez des feedbacks constructifs pour exceller.",
      advice: "Préparation aux Entretiens: Entraînez-vous à répondre aux questions courantes et préparez des questions pertinentes à poser à l'intervieweur."
    },
    {
      icon: FaComments,
      title: "Optimisation de Profil",
      description: "Améliorez votre CV, lettre de motivation et profil LinkedIn pour maximiser votre impact.",
      advice: "Optimisation de Profil: Assurez-vous que votre CV est concis, met en valeur vos réalisations et est adapté à chaque offre d'emploi."
    },
    {
      icon: FaRocket,
      title: "Développement de Compétences",
      description: "Identifiez les compétences clés recherchées et élaborez un plan pour les acquérir ou les renforcer.",
      advice: "Développement de Compétences: Identifiez une compétence clé pour votre domaine et cherchez des cours en ligne ou des ateliers pour la développer."
    },
    {
      icon: FaUserShield,
      title: "Confiance en Soi",
      description: "Surmontez les blocages et développez une mentalité positive pour aborder votre recherche d'emploi avec assurance.",
      advice: "Confiance en Soi: Rappelez-vous de vos succès passés et concentrez-vous sur vos forces. Chaque 'non' vous rapproche d'un 'oui'."
    },
    {
      icon: FaAward,
      title: "Négociation Salariale",
      description: "Apprenez à négocier votre salaire et vos avantages pour obtenir la meilleure offre possible.",
      advice: "Négociation Salariale: Faites des recherches sur les salaires moyens pour votre poste et votre expérience. Soyez prêt à justifier vos attentes."
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
              Coaching Carrière Personnalisé
            </Heading>
            <Text fontSize="xl" color={textColor}>
              Votre partenaire pour une recherche d'emploi réussie et épanouissante.
            </Text>
            <Text fontSize="md" color={textColor} maxW="2xl">
              Le coaching carrière vous offre un accompagnement sur-mesure pour naviguer avec succès dans le marché de l'emploi. Que vous soyez en début de carrière, en reconversion, ou à la recherche de nouvelles opportunités, nos coachs experts sont là pour vous guider.
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
                    Commencer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>

          <VStack spacing={4} textAlign="center" pt={10}>
            <Heading as="h2" size="xl" color={headingColor}>
              Prêt à passer à l'action ?
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Contactez-nous pour une première consultation gratuite et découvrez comment nous pouvons vous aider.
            </Text>
            <Button as={Link} href="mailto:mkabbaj@albertschool.com" size="lg" colorScheme="redCross">
              Prendre Rendez-vous
            </Button>
          </VStack>

        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={cardBg}>
          <ModalHeader color={headingColor}>Conseil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>{selectedAdvice}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="redCross" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
} 