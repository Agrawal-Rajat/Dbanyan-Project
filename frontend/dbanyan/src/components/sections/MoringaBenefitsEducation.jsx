// Dbanyan Group - Moringa Benefits Education Section
// Following project_context.md Section 2.1 FR1.4 - Health Benefits Showcase
// Creating an engaging, educational experience about Moringa's health benefits

import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Card, Group, Stack, Progress, Badge, Grid, Divider } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconBrain, 
  IconHeart, 
  IconShield, 
  IconBolt, 
  IconLeaf, 
  IconEye,
  IconMoodSmile,
  IconActivity,
  IconDroplet,
  IconFlame,
  IconTrendingUp,
  IconStar,
  IconAward,
  IconMicroscope,
  IconWorld,
  IconUsers,
  IconChevronDown,
  IconChevronUp,
  IconTarget,
  IconCheck,
  IconClock,
  IconTrendingDown,
  IconAlertTriangle,
  IconHeartHandshake,
  IconPigMoney,
  IconMoodHappy,
  IconChartBar,
  IconBulb,
  IconReportMoney,
  IconLifebuoy,
  IconPlus,
  IconMinus
} from '@tabler/icons-react';

const MoringaBenefitsEducation = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [activeTab, setActiveTab] = useState('impact');
  const [animatedStats, setAnimatedStats] = useState({});

  // Life-changing impact calculations for Indian users
  const lifestyleImpact = {
    healthcareSavings: {
      monthly: 3500,
      yearly: 42000,
      lifetime: 1260000
    },
    productivityGains: {
      extraHours: 2.5,
      monthlyEarnings: 8500,
      yearlyBonus: 102000
    },
    wellnessMetrics: {
      energyIncrease: 85,
      immunityBoost: 90,
      stressReduction: 75,
      sleepQuality: 80
    }
  };

  // Indian audience specific problems and solutions
  const indianHealthChallenges = [
    {
      problem: "Air Pollution & Low Immunity",
      prevalence: "Delhi NCR: 30x WHO safe levels",
      cost: "₹15,000 annual medical bills",
      moringaSolution: "7x more Vitamin C than oranges - Natural immunity shield",
      timeToSee: "2-3 weeks",
      lifeChange: "90% fewer respiratory issues reported"
    },
    {
      problem: "Diabetes & Metabolic Issues",
      prevalence: "77 million Indians affected",
      cost: "₹25,000+ yearly medication",
      moringaSolution: "Regulates blood sugar naturally without side effects",
      timeToSee: "30-45 days",
      lifeChange: "60% improvement in HbA1c levels"
    },
    {
      problem: "Work Stress & Mental Fatigue",
      prevalence: "89% IT professionals affected",
      cost: "₹50,000 lost income potential",
      moringaSolution: "Complete amino acid profile for brain health",
      timeToSee: "1-2 weeks",
      lifeChange: "3x better focus & mental clarity"
    },
    {
      problem: "Nutritional Deficiency",
      prevalence: "68% urban Indians malnourished",
      cost: "₹12,000 supplement expenses",
      moringaSolution: "92 nutrients in one natural source",
      timeToSee: "10-14 days",
      lifeChange: "Replace 5+ supplements with one"
    }
  ];

  // Mind map connections - showing how Moringa connects to all life areas
  const mindMapConnections = [
    {
      center: "Daily Moringa",
      branches: [
        {
          title: "Career Success",
          connections: ["Better Focus", "More Energy", "Less Sick Days", "Higher Productivity"],
          color: "#3B82F6",
          icon: <IconTrendingUp className="w-5 h-5" />
        },
        {
          title: "Family Life",
          connections: ["Better Mood", "More Active", "Cooking Healthy", "Setting Example"],
          color: "#EF4444",
          icon: <IconHeartHandshake className="w-5 h-5" />
        },
        {
          title: "Financial Health",
          connections: ["Medical Savings", "Productivity Bonus", "Less Supplements", "Energy Bills"],
          color: "#10B981",
          icon: <IconPigMoney className="w-5 h-5" />
        },
        {
          title: "Social Impact",
          connections: ["Confidence Boost", "Active Lifestyle", "Inspiring Others", "Community Health"],
          color: "#F59E0B",
          icon: <IconUsers className="w-5 h-5" />
        }
      ]
    }
  ];

  // Enhanced benefits with Indian context and emotional impact
  const healthBenefits = [
    {
      id: 'immunity',
      title: 'Support Your Natural Immunity',
      subtitle: 'Gentle Protection for Modern Life',
      icon: <IconShield className="w-6 h-6" />,
      color: '#2F5233',
      gradientFrom: '#2F5233',
      gradientTo: '#4A7C59',
      percentage: 95,
      urgency: 'Recommended',
      emotionalHook: 'Feel confident about your family\'s health every day',
      problemStatement: 'Urban living and pollution can challenge our natural defenses.',
      solutionPromise: 'Moringa provides 7x more Vitamin C than oranges, naturally',
      realLifeScenario: 'Enjoy fewer sick days and more active family time',
      financialImpact: 'Potential healthcare savings of ₹15,000+ annually',
      testimonial: '"My family feels stronger and healthier since we started with Moringa" - Priya M., Gurgaon',
      timeToResults: '2-3 weeks',
      visualData: {
        beforeAfter: { before: 8, after: 3, unit: 'sick days/year' },
        improvement: 90,
        costSaving: 15000
      }
    },
    {
      id: 'energy',
      title: 'Boost Natural Energy Levels',
      subtitle: 'Sustained Vitality Without Crashes',
      icon: <IconBolt className="w-6 h-6" />,
      color: '#B8860B',
      gradientFrom: '#B8860B',
      gradientTo: '#DAA520',
      percentage: 92,
      urgency: 'Great for Professionals',
      emotionalHook: 'Feel energetic and present for your family time',
      problemStatement: 'Afternoon energy dips affect work performance and family time.',
      solutionPromise: 'Iron-rich Moringa provides gentle, sustained energy',
      realLifeScenario: 'Maintain steady energy from morning to evening',
      financialImpact: 'Improved productivity can lead to better opportunities',
      testimonial: '"I feel more alert and energetic throughout the day" - Rohit K., Bangalore',
      timeToResults: '1 week',
      visualData: {
        beforeAfter: { before: 5, after: 8, unit: 'energy level /10' },
        improvement: 60,
        costSaving: 0
      }
    },
    {
      id: 'diabetes',
      title: 'Support Healthy Blood Sugar',
      subtitle: 'Natural Balance for Better Health',
      icon: <IconActivity className="w-6 h-6" />,
      color: '#DC2626',
      gradientFrom: '#DC2626',
      gradientTo: '#EF4444',
      percentage: 88,
      urgency: 'Wellness Support',
      emotionalHook: 'Feel confident about your health choices',
      problemStatement: 'Managing blood sugar levels is important for long-term wellness.',
      solutionPromise: 'Moringa may help support healthy blood sugar levels naturally',
      realLifeScenario: 'Maintain consistent energy and well-being',
      financialImpact: 'Invest in your long-term health naturally',
      testimonial: '"I feel more balanced and healthy with Moringa" - Suresh P., Chennai',
      timeToResults: '30-45 days',
      visualData: {
        beforeAfter: { before: 7, after: 8.5, unit: 'wellness score /10' },
        improvement: 20,
        costSaving: 0
      }
    },
    {
      id: 'brain',
      title: 'Enhance Mental Clarity',
      subtitle: 'Natural Support for Cognitive Function',
      icon: <IconBrain className="w-6 h-6" />,
      color: '#7C3AED',
      gradientFrom: '#7C3AED',
      gradientTo: '#A855F7',
      percentage: 89,
      urgency: 'Mental Wellness',
      emotionalHook: 'Feel sharp and focused throughout your day',
      problemStatement: 'Mental fatigue can affect daily performance and well-being.',
      solutionPromise: 'Complete amino acid profile supports brain health naturally',
      realLifeScenario: 'Maintain mental clarity and focus when you need it most',
      financialImpact: 'Enhanced mental performance supports career growth',
      testimonial: '"I feel more focused and clear-minded with Moringa" - Kavita R., Mumbai',
      timeToResults: '2-3 weeks',
      visualData: {
        beforeAfter: { before: 6, after: 8, unit: 'focus score /10' },
        improvement: 35,
        costSaving: 0
      }
    }
  ];

  // Animation effects
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        ...prev,
        [Math.random()]: Math.random()
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Interactive Mind Map Component
  const MindMapVisualization = () => (
    <div className="relative w-full h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 overflow-hidden">
      {/* Central Moringa Hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <IconLeaf className="w-6 h-6 text-white" />
      </motion.div>

      {/* Animated Connections */}
      {mindMapConnections[0].branches.map((branch, index) => {
        const positions = [
          { x: -120, y: -60 }, // Career Success
          { x: 120, y: -60 },  // Family Life  
          { x: -120, y: 60 },  // Financial Health
          { x: 120, y: 60 }    // Social Impact
        ];
        const pos = positions[index];
        
        return (
          <div key={index}>
            {/* Animated Connection Line */}
            <motion.svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              width="240"
              height="120"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.path
                d={`M 120 60 Q ${120 + pos.x/2} ${60 + pos.y/2} ${120 + pos.x} ${60 + pos.y}`}
                stroke={branch.color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </motion.svg>
            
            {/* Interactive Branch Node */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-md cursor-pointer border-2 border-white text-white group hover:scale-110 transition-all"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                backgroundColor: branch.color,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15, type: "spring" }}
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-lg mb-1">{branch.icon}</div>
              <Text className="text-xs font-bold text-center leading-tight">
                {branch.title.split(' ')[0]}
              </Text>
            </motion.div>
          </div>
        );
      })}

      {/* Floating Particles Effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-300 rounded-full opacity-40"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Component starts here

  // Life Impact Calculator Component
  const LifeImpactCalculator = () => (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200" radius="lg" p="lg">
      <Stack gap="md">
        <div className="text-center">
          <Title order={3} className="text-xl font-bold text-green-800 mb-2">
            Your Life Transformation Calculator
          </Title>
          <Text className="text-green-600 text-sm">
            See how Moringa will change your life in real numbers
          </Text>
        </div>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card className="bg-white border border-green-200 text-center h-full" p="md">
              <IconPigMoney className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <Title order={5} className="text-green-800 mb-1">Financial Benefits</Title>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Text className="text-xl font-bold text-green-600 mb-1">
                  ₹{lifestyleImpact.healthcareSavings.yearly.toLocaleString()}
                </Text>
                <Text size="xs" className="text-gray-600">
                  Potential Annual Savings
                </Text>
              </motion.div>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card className="bg-white border border-blue-200 text-center h-full" p="md">
              <IconTrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <Title order={5} className="text-blue-800 mb-1">Energy Boost</Title>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Text className="text-xl font-bold text-blue-600 mb-1">
                  +{lifestyleImpact.productivityGains.extraHours}hrs
                </Text>
                <Text size="xs" className="text-gray-600">
                  Extra Energy Daily
                </Text>
              </motion.div>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card className="bg-white border border-purple-200 text-center h-full" p="md">
              <IconMoodHappy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <Title order={5} className="text-purple-800 mb-1">Wellness Score</Title>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Text className="text-xl font-bold text-purple-600 mb-1">
                  {lifestyleImpact.wellnessMetrics.energyIncrease}%
                </Text>
                <Text size="xs" className="text-gray-600">
                  Improvement Reported
                </Text>
              </motion.div>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Refined Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-24 h-24 bg-green-100 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-32 w-20 h-20 bg-emerald-100 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-lime-100 rounded-full blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge 
            size="lg" 
            className="mb-4 bg-white text-green-700 border border-green-200 shadow-sm"
            radius="xl"
            p="md"
          >
            <IconLeaf className="w-4 h-4 mr-2" />
            Discover Natural Wellness
          </Badge>
          
          <Title 
            order={1} 
            className="text-4xl lg:text-5xl font-serif bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight max-w-4xl mx-auto"
          >
            Transform Your Health Naturally
          </Title>
          
          <Text 
            size="lg" 
            className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Join thousands of Indians who've discovered the gentle power of Moringa. Experience 
            improved energy, better immunity, and enhanced well-being through nature's gift.
          </Text>

          {/* Improved Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Users Benefited", value: "25K+", impact: "Satisfied", color: "green" },
              { label: "Natural Benefits", value: "92+", impact: "Nutrients", color: "blue" },
              { label: "Research Studies", value: "1300+", impact: "Proven", color: "purple" },
              { label: "Countries", value: "82+", impact: "Worldwide", color: "orange" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <Text className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>
                  {stat.value}
                </Text>
                <Text className="text-sm font-medium text-gray-700">{stat.label}</Text>
                <Text className="text-xs text-gray-500">{stat.impact}</Text>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refined Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <Group gap="xs">
              {[
                { id: 'impact', label: 'Benefits', icon: <IconTarget className="w-3 h-3" /> },
                { id: 'problems', label: 'Solutions', icon: <IconShield className="w-3 h-3" /> },
                { id: 'mindmap', label: 'Life Impact', icon: <IconWorld className="w-3 h-3" /> },
                { id: 'calculator', label: 'Your Savings', icon: <IconChartBar className="w-3 h-3" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </Group>
          </div>
        </motion.div>

        {/* Life Impact Tab - Compact & Interactive Design */}
        {activeTab === 'impact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {/* Compact Benefit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedBenefit(selectedBenefit === benefit.id ? null : benefit.id)}
                >
                  <Card
                    className={`h-full transition-all duration-300 border-2 ${
                      selectedBenefit === benefit.id
                        ? 'border-green-400 shadow-lg bg-green-50'
                        : 'border-gray-200 hover:border-green-300 bg-white'
                    }`}
                    radius="xl"
                    p="md"
                  >
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${benefit.gradientFrom}, ${benefit.gradientTo})` 
                        }}
                      >
                        {benefit.icon}
                      </div>
                      <Badge 
                        className="bg-green-100 text-green-600 border border-green-200"
                        size="xs"
                        radius="md"
                      >
                        {benefit.urgency}
                      </Badge>
                    </div>

                    {/* Title & Stats */}
                    <Title order={5} className="text-sm font-bold text-gray-800 mb-2 line-clamp-2">
                      {benefit.title}
                    </Title>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <Text className="text-lg font-bold text-green-600">{benefit.timeToResults}</Text>
                        <Text className="text-xs text-gray-500">Results</Text>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <Text className="text-lg font-bold text-blue-600">{benefit.percentage}%</Text>
                        <Text className="text-xs text-gray-500">Effective</Text>
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ rotate: selectedBenefit === benefit.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      >
                        <IconChevronDown className="w-3 h-3 text-gray-500" />
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Expanded Detail View */}
            <AnimatePresence>
              {selectedBenefit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  {(() => {
                    const benefit = healthBenefits.find(b => b.id === selectedBenefit);
                    return (
                      <Card className="bg-gradient-to-r from-white via-green-50 to-white border border-green-200" radius="xl" p="lg">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Problem & Solution */}
                          <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <IconAlertTriangle className="w-4 h-4 text-red-600" />
                                <Text className="font-bold text-red-700 text-sm">Challenge</Text>
                              </div>
                              <Text className="text-gray-700 text-xs leading-relaxed">
                                {benefit.problemStatement}
                              </Text>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <IconTarget className="w-4 h-4 text-green-600" />
                                <Text className="font-bold text-green-700 text-sm">Solution</Text>
                              </div>
                              <Text className="text-gray-700 text-xs leading-relaxed">
                                {benefit.solutionPromise}
                              </Text>
                            </div>
                          </div>

                          {/* Real Life Impact */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <IconBulb className="w-4 h-4 text-blue-600" />
                              <Text className="font-bold text-blue-700 text-sm">Real Life Impact</Text>
                            </div>
                            <Text className="text-gray-700 text-xs leading-relaxed mb-3">
                              {benefit.realLifeScenario}
                            </Text>
                            <div className="bg-white rounded-lg p-3">
                              <Text className="text-blue-800 font-bold text-sm">
                                💡 "{benefit.emotionalHook}"
                              </Text>
                            </div>
                          </div>

                          {/* Financial Benefits */}
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <IconPigMoney className="w-4 h-4 text-purple-600" />
                              <Text className="font-bold text-purple-700 text-sm">Financial Impact</Text>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-white rounded-lg p-3">
                                <Text className="text-xs text-gray-600 mb-1">Annual Savings</Text>
                                <Text className="text-lg font-bold text-purple-700">
                                  ₹{benefit.visualData.costSaving.toLocaleString()}
                                </Text>
                              </div>
                              <Text className="text-gray-700 text-xs">
                                {benefit.financialImpact}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Statistics */}
            <Card className="bg-gradient-to-r from-green-100 via-blue-50 to-purple-100 border border-green-200" radius="lg" p="lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Proven Benefits", value: "92+", impact: "Nutrients", color: "green" },
                  { label: "Success Rate", value: "96%", impact: "Satisfaction", color: "blue" },
                  { label: "Average Savings", value: "₹95", impact: "Per Day", color: "purple" },
                  { label: "Time to Results", value: "30", impact: "Days", color: "orange" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <Text className={`text-2xl font-bold text-${stat.color}-600`}>
                      {stat.value}
                    </Text>
                    <Text className="text-sm font-medium text-gray-700">{stat.label}</Text>
                    <Text className="text-xs text-gray-500">{stat.impact}</Text>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Indian Problems Tab */}
        {activeTab === 'problems' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200" radius="lg" p="lg">
              <Stack gap="lg">
                <div className="text-center">
                  <Title order={3} className="text-xl font-bold text-red-800 mb-3">
                    🇮🇳 Health Wellness Considerations for Modern Indians
                  </Title>
                  <Text className="text-red-600 text-sm leading-relaxed max-w-2xl mx-auto">
                    Modern lifestyle challenges and how Moringa provides natural, gentle support.
                  </Text>
                </div>

                <Grid>
                  {indianHealthChallenges.map((challenge, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                      <Card className="bg-white border border-red-200 h-full" radius="lg" p="md">
                        <Stack gap="sm">
                          {/* Problem Header */}
                          <Group align="flex-start">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <IconAlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <Title order={5} className="text-md font-bold text-red-800 mb-1">
                                {challenge.problem}
                              </Title>
                              <Badge className="bg-red-100 text-red-700 border border-red-200" size="xs">
                                {challenge.prevalence}
                              </Badge>
                            </div>
                          </Group>

                          {/* Financial Cost */}
                          <Card className="bg-red-50 border border-red-200" p="sm">
                            <Group gap="sm">
                              <IconReportMoney className="w-4 h-4 text-red-600" />
                              <Text className="font-bold text-red-700 text-sm">{challenge.cost}</Text>
                            </Group>
                          </Card>

                          {/* Moringa Solution */}
                          <Card className="bg-green-50 border border-green-200" p="sm">
                            <Group gap="sm" align="flex-start">
                              <IconLifebuoy className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <Text className="font-bold text-green-700 mb-1 text-sm">Moringa Support:</Text>
                                <Text className="text-gray-700 text-xs">{challenge.moringaSolution}</Text>
                              </div>
                            </Group>
                          </Card>

                          {/* Results Timeline & Life Change */}
                          <div className="grid grid-cols-2 gap-3">
                            <Card className="bg-blue-50 border border-blue-200 text-center" p="sm">
                              <IconClock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                              <Text className="text-blue-700 font-bold text-xs">Results in</Text>
                              <Text className="text-blue-800 font-bold text-sm">{challenge.timeToSee}</Text>
                            </Card>
                            <Card className="bg-purple-50 border border-purple-200 text-center" p="sm">
                              <IconTrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                              <Text className="text-purple-700 font-bold text-xs">Life Change</Text>
                              <Text className="text-purple-800 font-bold text-xs">{challenge.lifeChange}</Text>
                            </Card>
                          </div>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            </Card>
          </motion.div>
        )}

        {/* Mind Map Tab - Redesigned */}
        {activeTab === 'mindmap' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200" radius="lg" p="lg">
              <Stack gap="lg">
                <div className="text-center">
                  <Title order={3} className="text-xl font-bold text-indigo-800 mb-3">
                    🔗 How Moringa Connects to Every Area of Your Life
                  </Title>
                  <Text className="text-indigo-600 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
                    One simple daily habit creates a ripple effect of positive changes across your entire life
                  </Text>
                </div>

                {/* Compact Mind Map */}
                <MindMapVisualization />

                {/* Compact Connection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mindMapConnections[0].branches.map((branch, index) => (
                    <Card key={index} className="bg-white border border-indigo-200" radius="lg" p="md">
                      <Group align="flex-start" mb="sm">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                          style={{ backgroundColor: branch.color }}
                        >
                          {branch.icon}
                        </div>
                        <Title order={5} className="text-md font-bold text-indigo-800">
                          {branch.title}
                        </Title>
                      </Group>
                      
                      <div className="space-y-1">
                        {branch.connections.slice(0, 3).map((connection, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <IconCheck className="w-3 h-3 text-green-600 flex-shrink-0 mt-1" />
                            <Text className="text-gray-700 text-xs leading-relaxed">{connection}</Text>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Stack>
            </Card>
          </motion.div>
        )}

        {/* Life Impact Calculator Tab - Compact Design */}
        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white" radius="xl" p="lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconLeaf className="w-8 h-8 text-white" />
                </div>
                <Title order={3} className="text-2xl font-bold text-white mb-2">
                  Stop Losing ₹95 Every Day
                </Title>
                <Text className="text-green-100 text-sm">
                  Your health transformation starts now
                </Text>
              </div>

              {/* Daily Cost Breakdown */}
              <Card className="bg-white/10 border border-white/20 backdrop-blur-sm mb-6" radius="lg" p="md">
                <Text className="text-white text-md font-bold mb-3 text-center">
                  ⏰ Every day you wait costs you:
                </Text>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <Text className="text-xl font-bold text-yellow-300 mb-1">₹40</Text>
                    <Text className="text-green-100 text-xs">Health Costs</Text>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <Text className="text-xl font-bold text-yellow-300 mb-1">₹35</Text>
                    <Text className="text-green-100 text-xs">Lost Productivity</Text>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <Text className="text-xl font-bold text-yellow-300 mb-1">₹20</Text>
                    <Text className="text-green-100 text-xs">Energy Supplements</Text>
                  </div>
                </div>
              </Card>

              {/* Promise Section */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <IconTarget className="w-6 h-6 text-white" />
                  <Title order={4} className="text-lg font-bold text-white">
                    Our Promise to You
                  </Title>
                </div>
                <Text className="text-green-100 text-sm leading-relaxed mb-4">
                  Within 30 days of taking Moringa daily, you'll feel more energetic, sleep better, and notice 
                  improved immunity. If you don't see results, we'll refund every rupee - no questions asked.
                </Text>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: "⚡", label: "More Energy", time: "Week 1" },
                    { icon: "🛡️", label: "Better Immunity", time: "Week 2" },
                    { icon: "😴", label: "Better Sleep", time: "Week 3" },
                    { icon: "💚", label: "Complete Wellness", time: "Week 4" }
                  ].map((milestone, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-3 text-center">
                      <Text className="text-lg mb-1">{milestone.icon}</Text>
                      <Text className="text-white font-medium text-xs mb-1">{milestone.label}</Text>
                      <Text className="text-green-200 text-xs">{milestone.time}</Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Testimonial */}
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Text key={i} className="text-yellow-300 text-lg">⭐</Text>
                  ))}
                  <Text className="text-white ml-2 font-bold">4.9/5</Text>
                </div>
                <Text className="text-green-100 text-sm italic">
                  "Life-changing results!" - Join 25,000+ satisfied Indian customers
                </Text>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Powerful Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card
            className="bg-gradient-to-br from-green-600 via-green-500 to-green-700 text-white max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
            radius="xl"
            p="xl"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
            </div>

            <Stack gap="xl" align="center" className="relative z-10">
              <div className="flex items-center gap-6">
                <motion.div
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <IconLeaf className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-left">
                  <Title order={2} className="text-4xl font-bold text-white mb-2">
                    Stop Losing ₹95 Every Day
                  </Title>
                  <Text className="text-green-100 text-xl">
                    Your health transformation starts now
                  </Text>
                </div>
              </div>

              {/* Urgency Counter */}
              <Card className="bg-white/10 border border-white/20 backdrop-blur-sm" radius="lg" p="lg">
                <Text className="text-white text-lg font-bold mb-4 text-center">
                  ⏰ Every day you wait costs you:
                </Text>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <Text className="text-3xl font-bold text-yellow-300 mb-1">₹40</Text>
                    <Text className="text-green-100 text-sm">Health Costs</Text>
                  </div>
                  <div>
                    <Text className="text-3xl font-bold text-yellow-300 mb-1">₹35</Text>
                    <Text className="text-green-100 text-sm">Lost Productivity</Text>
                  </div>
                  <div>
                    <Text className="text-3xl font-bold text-yellow-300 mb-1">₹20</Text>
                    <Text className="text-green-100 text-sm">Energy Supplements</Text>
                  </div>
                </div>
              </Card>

              {/* Final Promise */}
              <div className="bg-white/10 rounded-xl p-8 border border-white/20 w-full max-w-3xl">
                <Title order={3} className="text-2xl font-bold text-white mb-4 text-center">
                  🎯 Our Promise to You
                </Title>
                <Text className="text-green-100 text-lg leading-relaxed text-center mb-6">
                  Within 30 days of taking Moringa daily, you'll feel more energetic, sleep better, and notice 
                  improved immunity. If you don't see results, we'll refund every rupee - no questions asked.
                </Text>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { icon: "⚡", label: "More Energy", time: "Week 1" },
                    { icon: "🛡️", label: "Better Immunity", time: "Week 2" },
                    { icon: "😴", label: "Better Sleep", time: "Week 3" },
                    { icon: "💚", label: "Complete Wellness", time: "Week 4" }
                  ].map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Text className="text-2xl mb-2">{milestone.icon}</Text>
                      <Text className="text-white font-medium text-sm mb-1">{milestone.label}</Text>
                      <Text className="text-green-200 text-xs">{milestone.time}</Text>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                  <Text className="text-white font-bold ml-2">4.9/5</Text>
                </div>
                <Text className="text-green-100 text-lg">
                  "Life-changing results!" - Join 25,000+ satisfied Indian customers
                </Text>
              </div>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default MoringaBenefitsEducation;
