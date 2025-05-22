'use client'

import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Text, 
  VStack, 
  useColorModeValue,
  Image,
  Flex,
  Badge,
  Divider
} from '@chakra-ui/react'
import { FaFileAlt, FaEnvelope, FaUserTie, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Home({ params }: { params: { locale: string } }) {
  const { t, i18n } = useTranslation('common')
  const locale = params.locale || 'fr'
  
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const redCrossRed = 'redCross.500'
  const subtleColor = useColorModeValue('gray.600', 'gray.400')

  const features = [
    {
      title: t('cv.title'),
      description: t('welcome'),
      icon: FaFileAlt,
      href: `/${locale}/cv`,
      badge: t('features.essential'),
    },
    {
      title: t('lettre.title'),
      description: t('lettre.subtitle'),
      icon: FaEnvelope,
      href: `/${locale}/lettre`,
      badge: t('features.professional'),
    },
    {
      title: t('assistant'),
      description: t('chat.welcome_cv'),
      icon: FaUserTie,
      href: `/${locale}/coaching`,
      badge: t('features.aiPowered'),
    }
  ]

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <Box 
        bg={redCrossRed} 
        color="white" 
        py={20} 
        position="relative" 
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between"
            gap={8}
          >
            <VStack 
              align={{ base: 'center', md: 'flex-start' }} 
              spacing={6} 
              maxW={{ base: 'full', md: '60%' }}
            >
              <Heading 
                as="h1" 
                size="2xl" 
                lineHeight="shorter"
                fontWeight="bold"
              >
                Job Coach AI
              </Heading>
              <Text 
                fontSize="xl" 
                opacity={0.9}
                maxW="lg"
              >
                {t('welcome')}
              </Text>
              <Flex gap={4} wrap="wrap">
                <Badge 
                  colorScheme="white" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  border="1px solid"
                  fontSize="md"
                >
                  Croix-Rouge
                </Badge>
                <Badge 
                  colorScheme="white" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                  border="1px solid"
                  fontSize="md"
                >
                  {t('features.aiPowered')}
                </Badge>
              </Flex>
            </VStack>
            <Box 
              w={{ base: "full", md: "40%" }} 
              maxW="400px"
              display={{ base: 'none', md: 'block' }}
            >
              <Image
                src="/images/banner.png"
                alt="Job Coach AI"
                width={400}
                height={300}
                objectFit="contain"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid 
          columns={{ base: 1, md: 3 }} 
          spacing={10} 
          w="full"
        >
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} style={{ textDecoration: 'none' }}>
              <Box
                p={8}
                bg={cardBg}
                rounded="xl"
                shadow="xl"
                transition="all 0.3s"
                _hover={{ 
                  transform: 'translateY(-5px)', 
                  shadow: '2xl',
                  borderColor: 'redCross.400'
                }}
                border="2px solid"
                borderColor="redCross.100"
                position="relative"
                overflow="hidden"
              >
                <VStack spacing={6} align="flex-start">
                  <Flex 
                    w="full" 
                    justify="space-between" 
                    align="center"
                  >
                    <Box
                      p={4}
                      rounded="lg"
                      bg={`${redCrossRed}10`}
                      color={redCrossRed}
                    >
                      <feature.icon size={24} />
                    </Box>
                    <Badge 
                      colorScheme="red" 
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {feature.badge}
                    </Badge>
                  </Flex>
                  
                  <VStack align="flex-start" spacing={3}>
                    <Heading 
                      as="h3" 
                      size="md" 
                      color={redCrossRed}
                    >
                      {feature.title}
                    </Heading>
                    <Text 
                      color={subtleColor}
                      fontSize="md"
                    >
                      {feature.description}
                    </Text>
                  </VStack>

                  <Flex 
                    align="center" 
                    color={redCrossRed}
                    mt="auto"
                    fontWeight="medium"
                  >
                    {t('features.learnMore')} <FaArrowRight size={12} style={{ marginLeft: '8px' }} />
                  </Flex>
                </VStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}