// Dbanyan Group - Organic Hero Section
// Implementing project_context.md Section 2.1 FR1.1 with refined organic aesthetic

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const OrganicHeroSection = () => {
  const navigate = useNavigate();

  // Sophisticated animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
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

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { 
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Organic Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-25 to-sage-50" 
           style={{ 
             background: 'linear-gradient(135deg, #F0F4F0 0%, #F5F8F5 40%, #F8FBF8 100%)'
           }} 
      />
      
      {/* Organic Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(151, 188, 98, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(44, 95, 45, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(151, 188, 98, 0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Video Placeholder - For future implementation */}
      <div className="absolute inset-0 opacity-30">
        {/* This would be replaced with actual video element */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/api/placeholder/1920/1080")',
            filter: 'blur(1px) brightness(0.9)'
          }}
        />
      </div>

      {/* Dark Overlay for Text Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(44, 95, 45, 0.15) 0%, rgba(44, 95, 45, 0.05) 100%)'
        }}
      />

      {/* Hero Content */}
      <Container size="xl" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <motion.div variants={textVariants}>
            <Title 
              order={1}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#2C3E2D',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 4px rgba(44, 95, 45, 0.1)'
              }}
            >
              Unlock Your{' '}
              <span 
                className="relative"
                style={{ color: '#2C5F2D' }}
              >
                Vitality
                {/* Organic underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  style={{ color: '#FFBF00' }}
                >
                  <path
                    d="M5 8c50-3 100-3 150 0s100 3 140-1"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </Title>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={textVariants}>
            <Title 
              order={2}
              className="text-2xl md:text-3xl lg:text-4xl mb-8 font-normal"
              style={{ 
                fontFamily: '"Lora", serif',
                color: '#5A6B5D',
                letterSpacing: '-0.01em'
              }}
            >
              The Pure Power of Moringa
            </Title>
          </motion.div>

          {/* Description */}
          <motion.div variants={textVariants}>
            <Text 
              size="xl"
              className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#4A5553',
                fontWeight: 400
              }}
            >
              Discover nature's most nutrient-dense superfood. Our premium, preservative-free Moringa products are crafted to support your natural wellness journey with the highest standards of purity and potency.
            </Text>
          </motion.div>

          {/* Primary CTA Button */}
          <motion.div 
            variants={buttonVariants}
            whileHover="hover"
          >
            <Button
              size="xl"
              radius="xl"
              className="px-12 py-4 text-lg font-semibold"
              style={{
                backgroundColor: '#2C5F2D',
                color: 'white',
                fontFamily: '"Inter", sans-serif',
                border: 'none',
                boxShadow: '0 8px 32px rgba(44, 95, 45, 0.25), 0 4px 12px rgba(44, 95, 45, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
              }}
              onClick={() => navigate('/products')}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4A7C59';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(44, 95, 45, 0.3), 0 6px 16px rgba(44, 95, 45, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2C5F2D';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(44, 95, 45, 0.25), 0 4px 12px rgba(44, 95, 45, 0.15)';
              }}
            >
              Explore Our Products
            </Button>
          </motion.div>

          {/* Secondary Action */}
          <motion.div 
            variants={textVariants}
            className="mt-8"
          >
            <Text 
              size="md"
              className="cursor-pointer hover:underline"
              style={{ 
                fontFamily: '"Inter", sans-serif',
                color: '#8B9A8D',
                textDecoration: 'none'
              }}
              onClick={() => {
                document.getElementById('moringa-intro')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Learn more about Moringa ↓
            </Text>
          </motion.div>
        </motion.div>
      </Container>

      {/* Organic Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full opacity-20"
        style={{ backgroundColor: '#97BC62' }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full opacity-15"
        style={{ backgroundColor: '#FFBF00' }}
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
};

export default OrganicHeroSection;
