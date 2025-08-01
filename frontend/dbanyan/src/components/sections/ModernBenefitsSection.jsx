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
      title: "Cardiovascular Health",
      description: "Moringa's natural compounds support heart health, help regulate blood pressure, and promote healthy circulation throughout your body.",
      color: "#dc2626",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
    },
    {
      icon: IconBrain,
      title: "Cognitive Enhancement",
      description: "Boost mental clarity, focus, and memory with Moringa's neuroprotective compounds that support optimal brain function.",
      color: "#7c3aed",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop"
    },
    {
      icon: IconShield,
      title: "Immune Defense",
      description: "Strengthen your body's natural defense system with powerful antioxidants and immune-boosting nutrients.",
      color: "#059669",
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=100&h=100&fit=crop"
    },
    {
      icon: IconBolt,
      title: "Natural Energy",
      description: "Experience sustained energy without crashes. Moringa provides natural, caffeine-free vitality that lasts all day.",
      color: "#ea580c",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
    },
    {
      icon: IconLeaf,
      title: "Digestive Wellness",
      description: "Support healthy digestion and gut health with Moringa's natural fiber and digestive-friendly compounds.",
      color: "#16a34a",
      image: "https://images.unsplash.com/photo-1559757175-4486a5aa5d2e?w=100&h=100&fit=crop"
    },
    {
      icon: IconDroplet,
      title: "Hydration & Detox",
      description: "Naturally detoxify your body while maintaining optimal hydration and supporting kidney function.",
      color: "#0891b2",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop"
    },
    {
      icon: IconBone,
      title: "Bone Strength",
      description: "Rich in calcium and phosphorus, Moringa supports strong bones and overall skeletal health.",
      color: "#6b7280",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
    },
    {
      icon: IconEye,
      title: "Vision Support",
      description: "High in Vitamin A and antioxidants that support healthy vision and protect against eye-related issues.",
      color: "#7c2d12",
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=100&h=100&fit=crop"
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
          <div className="flex flex-col items-center justify-center text-center w-full">
            <Badge 
              size="lg" 
              variant="light" 
              color="green"
              className="mb-4 mx-auto"
              style={{ textAlign: 'center' }}
            >
              Moringify Benefits
            </Badge>
            <Title 
              order={2} 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center"
              style={{ fontFamily: 'Lora, serif', textAlign: 'center' }}
            >
              Feel the Power of
              <Text component="span" className="text-emerald-600"> Moringification</Text>
            </Title>
            <Text 
              size="lg" 
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-center"
              style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
            >
              Experience what it means to live a Moringified life - where every nutrient, 
              antioxidant, and bioactive compound works in harmony to elevate your wellbeing.
            </Text>
          </div>
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
