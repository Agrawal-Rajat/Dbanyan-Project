// Dbanyan Group - Enhanced Modern Scroll Expansion Hero
// Premium hero section with smooth scroll-triggered animations and rich content

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Title, Text, Button, Badge, Group, Stack, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLeaf, IconShield, IconBrain, IconHeart, IconArrowRight, IconPlay, IconPhoto } from '@tabler/icons-react';
import ScrollExpandMedia from '../blocks/ScrollExpandMedia';

const ModernScrollHero = () => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState('video');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Enhanced Moringa-themed media content
  const moringaMediaContent = {
    video: {
      src: 'https://videos.pexels.com/video-files/6649839/6649839-hd_1920_1080_30fps.mp4',
      poster: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      background: 'https://images.pexels.com/photos/4917379/pexels-photo-4917379.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      title: 'Experience Nature\'s Superfood',
      date: 'Moringa Oleifera',
      scrollToExpand: 'Scroll to discover the miracle tree that nourishes millions',
      about: {
        overview: 'For over 4,000 years, Moringa Oleifera has been revered as the "Miracle Tree" - nature\'s most complete source of nutrition. With 92 nutrients, 46 antioxidants, and 18 amino acids, Moringa delivers unparalleled wellness benefits that modern science is only beginning to understand.',
        conclusion: 'Join thousands who have transformed their health with our premium, preservative-free Moringa products. Experience sustained energy, enhanced immunity, and natural vitality - exactly as nature intended.'
      }
    },
    image: {
      src: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      background: 'https://images.pexels.com/photos/4917379/pexels-photo-4917379.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      title: 'Pure Organic Excellence',
      date: 'Premium Moringa Collection',
      scrollToExpand: 'Scroll to explore our artisanal wellness products',
      about: {
        overview: 'Our Moringa products represent the pinnacle of organic wellness craftsmanship. Every leaf is hand-selected from certified organic farms, processed using traditional methods that preserve maximum nutritional potency, and packaged without any artificial preservatives.',
        conclusion: 'From powder to oils, each product embodies our commitment to purity and potency. Experience the difference that premium quality makes in your daily wellness routine.'
      }
    }
  };

  const currentMedia = moringaMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  const handleMediaTypeChange = async (newType) => {
    if (newType === mediaType) return;
    
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setMediaType(newType);
    await new Promise(resolve => setTimeout(resolve, 100));
    setIsTransitioning(false);
  };

  const MediaContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      {/* Hero Content Section */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge 
            size="xl" 
            variant="light" 
            color="green"
            className="mb-6 px-6 py-3"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            🌿 Ancient Wisdom, Modern Science
          </Badge>
          
          <Title 
            order={1} 
            className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 leading-tight"
            style={{ fontFamily: 'Lora, serif' }}
          >
            The Power of{' '}
            <span className="relative">
              <span className="text-green-600">Moringa</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-4"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Text 
            size="xl" 
            className="text-gray-600 leading-relaxed mb-8"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', lineHeight: '1.7' }}
          >
            {currentMedia.about.overview}
          </Text>

          <Text 
            size="lg" 
            className="text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: '1.6' }}
          >
            {currentMedia.about.conclusion}
          </Text>
        </motion.div>
      </div>

      {/* Enhanced Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
      >
        {[
          {
            icon: <IconLeaf className="w-8 h-8" />,
            title: '92 Nutrients',
            description: 'Complete nutrition in every serving',
            stat: '7x more Vitamin C than oranges',
            color: 'bg-green-500'
          },
          {
            icon: <IconShield className="w-8 h-8" />,
            title: '46 Antioxidants',
            description: 'Natural protection against aging',
            stat: '25x more iron than spinach',
            color: 'bg-blue-500'
          },
          {
            icon: <IconBrain className="w-8 h-8" />,
            title: '18 Amino Acids',
            description: 'Essential building blocks for health',
            stat: '15x more potassium than bananas',
            color: 'bg-purple-500'
          },
          {
            icon: <IconHeart className="w-8 h-8" />,
            title: '4000+ Years',
            description: 'Trusted traditional medicine',
            stat: 'Used by ancient civilizations',
            color: 'bg-red-500'
          }
        ].map((benefit, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Card
              className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 h-full"
            >
              <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <Title 
                order={4} 
                className="text-gray-800 mb-3 text-xl"
                style={{ fontFamily: 'Lora, serif' }}
              >
                {benefit.title}
              </Title>
              <Text 
                size="md" 
                className="text-gray-600 mb-4 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit.description}
              </Text>
              <Text 
                size="sm" 
                className="text-green-600 font-semibold"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit.stat}
              </Text>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-20"
      >
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-100">
          <Title 
            order={2} 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Start Your Wellness Journey Today
          </Title>
          
          <Text 
            size="lg" 
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Join thousands who have transformed their health with nature's most powerful superfood
          </Text>

          <Group justify="center" gap="md">
            <Button
              size="xl"
              radius="xl"
              className="px-10 py-4 text-lg"
              style={{
                backgroundColor: '#2C5F2D',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
              onClick={() => navigate('/products')}
              rightSection={<IconArrowRight className="w-5 h-5" />}
            >
              Shop Premium Moringa
            </Button>
            
            <Button
              size="xl"
              radius="xl"
              variant="outline"
              className="px-10 py-4 text-lg"
              style={{
                borderColor: '#2C5F2D',
                color: '#2C5F2D',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
              onClick={() => navigate('/moringa-guide')}
            >
              Learn More
            </Button>
          </Group>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Enhanced Media Type Toggle */}
      <motion.div 
        className="fixed top-6 right-6 z-50 flex gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {['video', 'image'].map((type) => (
            <motion.button
              key={type}
              onClick={() => handleMediaTypeChange(type)}
              disabled={isTransitioning}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                mediaType === type
                  ? 'bg-white text-green-800 shadow-xl'
                  : 'bg-green-800/70 text-white border border-white/20 hover:bg-green-700/70'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type === 'video' ? <IconPlay className="w-4 h-4" /> : <IconPhoto className="w-4 h-4" />}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend={false}
      >
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export default ModernScrollHero;
