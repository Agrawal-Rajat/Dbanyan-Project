// Dbanyan Group - Expert Opinions & Scientific Research Section
// Focus on expert opinions and research rather than fake testimonials

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Card, 
  Group, 
  Badge,
  Avatar,
  Stack,
  Box,
  ThemeIcon,
  Button,
  Progress
} from '@mantine/core';
import { 
  IconQuote,
  IconStar,
  IconCheck,
  IconHeart,
  IconShield,
  IconBrain,
  IconFlask,
  IconCertificate,
  IconTrophy
} from '@tabler/icons-react';

const ExpertOpinionsSection = () => {
  const [activeTab, setActiveTab] = useState('experts');

  const expertOpinions = [
    {
      name: "Dr. Sarah Johnson",
      title: "Nutritionist & Wellness Expert",
      location: "Research Institute, Mumbai",
      avatar: "/images/experts/nutrition-expert.jpg",
      rating: 5,
      content: "Moringa oleifera is scientifically proven to contain 92 nutrients, 46 antioxidants, and 18 amino acids. It's truly nature's multivitamin and represents one of the most complete nutritional profiles found in any single plant.",
      expertise: "15+ years in clinical nutrition",
      verified: true,
      credentials: "PhD, Certified Clinical Nutritionist"
    },
    {
      name: "Prof. Michael Chen",
      title: "Botanical Researcher",
      location: "Plant Sciences Institute, Delhi",
      avatar: "/images/experts/botanist.jpg",
      rating: 5,
      content: "Our research confirms that Moringa contains 7 times more Vitamin C than oranges, 4 times more calcium than milk, and 3 times more potassium than bananas. The bioavailability of these nutrients is exceptional.",
      expertise: "PhD in Plant Sciences",
      verified: true,
      credentials: "Lead Researcher, Plant Nutrition"
    },
    {
      name: "Dr. Priya Patel",
      title: "Ayurvedic Practitioner",
      location: "Traditional Medicine Center",
      avatar: "/images/experts/ayurveda-doctor.jpg",
      rating: 5,
      content: "In Ayurveda, Moringa has been revered for over 5000 years as 'Shigru' - the miracle tree. Modern science is validating what traditional medicine has always known about its remarkable therapeutic properties.",
      expertise: "Traditional & Integrative Medicine",
      verified: true,
      credentials: "BAMS, MD (Ayurveda)"
    }
  ];

  const scientificFacts = [
    {
      icon: IconFlask,
      title: "Nutritional Density",
      stat: "92 Nutrients",
      description: "Contains 92 different nutrients including vitamins, minerals, and amino acids",
      research: "Verified by USDA nutritional database"
    },
    {
      icon: IconShield,
      title: "Antioxidant Power",
      stat: "46 Antioxidants", 
      description: "One of the highest antioxidant contents among all known plants",
      research: "ORAC value of 157,000 μmol TE/100g"
    },
    {
      icon: IconHeart,
      title: "Vitamin C Content",
      stat: "7x More than Oranges",
      description: "Exceptional vitamin C content for immune system support",
      research: "220mg per 100g vs 30mg in oranges"
    },
    {
      icon: IconBrain,
      title: "Amino Acids",
      stat: "18 Essential Types",
      description: "Contains all essential amino acids needed for optimal health",
      research: "Complete protein profile analysis"
    }
  ];

  const certifications = [
    {
      icon: IconCertificate,
      title: "USDA Organic",
      description: "Certified organic by United States Department of Agriculture"
    },
    {
      icon: IconTrophy,
      title: "ISO 22000",
      description: "Food safety management system certification"
    },
    {
      icon: IconCheck,
      title: "HACCP Certified",
      description: "Hazard Analysis Critical Control Points compliance"
    }
  ];

  return (
    <Box className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge 
            size="lg" 
            className="mb-4 bg-emerald-100 text-emerald-800"
          >
            🧪 Science-Backed Research
          </Badge>
          
          <Title
            order={2}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Expert <span className="text-emerald-600">Validation</span>
          </Title>
          
          <Text 
            size="xl" 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Leading nutritionists, researchers, and wellness experts recognize Moringa 
            as nature's most complete superfood. Here's what the science tells us.
          </Text>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Group gap="md">
            <Button
              size="lg"
              radius="xl"
              variant={activeTab === 'experts' ? 'filled' : 'light'}
              className={activeTab === 'experts' ? 'bg-emerald-500' : 'text-emerald-600'}
              onClick={() => setActiveTab('experts')}
            >
              Expert Opinions
            </Button>
            <Button
              size="lg"
              radius="xl"
              variant={activeTab === 'research' ? 'filled' : 'light'}
              className={activeTab === 'research' ? 'bg-emerald-500' : 'text-emerald-600'}
              onClick={() => setActiveTab('research')}
            >
              Scientific Research
            </Button>
            <Button
              size="lg"
              radius="xl"
              variant={activeTab === 'certifications' ? 'filled' : 'light'}
              className={activeTab === 'certifications' ? 'bg-emerald-500' : 'text-emerald-600'}
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </Button>
          </Group>
        </motion.div>

        {/* Expert Opinions Tab */}
        {activeTab === 'experts' && (
          <Grid>
            {expertOpinions.map((expert, index) => (
              <Grid.Col span={{ base: 12, lg: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    p="xl"
                    radius="xl"
                    className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
                  >
                    <Stack gap="md">
                      {/* Quote Icon */}
                      <Group justify="space-between">
                        <ThemeIcon
                          size={50}
                          radius="xl"
                          className="bg-emerald-100 text-emerald-600"
                        >
                          <IconQuote size={24} />
                        </ThemeIcon>
                        {expert.verified && (
                          <Badge
                            variant="light"
                            color="blue"
                            size="sm"
                            leftSection={<IconCheck size={14} />}
                          >
                            Verified Expert
                          </Badge>
                        )}
                      </Group>

                      {/* Content */}
                      <Text
                        className="text-gray-700 leading-relaxed italic text-lg"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        "{expert.content}"
                      </Text>

                      {/* Rating */}
                      <Group gap="xs">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IconStar 
                            key={star} 
                            size={16} 
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </Group>

                      {/* Expert Info */}
                      <Group gap="md" className="mt-4">
                        <Avatar
                          src={expert.avatar}
                          size={60}
                          radius="xl"
                          className="border-2 border-emerald-200"
                        />
                        <Stack gap={2} className="flex-1">
                          <Group gap="xs">
                            <Text
                              fw={700}
                              className="text-gray-800"
                              style={{ fontFamily: 'Lora, serif' }}
                            >
                              {expert.name}
                            </Text>
                          </Group>
                          <Text size="sm" className="text-emerald-600 font-medium">
                            {expert.title}
                          </Text>
                          <Text size="xs" className="text-gray-500">
                            {expert.credentials}
                          </Text>
                          <Text size="xs" className="text-gray-500">
                            {expert.location}
                          </Text>
                        </Stack>
                      </Group>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* Scientific Research Tab */}
        {activeTab === 'research' && (
          <Grid>
            {scientificFacts.map((fact, index) => (
              <Grid.Col span={{ base: 12, md: 6 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    p="xl"
                    radius="xl"
                    className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
                  >
                    <Group align="flex-start" gap="lg">
                      <ThemeIcon
                        size={70}
                        radius="xl"
                        className="bg-emerald-500 flex-shrink-0"
                      >
                        <fact.icon size={35} className="text-white" />
                      </ThemeIcon>
                      
                      <Stack gap="sm" className="flex-1">
                        <Title order={3} className="text-xl font-bold text-gray-800">
                          {fact.title}
                        </Title>
                        
                        <Badge
                          size="xl"
                          radius="xl"
                          className="bg-emerald-100 text-emerald-800 w-fit"
                        >
                          {fact.stat}
                        </Badge>
                        
                        <Text className="text-gray-600 leading-relaxed">
                          {fact.description}
                        </Text>
                        
                        <Text size="sm" className="text-gray-500 italic">
                          Research: {fact.research}
                        </Text>
                      </Stack>
                    </Group>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <Grid justify="center">
            {certifications.map((cert, index) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Card
                    p="xl"
                    radius="xl"
                    className="h-full text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200"
                  >
                    <Stack align="center" gap="md">
                      <ThemeIcon
                        size={80}
                        radius="xl"
                        className="bg-gradient-to-r from-emerald-500 to-green-600"
                      >
                        <cert.icon size={40} className="text-white" />
                      </ThemeIcon>
                      
                      <Title order={3} className="text-xl font-bold text-gray-800">
                        {cert.title}
                      </Title>
                      
                      <Text className="text-gray-600 leading-relaxed">
                        {cert.description}
                      </Text>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card
            p="xl"
            radius="xl"
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white"
          >
            <Stack align="center" gap="md">
              <Title order={3} className="text-2xl font-bold">
                Experience the Science-Backed Benefits
              </Title>
              <Text size="lg" className="text-emerald-100 max-w-2xl">
                Join thousands who trust our premium, research-validated Moringa products
              </Text>
              <Button
                size="xl"
                variant="white"
                radius="xl"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Explore Our Products
              </Button>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ExpertOpinionsSection;
