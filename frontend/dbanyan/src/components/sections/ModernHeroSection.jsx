// Dbanyan Group - Modern Hero Section with Real Moringa Image
// Clean, engaging hero with professional imagery

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconArrowRight, IconLeaf, IconShield, IconHeart } from '@tabler/icons-react';

const ModernHeroSection = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(4px)'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const imageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(8px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #dcfce7 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-emerald-300 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-green-300 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-emerald-400 blur-2xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Column - Content */}
          <div className="flex flex-col items-center justify-center text-center w-full">
            <motion.div variants={textVariants}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-emerald-200 mb-6 mx-auto" style={{ textAlign: 'center' }}>
                <IconLeaf className="w-4 h-4 text-emerald-600" />
                <Text size="sm" fw={600} className="text-emerald-800" style={{ textAlign: 'center' }}>
                  Moringify Your Wellness
                </Text>
              </div>
            </motion.div>

            <motion.div variants={textVariants}>
              <Title 
                order={1}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center"
                style={{ 
                  fontFamily: 'Lora, serif',
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1.1',
                  textAlign: 'center'
                }}
              >
                Moringify Your Life
                <br />
                <span className="relative">
                  Today
                  <motion.div
                    className="absolute -bottom-2 left-0 h-3 bg-emerald-200/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </span>
              </Title>
            </motion.div>

            <motion.div variants={textVariants}>
              <Text 
                size="xl" 
                className="text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto text-center"
                style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
              >
                Embrace the Moringa revolution and transform every aspect of your wellness journey. 
                <strong className="text-emerald-700"> Experience pure vitality</strong> with nature's 
                most complete superfood – <em>no preservatives, no compromise</em>, just life-changing nutrition.
              </Text>
            </motion.div>

            {/* Features */}
            <motion.div variants={textVariants}>
              <Group gap="xl" justify="center" className="lg:justify-start mb-8">
                {[
                  { icon: IconShield, text: 'Pure Moringa' },
                  { icon: IconLeaf, text: 'Life-Changing' },
                  { icon: IconHeart, text: 'Wellness Revolution' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <Text size="sm" fw={500} className="text-gray-700">
                      {feature.text}
                    </Text>
                  </div>
                ))}
              </Group>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={textVariants}>
              <Group gap="md" justify="center" className="lg:justify-start">
                <Button
                  size="lg"
                  radius="xl"
                  rightSection={<IconArrowRight className="w-5 h-5" />}
                  onClick={() => navigate('/products')}
                  className="font-semibold px-8 py-4"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    color: 'white',
                    transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Start Your Moringa Journey
                </Button>
                
                <Button
                  size="lg"
                  radius="xl"
                  variant="outline"
                  onClick={() => navigate('/moringa-guide')}
                  className="font-semibold px-8 py-4 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                  }}
                >
                  Learn More
                </Button>
              </Group>
            </motion.div>
          </div>

          {/* Right Column - Moringa Image */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                }}
              >
                <img
                  src="/images/moringaHeroPic.jpg"
                  alt="Moringa leaves, powder, and tea - premium organic"
                  className="w-full h-96 lg:h-[500px] object-cover"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                />
                
                {/* Overlay Gradient */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)'
                  }}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <Text size="lg" fw={700} className="text-emerald-600">
                    90+
                  </Text>
                  <Text size="xs" className="text-gray-600">
                    Nutrients
                  </Text>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <div className="text-center">
                  <Text size="lg" fw={700} className="text-emerald-600">
                    100%
                  </Text>
                  <Text size="xs" className="text-gray-600">
                    Natural
                  </Text>
                </div>
              </motion.div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-8 right-8 w-32 h-32 rounded-full bg-emerald-200/30 blur-2xl" />
            <div className="absolute -z-10 bottom-8 left-8 w-40 h-40 rounded-full bg-green-200/30 blur-2xl" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-emerald-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-500 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default ModernHeroSection;
