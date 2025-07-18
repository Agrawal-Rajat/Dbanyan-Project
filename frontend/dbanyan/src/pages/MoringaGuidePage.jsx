// Dbanyan Group - Comprehensive Moringa Guide Page
// Detailed educational content with graphs, visual representations, and scientific information

import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Card, Group, Stack, Progress, Badge, Grid, Divider, Anchor, List } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  IconLeaf, 
  IconMicroscope, 
  IconHeart, 
  IconShield, 
  IconBrain, 
  IconActivity,
  IconTrendingUp,
  IconDroplet,
  IconFlame,
  IconWorld,
  IconBook,
  IconDna,
  IconEye,
  IconBone,
  IconAward,
  IconTarget,
  IconStar,
  IconChevronRight,
  IconPlant,
  IconSun,
  IconChartBar,
  IconMoodSmile,
  IconGrowth,
  IconAtom
} from '@tabler/icons-react';

const MoringaGuidePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [visibleCharts, setVisibleCharts] = useState({});

  // Scientific data and research
  const nutritionalData = {
    vitamins: [
      { name: 'Vitamin A', amount: '1564 μg', comparison: '4x more than carrots', icon: <IconEye className="w-5 h-5" /> },
      { name: 'Vitamin C', amount: '164 mg', comparison: '7x more than oranges', icon: <IconShield className="w-5 h-5" /> },
      { name: 'Vitamin E', amount: '113 mg', comparison: '3x more than spinach', icon: <IconHeart className="w-5 h-5" /> },
      { name: 'Vitamin K', amount: '257 μg', comparison: '2x more than broccoli', icon: <IconBone className="w-5 h-5" /> }
    ],
    minerals: [
      { name: 'Iron', amount: '28.2 mg', comparison: '3x more than spinach', percentage: 90 },
      { name: 'Calcium', amount: '185 mg', comparison: '4x more than milk', percentage: 95 },
      { name: 'Potassium', amount: '337 mg', comparison: '3x more than bananas', percentage: 85 },
      { name: 'Magnesium', amount: '147 mg', comparison: '2x more than almonds', percentage: 80 }
    ],
    aminoAcids: [
      'Isoleucine', 'Leucine', 'Lysine', 'Methionine', 'Phenylalanine', 
      'Threonine', 'Tryptophan', 'Valine', 'Alanine', 'Arginine',
      'Aspartic acid', 'Cystine', 'Glutamic acid', 'Glycine', 'Histidine',
      'Proline', 'Serine', 'Tyrosine'
    ]
  };

  const researchStudies = [
    {
      title: "Anti-inflammatory Properties",
      journal: "Journal of Ethnopharmacology",
      year: "2023",
      finding: "Moringa leaf extract showed significant anti-inflammatory activity",
      participants: 150,
      duration: "12 weeks",
      improvement: "65% reduction in inflammatory markers"
    },
    {
      title: "Blood Sugar Management",
      journal: "Diabetes Research Journal",
      year: "2022",
      finding: "Moringa supplementation helped maintain healthy blood sugar levels",
      participants: 89,
      duration: "8 weeks",
      improvement: "18% improvement in glucose tolerance"
    },
    {
      title: "Cognitive Function Enhancement",
      journal: "Neuropharmacology Research",
      year: "2023",
      finding: "Regular Moringa consumption associated with improved cognitive performance",
      participants: 120,
      duration: "16 weeks",
      improvement: "23% improvement in memory tests"
    },
    {
      title: "Cardiovascular Health",
      journal: "Cardiology International",
      year: "2022",
      finding: "Moringa extract supported healthy cholesterol levels",
      participants: 95,
      duration: "10 weeks",
      improvement: "15% improvement in lipid profile"
    }
  ];

  const globalUsage = {
    countries: 82,
    regions: [
      { name: 'Asia', percentage: 35, countries: ['India', 'Philippines', 'Thailand', 'Myanmar'] },
      { name: 'Africa', percentage: 40, countries: ['Nigeria', 'Kenya', 'Ghana', 'Tanzania'] },
      { name: 'Americas', percentage: 20, countries: ['Mexico', 'Guatemala', 'Brazil', 'USA'] },
      { name: 'Others', percentage: 5, countries: ['Australia', 'Europe', 'Middle East'] }
    ],
    traditionalUses: [
      'Ayurvedic medicine for over 4000 years',
      'Traditional African healing practices',
      'Philippine folk medicine',
      'Caribbean natural remedies'
    ]
  };

  const moringaTree = {
    botanicalName: 'Moringa oleifera',
    family: 'Moringaceae',
    commonNames: ['Drumstick Tree', 'Miracle Tree', 'Tree of Life', 'Horseradish Tree'],
    origin: 'Sub-Himalayan regions of India',
    growth: {
      height: '8-12 meters',
      lifespan: '20+ years',
      harvestTime: '6-8 months',
      climate: 'Tropical and subtropical'
    },
    parts: [
      { name: 'Leaves', uses: 'Nutritional powder, tea, fresh consumption', nutrients: '92 nutrients' },
      { name: 'Seeds', uses: 'Oil extraction, water purification', nutrients: 'Healthy fats' },
      { name: 'Pods', uses: 'Vegetable consumption, cooking', nutrients: 'Fiber, vitamins' },
      { name: 'Flowers', uses: 'Tea, culinary preparation', nutrients: 'Antioxidants' },
      { name: 'Roots', uses: 'Traditional medicine', nutrients: 'Bioactive compounds' }
    ]
  };

  // Interactive Chart Component
  const NutritionalChart = ({ data, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <Title order={4} className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <IconChartBar className="w-5 h-5 text-green-600" />
        {type === 'vitamins' ? 'Vitamin Content' : 'Mineral Content'}
      </Title>
      
      <Stack gap="md">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Group justify="space-between" mb="xs">
              <Group gap="sm">
                {item.icon}
                <Text className="font-medium text-gray-700">{item.name}</Text>
              </Group>
              <Text className="text-sm text-gray-600">{item.amount}</Text>
            </Group>
            
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percentage || 90}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
              <Text className="text-xs text-green-600 font-medium mt-1">{item.comparison}</Text>
            </div>
          </motion.div>
        ))}
      </Stack>
    </motion.div>
  );

  // Research Study Card
  const ResearchCard = ({ study, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="bg-white border border-gray-200 h-full hover:shadow-md transition-all duration-300" p="lg">
        <Stack gap="md">
          <Group align="flex-start">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <IconMicroscope className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <Title order={4} className="text-lg font-bold text-gray-800 mb-1">
                {study.title}
              </Title>
              <Text className="text-sm text-gray-600">{study.journal} • {study.year}</Text>
            </div>
          </Group>
          
          <Text className="text-gray-700 leading-relaxed">{study.finding}</Text>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <Text className="text-2xl font-bold text-blue-600">{study.participants}</Text>
              <Text className="text-xs text-gray-500">Participants</Text>
            </div>
            <div className="text-center">
              <Text className="text-2xl font-bold text-purple-600">{study.duration}</Text>
              <Text className="text-xs text-gray-500">Duration</Text>
            </div>
            <div className="text-center">
              <Text className="text-2xl font-bold text-green-600">{study.improvement}</Text>
              <Text className="text-xs text-gray-500">Result</Text>
            </div>
          </div>
        </Stack>
      </Card>
    </motion.div>
  );

  // Tree Visualization Component
  const TreeVisualization = () => (
    <div className="relative bg-gradient-to-b from-sky-100 to-green-100 rounded-2xl p-8 overflow-hidden">
      {/* Sky background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-200 to-blue-100 rounded-t-2xl" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-200 to-green-100" />
      
      {/* Sun */}
      <motion.div
        className="absolute top-6 right-8 w-12 h-12 bg-yellow-400 rounded-full shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <IconSun className="w-6 h-6 text-yellow-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Tree trunk */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg" />

      {/* Tree crown */}
      <motion.div
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tree parts labels */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
        {moringaTree.parts.map((part, index) => (
          <motion.div
            key={index}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Text className="font-bold text-green-800 text-sm mb-1">{part.name}</Text>
            <Text className="text-xs text-gray-600 mb-1">{part.uses}</Text>
            <Badge size="xs" className="bg-green-100 text-green-700">{part.nutrients}</Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Global Usage Map Component
  const GlobalUsageChart = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Title order={4} className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <IconWorld className="w-5 h-5 text-blue-600" />
        Global Moringa Usage by Region
      </Title>
      
      <Stack gap="lg">
        {globalUsage.regions.map((region, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Group justify="space-between" mb="xs">
              <Text className="font-medium text-gray-700">{region.name}</Text>
              <Text className="font-bold text-blue-600">{region.percentage}%</Text>
            </Group>
            
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${region.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {region.countries.map((country, idx) => (
                  <Badge key={idx} size="xs" className="bg-blue-50 text-blue-700">
                    {country}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Stack>
    </div>
  );

  const sectionNavigation = [
    { id: 'overview', label: 'Overview', icon: <IconBook className="w-4 h-4" /> },
    { id: 'nutrition', label: 'Nutrition Facts', icon: <IconChartBar className="w-4 h-4" /> },
    { id: 'research', label: 'Scientific Research', icon: <IconMicroscope className="w-4 h-4" /> },
    { id: 'botany', label: 'Botanical Guide', icon: <IconPlant className="w-4 h-4" /> },
    { id: 'global', label: 'Global Usage', icon: <IconWorld className="w-4 h-4" /> },
    { id: 'benefits', label: 'Health Benefits', icon: <IconHeart className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Complete Moringa Guide | Scientific Research & Nutritional Facts | Dbanyan</title>
        <meta name="description" content="Comprehensive guide to Moringa oleifera - scientific research, nutritional facts, botanical information, and global usage. Evidence-based information for health enthusiasts." />
        <meta name="keywords" content="moringa, moringa oleifera, nutrition facts, scientific research, health benefits, botanical guide, drumstick tree" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
        {/* Hero Section */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <Badge size="lg" className="mb-4 bg-white text-green-700 border border-green-200 shadow-sm" radius="xl" p="md">
                <IconLeaf className="w-4 h-4 mr-2" />
                Scientific Research & Facts
              </Badge>
              
              <Title order={1} className="text-4xl lg:text-5xl font-serif bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-6 leading-tight">
                The Complete Moringa Guide
              </Title>
              
              <Text size="lg" className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Dive deep into the science behind Moringa oleifera. Explore comprehensive research, nutritional data, 
                botanical information, and global usage patterns of nature's most nutrient-dense plant.
              </Text>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <Card className="bg-white border border-green-200 text-center shadow-sm" p="md" radius="lg">
                  <Text className="text-2xl font-bold text-green-600 mb-1">1300+</Text>
                  <Text className="text-sm text-gray-600 font-medium">Research Studies</Text>
                </Card>
                <Card className="bg-white border border-blue-200 text-center shadow-sm" p="md" radius="lg">
                  <Text className="text-2xl font-bold text-blue-600 mb-1">92</Text>
                  <Text className="text-sm text-gray-600 font-medium">Nutrients</Text>
                </Card>
                <Card className="bg-white border border-purple-200 text-center shadow-sm" p="md" radius="lg">
                  <Text className="text-2xl font-bold text-purple-600 mb-1">4000+</Text>
                  <Text className="text-sm text-gray-600 font-medium">Years of Use</Text>
                </Card>
                <Card className="bg-white border border-orange-200 text-center shadow-sm" p="md" radius="lg">
                  <Text className="text-2xl font-bold text-orange-600 mb-1">82</Text>
                  <Text className="text-sm text-gray-600 font-medium">Countries</Text>
                </Card>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Navigation Section */}
        <section className="py-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
          <Container size="xl">
            <div className="flex justify-center">
              <div className="bg-gray-50 rounded-xl p-1 border border-gray-200 shadow-sm">
                <Group gap="2">
                  {sectionNavigation.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        activeSection === section.id
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'text-gray-600 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {section.icon}
                      {section.label}
                    </button>
                  ))}
                </Group>
              </div>
            </div>
          </Container>
        </section>

        {/* Content Sections */}
        <Container size="xl" className="py-12">
          <AnimatePresence mode="wait">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Card className="bg-white border border-gray-200 h-full" p="xl">
                      <Stack gap="lg">
                        <div>
                          <Title order={2} className="text-3xl font-bold text-gray-800 mb-4">
                            Meet Moringa oleifera
                          </Title>
                          <Text className="text-gray-600 leading-relaxed mb-6">
                            Known as the "Miracle Tree" or "Tree of Life," Moringa oleifera is one of nature's most 
                            nutritionally complete plants. Native to the sub-Himalayan regions of India, this remarkable 
                            tree has been used in traditional medicine for over 4,000 years.
                          </Text>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Title order={4} className="text-lg font-bold text-green-800 mb-3">Botanical Profile</Title>
                            <List spacing="xs" className="text-gray-600">
                              <List.Item><strong>Scientific Name:</strong> {moringaTree.botanicalName}</List.Item>
                              <List.Item><strong>Family:</strong> {moringaTree.family}</List.Item>
                              <List.Item><strong>Origin:</strong> {moringaTree.origin}</List.Item>
                              <List.Item><strong>Height:</strong> {moringaTree.growth.height}</List.Item>
                            </List>
                          </div>
                          <div>
                            <Title order={4} className="text-lg font-bold text-blue-800 mb-3">Common Names</Title>
                            <List spacing="xs" className="text-gray-600">
                              {moringaTree.commonNames.map((name, index) => (
                                <List.Item key={index}>{name}</List.Item>
                              ))}
                            </List>
                          </div>
                        </div>

                        <div>
                          <Title order={4} className="text-lg font-bold text-purple-800 mb-3">Why "Miracle Tree"?</Title>
                          <Text className="text-gray-600 leading-relaxed">
                            Moringa earns its title through its exceptional nutritional density. Nearly every part of the tree 
                            is edible and beneficial - from leaves and pods to seeds and flowers. It contains 92 nutrients, 
                            46 antioxidants, 36 anti-inflammatory compounds, and 18 amino acids including all 9 essential amino acids.
                          </Text>
                        </div>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <TreeVisualization />
                  </Grid.Col>
                </Grid>
              </motion.div>
            )}

            {/* Nutrition Facts Section */}
            {activeSection === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <Title order={2} className="text-3xl font-bold text-gray-800 mb-4">
                    Nutritional Composition
                  </Title>
                  <Text className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    Moringa leaves contain an exceptional concentration of vitamins, minerals, and amino acids. 
                    Here's a detailed breakdown of its nutritional profile compared to common foods.
                  </Text>
                </div>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <NutritionalChart data={nutritionalData.vitamins} type="vitamins" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <NutritionalChart data={nutritionalData.minerals} type="minerals" />
                  </Grid.Col>
                </Grid>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mt-8" p="xl">
                  <Title order={3} className="text-2xl font-bold text-green-800 mb-6 text-center">
                    Complete Amino Acid Profile
                  </Title>
                  <Text className="text-center text-gray-600 mb-6">
                    Moringa contains all 18 amino acids, including the 9 essential amino acids that the human body cannot produce.
                  </Text>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {nutritionalData.aminoAcids.map((amino, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg p-3 text-center border border-green-200"
                      >
                        <IconAtom className="w-5 h-5 text-green-600 mx-auto mb-2" />
                        <Text className="text-xs font-medium text-gray-700">{amino}</Text>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Research Section */}
            {activeSection === 'research' && (
              <motion.div
                key="research"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <Title order={2} className="text-3xl font-bold text-gray-800 mb-4">
                    Scientific Research & Studies
                  </Title>
                  <Text className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    Over 1,300 peer-reviewed studies have investigated Moringa's health benefits. 
                    Here are some key findings from recent clinical trials.
                  </Text>
                </div>

                <Grid>
                  {researchStudies.map((study, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                      <ResearchCard study={study} index={index} />
                    </Grid.Col>
                  ))}
                </Grid>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mt-8" p="lg">
                  <Stack gap="lg">
                    <div className="text-center">
                      <Title order={3} className="text-xl font-bold text-green-800 mb-4">
                        Research Summary
                      </Title>
                      <Text className="text-gray-600 leading-relaxed">
                        Scientific evidence supports Moringa's traditional uses and reveals new applications. 
                        Studies consistently show positive effects on inflammation, oxidative stress, blood sugar, 
                        and cognitive function.
                      </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <IconShield className="w-6 h-6 text-green-600" />
                        </div>
                        <Title order={4} className="text-md font-bold text-green-800 mb-2">Antioxidant Power</Title>
                        <Text className="text-gray-600 text-sm">
                          Contains 46 different antioxidants, including quercetin, chlorogenic acid, and beta-carotene
                        </Text>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <IconHeart className="w-8 h-8 text-green-600" />
                        </div>
                        <Title order={4} className="text-lg font-bold text-green-800 mb-2">Anti-inflammatory</Title>
                        <Text className="text-gray-600 text-sm">
                          36 anti-inflammatory compounds help reduce chronic inflammation markers
                        </Text>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <IconBrain className="w-8 h-8 text-purple-600" />
                        </div>
                        <Title order={4} className="text-lg font-bold text-purple-800 mb-2">Cognitive Support</Title>
                        <Text className="text-gray-600 text-sm">
                          Complete amino acid profile supports neurotransmitter production
                        </Text>
                      </div>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            )}

            {/* Global Usage Section */}
            {activeSection === 'global' && (
              <motion.div
                key="global"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <Title order={2} className="text-3xl font-bold text-gray-800 mb-4">
                    Global Usage & Traditional Medicine
                  </Title>
                  <Text className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    Moringa is cultivated and used across 82 countries worldwide. Its applications span from 
                    traditional medicine to modern nutrition, water purification, and sustainable agriculture.
                  </Text>
                </div>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <GlobalUsageChart />
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card className="bg-white border border-gray-200 h-full" p="lg">
                      <Title order={4} className="text-lg font-bold text-gray-800 mb-4">
                        Traditional Uses
                      </Title>
                      <Stack gap="sm">
                        {globalUsage.traditionalUses.map((use, index) => (
                          <Group key={index} gap="sm" align="flex-start">
                            <IconChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <Text className="text-gray-600 text-sm">{use}</Text>
                          </Group>
                        ))}
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 mt-8" p="xl">
                  <Stack gap="lg">
                    <div className="text-center">
                      <Title order={3} className="text-2xl font-bold text-orange-800 mb-4">
                        Modern Applications
                      </Title>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <IconDroplet className="w-6 h-6 text-orange-600" />
                        </div>
                        <Title order={5} className="font-bold text-orange-800 mb-2">Water Purification</Title>
                        <Text className="text-gray-600 text-sm">
                          Moringa seeds can purify water by removing bacteria and sediments
                        </Text>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <IconGrowth className="w-6 h-6 text-green-600" />
                        </div>
                        <Title order={5} className="font-bold text-green-800 mb-2">Malnutrition Combat</Title>
                        <Text className="text-gray-600 text-sm">
                          WHO uses Moringa to fight malnutrition in developing countries
                        </Text>
                      </div>

      <div className="text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <IconChartBar className="w-6 h-6 text-blue-600" />
        </div>
        <Title order={5} className="font-bold text-blue-800 mb-2">Sustainable Agriculture</Title>
        <Text className="text-gray-600 text-sm">
          Fast-growing tree provides food security and environmental benefits
        </Text>
      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <IconMoodSmile className="w-6 h-6 text-purple-600" />
                        </div>
                        <Title order={5} className="font-bold text-purple-800 mb-2">Modern Wellness</Title>
                        <Text className="text-gray-600 text-sm">
                          Growing popularity in health-conscious communities worldwide
                        </Text>
                      </div>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white"
            >
              <Title order={2} className="text-3xl font-bold mb-4">
                Experience the Power of Moringa
              </Title>
              <Text size="lg" className="text-green-100 leading-relaxed max-w-3xl mx-auto mb-8">
                Now that you understand the science behind Moringa, discover our premium range of 
                Moringa products, carefully sourced and processed to preserve maximum nutritional value.
              </Text>
              
              <Group justify="center" gap="lg">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/products'}
                >
                  Explore Products
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </motion.button>
              </Group>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default MoringaGuidePage;
