// Dbanyan Group - Vision Section Component
// Implementing project_context.md Section 2.1 FR1.6
// Communicating the vision and commitment to purity

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Text, Grid, Card, Stack } from '@mantine/core';

const VisionSection = () => {
  // Vision pillars based on Brand Identity (Section 1.2)
  const visionPillars = [
    {
      icon: '🌿',
      title: 'Purity First',
      description: 'Every product is crafted without preservatives, artificial colors, or harmful additives. We believe in the power of pure, natural ingredients.'
    },
    {
      icon: '🌱',
      title: 'Nature\'s Wisdom',
      description: 'We honor traditional knowledge while embracing modern science to unlock the full potential of Moringa\'s nutritional benefits.'
    },
    {
      icon: '💚',
      title: 'Wellness Journey',
      description: 'Your health is our mission. We\'re committed to supporting your journey toward optimal wellness with transparency and trust.'
    },
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We believe in honest communication about our processes, sourcing, and the science behind our products.'
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <Title 
              order={2} 
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C5F2D'
              }}
            >
              Our Vision for Your Wellness
            </Title>
            <Text 
              size="xl" 
              className="max-w-3xl mx-auto leading-relaxed"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#333333'
              }}
            >
              At Dbanyan Group, we envision a world where natural wellness is accessible to everyone. 
              Our commitment goes beyond just selling products—we're building a community dedicated 
              to pure, authentic health solutions.
            </Text>
          </div>

          {/* Main Vision Statement */}
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12 mb-16"
            variants={sectionVariants}
          >
            <div className="text-center max-w-4xl mx-auto">
              <Text 
                size="2xl" 
                className="font-medium leading-relaxed italic"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: '#2C5F2D'
                }}
              >
                "To harness the pure power of nature's most nutritious tree, creating products that 
                honor both traditional wisdom and modern wellness needs—always without compromise 
                on purity, quality, or transparency."
              </Text>
              <Text 
                size="lg" 
                className="mt-6 font-semibold"
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  color: '#333333'
                }}
              >
                — The Dbanyan Group Promise
              </Text>
            </div>
          </motion.div>

          {/* Vision Pillars Grid */}
          <Grid gutter="xl">
            {visionPillars.map((pillar, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
                <motion.div
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    shadow="sm"
                    padding="xl"
                    radius="lg"
                    className="h-full text-center transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'white', border: '2px solid #97BC62FF' }}
                  >
                    <Stack align="center" spacing="md">
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                        style={{ backgroundColor: '#97BC62FF' }}
                      >
                        {pillar.icon}
                      </div>

                      {/* Title */}
                      <Title 
                        order={3} 
                        size="h4"
                        style={{ 
                          fontFamily: '"Lora", serif',
                          color: '#2C5F2D'
                        }}
                      >
                        {pillar.title}
                      </Title>

                      {/* Description */}
                      <Text 
                        size="md" 
                        className="leading-relaxed"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          color: '#333333'
                        }}
                      >
                        {pillar.description}
                      </Text>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>

          {/* Commitment Section */}
          <motion.div 
            className="mt-20 text-center"
            variants={sectionVariants}
          >
            <div className="max-w-4xl mx-auto">
              <Title 
                order={3} 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ 
                  fontFamily: '"Lora", serif',
                  color: '#2C5F2D'
                }}
              >
                Our Commitment to You
              </Title>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <Title 
                    order={4} 
                    size="h5" 
                    className="mb-3"
                    style={{ 
                      fontFamily: '"Lora", serif',
                      color: '#2C5F2D'
                    }}
                  >
                    🚫 What We Never Use
                  </Title>
                  <ul className="space-y-2">
                    {[
                      'Artificial preservatives',
                      'Synthetic colors or flavors',
                      'Chemical additives',
                      'Harmful processing methods'
                    ].map((item, index) => (
                      <li 
                        key={index}
                        className="flex items-center"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          color: '#333333'
                        }}
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Title 
                    order={4} 
                    size="h5" 
                    className="mb-3"
                    style={{ 
                      fontFamily: '"Lora", serif',
                      color: '#2C5F2D'
                    }}
                  >
                    ✅ What We Always Provide
                  </Title>
                  <ul className="space-y-2">
                    {[
                      'Pure, natural ingredients',
                      'Sustainable sourcing',
                      'Transparent processes',
                      'Honest communication'
                    ].map((item, index) => (
                      <li 
                        key={index}
                        className="flex items-center"
                        style={{ 
                          fontFamily: '"Inter", sans-serif',
                          color: '#333333'
                        }}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionSection;
