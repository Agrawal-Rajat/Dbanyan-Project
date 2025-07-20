// Dbanyan Group - Advanced Scroll Expand Media Component
// Modern scroll-triggered media expansion with Moringa theme

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, Title, Text, Box } from '@mantine/core';

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children
}) => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Transform values for smooth animations
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.3]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1, 0.6, 0.2]),
    springConfig
  );
  
  const textOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.7, 0]),
    springConfig
  );
  
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 0.5, 1]),
    springConfig
  );

  const mediaScale = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [1, 1.05]),
    springConfig
  );

  const overlayOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], textBlend ? [0.8, 0.3] : [0.6, 0.2]),
    springConfig
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleReset = () => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('resetSection', handleReset);
    return () => window.removeEventListener('resetSection', handleReset);
  }, []);

  // Preload media
  useEffect(() => {
    if (mediaType === 'video' && mediaSrc) {
      const video = document.createElement('video');
      video.addEventListener('loadeddata', () => setIsLoaded(true));
      video.src = mediaSrc;
    } else if (mediaType === 'image' && mediaSrc) {
      const img = new Image();
      img.addEventListener('load', () => setIsLoaded(true));
      img.src = mediaSrc;
    }
  }, [mediaSrc, mediaType]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            scale,
            opacity
          }}
        />
        
        {/* Enhanced gradient overlay for better contrast */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            background: textBlend 
              ? 'linear-gradient(135deg, rgba(44, 95, 45, 0.7) 0%, rgba(44, 95, 45, 0.5) 50%, rgba(34, 197, 94, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(44, 95, 45, 0.6) 50%, rgba(0, 0, 0, 0.5) 100%)',
            opacity: overlayOpacity
          }}
        />
        
        {/* Media Container with enhanced animations */}
        <motion.div
          className="relative z-20 w-full max-w-5xl mx-auto px-4"
          style={{ 
            scale: isMobile ? 1 : mediaScale,
            opacity: isLoaded ? 1 : 0.5
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0.5, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm">
            {/* Loading state */}
            {!isLoaded && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-green-900/20">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            
            {mediaType === 'video' ? (
              <video
                ref={mediaRef}
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                onLoadedData={() => setIsLoaded(true)}
              >
                <source src={mediaSrc} type="video/mp4" />
              </video>
            ) : (
              <img
                ref={mediaRef}
                src={mediaSrc}
                alt={title}
                className="w-full h-auto object-cover"
                onLoad={() => setIsLoaded(true)}
              />
            )}
            
            {/* Enhanced media overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent flex items-end">
              <motion.div
                className="p-6 md:p-10 text-white w-full"
                style={{ opacity: textOpacity }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Text 
                    size="sm" 
                    className="text-green-200 mb-3 font-semibold tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {date}
                  </Text>
                  <Title 
                    order={1}
                    className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    style={{ 
                      fontFamily: 'Lora, serif',
                      textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    {title}
                  </Title>
                  <Text 
                    size="xl" 
                    className="text-green-100 opacity-95 max-w-2xl"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {scrollToExpand}
                  </Text>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          style={{ opacity: textOpacity }}
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-12 border-2 border-white/80 rounded-full flex justify-center relative">
              <motion.div 
                className="w-1.5 h-4 bg-white rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <Text size="xs" className="text-white/80 font-medium tracking-wider uppercase">
              Scroll
            </Text>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Content Section */}
      <motion.div
        className="relative z-30 min-h-screen"
        style={{ 
          opacity: contentOpacity,
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)'
        }}
      >
        <Container size="xl" className="py-20">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </Container>
      </motion.div>
    </div>
  );
};

export default ScrollExpandMedia;
