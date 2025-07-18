// Dbanyan Group - Moringa Introduction Section
// Following project_context.md Section 2.1 FR1.2, FR1.3 & organic design reference

import React, { useState } from 'react';
import { Container, Title, Text, Card, Group, Stack } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

const MoringaIntroSection = () => {
  const [hoveredPart, setHoveredPart] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-organic-sage-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-organic-sage-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-organic-earth-200 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive SVG Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main SVG Container */}
            <div className="relative bg-organic-sage-100 rounded-3xl p-8 shadow-organic">
              <svg
                width="100%"
                height="400"
                viewBox="0 0 400 400"
                className="w-full h-auto"
              >
                {/* Tree Trunk */}
                <motion.rect
                  x="190"
                  y="250"
                  width="20"
                  height="80"
                  fill="#8B4513"
                  rx="2"
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredPart('trunk')}
                  onHoverEnd={() => setHoveredPart(null)}
                />

                {/* Roots */}
                <motion.g
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredPart('roots')}
                  onHoverEnd={() => setHoveredPart(null)}
                >
                  <path
                    d="M200 330 Q170 350 140 360 M200 330 Q230 350 260 360 M200 330 Q180 370 150 380 M200 330 Q220 370 250 380"
                    stroke="#8B4513"
                    strokeWidth="4"
                    fill="none"
                  />
                </motion.g>

                {/* Main Leaves */}
                <motion.g
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredPart('leaves')}
                  onHoverEnd={() => setHoveredPart(null)}
                >
                  {/* Multiple leaf clusters */}
                  {[
                    { x: 120, y: 180, rotate: -30 },
                    { x: 160, y: 150, rotate: 15 },
                    { x: 240, y: 160, rotate: -15 },
                    { x: 280, y: 190, rotate: 45 },
                    { x: 200, y: 120, rotate: 0 },
                    { x: 140, y: 220, rotate: -60 },
                    { x: 260, y: 230, rotate: 60 }
                  ].map((leaf, index) => (
                    <g key={index} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate})`}>
                      <ellipse cx="0" cy="0" rx="12" ry="6" fill="#4A7C59" />
                      <ellipse cx="8" cy="-2" rx="8" ry="4" fill="#4A7C59" />
                      <ellipse cx="-8" cy="2" rx="8" ry="4" fill="#4A7C59" />
                      <ellipse cx="0" cy="-8" rx="6" ry="3" fill="#4A7C59" />
                    </g>
                  ))}
                </motion.g>

                {/* Seeds/Pods */}
                <motion.g
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredPart('seeds')}
                  onHoverEnd={() => setHoveredPart(null)}
                >
                  {[
                    { x: 180, y: 200 },
                    { x: 220, y: 190 },
                    { x: 160, y: 210 },
                    { x: 240, y: 210 }
                  ].map((seed, index) => (
                    <ellipse
                      key={index}
                      cx={seed.x}
                      cy={seed.y}
                      rx="8"
                      ry="15"
                      fill="#D4A574"
                      transform={`rotate(${index * 20 - 10} ${seed.x} ${seed.y})`}
                    />
                  ))}
                </motion.g>
              </svg>

              {/* Tooltip/Info Cards */}
              <AnimatePresence>
                {hoveredPart && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-4 right-4 z-20"
                  >
                    <Card
                      shadow="lg"
                      radius="lg"
                      className="bg-white/95 backdrop-blur-sm border border-organic-sage-200 max-w-xs"
                    >
                      <Stack gap="sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-organic-sage-100 rounded-lg flex items-center justify-center">
                            {getPartIcon(hoveredPart)}
                          </div>
                          <div>
                            <Text fw={600} className="text-organic-forest-800">
                              {getPartInfo(hoveredPart).title}
                            </Text>
                          </div>
                        </div>
                        <Text size="sm" className="text-organic-forest-600">
                          {getPartInfo(hoveredPart).description}
                        </Text>
                      </Stack>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Stack gap="xl">
              <div>
                <Title 
                  order={2} 
                  className="text-4xl lg:text-5xl font-serif text-organic-forest-800 mb-6"
                >
                  What is Moringa?
                </Title>
                
                <Text size="lg" className="text-organic-forest-600 leading-relaxed mb-8">
                  Moringa oleifera tree is a nutrient-dense plant whose leaves, 
                  <span className="font-semibold text-organic-amber-600"> seeds and roots</span> are 
                  valued for nutritional benefits, bio-preventives.
                </Text>
              </div>

              {/* Key Benefits Cards */}
              <div className="grid gap-4">
                {[
                  {
                    icon: "🌿",
                    title: "Rich in Antioxidants",
                    description: "Natural compounds that help protect your cells from damage and reduce inflammation."
                  },
                  {
                    icon: "💪",
                    title: "Complete Protein",
                    description: "Contains all essential amino acids your body needs for optimal health and energy."
                  },
                  {
                    icon: "🌱",
                    title: "Vitamin Powerhouse",
                    description: "Packed with vitamins A, C, and E, plus calcium, potassium, and iron."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="bg-white/60 backdrop-blur-sm border border-organic-sage-200 hover:shadow-organic transition-all duration-300"
                      radius="lg"
                      p="lg"
                    >
                      <Group align="flex-start" gap="md">
                        <div className="text-2xl">{benefit.icon}</div>
                        <div className="flex-1">
                          <Text fw={600} className="text-organic-forest-800 mb-2">
                            {benefit.title}
                          </Text>
                          <Text size="sm" className="text-organic-forest-600">
                            {benefit.description}
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Stack>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// Helper functions
const getPartIcon = (part) => {
  const icons = {
    leaves: <span className="text-xl">🌿</span>,
    seeds: <span className="text-xl">🌰</span>,
    roots: <span className="text-xl">🌱</span>,
    trunk: <span className="text-xl">🌳</span>
  };
  return icons[part] || <span className="text-xl">🌿</span>;
};

const getPartInfo = (part) => {
  const info = {
    leaves: {
      title: 'Moringa Leaves',
      description: 'Packed with vitamins A, C, and E. Rich in calcium, potassium, and protein. Perfect for daily nutrition.'
    },
    seeds: {
      title: 'Moringa Seeds',
      description: 'High in protein and healthy fats. Known for their detoxifying properties and antimicrobial benefits.'
    },
    roots: {
      title: 'Moringa Roots',
      description: 'Traditional remedy for digestive health and natural energy enhancement. Used in traditional medicine.'
    },
    trunk: {
      title: 'Moringa Tree',
      description: 'The miracle tree that provides complete nutrition. Every part has unique health benefits.'
    }
  };
  return info[part] || info.leaves;
};

export default MoringaIntroSection;
