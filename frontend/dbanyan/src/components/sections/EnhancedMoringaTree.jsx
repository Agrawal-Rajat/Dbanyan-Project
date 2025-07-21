// Enhanced Interactive Moringa Tree Component
// A beautiful, engaging, and educational visualization

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Text, Stack, Badge, Group } from '@mantine/core';
import { IconLeaf, IconSeedling, IconPlant } from '@tabler/icons-react';

const EnhancedMoringaTree = () => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Enhanced Moringa information with more detail
  const moringaParts = {
    leaves: {
      title: 'Moringa Leaves',
      subtitle: 'Nature\'s Multivitamin',
      icon: <IconLeaf size={20} />,
      color: '#4CAF50',
      benefits: [
        '92 nutrients in perfect synergy',
        '7x more Vitamin C than oranges', 
        '4x more Calcium than milk',
        '3x more Potassium than bananas'
      ],
      description: 'The most nutrient-dense part of the tree, containing all essential amino acids',
      nutrients: {
        'Protein': '27%',
        'Vitamin A': '272%',
        'Vitamin C': '125%',
        'Iron': '71%'
      }
    },
    seeds: {
      title: 'Moringa Seeds',
      subtitle: 'Natural Purifiers',
      icon: <IconSeedling size={20} />,
      color: '#8D6E63',
      benefits: [
        'Natural water purification',
        'High in healthy fats',
        'Antimicrobial properties',
        'Liver detoxification support'
      ],
      description: 'Powerful detoxifiers used for centuries in traditional medicine',
      nutrients: {
        'Protein': '35%',
        'Healthy Fats': '40%',
        'Fiber': '15%',
        'Minerals': '10%'
      }
    },
    roots: {
      title: 'Moringa Roots',
      subtitle: 'Ancient Medicine',
      icon: <IconPlant size={20} />,
      color: '#8B7355',
      benefits: [
        'Traditional healing properties',
        'Anti-inflammatory compounds',
        'Digestive health support',
        'Natural immunity booster'
      ],
      description: 'Used in Ayurvedic medicine for thousands of years',
      nutrients: {
        'Alkaloids': '25%',
        'Saponins': '20%',
        'Phenolics': '30%',
        'Flavonoids': '25%'
      }
    },
    bark: {
      title: 'Moringa Bark',
      subtitle: 'Protective Shield',
      icon: <IconPlant size={20} />,
      color: '#A0522D',
      benefits: [
        'Natural antiseptic properties',
        'Wound healing compounds',
        'Traditional fever remedy',
        'Respiratory health support'
      ],
      description: 'The protective outer layer rich in healing compounds',
      nutrients: {
        'Tannins': '40%',
        'Alkaloids': '30%',
        'Resins': '20%',
        'Minerals': '10%'
      }
    }
  };

  // Animation variants
  const treeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  const partVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Enhanced Interactive Tree */}
        <motion.div 
          variants={treeVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Beautiful background with gradients */}
            <div 
              className="relative w-full h-[600px] rounded-3xl overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #E8F5E8 0%, #F0F9F0 50%, #E0F2E0 100%)',
                boxShadow: '0 20px 60px rgba(76, 175, 80, 0.15)'
              }}
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-15 w-24 h-24 bg-emerald-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-5 w-16 h-16 bg-lime-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Enhanced SVG Tree */}
              <svg
                viewBox="0 0 500 600"
                className="w-full h-full p-8 relative z-10"
              >
                {/* Sunlight rays */}
                <defs>
                  <radialGradient id="sunlight" cx="50%" cy="20%" r="50%">
                    <stop offset="0%" style={{stopColor:'#FFF9C4', stopOpacity:0.8}} />
                    <stop offset="100%" style={{stopColor:'#FFF9C4', stopOpacity:0}} />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background sunlight */}
                <circle cx="250" cy="100" r="150" fill="url(#sunlight)" />

                {/* Ground */}
                <motion.ellipse
                  cx="250" cy="580" rx="200" ry="15"
                  fill="#8BC34A" opacity="0.3"
                  animate={{ scaleX: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Enhanced Tree Trunk */}
                <motion.path
                  d="M250 550 L250 350 Q255 330 260 310 Q265 290 270 270 Q275 250 280 230"
                  stroke="url(#trunkGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                <defs>
                  <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#A0522D'}} />
                    <stop offset="100%" style={{stopColor:'#8B4513'}} />
                  </linearGradient>
                </defs>

                {/* Interactive Roots */}
                <motion.g
                  variants={partVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredPart('roots')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart('roots')}
                  className="cursor-pointer"
                >
                  <path
                    d="M250 550 Q220 570 190 590 M250 550 Q280 575 310 595 M250 550 Q230 580 200 600 M250 550 Q270 585 300 605"
                    stroke={hoveredPart === 'roots' ? '#D84315' : '#8B7355'}
                    strokeWidth={hoveredPart === 'roots' ? "8" : "6"}
                    fill="none"
                    strokeLinecap="round"
                    filter={hoveredPart === 'roots' ? "url(#glow)" : "none"}
                  />
                </motion.g>

                {/* Enhanced Branches */}
                <motion.g variants={partVariants}>
                  <path d="M280 230 Q320 200 360 170 Q400 140 440 110" stroke="#4CAF50" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <path d="M280 230 Q240 200 200 170 Q160 140 120 110" stroke="#4CAF50" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <path d="M280 230 Q300 190 320 150" stroke="#4CAF50" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path d="M280 230 Q260 190 240 150" stroke="#4CAF50" strokeWidth="8" fill="none" strokeLinecap="round" />
                </motion.g>

                {/* Interactive Leaves with realistic shapes */}
                <motion.g
                  variants={partVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredPart('leaves')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart('leaves')}
                  className="cursor-pointer"
                  animate={hoveredPart === 'leaves' ? pulseVariants.pulse : {}}
                >
                  {/* Left side leaf clusters */}
                  {[...Array(12)].map((_, i) => (
                    <motion.path
                      key={`leaf-left-${i}`}
                      d={`M${100 + i * 10} ${90 + i * 8} Q${110 + i * 10} ${85 + i * 8} ${120 + i * 10} ${90 + i * 8} Q${110 + i * 10} ${95 + i * 8} ${100 + i * 10} ${90 + i * 8}`}
                      fill={hoveredPart === 'leaves' ? '#66BB6A' : '#4CAF50'}
                      opacity={0.8 + (i % 3) * 0.1}
                      filter={hoveredPart === 'leaves' ? "url(#glow)" : "none"}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: Math.sin(i) * 10 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                  
                  {/* Right side leaf clusters */}
                  {[...Array(12)].map((_, i) => (
                    <motion.path
                      key={`leaf-right-${i}`}
                      d={`M${380 - i * 10} ${90 + i * 8} Q${390 - i * 10} ${85 + i * 8} ${400 - i * 10} ${90 + i * 8} Q${390 - i * 10} ${95 + i * 8} ${380 - i * 10} ${90 + i * 8}`}
                      fill={hoveredPart === 'leaves' ? '#66BB6A' : '#4CAF50'}
                      opacity={0.8 + (i % 3) * 0.1}
                      filter={hoveredPart === 'leaves' ? "url(#glow)" : "none"}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: -Math.sin(i) * 10 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </motion.g>

                {/* Interactive Seeds */}
                <motion.g
                  variants={partVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredPart('seeds')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart('seeds')}
                  className="cursor-pointer"
                  animate={hoveredPart === 'seeds' ? pulseVariants.pulse : {}}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.ellipse
                      key={`seed-${i}`}
                      cx={350 + (i % 3) * 15}
                      cy={180 + i * 12}
                      rx={hoveredPart === 'seeds' ? "8" : "5"}
                      ry={hoveredPart === 'seeds' ? "12" : "8"}
                      fill={hoveredPart === 'seeds' ? '#A0522D' : '#8B7355'}
                      filter={hoveredPart === 'seeds' ? "url(#glow)" : "none"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  ))}
                </motion.g>

                {/* Interactive Bark */}
                <motion.g
                  variants={partVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredPart('bark')}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => setSelectedPart('bark')}
                  className="cursor-pointer"
                >
                  {/* Bark texture lines */}
                  {[...Array(15)].map((_, i) => (
                    <motion.path
                      key={`bark-${i}`}
                      d={`M${240 + i * 2} ${350 + i * 15} Q${250 + i * 2} ${355 + i * 15} ${260 + i * 2} ${350 + i * 15}`}
                      stroke={hoveredPart === 'bark' ? '#D84315' : '#A0522D'}
                      strokeWidth={hoveredPart === 'bark' ? "3" : "2"}
                      fill="none"
                      opacity={0.6}
                      filter={hoveredPart === 'bark' ? "url(#glow)" : "none"}
                    />
                  ))}
                </motion.g>

                {/* Floating particles for magic effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={150 + i * 50}
                    cy={200 + i * 30}
                    r="2"
                    fill="#81C784"
                    opacity="0.6"
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>

              {/* Dynamic Information Popup */}
              <AnimatePresence>
                {hoveredPart && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="absolute top-4 right-4 z-20"
                    style={{ maxWidth: '300px' }}
                  >
                    <Card
                      padding="lg"
                      radius="xl"
                      style={{
                        background: 'linear-gradient(135deg, white 0%, #F8FFF8 100%)',
                        boxShadow: '0 20px 60px rgba(44, 95, 45, 0.25)',
                        border: `2px solid ${moringaParts[hoveredPart].color}20`
                      }}
                    >
                      <Stack spacing="md">
                        <Group spacing="sm">
                          <div style={{ color: moringaParts[hoveredPart].color }}>
                            {moringaParts[hoveredPart].icon}
                          </div>
                          <div>
                            <Text 
                              weight={600}
                              size="md"
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
                                color: moringaParts[hoveredPart].color
                              }}
                            >
                              {moringaParts[hoveredPart].subtitle}
                            </Text>
                          </div>
                        </Group>
                        
                        <Text 
                          size="sm"
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            color: '#5A6B5D'
                          }}
                        >
                          {moringaParts[hoveredPart].description}
                        </Text>

                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(moringaParts[hoveredPart].nutrients).map(([nutrient, value]) => (
                            <Badge 
                              key={nutrient}
                              size="sm" 
                              variant="light"
                              style={{ backgroundColor: `${moringaParts[hoveredPart].color}10` }}
                            >
                              {nutrient}: {value}
                            </Badge>
                          ))}
                        </div>
                      </Stack>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Information Panel */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="text-center lg:text-left mb-8">
            <Text 
              size="xl"
              weight={600}
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C5F2D',
                marginBottom: '16px'
              }}
            >
              Discover Every Part of the Miracle Tree
            </Text>
            <Text 
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#5A6B5D'
              }}
            >
              Hover over each part to explore the unique benefits and nutritional profile
            </Text>
          </div>

          {Object.entries(moringaParts).map(([key, part], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, x: 8 }}
              onClick={() => setSelectedPart(key)}
              className="cursor-pointer"
            >
              <Card
                padding="xl"
                radius="xl"
                style={{
                  background: selectedPart === key 
                    ? `linear-gradient(135deg, ${part.color}10 0%, white 100%)`
                    : 'white',
                  boxShadow: selectedPart === key || hoveredPart === key
                    ? `0 12px 40px ${part.color}30` 
                    : '0 4px 16px rgba(44, 95, 45, 0.08)',
                  border: selectedPart === key 
                    ? `2px solid ${part.color}` 
                    : '1px solid #F0EFEC',
                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
              >
                <Group spacing="md" align="flex-start">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${part.color}15` }}
                  >
                    <div style={{ color: part.color }}>
                      {part.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Group spacing="sm" mb="xs">
                      <Text 
                        weight={600}
                        style={{ 
                          fontFamily: '"Lora", serif',
                          color: '#2C3E2D'
                        }}
                      >
                        {part.title}
                      </Text>
                      <Badge 
                        size="sm" 
                        variant="light"
                        style={{ backgroundColor: `${part.color}10`, color: part.color }}
                      >
                        {part.subtitle}
                      </Badge>
                    </Group>
                    
                    <Text 
                      size="sm"
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        color: '#5A6B5D',
                        marginBottom: '12px'
                      }}
                    >
                      {part.description}
                    </Text>

                    <div className="space-y-1">
                      {part.benefits.slice(0, 2).map((benefit, i) => (
                        <Text 
                          key={i}
                          size="xs"
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            color: '#6B7280'
                          }}
                        >
                          • {benefit}
                        </Text>
                      ))}
                    </div>
                  </div>
                </Group>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedMoringaTree;
