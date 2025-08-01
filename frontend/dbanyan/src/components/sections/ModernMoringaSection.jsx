// Dbanyan Group - Modern Moringa Section
// Professional showcase with real images and engaging content

import React, { useState } from 'react';
import { Container, Title, Text, Card, Group, Stack, Badge, Button, Grid } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  IconLeaf,
  IconDroplet,
  IconFlame,
  IconShield,
  IconHeart,
  IconBrain,
  IconEye,
  IconBone,
  IconPlant,
  IconArrowRight
} from '@tabler/icons-react';

const ModernMoringaSection = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const moringaParts = [
    {
      id: 'leaves',
      name: 'Moringa Leaves',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      nutrients: 'Vitamin C, Iron, Protein',
      description: 'The powerhouse of nutrition, Moringa leaves contain 7x more Vitamin C than oranges, 4x more calcium than milk, and 3x more potassium than bananas. These nutrient-dense leaves are the foundation of a Moringified lifestyle.',
      benefits: ['Boosts Immunity', 'Supports Energy Levels', 'Enhances Mental Clarity', 'Promotes Healthy Skin', 'Aids Digestion'],
      icon: IconLeaf,
      color: '#059669',
      nutritionFacts: { vitaminC: '220mg', iron: '28mg', protein: '27g', calcium: '2000mg' }
    },
    {
      id: 'seeds',
      name: 'Moringa Seeds',
      image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=300&fit=crop',
      nutrients: 'Healthy Oils, Vitamin E',
      description: 'Moringa seeds are nature\'s water purifiers and health enhancers. Rich in healthy monounsaturated fats and powerful antioxidants, they support cardiovascular health and provide sustained energy throughout your day.',
      benefits: ['Heart Health Support', 'Natural Water Purification', 'Anti-inflammatory Properties', 'Skin Rejuvenation', 'Blood Sugar Regulation'],
      icon: IconDroplet,
      color: '#047857',
      nutritionFacts: { vitaminE: '15mg', healthyFats: '35g', fiber: '8g', antioxidants: 'High' }
    },
    {
      id: 'pods',
      name: 'Moringa Pods',
      image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400&h=300&fit=crop',
      nutrients: 'Vitamins A, B, K',
      description: 'Known as "drumsticks" in many cultures, Moringa pods are culinary treasures packed with essential vitamins and minerals. They offer a unique way to incorporate the Moringa benefits into your daily meals.',
      benefits: ['Rich in Vitamin K', 'Supports Bone Health', 'Aids in Blood Clotting', 'Boosts Metabolism', 'Enhances Flavor'],
      icon: IconFlame,
      color: '#065f46',
      nutritionFacts: { vitaminK: '180mcg', vitaminA: '2000IU', folate: '40mcg', magnesium: '147mg' }
    },
    {
      id: 'roots',
      name: 'Moringa Roots',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c65ae8fe55?w=400&h=300&fit=crop',
      nutrients: 'Medicinal Compounds',
      description: 'The roots of the Moringa tree have been used in traditional medicine for centuries. Rich in bioactive compounds, they represent the ancient wisdom of natural healing and holistic wellness.',
      benefits: ['Traditional Medicine', 'Natural Healing Properties', 'Digestive Support', 'Anti-bacterial Effects', 'Immune System Boost'],
      icon: IconShield,
      color: '#0d9488',
      nutritionFacts: { alkaloids: 'Present', flavonoids: 'High', saponins: 'Active', tannins: 'Beneficial' }
    }
  ];

  const healthBenefits = [
    {
      icon: IconHeart,
      title: 'Heart Health',
      description: 'Supports cardiovascular wellness with natural compounds',
      color: '#ef4444'
    },
    {
      icon: IconBrain,
      title: 'Mental Clarity',
      description: 'Enhances cognitive function and mental focus',
      color: '#8b5cf6'
    },
    {
      icon: IconEye,
      title: 'Vision Support',
      description: 'Rich in Vitamin A for healthy eyesight',
      color: '#f59e0b'
    },
    {
      icon: IconBone,
      title: 'Bone Strength',
      description: 'High calcium content for strong bones',
      color: '#06b6d4'
    },
    {
      icon: IconShield,
      title: 'Immune Boost',
      description: 'Natural antioxidants strengthen immunity',
      color: '#10b981'
    },
    {
      icon: IconPlant,
      title: 'Natural Energy',
      description: 'Sustained energy without caffeine crashes',
      color: '#84cc16'
    }
  ];

  return (
    <section 
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)'
      }}
    >
      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col items-center justify-center text-center w-full">
            <Badge 
              size="lg" 
              radius="xl" 
              className="mb-4 mx-auto"
              style={{ 
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                color: '#059669',
                border: '1px solid #a7f3d0',
                textAlign: 'center'
              }}
            >
              <IconLeaf className="w-4 h-4 mr-2" />
              MORINGIFY YOUR WORLD
            </Badge>
            <Title 
              order={2} 
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, serif',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Join the Moringification Revolution
            </Title>
            <Text 
              size="xl" 
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-center"
              style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
            >
              Ready to Moringify your life? Thousands have already discovered how this ancient 
              superfood transforms ordinary days into extraordinary wellness experiences. 
              Every leaf, seed, and root contains nature's blueprint for optimal health, 
              waiting to revolutionize your vitality from the inside out.
            </Text>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <Group gap="xs">
              {[
                { id: 'benefits', label: 'Health Benefits', icon: IconHeart },
                { id: 'parts', label: 'Moringa Parts', icon: IconLeaf }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </Group>
          </div>
        </motion.div>

        {/* Content Sections */}
        {activeTab === 'benefits' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid gutter="xl">
              {healthBenefits.map((benefit, index) => (
                <Grid.Col key={benefit.title} span={{ base: 12, md: 6, lg: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card 
                      className="h-full bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                      radius="xl" 
                      p="xl"
                    >
                      <Stack align="center" className="text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${benefit.color}15` }}
                        >
                          <benefit.icon 
                            className="w-8 h-8" 
                            style={{ color: benefit.color }}
                          />
                        </div>
                        
                        <Title 
                          order={4} 
                          className="text-xl font-semibold mb-2"
                          style={{ fontFamily: '"Lora", serif', color: '#1f2937' }}
                        >
                          {benefit.title}
                        </Title>
                        
                        <Text 
                          className="text-gray-600 leading-relaxed"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {benefit.description}
                        </Text>
                      </Stack>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </motion.div>
        )}

        {activeTab === 'parts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid gutter="xl">
              {moringaParts.map((part, index) => (
                <Grid.Col key={part.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card 
                      className="h-full bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
                      radius="2xl" 
                      padding="0"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={part.image}
                          alt={part.name}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div 
                          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${part.color}15`, backdropFilter: 'blur(10px)' }}
                        >
                          <part.icon 
                            className="w-5 h-5" 
                            style={{ color: part.color }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <Stack gap="md">
                          <Group justify="space-between" align="center">
                            <Title 
                              order={5} 
                              className="text-lg font-semibold"
                              style={{ fontFamily: '"Lora", serif', color: part.color }}
                            >
                              {part.name}
                            </Title>
                            <Badge 
                              size="sm" 
                              radius="md"
                              style={{ backgroundColor: `${part.color}15`, color: part.color }}
                            >
                              {part.nutrients}
                            </Badge>
                          </Group>

                          <Stack gap="xs">
                            {part.benefits.map((benefit, idx) => (
                              <Group key={idx} gap="xs" align="flex-start">
                                <div 
                                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: part.color }}
                                />
                                <Text 
                                  size="sm" 
                                  className="text-gray-600"
                                  style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                  {benefit}
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                        </Stack>
                      </div>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card 
            className="max-w-2xl mx-auto p-8"
            radius="2xl"
            style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #a7f3d0'
            }}
          >
            <Stack gap="md" align="center">
              <Title 
                order={3} 
                className="text-2xl font-semibold text-emerald-800"
                style={{ fontFamily: '"Lora", serif' }}
              >
                Ready to Experience Moringa?
              </Title>
              
              <Text 
                className="text-emerald-700 leading-relaxed max-w-lg"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Join thousands who have transformed their health with our premium, 
                preservative-free Moringa products.
              </Text>
              
              <Group gap="md">
                <Button
                  size="lg"
                  radius="xl"
                  rightSection={<IconArrowRight className="w-4 h-4" />}
                  component={Link}
                  to="/products"
                  className="font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    color: 'white'
                  }}
                >
                  Shop Products
                </Button>
                
                <Button
                  size="lg"
                  radius="xl"
                  variant="outline"
                  component={Link}
                  to="/moringa-guide"
                  className="font-semibold border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Learn More
                </Button>
              </Group>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default ModernMoringaSection;
