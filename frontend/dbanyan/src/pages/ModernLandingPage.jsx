// Dbanyan Group - Modern Landing Page
// Complete redesign with modern colors, proper spacing, and engaging design

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store';

// Modern Components
import ModernNavBar from '../components/layout/ModernNavBar';
import ModernHeroSection from '../components/sections/ModernHeroSection';
import CompanyQuoteSection from '../components/sections/CompanyQuoteSection';
import ModernMoringaSection from '../components/sections/ModernMoringaSection';
import ModernBenefitsSection from '../components/sections/ModernBenefitsSection';
import ModernProductsSection from '../components/sections/ModernProductsSection';
import ModernFooter from '../components/layout/ModernFooter';

const ModernLandingPage = () => {
  const { checkAuth } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        <title>Dbanyan Group | Premium Moringa Products | Pure Natural Wellness</title>
        <meta 
          name="description" 
          content="Discover premium Moringa products from Dbanyan Group. 100% natural, preservative-free superfood for your wellness journey. Shop authentic Moringa leaf powder, oils, and more." 
        />
        <meta name="keywords" content="Moringa Products, Natural Health, Preservative-Free, Organic Supplements, Wellness, Vitality, Pure Moringa, Superfood, Indian Moringa" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Dbanyan Group | Premium Moringa Products" />
        <meta property="og:description" content="Experience the transformative power of pure Moringa with our premium, preservative-free products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dbanyangroup.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=630&fit=crop" />
        
        {/* Enhanced Typography Loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#10b981" />
      </Helmet>

      {/* Navigation */}
      <ModernNavBar />

      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="overflow-hidden"
      >
        {/* Hero Section - Premium Design */}
        <ModernHeroSection />

        {/* Company Mission & Quote - Life-changing narrative */}
        <CompanyQuoteSection />

        {/* Modern Moringa Introduction - No white space */}
        <ModernMoringaSection />

        {/* Health Benefits - Engaging and visual */}
        <ModernBenefitsSection />

        {/* Product Showcase - Modern grid */}
        <ModernProductsSection />

        {/* Footer - Complete information */}
        <ModernFooter />
      </motion.main>
    </>
  );
};

export default ModernLandingPage;
