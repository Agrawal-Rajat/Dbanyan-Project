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
  IconMinus,
  IconSun
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

  // Interactive Connection Network - Effective & Visual
  const MindMapVisualization = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const connections = [
      { 
        id: 1, 
        title: "Physical Health", 
        icon: <IconHeart className="w-5 h-5" />, 
        color: "#10B981", 
        position: { top: "20%", left: "15%" },
        benefits: ["Boosts Immunity", "Increases Energy", "Better Sleep"]
      },
      { 
        id: 2, 
        title: "Mental Clarity", 
        icon: <IconBrain className="w-5 h-5" />, 
        color: "#3B82F6", 
        position: { top: "25%", right: "15%" },
        benefits: ["Enhanced Focus", "Stress Relief", "Mood Balance"]
      },
      { 
        id: 3, 
        title: "Career Growth", 
        icon: <IconTrendingUp className="w-5 h-5" />, 
        color: "#8B5CF6", 
        position: { bottom: "25%", left: "20%" },
        benefits: ["Higher Productivity", "Better Performance", "More Opportunities"]
      },
      { 
        id: 4, 
        title: "Family Life", 
        icon: <IconUsers className="w-5 h-5" />, 
        color: "#F59E0B", 
        position: { bottom: "20%", right: "20%" },
        benefits: ["More Quality Time", "Better Relations", "Healthy Example"]
      }
    ];

    return (
      <div className="relative w-full max-w-5xl mx-auto h-80 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-8 overflow-hidden border border-blue-100 shadow-lg">
        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
          <IconSun className="w-6 h-6 text-yellow-800" />
        </div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Central Moringa Hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: hoveredIndex !== null 
                  ? "0 0 30px rgba(16, 185, 129, 0.4)" 
                  : "0 10px 25px rgba(0, 0, 0, 0.1)"
              }}
            >
              <IconLeaf className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="absolute -inset-2 border-2 border-green-300 rounded-full opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Connection Nodes */}
        {connections.map((connection, index) => (
          <motion.div
            key={connection.id}
            className="absolute z-10"
            style={connection.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + (index * 0.15) }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {/* Connection Line */}
              <motion.div
                className="absolute w-0.5 h-16 origin-bottom"
                style={{
                  background: `linear-gradient(to top, ${connection.color}, transparent)`,
                  transform: "rotate(45deg)",
                  transformOrigin: "bottom center"
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hoveredIndex === index ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Node */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 border-white cursor-pointer"
                style={{ backgroundColor: connection.color }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 10px 25px ${connection.color}40`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-white mb-1">
                  {connection.icon}
                </div>
                <Text className="text-white text-xs font-bold text-center leading-tight">
                  {connection.title.split(' ')[0]}
                </Text>
              </motion.div>

              {/* Hover Info Card */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl p-4 border border-gray-100 z-30"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ color: connection.color }}>
                        {connection.icon}
                      </div>
                      <Text className="font-bold text-gray-800 text-sm">
                        {connection.title}
                      </Text>
                    </div>
                    <div className="space-y-1">
                      {connection.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: connection.color }} />
                          <Text className="text-xs text-gray-600">{benefit}</Text>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}

        {/* Connecting Lines - Enhanced SVG based for accurate positioning */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map((connection, index) => {
            // Calculate positions based on the actual node positions
            const positions = [
              { x: 15, y: 20 }, // Physical Health
              { x: 85, y: 25 }, // Mental Clarity  
              { x: 20, y: 75 }, // Career Growth
              { x: 80, y: 80 }  // Family Life
            ];
            
            const nodePos = positions[index];
            
            return (
              <g key={`connection-group-${connection.id}`}>
                {/* Main connection line */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2={nodePos.x}
                  y2={nodePos.y}
                  stroke={connection.color}
                  strokeWidth="0.5"
                  strokeOpacity="0.7"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 5.5, delay: 0.8 + (index * 0.25) }}
                />
                
                {/* Connection dot at center */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="0.5"
                  fill={connection.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                />
                
                {/* Connection dot at node */}
                <motion.circle
                  cx={nodePos.x}
                  cy={nodePos.y}
                  r="0.3"
                  fill={connection.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                />
              </g>
            );
          })}
        </svg>

        {/* Animated Connection Pulses */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {connections.map((connection, index) => {
            // Define pulse directions based on actual positions
            const pulseDirections = [
              { x: -35, y: -30 }, // To Physical Health
              { x: 35, y: -25 },  // To Mental Clarity
              { x: -30, y: 25 },  // To Career Growth
              { x: 30, y: 30 }    // To Family Life
            ];
            
            const direction = pulseDirections[index];
            
            return (
              <motion.div
                key={`pulse-${connection.id}`}
                className="absolute w-1.5 h-1.5 rounded-full opacity-80"
                style={{
                  left: "50%",
                  top: "50%",
                  backgroundColor: connection.color,
                  transform: "translate(-50%, -50%)"
                }}
                animate={{
                  x: [0, direction.x * 3, direction.x * 6],
                  y: [0, direction.y * 3, direction.y * 6],
                  opacity: [0.8, 0.4, 0],
                  scale: [0.5, 1, 0.3]
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  repeatDelay: 10,
                  delay: 2 + (index * 0.8),
                  ease: "easeOut"
                }}
              />
            );
          })}
        </div>

        {/* Center Label */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Text className="text-sm font-bold text-green-800 text-center">
            Daily Moringa
          </Text>
          <Text className="text-xs text-gray-600 text-center">
            Life Transformation
          </Text>
        </motion.div>
      </div>
    );
  };

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
          <div className="flex justify-center mb-6">
            <Badge 
              size="lg" 
              className="bg-white text-green-700 border border-green-200 shadow-sm"
              radius="xl"
              p="md"
            >
              <IconLeaf className="w-4 h-4 mr-2" />
              Discover Natural Wellness
            </Badge>
          </div>
          
          <Title 
            order={1} 
            className="text-4xl lg:text-5xl font-serif bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight max-w-4xl mx-auto text-center"
          >
            Transform Your Health Naturally
          </Title>
          
          <Text 
            size="lg" 
            className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8 text-center"
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
            className="max-w-6xl mx-auto"
          >
            <motion.div 
              className="space-y-6"
              layout
              transition={{
                layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
              }}
            >
              {/* Compact Benefit Cards Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                layout
              >
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  whileHover={{ 
                    scale: 1.01, 
                    y: -2,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)"
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedBenefit(selectedBenefit === benefit.id ? null : benefit.id)}
                >
                  <Card
                    className={`h-full transition-all duration-500 ease-out border-2 ${
                      selectedBenefit === benefit.id
                        ? 'border-green-400 shadow-xl bg-green-50 transform scale-[1.02]'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-md bg-white'
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
                        transition={{ 
                          duration: 0.4,
                          ease: [0.23, 1, 0.32, 1]
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                          selectedBenefit === benefit.id 
                            ? 'bg-green-100 border border-green-300' 
                            : 'bg-gray-100 border border-gray-200 group-hover:bg-green-50'
                        }`}
                      >
                        <IconChevronDown className={`w-3 h-3 transition-colors duration-300 ${
                          selectedBenefit === benefit.id ? 'text-green-600' : 'text-gray-500'
                        }`} />
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </motion.div>

              {/* Expanded Detail View */}
            <AnimatePresence mode="wait">
              {selectedBenefit && (
                <motion.div
                  key={selectedBenefit}
                  initial={{ 
                    opacity: 0, 
                    height: 0,
                    marginTop: 0,
                    marginBottom: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto',
                    marginTop: 24,
                    marginBottom: 24
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    marginTop: 0,
                    marginBottom: 0
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1], // Custom smooth easing
                    opacity: { duration: 0.4 },
                    height: { duration: 0.6 },
                    marginTop: { duration: 0.6 },
                    marginBottom: { duration: 0.6 }
                  }}
                  className="overflow-hidden"
                  style={{ originY: 0 }}
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.1,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    {(() => {
                      const benefit = healthBenefits.find(b => b.id === selectedBenefit);
                      return (
                        <Card className="bg-gradient-to-r from-white via-green-50 to-white border border-green-200 shadow-lg" radius="xl" p="lg">
                          <motion.div 
                            className="grid md:grid-cols-3 gap-6"
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            {/* Problem & Solution */}
                            <motion.div 
                              className="space-y-4"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
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
                            </motion.div>

                            {/* Real Life Impact */}
                            <motion.div 
                              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
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
                            </motion.div>

                            {/* Financial Benefits */}
                            <motion.div 
                              className="bg-purple-50 border border-purple-200 rounded-lg p-4"
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            >
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
                            </motion.div>
                          </motion.div>
                        </Card>
                      );
                    })()}
                  </motion.div>
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
          </motion.div>
        )}

        {/* Indian Problems Tab - Wider and More Compact */}
        {activeTab === 'problems' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200" radius="lg" p="md">
              <Stack gap="md">
                <div className="text-center">
                  <Title order={3} className="text-xl font-bold text-red-800 mb-2">
                    🇮🇳 Health Wellness Considerations for Modern Indians
                  </Title>
                  <Text className="text-red-600 text-sm leading-relaxed max-w-2xl mx-auto">
                    Modern lifestyle challenges and how Moringa provides natural, gentle support.
                  </Text>
                </div>

                <Grid>
                  {indianHealthChallenges.map((challenge, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                      <Card className="bg-white border border-red-200 h-full" radius="lg" p="sm">
                        <Stack gap="xs">
                          {/* Problem Header */}
                          <Group align="flex-start">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <IconAlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <Title order={5} className="text-sm font-bold text-red-800 mb-1">{challenge.problem}</Title>
                              <Badge size="xs" className="bg-blue-500 text-white">{challenge.statistic}</Badge>
                            </div>
                          </Group>

                          {/* Financial Impact */}
                          <Card className="bg-red-50 border border-red-200" radius="sm" p="xs">
                            <div className="flex items-center justify-center">
                              <IconReportMoney className="w-4 h-4 text-red-600 mr-2" />
                              <Text className="text-red-700 font-bold text-sm">{challenge.cost}</Text>
                            </div>
                          </Card>

                          {/* Moringa Solution */}
                          <Card className="bg-green-50 border border-green-200" radius="sm" p="xs">
                            <div className="flex items-center gap-2">
                              <IconTarget className="w-4 h-4 text-green-600" />
                              <div className="flex-1">
                                <Text className="font-bold text-green-700 text-sm mb-1">Moringa Support:</Text>
                                <Text className="text-gray-700 text-xs leading-relaxed">{challenge.moringaSolution}</Text>
                              </div>
                            </div>
                          </Card>

                          {/* Results and Life Change */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-blue-50 border border-blue-200 rounded-sm p-2 text-center">
                              <IconClock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                              <Text className="font-bold text-blue-700 text-xs mb-1">Results in</Text>
                              <Text className="text-blue-600 text-xs">{challenge.timeToResults}</Text>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-sm p-2 text-center">
                              <IconTrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                              <Text className="font-bold text-purple-700 text-xs mb-1">Life Change</Text>
                              <Text className="text-purple-600 text-xs">{challenge.lifeChange}</Text>
                            </div>
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

        {/* Mind Map Tab - Redesigned & Wider */}
        {activeTab === 'mindmap' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200" radius="lg" p="md">
              <Stack gap="md">
                <div className="text-center">
                  <Title order={3} className="text-xl font-bold text-indigo-800 mb-2">
                    🔗 How Moringa Connects to Every Area of Your Life
                  </Title>
                  <Text className="text-indigo-600 text-sm leading-relaxed max-w-2xl mx-auto mb-4">
                    One simple daily habit creates a ripple effect of positive changes across your entire life
                  </Text>
                </div>

                {/* Compact Mind Map */}
                <MindMapVisualization />

                {/* Compact Connection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mindMapConnections[0].branches.map((branch, index) => (
                    <Card key={index} className="bg-white border border-indigo-200" radius="lg" p="sm">
                      <Group align="flex-start" mb="xs">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                          style={{ backgroundColor: branch.color }}
                        >
                          {branch.icon}
                        </div>
                        <Title order={5} className="text-sm font-bold text-indigo-800">
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

      </Container>
    </section>
  );
};

export default MoringaBenefitsEducation;
