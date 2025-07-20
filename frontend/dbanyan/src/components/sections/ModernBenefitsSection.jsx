// Dbanyan Group - Modern Benefits Section
// Professional health benefits showcase with engaging design

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
  Stack,
  Box
} from '@mantine/core';
import { 
  IconHeart, 
  IconBrain, 
  IconShield, 
  IconBolt,
  IconLeaf,
  IconDroplet,
  IconBone,
  IconEye
} from '@tabler/icons-react';

const ModernBenefitsSection = () => {
  const benefits = [
    {
      icon: IconHeart,
      title: "Heart Health",
      description: "Rich in antioxidants that support cardiovascular wellness and healthy blood pressure.",
      color: "#E57373"
    },
    {
      icon: IconBrain,
      title: "Mental Clarity",
      description: "Natural compounds that enhance cognitive function and mental focus.",
      color: "#9C27B0"
    },
    {
      icon: IconShield,
      title: "Immune Support",
      description: "Powerful immune-boosting properties with high vitamin C content.",
      color: "#4CAF50"
    },
    {
      icon: IconBolt,
      title: "Natural Energy",
      description: "Sustainable energy boost without caffeine crash or jitters.",
      color: "#FF9800"
    },
    {
      icon: IconLeaf,
      title: "Anti-Inflammatory",
      description: "Natural anti-inflammatory compounds reduce oxidative stress.",
      color: "#2C5F2D"
    },
    {
      icon: IconDroplet,
      title: "Skin Health",
      description: "Vitamins A, C, and E promote healthy, glowing skin from within.",
      color: "#00BCD4"
    },
    {
      icon: IconBone,
      title: "Bone Strength",
      description: "High calcium and phosphorus content support bone density.",
      color: "#795548"
    },
    {
      icon: IconEye,
      title: "Eye Health",
      description: "Beta-carotene and lutein support vision and eye health.",
      color: "#3F51B5"
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
            variant="light" 
            color="green"
            className="mb-4"
          >
            Health Benefits
          </Badge>
          <Title 
            order={2} 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Nature's Complete 
            <Text component="span" className="text-emerald-600"> Superfood</Text>
          </Title>
          <Text 
            size="lg" 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Discover why Moringa is called the "Miracle Tree" - packed with 
            over 90 nutrients, antioxidants, and bioactive compounds.
          </Text>
        </motion.div>

        {/* Benefits Grid */}
        <Grid gutter="xl">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
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
                    className="h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <Stack align="center" className="text-center">
                      {/* Icon */}
                      <Box
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ 
                          backgroundColor: `${benefit.color}15`,
                          border: `2px solid ${benefit.color}30`
                        }}
                      >
                        <Icon 
                          size={32} 
                          color={benefit.color}
                          stroke={1.5}
                        />
                      </Box>

                      {/* Title */}
                      <Title 
                        order={4} 
                        className="text-gray-800 font-semibold"
                        style={{ fontFamily: 'Lora, serif' }}
                      >
                        {benefit.title}
                      </Title>

                      {/* Description */}
                      <Text 
                        size="sm" 
                        className="text-gray-600 leading-relaxed"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {benefit.description}
                      </Text>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Box className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <Group justify="center" className="mb-6">
              <IconLeaf size={32} className="text-emerald-600" />
              <Title 
                order={3} 
                className="text-gray-800"
                style={{ fontFamily: 'Lora, serif' }}
              >
                100% Natural & Organic
              </Title>
            </Group>
            <Text 
              size="lg" 
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Our Moringa is sustainably sourced from organic farms, 
              carefully processed to preserve maximum nutritional value, 
              and rigorously tested for purity and potency.
            </Text>
            <Group justify="center" gap="lg">
              <Badge size="lg" variant="light" color="green">
                No Preservatives
              </Badge>
              <Badge size="lg" variant="light" color="blue">
                Lab Tested
              </Badge>
              <Badge size="lg" variant="light" color="orange">
                Premium Quality
              </Badge>
            </Group>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernBenefitsSection;
