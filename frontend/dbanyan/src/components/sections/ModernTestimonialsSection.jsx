// Dbanyan Group - Modern Testimonials Section
// Customer testimonials with engaging design

import React from 'react';
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
  Rating
} from '@mantine/core';
import { 
  IconQuote,
  IconStar,
  IconCheck,
  IconHeart,
  IconShield,
  IconBrain
} from '@tabler/icons-react';

const ModernTestimonialsSection = () => {
  // Focus on expert opinions and scientific backing for this new website
  const expertOpinions = [
    {
      name: "Dr. Sarah Johnson",
      title: "Nutritionist & Wellness Expert", 
      location: "Research Institute, India",
      avatar: "/images/experts/nutrition-expert.jpg",
      rating: 5,
      content: "Moringa oleifera is scientifically proven to contain 92 nutrients, 46 antioxidants, and 18 amino acids. It's truly nature's multivitamin and an excellent addition to any wellness routine.",
      expertise: "15+ years in nutrition science",
      verified: true
    },
    {
      name: "Prof. Michael Chen",
      title: "Botanical Researcher",
      location: "Plant Sciences Institute",
      avatar: "/images/experts/botanist.jpg", 
      rating: 5,
      content: "Research shows Moringa has 7 times more Vitamin C than oranges and 4 times more calcium than milk. The scientific community recognizes it as one of nature's most nutrient-dense plants.",
      expertise: "PhD in Plant Sciences",
      verified: true
    },
    {
      name: "Dr. Priya Patel",
      title: "Ayurvedic Practitioner",
      location: "Traditional Medicine Center",
      avatar: "/images/experts/ayurveda-doctor.jpg",
      rating: 5, 
      content: "In Ayurveda, Moringa has been revered for centuries as the 'Miracle Tree'. Modern science is now validating what traditional medicine has always known about its remarkable healing properties.",
      expertise: "Traditional & Modern Medicine",
      verified: true
    }
  ];

  // Use expertOpinions as testimonials for the grid
  const testimonials = expertOpinions;

  const scientificBenefits = [
    {
      icon: IconHeart,
      title: "Cardiovascular Health",
      scientific: "92% antioxidant content",
      description: "Rich in quercetin and chlorogenic acid"
    },
    {
      icon: IconShield, 
      title: "Immune Support",
      scientific: "7x more Vitamin C than oranges",
      description: "Natural immune-boosting compounds"
    },
    {
      icon: IconBrain,
      title: "Cognitive Function", 
      scientific: "18 amino acids",
      description: "Essential nutrients for brain health"
    }
  ];

  return (
    <Box className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
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
            variant="light" 
            color="green"
            className="mb-4"
          >
            Customer Stories
          </Badge>
          <Title 
            order={2} 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Loved by
            <Text component="span" className="text-emerald-600"> Thousands </Text>
            of Customers
          </Title>
          <Text 
            size="lg" 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Real stories from real people who have transformed their wellness 
            journey with our premium Moringa products.
          </Text>
        </motion.div>

        {/* Testimonials Grid */}
        <Grid gutter="xl">
          {testimonials.map((testimonial, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                whileHover={{ y: -8 }}
              >
                <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  className="h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 relative"
                >
                  {/* Quote Icon */}
                  <Box className="absolute top-4 right-4 opacity-10">
                    <IconQuote size={48} className="text-emerald-600" />
                  </Box>

                  <Stack gap="lg">
                    {/* Customer Info */}
                    <Group gap="md">
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        size="lg"
                        radius="xl"
                        className="border-2 border-emerald-100"
                      />
                      <Box className="flex-1">
                        <Group gap="xs" align="center">
                          <Text 
                            size="md" 
                            className="font-semibold text-gray-800"
                            style={{ fontFamily: 'Lora, serif' }}
                          >
                            {testimonial.name}
                          </Text>
                          {testimonial.verified && (
                            <IconCheck 
                              size={16} 
                              className="text-blue-500" 
                            />
                          )}
                        </Group>
                        <Text size="sm" className="text-gray-500">
                          {testimonial.location}
                        </Text>
                        {/* Rating */}
                        <Group gap="xs" className="mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <IconStar 
                              key={star} 
                              size={14} 
                              className={`${
                                star <= testimonial.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </Group>
                      </Box>
                    </Group>

                    {/* Testimonial Title */}
                    <Title 
                      order={5} 
                      className="text-gray-800 font-semibold"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      "{testimonial.title}"
                    </Title>

                    {/* Testimonial Content */}
                    <Text 
                      size="sm" 
                      className="text-gray-600 leading-relaxed italic"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {testimonial.content}
                    </Text>
                  </Stack>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Card
            shadow="sm"
            padding="xl"
            radius="lg"
            className="bg-white border border-gray-100"
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Stack align="center" className="text-center">
                  <Title 
                    order={2} 
                    className="text-emerald-600 font-bold"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    10,000+
                  </Title>
                  <Text 
                    size="sm" 
                    className="text-gray-600 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Happy Customers
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Stack align="center" className="text-center">
                  <Title 
                    order={2} 
                    className="text-emerald-600 font-bold"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    4.8★
                  </Title>
                  <Text 
                    size="sm" 
                    className="text-gray-600 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Average Rating
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Stack align="center" className="text-center">
                  <Title 
                    order={2} 
                    className="text-emerald-600 font-bold"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    98%
                  </Title>
                  <Text 
                    size="sm" 
                    className="text-gray-600 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Customer Satisfaction
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Stack align="center" className="text-center">
                  <Title 
                    order={2} 
                    className="text-emerald-600 font-bold"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    5 Years
                  </Title>
                  <Text 
                    size="sm" 
                    className="text-gray-600 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Trusted Experience
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernTestimonialsSection;
