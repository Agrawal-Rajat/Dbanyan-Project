// Dbanyan Group - Enhanced Interactive Landing Page
// Premium organic design with smooth animations and scroll effects

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Badge,
  Box,
  Stack,
  Grid,
  Card,
  Image,
  ThemeIcon,
  Progress,
  Notification
} from '@mantine/core';
import { 
  IconLeaf, 
  IconHeart, 
  IconShield, 
  IconStar,
  IconChevronDown,
  IconArrowRight,
  IconPlant,
  IconDroplet,
  IconSun
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const EnhancedLandingPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: IconHeart,
      title: "Heart Health",
      description: "92% of antioxidants for cardiovascular wellness",
      color: "#E57373",
      stat: "92%"
    },
    {
      icon: IconShield,
      title: "Immune Boost",
      description: "7x more Vitamin C than oranges",
      color: "#4CAF50",
      stat: "7x"
    },
    {
      icon: IconPlant,
      title: "Natural Energy",
      description: "25+ essential amino acids",
      color: "#FF9800",
      stat: "25+"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers", icon: IconStar },
    { value: "100%", label: "Organic", icon: IconLeaf },
    { value: "24/7", label: "Support", icon: IconHeart },
    { value: "5★", label: "Rating", icon: IconStar }
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Floating Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-emerald-500 to-green-600"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Floating Action Buttons */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-4"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            radius="xl"
            className="bg-gradient-to-r from-emerald-500 to-green-600 shadow-xl"
            onClick={() => navigate('/products')}
          >
            <IconLeaf size={20} />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            radius="xl"
            variant="white"
            className="shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <IconChevronDown size={20} className="rotate-180" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero Section with Parallax */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-lime-200/30 to-emerald-200/30 rounded-full blur-3xl"
          />
        </div>

        <Container size="xl" className="relative z-10">
          <Grid align="center" className="min-h-screen">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Badge
                  size="lg"
                  radius="xl"
                  className="mb-6 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800"
                >
                  🌿 100% Organic & Pure
                </Badge>
                
                <Title
                  order={1}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent mb-6"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  Nature's
                  <br />
                  <motion.span
                    animate={{ color: ['#059669', '#065f46', '#059669'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Superfood
                  </motion.span>
                </Title>

                <Text
                  size="xl"
                  className="text-gray-600 mb-8 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Experience the miraculous power of Moringa – the Tree of Life. 
                  Pure, organic, and sustainably sourced for your ultimate wellness journey.
                </Text>

                <Group className="mb-8">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="xl"
                      radius="xl"
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-xl"
                      rightSection={<IconArrowRight size={20} />}
                      onClick={() => navigate('/products')}
                    >
                      Explore Products
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="xl"
                      radius="xl"
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Group>

                {/* Animated Stats */}
                <Grid className="mt-12">
                  {stats.map((stat, index) => (
                    <Grid.Col span={6} key={index}>
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        whileHover={{ y: -5 }}
                        className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm shadow-lg"
                      >
                        <stat.icon className="mx-auto mb-2 text-emerald-600" size={24} />
                        <Text size="xl" fw={700} className="text-emerald-800">
                          {stat.value}
                        </Text>
                        <Text size="sm" className="text-gray-600">
                          {stat.label}
                        </Text>
                      </motion.div>
                    </Grid.Col>
                  ))}
                </Grid>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Interactive Moringa Image */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer"
                >
                  <Image
                    src="/images/moringaHeroPic.jpg"
                    alt="Premium Moringa Tree"
                    radius="xl"
                    className="shadow-2xl"
                    fallbackSrc="https://images.unsplash.com/photo-1574708364172-ad8473a4f4b4?w=600&h=800&fit=crop&crop=center"
                  />
                  
                  {/* Floating Info Cards */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                  >
                    <Group gap="xs">
                      <ThemeIcon size="sm" className="bg-emerald-100 text-emerald-600">
                        <IconDroplet size={14} />
                      </ThemeIcon>
                      <Text size="xs" fw={600}>Pure</Text>
                    </Group>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                  >
                    <Group gap="xs">
                      <ThemeIcon size="sm" className="bg-green-100 text-green-600">
                        <IconSun size={14} />
                      </ThemeIcon>
                      <Text size="xs" fw={600}>Organic</Text>
                    </Group>
                  </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-80 blur-sm"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full opacity-60 blur-sm"
                />
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Button
            variant="subtle"
            size="lg"
            radius="xl"
            className="text-emerald-600"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <IconChevronDown size={24} />
          </Button>
        </motion.div>
      </motion.section>

      {/* Interactive Benefits Section */}
      <BenefitsSection benefits={benefits} />

      {/* Scroll-triggered Notifications */}
      {scrollY > 500 && scrollY < 1500 && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Notification
            title="🌿 Natural Benefits"
            color="green"
            className="shadow-xl"
            onClose={() => {}}
          >
            Discover the power of organic Moringa!
          </Notification>
        </motion.div>
      )}
    </Box>
  );
};

// Interactive Benefits Component
const BenefitsSection = ({ benefits }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Title
            order={2}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Why Choose Our
            <span className="text-emerald-600"> Moringa?</span>
          </Title>
          <Text size="xl" className="text-gray-600 max-w-2xl mx-auto">
            Experience nature's most powerful superfood with scientifically proven benefits
          </Text>
        </motion.div>

        <Grid>
          {benefits.map((benefit, index) => (
            <Grid.Col span={{ base: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Card
                  p="xl"
                  radius="xl"
                  className="h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 cursor-pointer"
                >
                  <Stack align="center" className="text-center">
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.2 : 1,
                        rotate: hoveredIndex === index ? 10 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThemeIcon
                        size={80}
                        radius="xl"
                        style={{ background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)` }}
                        className="shadow-lg"
                      >
                        <benefit.icon size={40} className="text-white" />
                      </ThemeIcon>
                    </motion.div>

                    <Title order={3} className="text-xl font-bold text-gray-800 mt-4">
                      {benefit.title}
                    </Title>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Badge
                        size="xl"
                        radius="xl"
                        style={{ background: benefit.color }}
                        className="text-white font-bold mb-3"
                      >
                        {benefit.stat}
                      </Badge>
                    </motion.div>

                    <Text className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </Text>

                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-4"
                      >
                        <Button
                          variant="light"
                          size="sm"
                          radius="xl"
                          className="text-emerald-600"
                        >
                          Learn More
                        </Button>
                      </motion.div>
                    )}
                  </Stack>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default EnhancedLandingPage;
