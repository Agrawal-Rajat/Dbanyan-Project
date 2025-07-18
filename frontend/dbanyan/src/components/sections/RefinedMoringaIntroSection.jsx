// Dbanyan Group - Moringa Introduction Section  
// Implementing project_context.md Section 2.1 FR1.2, FR1.3 with organic design reference

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Text, Card, Group, Stack } from '@mantine/core';

const MoringaIntroSection = () => {
  const [hoveredPart, setHoveredPart] = useState(null);

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  // Moringa parts data matching design reference
  const moringaParts = {
    leaves: {
      title: "Rich in Antioxidants",
      description: "Nutrient-dense leaves packed with vitamins A, C, and E. Known for boosting immunity and providing natural energy.",
      benefits: ["High in Vitamin C", "Antioxidant Rich", "Natural Energy"]
    },
    seeds: {
      title: "Protein Powerhouse", 
      description: "Premium seeds containing high-quality protein and healthy fats. Perfect for detoxification and metabolism support.",
      benefits: ["High Protein", "Detoxifying", "Healthy Fats"]
    },
    roots: {
      title: "Traditional Wellness",
      description: "Traditional roots valued for their therapeutic properties. Support overall wellness and vitality naturally.",
      benefits: ["Traditional Medicine", "Wellness Support", "Natural Healing"]
    }
  };

  return (
    <section 
      id="moringa-intro"
      className="py-20 lg:py-32 relative"
      style={{ backgroundColor: '#F9F8F6' }}
    >
      <Container size="xl">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Title 
              order={2}
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C3E2D'
              }}
            >
              What is Moringa?
            </Title>
            <Text 
              size="xl"
              className="max-w-3xl mx-auto leading-relaxed"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#5A6B5D'
              }}
            >
              Moringa oleifera tree is a nutrient-dense plant whose leaves, seeds, and roots are valued for nutritional benefits and bio-preventives.
            </Text>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Interactive Moringa Tree */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Tree Illustration Container */}
                <div 
                  className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden"
                  style={{ 
                    backgroundColor: '#F0F4F0',
                    boxShadow: '0 8px 32px rgba(151, 188, 98, 0.15)'
                  }}
                >
                  {/* Simplified Moringa Tree SVG */}
                  <svg
                    viewBox="0 0 400 500"
                    className="w-full h-full p-8"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(44, 95, 45, 0.1))' }}
                  >
                    {/* Tree Trunk */}
                    <motion.path
                      d="M200 450 L200 300 Q205 280 210 260 Q215 240 220 220"
                      stroke="#8B7355"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Roots */}
                    <motion.g
                      onMouseEnter={() => setHoveredPart('roots')}
                      onMouseLeave={() => setHoveredPart(null)}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <path
                        d="M200 450 Q180 460 160 470 M200 450 Q220 465 240 475 M200 450 Q190 470 170 485"
                        stroke="#8B7355"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        opacity={hoveredPart === 'roots' ? 1 : 0.7}
                      />
                    </motion.g>

                    {/* Branches */}
                    <motion.g>
                      <path
                        d="M220 220 Q240 200 260 180 Q280 160 300 140"
                        stroke="#7A8471"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M220 220 Q200 200 180 180 Q160 160 140 140"
                        stroke="#7A8471"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.g>

                    {/* Leaves */}
                    <motion.g
                      onMouseEnter={() => setHoveredPart('leaves')}
                      onMouseLeave={() => setHoveredPart(null)}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Left side leaves */}
                      <ellipse cx="120" cy="120" rx="15" ry="8" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                      <ellipse cx="140" cy="110" rx="12" ry="6" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                      <ellipse cx="100" cy="140" rx="18" ry="10" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                      
                      {/* Right side leaves */}
                      <ellipse cx="280" cy="120" rx="15" ry="8" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                      <ellipse cx="300" cy="130" rx="12" ry="6" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                      <ellipse cx="320" cy="110" rx="18" ry="10" fill="#97BC62" opacity={hoveredPart === 'leaves' ? 1 : 0.8} />
                    </motion.g>

                    {/* Seeds */}
                    <motion.g
                      onMouseEnter={() => setHoveredPart('seeds')}
                      onMouseLeave={() => setHoveredPart(null)}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                    >
                      <circle cx="290" cy="180" r="8" fill="#8B7355" opacity={hoveredPart === 'seeds' ? 1 : 0.8} />
                      <circle cx="300" cy="195" r="6" fill="#8B7355" opacity={hoveredPart === 'seeds' ? 1 : 0.8} />
                      <circle cx="285" cy="200" r="7" fill="#8B7355" opacity={hoveredPart === 'seeds' ? 1 : 0.8} />
                    </motion.g>
                  </svg>

                  {/* Floating Tooltip */}
                  {hoveredPart && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute top-4 right-4 z-10"
                      style={{ maxWidth: '200px' }}
                    >
                      <Card
                        padding="md"
                        radius="lg"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: '0 8px 24px rgba(44, 95, 45, 0.15)',
                          border: '1px solid #E8E6E3'
                        }}
                      >
                        <Stack spacing="xs">
                          <Text 
                            weight={600}
                            size="sm"
                            style={{ 
                              fontFamily: '"Lora", serif',
                              color: '#2C3E2D'
                            }}
                          >
                            {moringaParts[hoveredPart].title}
                          </Text>
                          <Text 
                            size="xs"
                            style={{ 
                              fontFamily: '"Inter", sans-serif',
                              color: '#5A6B5D'
                            }}
                          >
                            {moringaParts[hoveredPart].description}
                          </Text>
                        </Stack>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Information Cards */}
            <motion.div variants={itemVariants}>
              <Stack spacing="xl">
                {Object.entries(moringaParts).map(([key, part]) => (
                  <motion.div
                    key={key}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      padding="xl"
                      radius="xl"
                      style={{
                        backgroundColor: 'white',
                        boxShadow: hoveredPart === key 
                          ? '0 12px 40px rgba(44, 95, 45, 0.2)' 
                          : '0 4px 16px rgba(44, 95, 45, 0.08)',
                        border: '1px solid #F0EFEC',
                        transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredPart(key)}
                      onMouseLeave={() => setHoveredPart(null)}
                    >
                      <Stack spacing="md">
                        <Title 
                          order={3}
                          size="xl"
                          style={{ 
                            fontFamily: '"Lora", serif',
                            color: '#2C3E2D'
                          }}
                        >
                          {part.title}
                        </Title>
                        
                        <Text 
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            color: '#5A6B5D',
                            lineHeight: 1.6
                          }}
                        >
                          {part.description}
                        </Text>

                        <Group spacing="xs">
                          {part.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: '#F0F4F0',
                                color: '#2C5F2D',
                                fontFamily: '"Inter", sans-serif',
                                fontWeight: 500
                              }}
                            >
                              {benefit}
                            </span>
                          ))}
                        </Group>
                      </Stack>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MoringaIntroSection;
